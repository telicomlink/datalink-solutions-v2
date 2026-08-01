import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0) scale(1)" : "translateY(28px) scale(0.985)",
        filter: shown ? "blur(0px)" : "blur(6px)",
        transition:
          "opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1), filter .9s cubic-bezier(.16,1,.3,1)",
        transitionDelay: shown ? `${delay}ms` : "0ms",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>

  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="tl-eyebrow">
      <span className="inline-block h-px w-6 bg-current" />
      {children}
    </span>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.028em]">
      {children}
    </h2>
  );
}
