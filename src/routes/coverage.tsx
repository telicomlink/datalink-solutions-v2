import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Globe2, Phone, Mail, ArrowRight, Clock } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Coverage } from "@/components/site/WhyCoverageProcess";
import { Section, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { FACILITIES, CONTACT, type Facility } from "@/lib/site-data";
import coverageHero from "@/assets/hero-coverage.webp";

export const Route = createFileRoute("/coverage")({ component: CoveragePage });

const BASES = [
  {
    region: "Europe Operations",
    base: CONTACT.europeBase,
    phone: CONTACT.phoneEurope,
    href: CONTACT.phoneEuropeHref,
    body: "Dispatch to any country in Europe from our Paris base — including subsea gateway work in Marseille.",
    highlight: "Paris hub",
  },
  {
    region: "India & APAC",
    base: CONTACT.apacBase,
    phone: CONTACT.phoneApac,
    href: CONTACT.phoneApacHref,
    body: "Operations run from Andhra Pradesh, covering Mumbai, Bangalore, Visakhapatnam, Singapore, and Jakarta.",
    highlight: "Andhra Pradesh hub",
  },
];

/* ── Facility status badge ───────────────────────────────────────────────── */
const STATUS_LABEL: Record<Facility["status"], string> = {
  available: "Available",
  full: "Full",
  "sold-out": "Sold out",
};

function StatusBadge({ facility }: { facility: Facility }) {
  const isAvailable = facility.status === "available";
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border px-3 py-2 tl-mono ${
          isAvailable
            ? "border-primary/30 bg-primary/10 text-[color:var(--tl-accent-text)]"
            : facility.status === "full"
              ? "border-border bg-surface text-muted-foreground"
              : "border-border bg-surface text-muted-foreground opacity-70"
        }`}
      >
        {isAvailable && (
          <span className="relative flex h-2 w-2">
            {facility.live && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
        )}
        {STATUS_LABEL[facility.status]}
      </span>
      {facility.sla && (
        <span className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-surface px-3 py-2 tl-mono text-muted-foreground">
          <Clock size={11} aria-hidden="true" className="text-primary" />
          {facility.sla}
        </span>
      )}
      {facility.statusNote && (
        <span className="tl-mono text-label text-muted-foreground">{facility.statusNote}</span>
      )}
    </div>
  );
}

/* ── Region switcher ─────────────────────────────────────────────────────── */
function RegionSwitcher() {
  const [active, setActive] = useState(0);
  const region = BASES[active]!;
  const facilities = FACILITIES.filter((f) => f.region === (active === 0 ? "Europe" : "APAC"));

  return (
    <Section variant="surface">
      <MonoLabel>Regions</MonoLabel>
      <SectionHeading>Book your engineer in less than 1 min.</SectionHeading>
      <SectionLead>Select a region to see the dispatch base, direct contact, and facility list.</SectionLead>

      {/* Tab row */}
      <div className="mt-8 flex gap-2">
        {BASES.map((b, i) => (
          <button
            key={b.region}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-[var(--tl-r-md)] border px-6 py-3 text-body font-semibold transition-colors duration-[var(--tl-dur)] ${
              active === i
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-surface hover:text-foreground"
            }`}
          >
            {b.region}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        {/* Base card */}
        <div className="flex flex-col rounded-[var(--tl-r-lg)] border border-border bg-background p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
          <p className="inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
            <Globe2 size={13} aria-hidden="true" /> {region.region}
          </p>
          <h2 className="mt-2 text-h3 font-bold text-foreground">{region.base}</h2>
          <p className="mt-3 flex-1 text-small text-muted-foreground">{region.body}</p>

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
            <a href={region.href} className="inline-flex items-center gap-2 text-small font-semibold text-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:text-primary">
              <Phone size={14} aria-hidden="true" className="text-primary" /> {region.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:text-foreground">
              <Mail size={14} aria-hidden="true" /> {CONTACT.emailDisplay}
            </a>
          </div>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-primary/30 bg-primary/10 px-3 py-2 tl-mono text-[color:var(--tl-accent-text)]">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              {region.highlight}
            </span>
          </div>
        </div>

        {/* Facility grid */}
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {facilities.map((f) => (
            <li
              key={f.city}
              className="group rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40"
            >
              <p className="inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
                <MapPin size={12} aria-hidden="true" /> {f.region}
              </p>
              <h3 className="mt-2 text-h3 font-bold text-foreground">{f.city}</h3>
              <p className="text-small text-muted-foreground">{f.country}</p>
              <p className="mt-3 text-small text-muted-foreground">{f.note}</p>
              <StatusBadge facility={f} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ── All facilities ──────────────────────────────────────────────────────── */
function AllFacilities() {
  const ref = useReveal<HTMLUListElement>();
  const europe = FACILITIES.filter((f) => f.region === "Europe");
  const apac = FACILITIES.filter((f) => f.region === "APAC");

  return (
    <Section>
      <MonoLabel>All facilities</MonoLabel>
      <SectionHeading>Where you can put a rack today.</SectionHeading>
      <SectionLead>Carrier-neutral facilities and dispatch coverage across Europe and APAC, with more on request.</SectionLead>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {[{ label: "Europe Operations", items: europe }, { label: "India & APAC", items: apac }].map((group) => (
          <div key={group.label}>
            <h3 className="mb-6 tl-mono text-[color:var(--tl-accent-text)]">{group.label}</h3>
            <ul ref={ref} className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
              {group.items.map((f) => (
                <li
                  key={f.city}
                  data-reveal
                  className="tl-reveal rounded-[var(--tl-r-lg)] border border-border bg-surface p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40"
                >
                  <h4 className="text-body font-bold text-foreground">{f.city}</h4>
                  <p className="tl-mono text-muted-foreground">{f.country}</p>
                  <p className="mt-3 text-small text-muted-foreground">{f.note}</p>
                  <StatusBadge facility={f} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[var(--tl-r-lg)] border border-border bg-surface p-8">
        <p className="tl-mono text-[color:var(--tl-accent-text)]">Need a different site?</p>
        <h3 className="mt-2 text-h3 font-bold text-foreground">We mobilise into new facilities on request.</h3>
        <p className="mt-2 text-small text-muted-foreground">Tell us the address and we&apos;ll confirm coverage and lead time.</p>
        <div className="mt-6">
          <ButtonLink to="/contact" variant="outline" arrow>Check coverage for your site</ButtonLink>
        </div>
      </div>
    </Section>
  );
}

/* ── Dispatch model ──────────────────────────────────────────────────────── */
function DispatchModel() {
  const steps = [
    { num: "01", title: "You raise a task", body: "Call, email, or WhatsApp — we pick up 24/7 for emergencies." },
    { num: "02", title: "We confirm scope", body: "Facility, access requirements, kit needed, and lead time — agreed before dispatch." },
    { num: "03", title: "Engineer dispatched", body: "Our engineer attends the facility, executes the task, and documents everything." },
    { num: "04", title: "Closeout report", body: "Written notes, photos, and test results delivered on completion." },
  ];

  const ref = useReveal<HTMLOListElement>();

  return (
    <Section variant="surface">
      <MonoLabel>How dispatch works</MonoLabel>
      <SectionHeading>From your call to closeout report.</SectionHeading>
      <ol ref={ref} className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.num} data-reveal className="tl-reveal border-t-2 border-primary pt-6">
            <span className="tl-figure text-figure text-primary opacity-30">{s.num}</span>
            <h3 className="mt-3 text-h3 font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-small text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12">
        <ButtonLink to="/contact" arrow>Request a dispatch</ButtonLink>
      </div>
    </Section>
  );
}

function CoveragePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Coverage"
        title="Two regions, ten-plus countries, one accountable team."
        lead="Colocation space and field engineering across Europe and APAC — and dispatch into client-selected facilities we don't own, which is where most of our work happens."
        image={coverageHero}
        imageAlt="Aerial view of a data center campus at dusk with a city skyline behind it"
      />
      <RegionSwitcher />
      <Coverage />
      <DispatchModel />
      <AllFacilities />
    </SiteLayout>
  );
}
