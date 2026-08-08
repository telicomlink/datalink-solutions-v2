import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Phone, Mail, Clock } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Coverage } from "@/components/site/WhyCoverageProcess";
import { CoverageMap } from "@/components/site/CoverageMap";
import { Section, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { FACILITIES, CONTACT, type Facility } from "@/lib/site-data";
import coverageHero from "@/assets/hero-coverage.webp";

export const Route = createFileRoute("/coverage")({ component: CoveragePage });

const BASES = [
  {
    region: "Europe Operations",
    regionKey: "Europe" as const,
    base: CONTACT.europeBase,
    phone: CONTACT.phoneEurope,
    href: CONTACT.phoneEuropeHref,
    body: "Dispatch to any country in Europe from our Paris base — including subsea gateway work in Marseille.",
    mapCenter: [6, 49] as [number, number],
    mapZoom: 5,
  },
  {
    region: "India & APAC",
    regionKey: "APAC" as const,
    base: CONTACT.apacBase,
    phone: CONTACT.phoneApac,
    href: CONTACT.phoneApacHref,
    body: "Operations run from Andhra Pradesh, covering Mumbai, Bangalore, Visakhapatnam, Singapore, and Jakarta.",
    mapCenter: [88, 10] as [number, number],
    mapZoom: 3.4,
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
            ? "border-[color:var(--tl-live-a30)] bg-[color:var(--tl-live-a12)] text-[color:var(--tl-live)]"
            : facility.status === "full"
              ? "border-border bg-surface text-muted-foreground"
              : "border-border bg-surface text-muted-foreground opacity-70"
        }`}
      >
        {isAvailable && (
          <span className="relative flex h-2 w-2">
            {facility.live && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tl-live)] opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--tl-live)]" />
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

/* ── Regions, side by side ───────────────────────────────────────────────── */
function RegionsOverview() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section variant="surface">
      <MonoLabel>Regions</MonoLabel>
      <SectionHeading>Book your engineer in less than 1 min.</SectionHeading>
      <SectionLead>Available sites today, by region — dispatch base, direct contact, and the map to prove it.</SectionLead>

      <div ref={ref} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {BASES.map((region) => {
          const available = FACILITIES.filter((f) => f.region === region.regionKey && f.status === "available");

          return (
            <div
              key={region.region}
              data-reveal
              className="tl-reveal flex flex-col rounded-[var(--tl-r-lg)] border border-border bg-background p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]"
            >
              <p className="inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
                <Globe2 size={13} aria-hidden="true" /> {region.region}
              </p>
              <h2 className="mt-2 text-h3 font-bold text-foreground">{region.base}</h2>
              <p className="mt-3 text-small text-muted-foreground">{region.body}</p>

              <div className="mt-6 aspect-[5/4] w-full">
                <CoverageMap facilities={available} center={region.mapCenter} zoom={region.mapZoom} />
              </div>

              <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
                {available.map((f) => (
                  <li key={f.city}>
                    <span className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-[color:var(--tl-live-a30)] bg-[color:var(--tl-live-a12)] px-3 py-2 tl-mono text-[color:var(--tl-live)]">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--tl-live)]" aria-hidden="true" />
                      {f.city}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                <a href={region.href} className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-primary px-4 py-2 tl-mono text-sm text-white no-underline transition-opacity hover:opacity-90">
                  <Phone size={13} aria-hidden="true" /> Call now
                </a>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:text-foreground">
                  <Mail size={14} aria-hidden="true" /> {CONTACT.emailDisplay}
                </a>
              </div>
            </div>
          );
        })}
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
      <RegionsOverview />
      <Coverage />
      <DispatchModel />
    </SiteLayout>
  );
}
