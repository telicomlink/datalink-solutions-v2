import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, Clock, Globe2, Zap, Check, X } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { WhyUs, Process } from "@/components/site/WhyCoverageProcess";
import { Faq } from "@/components/site/FaqFooter";
import { Section, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { WHY_STATS, INDUSTRIES } from "@/lib/site-data";
import whyHero from "@/assets/hero-why.webp";

export const Route = createFileRoute("/why-us")({ component: WhyUsPage });

const CREDENTIALS = [
  { icon: Clock, label: "24/7 dispatch", body: "Emergency and remote hands every day of the year — no business-hours-only excuses." },
  { icon: Zap, label: "400G capability", body: "BERT and OTDR up to 400G. Specialist kit most remote-hands vendors don't carry." },
  { icon: Globe2, label: "Two regions", body: "Local engineers in Europe and APAC — not a single time-zone operation." },
  { icon: Award, label: "One team", body: "Deployment, testing, and operations by the same people. No handoffs, no gaps." },
];

/* Comparison: us vs typical vendor */
const COMPARISON = [
  { feature: "24/7 emergency dispatch", us: true, them: false },
  { feature: "400G BERT & OTDR testing", us: true, them: false },
  { feature: "Europe + APAC coverage", us: true, them: false },
  { feature: "Deployment to decommissioning", us: true, them: false },
  { feature: "On-site spares management", us: true, them: false },
  { feature: "Certified data destruction", us: true, them: false },
  { feature: "Single point of contact", us: true, them: false },
];

/* ── Stats ───────────────────────────────────────────────────────────────── */
function Stats() {
  const ref = useReveal<HTMLDListElement>();
  return (
    <Section>
      <MonoLabel>By the numbers</MonoLabel>
      <dl ref={ref} className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0">
        {WHY_STATS.map((stat) => (
          <div key={stat.label} data-reveal className="tl-reveal py-8 md:px-8 md:first:pl-0 md:last:pr-0">
            <dd className="tl-figure text-display font-bold leading-none text-primary">{stat.value}</dd>
            <dt className="mt-3 text-small text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ── Credentials grid ────────────────────────────────────────────────────── */
function Credentials() {
  const ref = useReveal<HTMLUListElement>();
  return (
    <Section variant="surface">
      <MonoLabel>What sets us apart</MonoLabel>
      <SectionHeading>Built differently from day one.</SectionHeading>
      <SectionLead>Most remote-hands vendors are generalists. We specialise in the full lifecycle — from survey to decommissioning — with the test kit to prove it.</SectionLead>
      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIALS.map((c) => (
          <li key={c.label} data-reveal className="tl-reveal group rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
              <c.icon size={16} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-h3 font-bold text-foreground">{c.label}</h3>
            <p className="mt-2 text-small text-muted-foreground">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ── Comparison table ────────────────────────────────────────────────────── */
function Comparison() {
  return (
    <Section>
      <MonoLabel>How we compare</MonoLabel>
      <SectionHeading>TelicomLink vs. a typical remote-hands vendor.</SectionHeading>
      <SectionLead>Most vendors cover the basics. We cover the full lifecycle.</SectionLead>

      <div className="mt-12 overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-md)]">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto] border-b border-border bg-surface px-6 py-4">
          <span className="tl-mono text-muted-foreground">Capability</span>
          <span className="w-32 text-center tl-mono text-[color:var(--tl-accent-text)]">TelicomLink</span>
          <span className="w-32 text-center tl-mono text-muted-foreground">Typical vendor</span>
        </div>
        {COMPARISON.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-[1fr_auto_auto] items-center px-6 py-4 ${i < COMPARISON.length - 1 ? "border-b border-border" : ""} ${i % 2 === 0 ? "bg-background" : "bg-surface"}`}
          >
            <span className="text-body text-foreground">{row.feature}</span>
            <span className="flex w-32 justify-center">
              {row.us ? (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Check size={14} aria-hidden="true" className="text-primary" />
                </span>
              ) : (
                <X size={16} aria-hidden="true" className="text-muted-foreground opacity-40" />
              )}
            </span>
            <span className="flex w-32 justify-center">
              {row.them ? (
                <Check size={16} aria-hidden="true" className="text-primary" />
              ) : (
                <X size={16} aria-hidden="true" className="text-muted-foreground opacity-40" />
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ButtonLink to="/contact" arrow>Talk to an engineer</ButtonLink>
      </div>
    </Section>
  );
}

/* ── Industries ──────────────────────────────────────────────────────────── */
function Industries() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active]!;

  return (
    <Section variant="surface">
      <MonoLabel>Who we work with</MonoLabel>
      <SectionHeading>Built for the people who own the equipment.</SectionHeading>
      <SectionLead>We work for whoever has infrastructure inside a facility they don&apos;t staff themselves.</SectionLead>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
        {/* Selector */}
        <ul className="flex list-none flex-col gap-2 p-0">
          {INDUSTRIES.map((item, i) => (
            <li key={item.name}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-[var(--tl-r-lg)] border px-6 py-4 text-left transition-colors duration-[var(--tl-dur)] ${
                  active === i
                    ? "border-primary bg-[color-mix(in_srgb,var(--tl-accent)_8%,var(--tl-surface))] text-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-surface"
                }`}
              >
                <span className="text-body font-semibold">{item.name}</span>
                <span className={`tl-mono text-label transition-colors duration-[var(--tl-dur)] ${active === i ? "text-[color:var(--tl-accent-text)]" : "text-border"}`}>
                  0{i + 1}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Detail panel */}
        <div className="flex flex-col justify-center rounded-[var(--tl-r-lg)] border border-border bg-background p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
          <span className="tl-mono text-[color:var(--tl-accent-text)]">0{active + 1}</span>
          <h3 className="mt-3 text-h2 font-bold text-foreground">{ind.name}</h3>
          <p className="mt-4 text-body-lg text-muted-foreground">{ind.body}</p>
          <div className="mt-8">
            <ButtonLink to="/contact" variant="outline" arrow>Get in touch</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── CTA strip ───────────────────────────────────────────────────────────── */
function CtaStrip() {
  return (
    <Section variant="deep">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <MonoLabel>Ready to start?</MonoLabel>
          <SectionHeading>Talk to an engineer today.</SectionHeading>
          <SectionLead>Tell us the facility, the task, and the timeline — we&apos;ll take it from there.</SectionLead>
        </div>
        <ButtonLink to="/contact" glow arrow className="shrink-0">Get in touch</ButtonLink>
      </div>
    </Section>
  );
}

function WhyUsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Why us"
        title="Data center as a service, run like an engineering team."
        lead="We work inside the facility on your behalf — deploying servers and DWDM, patching, testing, and keeping it running. No handoffs between three vendors, no business-hours-only excuses."
        image={whyHero}
        imageAlt="Two engineers reviewing rack and network diagrams in a night operations room"
      />
      <Stats />
      <Credentials />
      <WhyUs />
      <Comparison />
      <Industries />
      <Process />
      <Faq variant="default" />
      <CtaStrip />
    </SiteLayout>
  );
}
