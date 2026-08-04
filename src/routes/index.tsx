import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, ShieldCheck, Zap, Globe2, Users,
  Clock, ChevronRight,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Services, Capabilities } from "@/components/site/Services";
import { Coverage } from "@/components/site/WhyCoverageProcess";
import { Faq } from "@/components/site/FaqFooter";
import {
  Section, Container, MonoLabel, SectionHeading, SectionLead,
} from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import {
  DIFFERENTIATORS, INDUSTRIES, PROCESS_STEPS, CONTACT,
} from "@/lib/site-data";
import whyImage from "@/assets/why-engineer.webp";

export const Route = createFileRoute("/")({ component: Index });

/* ─── Why us ─────────────────────────────────────────────────────────────── */
const WHY_CARDS = [
  { icon: Zap, title: "400G test capability", body: "BERT and OTDR up to 400G — specialist kit most remote-hands vendors don't carry." },
  { icon: Clock, title: "24/7 dispatch", body: "Emergency and remote hands every day of the year. No business-hours-only excuses." },
  { icon: Globe2, title: "Two regions", body: "Local engineers in Europe and APAC — not a single time-zone operation." },
  { icon: Users, title: "One team", body: "Deployment, testing, and operations by the same people. No handoffs, no gaps." },
];

function WhySection() {
  const cardsRef = useReveal<HTMLUListElement>();

  return (
    <Section variant="surface">
      <div className="grid items-start gap-16 lg:grid-cols-[1fr_1fr]">
        {/* Left: photo */}
        <div>
          <div className="relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-lg)]">
            <img
              src={whyImage}
              alt="Engineer patching fibre optic cables inside a data center rack"
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
                  "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 20%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--tl-bg) 55%, transparent) 100%)",
              }}
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] px-3 py-2 text-small font-medium text-foreground backdrop-blur-[12px]">
              <ShieldCheck size={14} aria-hidden="true" className="text-primary" />
              Vetted on-site engineers
            </span>
          </div>
        </div>

        {/* Right: copy + cards */}
        <div>
          <MonoLabel>Why TelicomLink</MonoLabel>
          <SectionHeading>The hands and expertise inside the facility.</SectionHeading>
          <SectionLead>
            We don&apos;t own the buildings — we operate inside them, on behalf of network
            operators, hyperscalers, integrators, and enterprises with equipment they don&apos;t
            staff themselves.
          </SectionLead>

          <ul className="mt-6 flex list-none flex-col gap-3 p-0">
            {DIFFERENTIATORS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-small text-muted-foreground">
                <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul ref={cardsRef} className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {WHY_CARDS.map((c) => (
              <li
                key={c.title}
                data-reveal
                className="tl-reveal rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]"
              >
                <c.icon size={18} aria-hidden="true" className="text-primary" />
                <h3 className="mt-3 text-body font-bold text-foreground">{c.title}</h3>
                <p className="mt-1 text-small text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ButtonLink to="/why-us" variant="outline" arrow>
              More about our approach
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Interactive process ─────────────────────────────────────────────────── */
function ProcessSection() {
  const [active, setActive] = useState(0);
  const step = PROCESS_STEPS[active]!;

  return (
    <Section>
      <MonoLabel>How it works</MonoLabel>
      <SectionHeading>From survey to steady-state operation.</SectionHeading>
      <SectionLead>Four steps, one team, no handoffs between vendors.</SectionLead>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Step selector */}
        <ol className="flex list-none flex-col gap-2 p-0">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.step}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`group flex w-full cursor-pointer items-center gap-4 rounded-[var(--tl-r-lg)] border px-6 py-4 text-left transition-colors duration-[var(--tl-dur)] ${
                  active === i
                    ? "border-primary bg-[color-mix(in_srgb,var(--tl-accent)_8%,var(--tl-surface))]"
                    : "border-border bg-surface hover:border-border hover:bg-surface-raised"
                }`}
              >
                <span
                  className={`tl-figure shrink-0 text-figure transition-colors duration-[var(--tl-dur)] ${
                    active === i ? "text-primary" : "text-muted-foreground opacity-40"
                  }`}
                >
                  {s.step}
                </span>
                <span className="flex-1">
                  <span className={`block text-body font-bold transition-colors duration-[var(--tl-dur)] ${active === i ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.title}
                  </span>
                </span>
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                  className={`shrink-0 transition-colors duration-[var(--tl-dur)] ${
                    active === i ? "text-primary" : "text-border group-hover:text-muted-foreground"
                  }`}
                />
              </button>
            </li>
          ))}
        </ol>

        {/* Active step detail */}
        <div className="flex flex-col justify-center rounded-[var(--tl-r-lg)] border border-border bg-surface p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
          <span className="tl-figure text-figure text-primary opacity-30">{step.step}</span>
          <h3 className="mt-4 text-h2 font-bold text-foreground">{step.title}</h3>
          <p className="mt-4 text-body-lg text-muted-foreground">{step.body}</p>
          <div className="mt-8 h-px w-full bg-border" />
          <p className="mt-6 text-small text-muted-foreground">
            {active < PROCESS_STEPS.length - 1
              ? `Next: ${PROCESS_STEPS[active + 1]?.title}`
              : "Ongoing operations and support."}
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── Mid-page CTA strip ──────────────────────────────────────────────────── */
function MidCta() {
  return (
    <Section variant="deep" bleed>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <MonoLabel>24/7 dispatch</MonoLabel>
            <h2 className="mt-4 max-w-[28ch] text-h2 font-bold text-balance text-foreground">
              Need an engineer on site today?
            </h2>
            <p className="mt-4 max-w-[60ch] text-body text-muted-foreground">
              Emergency remote hands, rack &amp; stack, or a same-day site survey — tell us the
              facility and we&apos;ll confirm availability and lead time.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <ButtonLink to="/contact" glow arrow>
              Talk to an engineer
            </ButtonLink>
            <a
              href={`tel:${CONTACT.phoneEuropeHref.replace("tel:", "")}`}
              className="inline-flex min-h-[var(--tl-control-h)] items-center justify-center gap-2 rounded-[var(--tl-r-md)] border border-border bg-transparent px-[28px] text-body font-semibold text-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:border-primary hover:text-[color:var(--tl-accent-text)]"
            >
              {CONTACT.phoneEurope}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Industries ──────────────────────────────────────────────────────────── */
function IndustriesSection() {
  const ref = useReveal<HTMLUListElement>();
  return (
    <Section variant="surface">
      <MonoLabel>Who we work with</MonoLabel>
      <SectionHeading>Built for the people who own the equipment.</SectionHeading>
      <SectionLead>
        We work for whoever has infrastructure inside a facility they don&apos;t staff themselves.
      </SectionLead>
      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2">
        {INDUSTRIES.map((ind) => (
          <li
            key={ind.name}
            data-reveal
            className="tl-reveal group relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border bg-background p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40"
          >
            {/* Subtle accent corner */}
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 h-24 w-24 rounded-bl-[var(--tl-r-lg)] opacity-0 transition-opacity duration-[var(--tl-dur)] group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at top right, color-mix(in srgb, var(--tl-accent) 10%, transparent), transparent 70%)",
              }}
            />
            <h3 className="text-h3 font-bold text-foreground">{ind.name}</h3>
            <p className="mt-2 text-small text-muted-foreground">{ind.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─── Page nav ────────────────────────────────────────────────────────────── */
const PAGE_LINKS = [
  { to: "/services/", label: "Services", num: "01", body: "All nine services with inclusions, kit, and response times." },
  { to: "/why-us", label: "Why us", num: "02", body: "Numbers, industries, four-step runbook, and straight answers." },
  { to: "/coverage", label: "Coverage", num: "03", body: "Paris and Andhra Pradesh bases, nine facility hubs." },
  { to: "/contact", label: "Contact", num: "04", body: "Direct 24/7 numbers and a form that reaches an engineer." },
] as const;

function PageNav() {
  const ref = useReveal<HTMLUListElement>();
  return (
    <Section>
      <MonoLabel>Explore</MonoLabel>
      <SectionHeading>Everything you need to know.</SectionHeading>
      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {PAGE_LINKS.map((page) => (
          <li key={page.to} data-reveal className="tl-reveal">
            <Link
              to={page.to}
              className="group flex h-full flex-col rounded-[var(--tl-r-lg)] border border-border bg-surface p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-[background-color,transform] duration-[var(--tl-dur)] hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-raised"
            >
              <span className="tl-figure text-small text-muted-foreground opacity-40">{page.num}</span>
              <span className="mt-3 text-h3 font-bold text-foreground">{page.label}</span>
              <span className="mt-2 flex-1 text-small text-muted-foreground">{page.body}</span>
              <span className="tl-arrow mt-6 inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
                Open
                <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Services
        limit={6}
        variant="surface"
        eyebrow="What we do"
        heading="One team inside the facility — deploy, test, operate, retire."
        intro="A snapshot of what we handle day to day. The full nine services, with inclusions and response times, live on the services page."
      />
      <Capabilities variant="default" />
      <WhySection />
      <ProcessSection />
      <MidCta />
      <Coverage />
      <IndustriesSection />
      <Faq variant="surface" />
      <PageNav />
    </SiteLayout>
  );
}
