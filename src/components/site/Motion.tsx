import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

const SPRING = { type: "spring" as const, stiffness: 420, damping: 26, mass: 0.6 };
const MAGNET = { stiffness: 300, damping: 20, mass: 0.5 };

export type ButtonVariant = "primary" | "outline" | "surface";

const BASE =
  "group/btn relative isolate inline-flex min-h-12 select-none items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3 text-base font-semibold no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:transition-transform [&_svg]:duration-300 group-hover/btn:[&_svg]:translate-x-0.5";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "text-primary-foreground shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent),inset_0_1px_0_color-mix(in_oklab,white_38%,transparent)] bg-[linear-gradient(140deg,color-mix(in_oklab,var(--primary)_78%,white),var(--primary)_46%,color-mix(in_oklab,var(--primary)_74%,black))]",
  outline:
    "border border-border bg-surface/40 text-foreground backdrop-blur-md shadow-[inset_0_1px_0_color-mix(in_oklab,white_8%,transparent)] hover:border-primary/60 hover:text-primary",
  surface:
    "border border-border bg-surface text-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,white_6%,transparent)] hover:border-primary/60 hover:text-primary",
};

/** Shared decorative layers: sweeping sheen + halo ring. */
function Chrome({ variant }: { variant: ButtonVariant }) {
  return (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 -z-10 w-1/3 skew-x-[-20deg]"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, white 34%, transparent), transparent)",
        }}
        initial={{ x: "-160%" }}
        whileHover={{ x: "460%" }}
        transition={{ duration: 0.8, ease: [0.22, 0.8, 0.24, 1] }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-20 rounded-[inherit] opacity-0"
        style={{
          background:
            variant === "primary"
              ? "radial-gradient(120% 140% at 50% 120%, color-mix(in oklab, white 30%, transparent), transparent 60%)"
              : "radial-gradient(120% 140% at 50% 120%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 65%)",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />
    </>
  );
}

function useMagnet(disabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const mx = useSpring(useMotionValue(0), MAGNET);
  const my = useSpring(useMotionValue(0), MAGNET);

  const onPointerMove = (e: { clientX: number; clientY: number }) => {
    if (disabled) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 14);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 10);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return { ref, x: mx, y: my, onPointerMove, onPointerLeave };
}

/** Animated anchor: magnetic pull, gradient face, sweeping sheen, halo. */
export function MotionButton({
  children,
  className = "",
  variant = "primary",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  href: string;
  onClick?: () => void;
}) {
  const reduced = !!useReducedMotion();
  const magnet = useMagnet(reduced);
  const hover = reduced ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  const internal = rest.href.startsWith("/") && !rest.href.startsWith("//");
  const Comp = (internal ? MotionRouterLink : motion.a) as typeof motion.a;
  const linkProps = internal
    ? ({ to: rest.href, onClick: rest.onClick } as Record<string, unknown>)
    : rest;

  return (
    <Comp
      ref={magnet.ref as React.Ref<HTMLAnchorElement>}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      style={reduced ? {} : { x: magnet.x, y: magnet.y }}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
      transition={SPRING}
      {...hover}
      {...linkProps}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {!reduced && <Chrome variant={variant} />}
    </Comp>
  );
}


/** Same treatment for real <button> elements (e.g. form submit). */
export function MotionSubmit({
  children,
  className = "",
  variant = "primary",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit";
}) {
  const reduced = !!useReducedMotion();
  const magnet = useMagnet(reduced);
  const hover = reduced ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  return (
    <motion.button
      ref={magnet.ref as React.Ref<HTMLButtonElement>}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      style={reduced ? {} : { x: magnet.x, y: magnet.y }}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
      transition={SPRING}
      {...hover}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {!reduced && <Chrome variant={variant} />}
    </motion.button>
  );
}



/**
 * Card with a subtle 3D tilt toward the cursor plus a glow that follows the
 * pointer. Falls back to a plain container when reduced motion is requested.
 */
export function MotionCard({
  children,
  className = "",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: tilt ? rx : 0,
        rotateY: tilt ? ry : 0,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      whileHover={{ y: -8 }}
      transition={SPRING}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0"
        style={{
          background: `radial-gradient(340px circle at ${"var(--gx)"} ${"var(--gy)"}, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)`,
          ["--gx" as string]: glowX,
          ["--gy" as string]: glowY,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10 h-full rounded-[inherit]">{children}</div>
    </motion.div>
  );
}
