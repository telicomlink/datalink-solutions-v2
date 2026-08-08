import { Check, ShieldCheck } from "lucide-react";
import whyImage from "@/assets/why-engineer.webp";
import coverageMap from "@/assets/coverage-map.webp";

import { DIFFERENTIATORS, EUROPE_CITIES, APAC_CITIES, PROCESS_STEPS } from "@/lib/site-data";
import { Section, MonoLabel, SectionHeading, SectionLead } from "./Section";
import { ButtonLink } from "./Button";
import { useReveal } from "./Reveal";

export function WhyUs() {
  const ref = useReveal<HTMLUListElement>();

  return (
    <Section id="why" variant="surface">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-md)]">
            <img
              src={whyImage}
              alt="Engineer patching fibre optic cables into a network switch inside a data center rack"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 25%, transparent) 0%, transparent 45%, color-mix(in srgb, var(--tl-bg) 60%, transparent) 100%)",
              }}
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] px-3 py-2 text-small font-medium text-foreground backdrop-blur-[12px]">
              <ShieldCheck size={16} aria-hidden="true" className="text-primary" />
              Vetted on-site engineers
            </span>
          </div>
          <p className="mt-3 tl-mono text-muted-foreground">
            On-site inside a client facility.
          </p>
        </div>

        <div>
          <MonoLabel>Why TelicomLink</MonoLabel>
          <SectionHeading>The hands and expertise inside the facility.</SectionHeading>
          <SectionLead>
            We don&apos;t own the buildings — we operate inside them, on behalf of network
            operators, hyperscalers, integrators, and enterprises with equipment they don&apos;t
            staff themselves.
          </SectionLead>
          <ul ref={ref} className="mt-8 flex list-none flex-col gap-4 p-0">
            {DIFFERENTIATORS.map((point) => (
              <li
                key={point}
                data-reveal
                className="tl-reveal flex items-start gap-3 text-small text-muted-foreground"
              >
                <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function CityList({ title, cities }: { title: string; cities: string[] }) {
  return (
    <div className="rounded-[var(--tl-r-lg)] border border-border bg-surface p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
      <h3 className="tl-mono text-muted-foreground">{title}</h3>
      <ul className="mt-4 flex list-none flex-col gap-3 p-0">
        {cities.map((city) => (
          <li key={city} className="flex items-center gap-3 text-body text-foreground">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-[var(--tl-r-pill)] bg-primary"
            />
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Coverage() {
  return (
    <Section id="coverage">
      <MonoLabel>Coverage</MonoLabel>
      <SectionHeading>Colocation across Europe and APAC.</SectionHeading>
      <SectionLead>
        Ten-plus countries of dispatch coverage today, with more on request — and remote-hands
        coverage tied to every facility.
      </SectionLead>

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <CityList title="Europe" cities={EUROPE_CITIES} />
          <CityList title="APAC" cities={APAC_CITIES} />
        </div>

        <div className="relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border bg-surface shadow-[var(--tl-edge),var(--tl-shadow-md)]">
          <img
            src={coverageMap}
            alt="Map showing TelicomLink coverage routes between Europe and South Asia"
            width={1600}
            height={912}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-4 rounded-[var(--tl-r-md)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] px-4 py-3 backdrop-blur-[12px]">
            <span className="tl-mono text-muted-foreground">Two regions</span>
            <span className="tl-mono text-[color:var(--tl-accent-text)]">EU · Paris hub</span>
            <span className="tl-mono text-[color:var(--tl-accent-text)]">
              APAC · Andhra Pradesh hub
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ButtonLink to="/contact" variant="outline" arrow>
          Ask about a specific facility
        </ButtonLink>
      </div>
    </Section>
  );
}

export function Process() {
  const ref = useReveal<HTMLOListElement>();

  return (
    <Section id="process" variant="surface">
      <MonoLabel>How it works</MonoLabel>
      <SectionHeading>From site survey to steady-state operation.</SectionHeading>
      <SectionLead>Four stages. One accountable team from assessment to operation.</SectionLead>
      <ol
        ref={ref}
        className="mt-12 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROCESS_STEPS.map((step) => (
          <li key={step.step} data-reveal className="tl-reveal border-t border-border pt-6">
            <span className="block tl-figure text-figure text-muted-foreground opacity-40">
              {step.step}
            </span>
            <h3 className="mt-3 text-h3 font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-small text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
