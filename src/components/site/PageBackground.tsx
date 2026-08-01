import { useEffect, useRef } from "react";
import bgAtmosphere from "@/assets/bg-atmosphere.jpg";

/**
 * Fixed, full-page atmospheric background with smooth (lerped) parallax:
 * the image drifts and scales slowly as the page scrolls, and a scroll
 * progress bar tracks position at the very top of the page.
 */
export function PageBackground() {
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let current = 0;
    let target = 0;
    let frame = 0;

    const read = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      target = Math.min(window.scrollY / max, 1);
    };

    const tick = () => {
      current += (target - current) * 0.075; // easing toward target = buttery drift
      const p = current;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(0, ${(-p * 16).toFixed(3)}%, 0) scale(${(1.16 - p * 0.1).toFixed(4)})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(0, ${(p * 42).toFixed(2)}vh, 0)`;
        glowRef.current.style.opacity = `${(0.55 - p * 0.25).toFixed(3)}`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(0, ${(-p * 240).toFixed(2)}px, 0)`;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }

      frame = requestAnimationFrame(tick);
    };

    read();
    current = target;
    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
        {/* parallax photo layer */}
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url(${bgAtmosphere})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.16)",
            opacity: 0.5,
          }}
        />
        {/* drifting green glow */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-[-20vh] h-[80vh] w-[110vw] -translate-x-1/2 will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 62%)",
            opacity: 0.55,
          }}
        />
        {/* slow-moving technical grid */}
        <div
          ref={gridRef}
          className="absolute inset-x-0 -top-60 h-[160vh] opacity-[0.5] will-change-transform"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--primary) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 7%, transparent) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
          }}
        />
        {/* legibility veil */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 72%, transparent), color-mix(in oklab, var(--background) 88%, transparent) 45%, color-mix(in oklab, var(--background) 94%, transparent))",
          }}
        />
      </div>

      {/* scroll progress */}
      <div
        aria-hidden
        ref={barRef}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-primary/80 will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </>
  );
}
