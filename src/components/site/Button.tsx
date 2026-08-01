import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * The build has exactly three button variants. Nothing else.
 *
 *   primary  accent fill, accent-ink text, no border   — max ONE per section
 *   outline  transparent, text colour, 1px border
 *   ghost    transparent, dim text, no border          — card + footer links
 *
 * Glow is reserved for the hero primary (`glow` prop) and for primary hover.
 * It appears nowhere else in the build.
 */
export type ButtonVariant = "primary" | "outline" | "ghost";

const BASE = [
  "group inline-flex items-center justify-center gap-2",
  "font-semibold no-underline text-center",
  "rounded-[var(--tl-r-md)]",
  "transition-[background-color,border-color,color,box-shadow,transform]",
  "duration-[var(--tl-dur)] ease-tl",
  "cursor-pointer",
].join(" ");

/* 14px 28px default, 10px 18px compact. Both clear the 44px touch floor. */
const SIZE = {
  default: "px-[28px] py-[14px] min-h-[var(--tl-control-h)] text-body",
  compact: "px-[18px] py-[10px] min-h-[var(--tl-control-h-sm)] text-small",
} as const;

const VARIANT: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary text-primary-foreground border-0",
    "hover:bg-primary-dim hover:shadow-glow",
  ].join(" "),
  outline: [
    "bg-transparent text-foreground border border-border",
    "hover:border-primary hover:text-[color:var(--tl-accent-text)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-muted-foreground border-0 px-0",
    "hover:text-foreground",
  ].join(" "),
};

type Size = keyof typeof SIZE;

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  /** Trailing arrow that slides 4px on hover — the site's signature move. */
  arrow?: boolean;
  /** Hero primary only. */
  glow?: boolean;
};

function classes({
  variant = "primary",
  size = "default",
  glow = false,
  arrow = false,
  className = "",
}: CommonProps) {
  return [
    BASE,
    variant === "ghost" ? "tl-mono min-h-[var(--tl-control-h-sm)]" : SIZE[size],
    VARIANT[variant],
    glow ? "shadow-glow" : "",
    arrow ? "tl-arrow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean | undefined }) {
  return (
    <>
      {children}
      {arrow && <ArrowRight size={16} aria-hidden="true" className="shrink-0" />}
    </>
  );
}

/** Internal route link styled as a button. */
export function ButtonLink({
  to,
  hash,
  children,
  onClick,
  ...style
}: CommonProps & {
  to: string;
  hash?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      {...(onClick ? { onClick } : {})}
      className={classes({ children, ...style })}
    >
      <Inner arrow={style.arrow}>{children}</Inner>
    </Link>
  );
}

/** External / protocol link (tel:, mailto:, https:) styled as a button. */
export function ButtonAnchor({
  href,
  children,
  external = false,
  "aria-label": ariaLabel,
  ...style
}: CommonProps & {
  href: string;
  external?: boolean;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes({ children, ...style })}
    >
      <Inner arrow={style.arrow}>{children}</Inner>
    </a>
  );
}

/** Real <button> element — form submits and disclosure triggers. */
export function Button({
  children,
  type = "button",
  onClick,
  ...style
}: CommonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button type={type} onClick={onClick} className={classes({ children, ...style })}>
      <Inner arrow={style.arrow}>{children}</Inner>
    </button>
  );
}
