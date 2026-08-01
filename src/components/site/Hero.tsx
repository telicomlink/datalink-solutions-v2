import { ArrowRight, Activity, Cable } from "lucide-react";
import heroImage from "@/assets/hero-datacenter.jpg";
import rackImage from "@/assets/rack-stack.jpg";
import { MotionButton } from "./Motion";
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
    <section className="relative overflow-hidden px-6 pb-[clamp(16px,3vw,40px)] pt-[clamp(112px,12vw,160px)]">
      <img
        src={heroImage}
        alt="Cold aisle of a data center with rows of server racks and green accent lighting"
        width={1920}
        height={1200}
        className="absolute inset-0 -z-30 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(100deg, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 74%, transparent) 48%, color-mix(in oklab, var(--background) 46%, transparent) 100%), linear-gradient(180deg, transparent 55%, var(--background) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-[tl-pulse_7s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 20% 0%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 62%)",
        }}
      />
      <div aria-hidden="true" className="tl-grid absolute inset-0 -z-10 opacity-60" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)]">
        <div>
          <Eyebrow>Data Center &amp; Network Infrastructure</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,5.4vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Your engineers, <span className="text-primary">inside the data center.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            Server deployment, DWDM, patching, and testing across Europe and APAC — 24/7.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <MotionButton href="#contact">
              Talk to an engineer <ArrowRight size={18} />
            </MotionButton>
            <MotionButton href="#services" variant="outline">
              View services
            </MotionButton>
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
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] border border-border/80 shadow-[0_40px_90px_-30px_rgba(0,0,0,.9)]">
            <img
              src={rackImage}
              alt="Technician sliding a server into a rack"
              width={1200}
              height={912}
              className="aspect-4/5 w-full object-cover sm:aspect-4/3 lg:aspect-4/5"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--background) 80%, transparent) 100%)",
              }}
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-[tl-ping_2s_cubic-bezier(0,0,.2,1)_infinite] rounded-full bg-primary" />
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  Engineers on site
                </span>
              </div>
              <span className="font-mono text-[11px] text-primary">LIVE</span>
            </div>
          </div>

          <div className="absolute -left-3 top-6 hidden items-center gap-2 rounded-xl border border-border bg-background/85 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,.6)] backdrop-blur sm:flex">
            <Activity size={15} className="text-primary" />
            <span className="text-xs font-semibold">400G BERT verified</span>
          </div>
          <div className="absolute -right-2 bottom-24 hidden items-center gap-2 rounded-xl border border-border bg-background/85 px-3.5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,.6)] backdrop-blur sm:flex">
            <Cable size={15} className="text-primary" />
            <span className="text-xs font-semibold">DWDM &amp; patching</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-[1200px] border-y border-border py-5">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          Colocation across Europe &amp; APAC
        </div>
        <div className="font-mono text-sm leading-relaxed text-foreground">
          {[...EUROPE_CITIES, ...APAC_CITIES].join(" · ")} · and more on request
        </div>
      </div>
    </section>
  );
}
