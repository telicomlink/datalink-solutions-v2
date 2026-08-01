import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import whyImage from "@/assets/why-engineer.jpg";
import { DIFFERENTIATORS, EUROPE_CITIES, APAC_CITIES, PROCESS_STEPS } from "@/lib/site-data";
import { Eyebrow, Reveal, SectionHeading } from "./Reveal";

export function WhyUs() {
  return (
    <section id="why" className="bg-surface px-6 py-[clamp(56px,10vw,128px)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-[0_24px_64px_rgba(0,0,0,.55)]">
              <img
                src={whyImage}
                alt="Engineer patching fibre optic cables into a network switch inside a data center rack"
                width={1200}
                height={900}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-background/75 px-3.5 py-2 backdrop-blur">
                <ShieldCheck size={16} className="text-primary" />
                <span className="text-xs font-semibold text-foreground">
                  Vetted on-site engineers
                </span>
              </div>
            </div>
            <p className="font-mono text-xs tracking-wide text-subtle">
              On-site inside a client facility.
            </p>
          </div>
        </Reveal>

        <div>
          <Eyebrow>Why TelicomLink</Eyebrow>
          <SectionHeading>The hands and expertise inside the facility.</SectionHeading>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            We don't own the buildings — we operate inside them, on behalf of network operators,
            hyperscalers, integrators, and enterprises with equipment they don't staff themselves.
          </p>
          <ul className="mt-6 flex list-none flex-col gap-3.5 p-0">
            {DIFFERENTIATORS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CityList({ title, cities }: { title: string; cities: string[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-5 flex list-none flex-col gap-4 p-0">
        {cities.map((city) => (
          <li key={city} className="flex items-center gap-3 text-base text-foreground">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-primary" />
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Coverage() {
  return (
    <section id="coverage" className="px-6 py-[clamp(56px,10vw,128px)]">
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow>Coverage</Eyebrow>
        <SectionHeading>Colocation across Europe and APAC.</SectionHeading>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
          Eight facilities today, with more on request — and remote-hands coverage tied to every one
          of them.
        </p>
        <div className="mt-10 grid gap-12 sm:grid-cols-2">
          <CityList title="Europe" cities={EUROPE_CITIES} />
          <CityList title="APAC" cities={APAC_CITIES} />
        </div>
        <a
          href="#contact"
          className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface/40 px-5 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:border-primary/50 hover:text-primary"
        >
          Ask about a specific facility <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="bg-surface px-6 py-[clamp(56px,10vw,128px)]">
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow>How it works</Eyebrow>
        <SectionHeading>From survey to steady-state operation.</SectionHeading>
        <ol className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.step} className="relative border-t-2 border-border pt-6">
              <span
                aria-hidden="true"
                className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-primary"
              >
                <span className="absolute inset-0 animate-[tl-ping_2s_cubic-bezier(0,0,.2,1)_infinite] rounded-full bg-primary" />
              </span>
              <Reveal delay={i * 90}>
                <span className="block font-mono text-[clamp(2.5rem,4vw,3.75rem)] font-medium leading-none text-subtle">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
