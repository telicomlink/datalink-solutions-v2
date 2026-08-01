import { useCallback, useEffect, useRef, useState } from "react";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "top", label: "Top" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why us" },
  { id: "coverage", label: "Coverage" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function scrollMax() {
  return Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  // Move keyboard focus into the section so screen readers follow the jump.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/**
 * Clickable, keyboard-accessible scroll progress bar.
 * - Click anywhere on the track to seek to that position in the page.
 * - Each section has a labelled tick button; Tab / arrow keys move between them.
 */
export function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [marks, setMarks] = useState<{ id: string; label: string; pct: number }[]>([]);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const max = scrollMax();
    const next = SECTIONS.flatMap((s) => {
      const el = document.getElementById(s.id);
      if (!el) return [];
      const top = el.getBoundingClientRect().top + window.scrollY;
      return [{ id: s.id, label: s.label, pct: Math.min(Math.max(top / max, 0), 1) }];
    });
    setMarks(next);
  }, []);

  useEffect(() => {
    let frame = 0;
    let current = 0;
    let target = 0;

    const read = () => {
      target = Math.min(window.scrollY / scrollMax(), 1);
      const idx = marks.reduce((acc, m, i) => (target + 0.02 >= m.pct ? i : acc), 0);
      setActive(idx);
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${current.toFixed(4)})`;
      frame = requestAnimationFrame(tick);
    };

    measure();
    read();
    current = target;
    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 600); // after images/fonts settle
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", measure);
    };
  }, [measure, marks]);

  const seekFromPointer = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: ratio * scrollMax(), behavior: reduced ? "auto" : "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = marks.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(index + 1, last);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(index - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    btnRefs.current[next]?.focus();
    scrollToId(marks[next]!.id);
  };

  return (
    <nav
      aria-label="Page sections"
      className="fixed inset-x-0 top-0 z-[60] h-3 print:hidden"
    >
      {/* clickable track */}
      <div
        ref={trackRef}
        onClick={(e) => seekFromPointer(e.clientX)}
        className="group absolute inset-x-0 top-0 h-3 cursor-pointer"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-primary/15 transition-[height] duration-200 group-hover:h-[4px]" />
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-primary/80 transition-[height] duration-200 will-change-transform group-hover:h-[4px]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* section tick buttons */}
      <ul className="pointer-events-none absolute inset-x-0 top-0 m-0 list-none p-0">
        {marks.map((m, i) => (
          <li
            key={m.id}
            className="pointer-events-auto absolute top-0 -translate-x-1/2"
            style={{ left: `${m.pct * 100}%` }}
          >
            <button
              type="button"
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              onClick={() => scrollToId(m.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              aria-label={`Jump to ${m.label} section`}
              aria-current={active === i ? "true" : undefined}
              className="relative flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden
                className={`block rounded-full transition-all duration-200 ${
                  active === i
                    ? "h-2 w-2 bg-primary shadow-[0_0_10px_2px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
                    : "h-1.5 w-1.5 bg-primary/40 hover:bg-primary/80"
                }`}
              />
              <span className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-0 hover:opacity-100 focus-visible:opacity-100 [button:hover>&]:opacity-100 [button:focus-visible>&]:opacity-100">
                {m.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
