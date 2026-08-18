import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Coverage } from "@/components/site/WhyCoverageProcess";
import { CoverageMap } from "@/components/site/CoverageMap";
import { Section, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { FACILITIES, CONTACT, type Facility } from "@/lib/site-data";
import coverageHero from "@/assets/hero-coverage.webp";
import { PageSeo } from "@/components/site/PageSeo";

export const Route = createFileRoute("/coverage")({ component: CoveragePage });

const BASES = [
  {
    regionKey: "Europe" as const,
    base: CONTACT.europeBase,
    href: CONTACT.phoneEuropeHref,
    mapCenter: [6, 49] as [number, number],
    mapZoom: 5,
  },
  {
    regionKey: "APAC" as const,
    base: CONTACT.apacBase,
    href: CONTACT.phoneApacHref,
    mapCenter: [88, 10] as [number, number],
    mapZoom: 3.4,
  },
];

const STATUS_LABEL: Record<Facility["status"], string> = {
  available: "Available",
  full: "Full",
  "sold-out": "Sold out",
};

function StatusBadge({ facility }: { facility: Facility }) {
  const isAvailable = facility.status === "available";
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border px-3 py-2 tl-mono ${
        isAvailable
          ? "border-[color:var(--tl-live-a30)] bg-[color:var(--tl-live-a12)] text-[color:var(--tl-live)]"
          : facility.status === "full"
            ? "border-border bg-surface text-muted-foreground"
            : "border-border bg-surface text-muted-foreground opacity-70"
      }`}>
        {isAvailable && (
          <span className="relative flex h-2 w-2">
            {facility.live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tl-live)] opacity-75" />}
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
      {facility.statusNote && <span className="tl-mono text-label text-muted-foreground">{facility.statusNote}</span>}
    </div>
  );
}

function RegionsOverview() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();

  const REGION_LABELS: Record<string, { label: string; body: string }> = {
    Europe: {
      label: t("coverage.eyebrow") === "Couverture" ? "Opérations Europe" : "Europe Operations",
      body: t("coverage.eyebrow") === "Couverture"
        ? "Déploiement dans toute l'Europe depuis notre base parisienne — y compris les travaux de passerelle sous-marine à Marseille."
        : "Dispatch to any country in Europe from our Paris base — including subsea gateway work in Marseille.",
    },
    APAC: {
      label: t("coverage.eyebrow") === "Couverture" ? "Inde & APAC" : "India & APAC",
      body: t("coverage.eyebrow") === "Couverture"
        ? "Opérations depuis l'Andhra Pradesh, couvrant Mumbai, Bangalore, Visakhapatnam, Singapour et Jakarta."
        : "Operations run from Andhra Pradesh, covering Mumbai, Bangalore, Visakhapatnam, Singapore, and Jakarta.",
    },
  };

  return (
    <Section variant="surface">
      <MonoLabel>{t("coverage.regions")}</MonoLabel>
      <SectionHeading>{t("coverage.bookEngineer")}</SectionHeading>
      <SectionLead>{t("coverage.availableSites")}</SectionLead>

      <div ref={ref} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {BASES.map((region) => {
          const available = FACILITIES.filter((f) => f.region === region.regionKey && f.status === "available");
          const info = REGION_LABELS[region.regionKey];
          return (
            <div key={region.regionKey} data-reveal className="tl-reveal flex flex-col rounded-[var(--tl-r-lg)] border border-border bg-background p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
              <p className="inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
                <Globe2 size={13} aria-hidden="true" /> {info.label}
              </p>
              <h2 className="mt-2 text-h3 font-bold text-foreground">{region.base}</h2>
              <p className="mt-3 text-small text-muted-foreground">{info.body}</p>
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
                  <Phone size={13} aria-hidden="true" /> {t("contact.callNow")}
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

function DispatchModel() {
  const { t } = useTranslation();
  const steps = [
    { num: "01", title: t("coverage.step1Title"), body: t("coverage.step1Body") },
    { num: "02", title: t("coverage.step2Title"), body: t("coverage.step2Body") },
    { num: "03", title: t("coverage.step3Title"), body: t("coverage.step3Body") },
    { num: "04", title: t("coverage.step4Title"), body: t("coverage.step4Body") },
  ];
  const ref = useReveal<HTMLOListElement>();

  return (
    <Section variant="surface">
      <MonoLabel>{t("coverage.howDispatch")}</MonoLabel>
      <SectionHeading>{t("coverage.fromCall")}</SectionHeading>
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
        <ButtonLink to="/contact" arrow>{t("coverage.requestDispatch")}</ButtonLink>
      </div>
    </Section>
  );
}

function CoveragePage() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <PageSeo
        title="Coverage — Data Center Locations Europe & APAC | TelicomLink"
        description="TelicomLink operates across Paris, Marseille, Frankfurt, Amsterdam, Mumbai, Bangalore, Visakhapatnam, Singapore and Jakarta. 24/7 dispatch coverage."
        canonical="https://telicomlink.com/coverage"
      />
      <PageHero
        eyebrow={t("coverage.eyebrow")}
        title={t("coverage.title")}
        lead={t("coverage.lead")}
        image={coverageHero}
        imageAlt="Aerial view of a data center campus at dusk with a city skyline behind it"
      />
      <RegionsOverview />
      <Coverage />
      <DispatchModel />
    </SiteLayout>
  );
}
