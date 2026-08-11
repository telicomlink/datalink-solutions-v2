import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import fiberImage from "@/assets/fiber-testing.webp";
import imgRemoteHands from "@/assets/svc-remote-hands.webp";
import imgRackStack from "@/assets/svc-rack-stack.webp";
import imgSurvey from "@/assets/svc-survey.webp";
import imgMigration from "@/assets/svc-migration.webp";
import imgColocation from "@/assets/svc-colocation.webp";
import imgDestruction from "@/assets/svc-destruction.webp";
import imgSpares from "@/assets/svc-spares.webp";
import imgTesting from "@/assets/svc-testing.webp";
import imgCommissioning from "@/assets/svc-commissioning.webp";
import { SERVICES, CAPABILITIES } from "@/lib/site-data";
import { serviceIcon } from "@/lib/service-icons";
import { Section, MonoLabel, SectionHeading, SectionLead, Container } from "./Section";
import { useReveal } from "./Reveal";
import type { SectionVariant } from "./Section";

export const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "smart-remote-hands": {
    src: imgRemoteHands,
    alt: "Technician with a headset working at a server rack during a night shift",
  },
  "rack-and-stack": {
    src: imgRackStack,
    alt: "Engineer sliding a rackmount server into a cabinet",
  },
  "site-survey-audit": {
    src: imgSurvey,
    alt: "Engineer auditing rack assets on a tablet in a data center aisle",
  },
  "migrations-decommissioning": {
    src: imgMigration,
    alt: "Servers loaded on a transport trolley during a data center migration",
  },
  colocation: {
    src: imgColocation,
    alt: "Rows of locked colocation cabinets with status lights",
  },
  "secure-data-destruction": {
    src: imgDestruction,
    alt: "Stacked hard drives staged for certified secure destruction",
  },
  "spare-parts-management": {
    src: imgSpares,
    alt: "Labelled shelving of data center spare parts and optics",
  },
  "testing-certification": {
    src: imgTesting,
    alt: "OTDR handset connected to a fiber patch panel during testing",
  },
  "data-center-commissioning": {
    src: imgCommissioning,
    alt: "New data center hall powering on during commissioning",
  },
};

/**
 * One card = one link = one tab stop. The stretched-link pseudo-element on the
 * "Open" anchor covers the whole card, so the hit area and the focus ring
 * match what the eye sees.
 *
 * The card never scales on hover — it lifts 4px and warms its surface instead.
 */
function ServiceCard({ svc }: { svc: (typeof SERVICES)[number] }) {
  const { t } = useTranslation();
  const Icon = serviceIcon(svc.icon);
  const img = SERVICE_IMAGES[svc.slug];

  return (
    <li
      data-reveal
      className="tl-reveal group relative flex flex-col overflow-hidden rounded-[var(--tl-r-lg)] border border-border bg-surface shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-[background-color,border-color,box-shadow,transform] duration-[var(--tl-dur)] ease-tl hover:-translate-y-1 hover:border-[color:var(--tl-accent-a35)] hover:bg-surface-raised hover:shadow-[var(--tl-edge),var(--tl-shadow-lg)] focus-within:-translate-y-1 focus-within:border-[color:var(--tl-accent-a35)]"
    >
      <div className="relative aspect-video overflow-hidden">
        {img && (
          <img
            src={img.src}
            alt={img.alt}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
        {/* Identical treatment on all six: flat darkening + bottom scrim, so
            photos of different brightness read as one set. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 40%, transparent) 0%, color-mix(in srgb, var(--tl-bg) 45%, transparent) 55%, var(--tl-surface) 100%)",
          }}
        />
        <span className="absolute left-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] text-primary backdrop-blur-[12px]">
          <Icon size={16} aria-hidden="true" />
        </span>
        {/* Ordering only — the service name carries the meaning. */}
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 tl-figure text-label text-muted-foreground opacity-40"
        >
          {svc.num}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="text-h3 font-bold text-foreground">{svc.name}</h3>
        <p className="mt-2 flex-1 text-small text-muted-foreground">{svc.descriptor}</p>
        <Link
          to="/services/$slug"
          params={{ slug: svc.slug }}
          className="tl-stretch tl-arrow tl-mono mt-6 inline-flex items-center gap-2 text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl group-hover:text-foreground"
        >
          {t("services.open")}
          <ArrowRight size={14} aria-hidden="true" />
          <span className="sr-only">— {svc.name}</span>
        </Link>
      </div>
    </li>
  );
}

export function Services({
  limit,
  eyebrow = "What we do",
  heading = "Nine services, one team, from deployment to decommissioning.",
  intro,
  variant = "default",
}: {
  limit?: number;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  variant?: SectionVariant;
} = {}) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;
  const ref = useReveal<HTMLUListElement>();

  return (
    <Section id="services" variant={variant}>
      <MonoLabel>{eyebrow}</MonoLabel>
      <SectionHeading className="max-w-[24ch]">{heading}</SectionHeading>
      {intro && <SectionLead>{intro}</SectionLead>}

      <ul
        ref={ref}
        className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((svc) => (
          <ServiceCard key={svc.slug} svc={svc} />
        ))}
      </ul>
    </Section>
  );
}

/**
 * Testing & Certification — the capability most remote-hands vendors do not
 * carry, and the strongest thing a buyer can read on the home page. This
 * replaces what used to be a second copy of the navigation.
 */
export function Capabilities({ variant = "surface" }: { variant?: SectionVariant } = {}) {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDListElement>();

  return (
    <Section variant={variant} bleed>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr]">
          <div className="relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-md)]">
            <img
              src={fiberImage}
              alt="Fiber optic patch panel under test with an OTDR handset"
              width={1200}
              height={912}
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
            <span className="absolute bottom-4 left-4 inline-flex items-center rounded-[var(--tl-r-pill)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] px-3 py-2 tl-mono text-foreground backdrop-blur-[12px]">
              OTDR · 1550 nm trace
            </span>
          </div>

          <div>
            <MonoLabel>{t("services.testingLabel")}</MonoLabel>
            <SectionHeading>{t("services.testingHeading")}</SectionHeading>
            <SectionLead>{t("services.testingLead")}</SectionLead>

            <dl ref={ref} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => (
                <div key={cap.label} data-reveal className="tl-reveal border-t border-border pt-4">
                  <dt className="text-h3 font-bold text-foreground">{cap.label}</dt>
                  <dd className="mt-2 text-small text-muted-foreground">{cap.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
