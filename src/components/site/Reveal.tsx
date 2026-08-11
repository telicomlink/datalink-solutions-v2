import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

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

        // Always remove CSS opacity-0 class first
        items.forEach((el) => el.classList.remove("tl-reveal"));

        if (context.conditions?.["reduced"]) {
          gsap.set(items, { clearProps: "opacity,transform" });
          return;
        }

        // If already in viewport, show immediately — no animation needed
        const rect = root.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          gsap.set(items, { opacity: 1, y: 0, clearProps: "transform" });
          return;
        }

        // Otherwise animate on scroll
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
  }, [enabled, i18n.language]);

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
