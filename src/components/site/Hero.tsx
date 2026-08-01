import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-datacenter.jpg";
import { Eyebrow } from "./Reveal";
import { EUROPE_CITIES, APAC_CITIES } from "@/lib/site-data";

const STATS = [
  { value: "09", label: "Services" },
  { value: "08", label: "Facilities" },
  { value: "24/7", label: "Support" },
  { value: "02", label: "Regions" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-[clamp(56px,8vw,96px)] pt-[clamp(112px,12vw,168px)]">
      <img
        src={heroImage}
        alt="Cold aisle of a data center with rows of server racks"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-30 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--background) 35%, transparent) 0%, color-mix(in oklab, var(--background) 62%, transparent) 45%, var(--background) 96%)",
        }}

      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-[tl-pulse_7s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% -5%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 65%)",
        }}
      />
      <div aria-hidden="true" className="tl-grid absolute inset-0 -z-10" />

      <div className="relative mx-auto max-w-[1200px]">
        <Eyebrow>Data Center &amp; Network Infrastructure</Eyebrow>
        <h1 className="mt-5 max-w-[900px] font-display text-[clamp(2.75rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.045em]">
          Your engineers, <span className="text-primary">inside the data center.</span>
        </h1>
        <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-muted-foreground">
          Server deployment, DWDM, patching, and testing across Europe and APAC — 24/7.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground no-underline shadow-[0_4px_16px_color-mix(in_oklab,var(--primary)_22%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent"
          >
            Talk to an engineer <ArrowRight size={18} />
          </a>
          <a
            href="#services"
            className="inline-flex min-h-12 items-center rounded-xl border border-border bg-surface/40 px-7 py-3 text-base font-semibold text-foreground no-underline transition-colors duration-200 hover:border-primary/50 hover:text-primary"
          >
            View services
          </a>
        </div>

        <div className="mt-11 flex flex-wrap gap-x-12 gap-y-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-none text-primary">
                {stat.value}
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 border-y border-border py-5">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
            Colocation across Europe &amp; APAC
          </div>
          <div className="font-mono text-sm leading-relaxed text-foreground">
            {[...EUROPE_CITIES, ...APAC_CITIES].join(" · ")} · and more on request
          </div>
        </div>
      </div>
    </section>
  );
}
