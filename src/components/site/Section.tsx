import type { ElementType, ReactNode } from "react";

/**
 * Section owns ALL vertical page rhythm: 128px desktop / 80px tablet / 56px
 * mobile, driven by --tl-section-y. Nothing inside a section may add its own
 * top/bottom margin to create separation — if two things need more air, they
 * belong in different sections.
 *
 * Alternate `default` and `surface` down a page so it reads as bands rather
 * than one flat wash.
 */
export type SectionVariant = "default" | "surface" | "deep";

const VARIANT_BG: Record<SectionVariant, string> = {
  default: "bg-background",
  surface: "bg-surface",
  deep: "bg-deep",
};

export function Section({
  children,
  variant = "default",
  as: Tag = "section",
  id,
  className = "",
  containerClassName = "",
  bleed = false,
  labelledBy,
}: {
  children: ReactNode;
  variant?: SectionVariant;
  as?: ElementType;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Skip the inner container — the section manages its own width. */
  bleed?: boolean;
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-[var(--tl-section-y)] ${VARIANT_BG[variant]} ${className}`}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  );
}

/** 1200px max width, 24px gutter desktop / 20px mobile. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--tl-container)] px-[var(--tl-gutter)] ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * The section eyebrow: 24px x 1px accent bar, 8px gap, 12px mono uppercase
 * accent text, 16px below. Max three words. Every section starts with one.
 *
 * The text uses --tl-accent-text (the same accent hue lifted in lightness)
 * because the base accent only reaches 4.05:1 on --tl-bg at label size.
 */
export function MonoLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p id={id} className="mb-4 flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
      <span aria-hidden="true" className="block h-px w-6 shrink-0 bg-primary" />
      {children}
    </p>
  );
}

/** Section headline. Visibly larger and heavier than any card title. */
export function SectionHeading({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`max-w-[20ch] text-h2 font-bold text-balance text-foreground ${className}`}
    >
      {children}
    </h2>
  );
}

/** Supporting copy under a section heading. Never monospace. */
export function SectionLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-4 max-w-[60ch] text-body-lg text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}
