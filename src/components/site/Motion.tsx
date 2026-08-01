import { useRef, type ComponentProps, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

const SPRING = { type: "spring" as const, stiffness: 420, damping: 26, mass: 0.6 };

/** Animated anchor / button: springy lift, press-in, and a sweeping sheen. */
export function MotionButton({
  children,
  className = "",
  ...rest
}: ComponentProps<typeof motion.a>) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      className={`group/btn relative overflow-hidden ${className}`}
      whileHover={reduced ? undefined : { y: -3, scale: 1.025 }}
      whileTap={reduced ? undefined : { y: -1, scale: 0.97 }}
      transition={SPRING}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 z-0 w-1/3 skew-x-[-20deg]"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, white 26%, transparent), transparent)",
        }}
        initial={{ x: "-160%" }}
        whileHover={reduced ? undefined : { x: "460%" }}
        transition={{ duration: 0.75, ease: [0.22, 0.8, 0.24, 1] }}
      />
    </motion.a>
  );
}

/** Same treatment for real <button> elements (e.g. form submit). */
export function MotionSubmit({
  children,
  className = "",
  ...rest
}: ComponentProps<typeof motion.button>) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      whileHover={reduced ? undefined : { y: -3, scale: 1.025 }}
      whileTap={reduced ? undefined : { y: -1, scale: 0.97 }}
      transition={SPRING}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
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
