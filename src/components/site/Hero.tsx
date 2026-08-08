import { preload } from "react-dom";
import { useEffect, useRef } from "react";
import { Activity, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-datacenter.webp";
import rackImage from "@/assets/rack-stack.webp";
import gsap from "gsap";
import { ButtonLink } from "./Button";
import { Container, MonoLabel } from "./Section";
import { useReveal } from "./Reveal";
import { EUROPE_CITIES, APAC_CITIES } from "@/lib/site-data";

const STATS = [
  { figure: "10+", label: "Services" },
  { figure: "10+", label: "Countries" },
  { figure: "24/7", label: "NOC support" },
  { figure: "02", label: "Regions — USA launching soon" },
];

const TICKER_ITEMS = [
  { icon: MapPin, text: "Paris, France" },
  { icon: MapPin, text: "Andhra Pradesh, India" },
  { icon: Clock, text: "24/7 dispatch" },
  { icon: Activity, text: "400G BERT" },
  { icon: MapPin, text: "Frankfurt · Amsterdam" },
  { icon: MapPin, text: "Mumbai · Singapore" },
  { icon: Clock, text: "Emergency response" },
  { icon: Activity, text: "OTDR certified" },
];

/** Splits text into word spans, animates each word in sequence with GSAP. */
function WordReveal({ text, className, as: Tag = "p", delay = 0 }: {
  text: string;
  className?: string;
  as?: "h1" | "p" | "span";
  delay?: number;
}) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const ref = Tag === "h1" ? h1Ref : Tag === "p" ? pRef : spanRef;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = el.querySelectorAll<HTMLSpanElement>(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.055, delay },
      );
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      el.querySelectorAll<HTMLSpanElement>(".word").forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
    });
    return () => mm.revert();
  }, [delay]);

  const words = text.split(" ");
  const inner = words.map((word, i) => (
    <span
      key={i}
      className="word inline-block"
      style={{ opacity: 0, marginRight: i < words.length - 1 ? "0.28em" : undefined }}
    >
      {word}
    </span>
  ));

  if (Tag === "h1") return <h1 ref={h1Ref} className={className}>{inner}</h1>;
  if (Tag === "span") return <span ref={spanRef} className={className}>{inner}</span>;
  return <p ref={pRef} className={className}>{inner}</p>;
}

export function Hero() {
  preload(heroImage, { as: "image", fetchPriority: "high" });
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden pb-[var(--tl-section-y)] pt-[calc(var(--tl-header-h)+var(--tl-s-16))]" style={{ isolation: "isolate" }}>
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -2,
          filter: "blur(6px)", transform: "scale(1.08)",
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Scrim */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: -1,
          background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.22) 100%), linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.88) 100%)",
        }}
      />
      {/* Subtle red glow top-left */}
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-32 -z-10 h-[var(--tl-s-40)] w-[var(--tl-s-40)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--tl-accent) 8%, transparent) 0%, transparent 70%)",
        }}
      />
      <Container>
        <div ref={revealRef} className="grid items-center gap-12 lg:grid-cols-[60fr_40fr]">
          {/* Left column */}
          <div data-reveal className="tl-reveal">
            {/* Live status pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_80%,transparent)] px-3 py-2 backdrop-blur-[12px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tl-live)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--tl-live)]" />
              </span>
              <span className="tl-mono text-[color:var(--tl-live)]">Engineers on site — EU &amp; APAC</span>
            </div>

            <MonoLabel>Data center infrastructure</MonoLabel>

            <h1 className="mt-4 text-display font-bold leading-tight text-foreground">
              <span className="block">Our engineers.</span>
              <span className="block text-primary">Inside the Data Center.</span>
            </h1>

            <p className="mt-6 max-w-[52ch] text-body-lg text-muted-foreground">
              24/7 Data Center Engineering across Europe and APAC — Server Deployment, DWDM, Patching, and Testing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink to="/contact" glow arrow>
                Talk to an engineer
              </ButtonLink>
              <ButtonLink to="/services/" variant="outline" arrow>
                View services
              </ButtonLink>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-small text-muted-foreground">
              Trusted by network operators, hyperscalers, and system integrators across Europe and APAC.
            </p>
          </div>

          {/* Right column — photo card */}
          <div data-reveal className="tl-reveal relative">
            <div className="relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-lg)]">
              <img
                src={rackImage}
                alt="Technician sliding a server into a rack"
                width={1200}
                height={912}
                decoding="async"
                className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 25%, transparent) 0%, transparent 35%, color-mix(in srgb, var(--tl-bg) 60%, transparent) 100%)",
                }}
              />
              {/* Accent border glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[var(--tl-r-lg)]"
                style={{
                  boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--tl-accent) 20%, transparent)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <dl className="mt-16 grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="py-6 md:px-6 md:first:pl-0">
              <dd className="tl-figure text-figure text-primary">{stat.figure}</dd>
              <dt className="mt-2 tl-mono text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>

      {/* Scrolling ticker */}
      <div className="mt-12 overflow-hidden border-y border-border bg-[color-mix(in_srgb,var(--tl-surface)_60%,transparent)] py-3 backdrop-blur-sm">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: "ticker 28s linear infinite" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex shrink-0 items-center gap-2 tl-mono text-muted-foreground">
              <item.icon size={12} aria-hidden="true" className="text-primary" />
              {item.text}
              <span aria-hidden="true" className="ml-4 text-border">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* City strip */}
      <Container>
        <div className="mt-8">
          <p className="tl-mono text-muted-foreground">Colocation across Europe &amp; APAC</p>
          <p className="mt-2 text-body text-foreground">
            {[...EUROPE_CITIES, ...APAC_CITIES].join(" · ")} · and more on request
          </p>
        </div>
      </Container>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes ping-dot {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(2); }
        }
      `}</style>
    </section>
  );
}
