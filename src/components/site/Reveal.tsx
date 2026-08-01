import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The ONLY motion pattern in the build.
 *
 * opacity 0 / translateY 12px -> 1 / 0, 500ms, soft ease, 60ms stagger within
 * a group, fired once when the group hits 80% of the viewport.
 *
 * No parallax, no counters, no scale-ins, no scroll-jacking. Everything is
 * inside gsap.matchMedia, so `prefers-reduced-motion: reduce` gets no
 * animation at all — the cleanup pass clears the start state instantly.
 */
const DURATION = 0.5;
const STAGGER = 0.06;
const DISTANCE = 12;
const START = "top 80%";

export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !enabled) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
        const items = targets.length ? Array.from(targets) : [root];

        if (context.conditions?.["reduced"]) {
          // No motion at all — just make sure nothing is left invisible.
          gsap.set(items, { clearProps: "opacity,transform" });
          items.forEach((el) => el.classList.remove("tl-reveal"));
          return;
        }

        items.forEach((el) => el.classList.remove("tl-reveal"));

        const tween = gsap.fromTo(
          items,
          { opacity: 0, y: DISTANCE },
          {
            opacity: 1,
            y: 0,
            duration: DURATION,
            ease: "power2.out",
            stagger: STAGGER,
            scrollTrigger: { trigger: root, start: START, once: true },
          },
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
    );

    return () => mm.revert();
  }, [enabled]);

  return ref;
}

/**
 * Wraps a group of elements. Direct children marked `data-reveal` animate in
 * sequence; with no marked children the wrapper itself animates as one unit.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
