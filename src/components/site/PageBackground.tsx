import { useEffect, useRef } from "react";
import bgAtmosphere from "@/assets/bg-atmosphere.jpg";

/** Critically-damped spring: smooth, overshoot-free easing toward a target. */
function makeSpring(stiffness: number) {
  let value = 0;
  let velocity = 0;
  const damping = 2 * Math.sqrt(stiffness); // critical damping
  return {
    get value() {
      return value;
    },
    get velocity() {
      return velocity;
    },
    set(v: number) {
      value = v;
      velocity = 0;
    },
    step(target: number, dt: number) {
      // sub-step for stability at low frame rates
      const steps = Math.max(1, Math.ceil(dt / 0.016));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        const accel = stiffness * (target - value) - damping * velocity;
        velocity += accel * h;
        value += velocity * h;
      }
      return value;
    },
  };
}

/**
 * Fixed, full-page atmospheric background with spring-eased parallax.
 * Each layer runs its own critically-damped spring at a different stiffness,
 * so the photo, glow, and grid settle at slightly different rates — that lag
 * between layers is what reads as depth. Scroll velocity adds a subtle
 * "push" to the zoom and glow intensity, then eases back out when you stop.
 */
export function PageBackground() {
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Slower spring = more lag = further "away" layer.
    const photo = makeSpring(26);
    const glow = makeSpring(14);
    const grid = makeSpring(42);
    const surge = makeSpring(30); // eased scroll velocity, drives zoom/intensity

    let target = 0;
    let lastTarget = 0;
    let frame = 0;
    let last = performance.now();

    const read = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      target = Math.min(Math.max(window.scrollY / max, 0), 1);
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp after tab switches
      last = now;

      // Scroll speed in progress-units/second, softly clamped.
      const raw = Math.min(Math.abs(target - lastTarget) / Math.max(dt, 0.001) * 0.6, 1);
      lastTarget = target;

      const p = photo.step(target, dt);
      const g = glow.step(target, dt);
      const gr = grid.step(target, dt);
      const s = surge.step(raw, dt);

      if (imageRef.current) {
        const scale = 1.16 - p * 0.1 + s * 0.018; // breathes in slightly while moving
        imageRef.current.style.transform = `translate3d(0, ${(-p * 16).toFixed(3)}%, 0) scale(${scale.toFixed(4)})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(0, ${(g * 42).toFixed(2)}vh, 0) scale(${(1 + s * 0.06).toFixed(4)})`;
        glowRef.current.style.opacity = `${(0.55 - g * 0.25 + s * 0.12).toFixed(3)}`;
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(0, ${(-gr * 240).toFixed(2)}px, 0)`;
        gridRef.current.style.opacity = `${(0.5 - s * 0.18).toFixed(3)}`; // grid softens at speed
      }

      frame = requestAnimationFrame(tick);
    };

    read();
    photo.set(target);
    glow.set(target);
    grid.set(target);
    lastTarget = target;
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
            opacity: 0.62,
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
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 62%, transparent), color-mix(in oklab, var(--background) 78%, transparent) 45%, color-mix(in oklab, var(--background) 86%, transparent))",
          }}
        />
      </div>
    </>

  );
}
