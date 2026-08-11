import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, ChevronDown, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Capabilities, SERVICE_IMAGES } from "@/components/site/Services";
import { Section, MonoLabel, SectionHeading, SectionLead, Container } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { serviceIcon } from "@/lib/service-icons";
import { SERVICES, SERVICE_DETAILS, PROJECT_STATS, FACILITIES, type Facility } from "@/lib/site-data";
import servicesHero from "@/assets/hero-services.webp";

export const Route = createFileRoute("/services/")({ component: ServicesPage });

/* ── Delivery stats ───────────────────────────────────────────────────────── */
function DeliveryStats() {
  const ref = useReveal<HTMLDListElement>();
  return (
    <Section>
      <MonoLabel>Delivered so far</MonoLabel>
      <dl
        ref={ref}
        className="mt-8 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0"
      >
        {PROJECT_STATS.map((stat) => (
          <div key={stat.label} data-reveal className="tl-reveal py-6 md:px-6 md:first:pl-0 md:last:pr-0">
            <dd className="tl-figure text-figure text-primary">{stat.value}</dd>
            <dt className="mt-2 tl-mono text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ── Service grid with "show all" toggle ─────────────────────────────────── */
function ServiceGrid() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? SERVICES : SERVICES.slice(0, 6);
  const ref = useReveal<HTMLUListElement>();

  return (
    <Section variant="surface">
      <MonoLabel>All services</MonoLabel>
      <SectionHeading>Nine services, one team.</SectionHeading>
      <SectionLead>
        From the first site survey to the final certificate of destruction — every service
        delivered by our own engineers in Europe and APAC.
      </SectionLead>

      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((svc) => {
          const Icon = serviceIcon(svc.icon);
          const img = SERVICE_IMAGES[svc.slug];
          return (
            <li key={svc.slug} data-reveal className="tl-reveal">
              <Link
                to="/services/$slug"
                params={{ slug: svc.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--tl-r-lg)] border border-border bg-background no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40"
              >
                {img && (
                  <div className="relative aspect-video overflow-hidden">
                    <img src={img.src} alt={img.alt} width={800} height={450} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[var(--tl-dur)] group-hover:scale-105" />
                    <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 30%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--tl-bg) 60%, transparent) 100%)" }} />
                    <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] text-primary backdrop-blur-sm">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="absolute right-3 top-3 tl-mono text-label text-muted-foreground opacity-50">{svc.num}</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3 font-bold text-foreground">{svc.name}</h3>
                  <p className="mt-2 flex-1 text-small text-muted-foreground">{svc.descriptor}</p>
                  <span className="tl-arrow mt-4 inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
                    View details <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {!showAll && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-[var(--tl-r-md)] border border-border bg-surface px-6 py-3 text-small font-semibold text-foreground transition-colors duration-[var(--tl-dur)] hover:border-primary/40 hover:bg-surface-raised"
          >
            Show all 9 services <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </Section>
  );
}

/* ── Sticky service nav ───────────────────────────────────────────────────── */
function ServiceNav() {
  return (
    <div className="sticky top-[var(--tl-header-h)] z-40 border-b border-border bg-[color-mix(in_srgb,var(--tl-bg)_92%,transparent)] backdrop-blur-sm">
      <Container>
        <nav aria-label="Services" className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
          {SERVICES.map((svc) => (
            <a
              key={svc.slug}
              href={`#${svc.slug}`}
              className="inline-flex shrink-0 items-center rounded-[var(--tl-r-md)] px-3 py-2 tl-mono text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:bg-surface hover:text-foreground"
            >
              {svc.name}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}

/* ── Detailed service list ────────────────────────────────────────────────── */
function Details() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section id="details">
      <MonoLabel>In detail</MonoLabel>
      <SectionHeading>What each service actually includes.</SectionHeading>
      <SectionLead>Inclusions, kit, and the SLA attached to every service.</SectionLead>

      <div ref={ref} className="mt-12 flex flex-col gap-16">
        {SERVICES.map((svc, i) => {
          const detail = SERVICE_DETAILS[svc.slug];
          const img = SERVICE_IMAGES[svc.slug];
          const Icon = serviceIcon(svc.icon);
          if (!detail) return null;

          return (
            <article
              key={svc.slug}
              id={svc.slug}
              data-reveal
              className={`tl-reveal grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}
            >
              <figure className="m-0 overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-md)]">
                {img && (
                  <img src={img.src} alt={img.alt} width={800} height={600} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
                )}
              </figure>

              <div>
                <div className="mb-4 inline-flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="tl-mono text-[color:var(--tl-accent-text)]">{svc.num}</span>
                </div>
                <h3 className="text-h2 font-bold text-foreground">{svc.name}</h3>
                <p className="mt-3 max-w-[60ch] text-body text-muted-foreground">{detail.intro}</p>

                <ul className="mt-6 flex list-none flex-col gap-3 p-0">
                  {detail.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-small text-muted-foreground">
                      <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="inline-flex rounded-[var(--tl-r-pill)] border border-border bg-surface px-3 py-2 tl-mono text-muted-foreground">
                    {detail.sla}
                  </span>
                  <Link
                    to="/services/$slug"
                    params={{ slug: svc.slug }}
                    className="tl-arrow inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)] no-underline"
                  >
                    Full details <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-16">
        <ButtonLink to="/contact" arrow>Scope a job with an engineer</ButtonLink>
      </div>
    </Section>
  );
}

/* ── Colocation Facilities ────────────────────────────────────────────────── */
const STATUS_STYLE: Record<Facility["status"], string> = {
  available: "border-[color:var(--tl-live-a30)] bg-[color:var(--tl-live-a12)] text-[color:var(--tl-live)]",
  full:      "border-border bg-surface text-muted-foreground",
  "sold-out": "border-border bg-surface text-muted-foreground opacity-60",
};
const STATUS_LABEL: Record<Facility["status"], string> = {
  available: "Available",
  full: "Full",
  "sold-out": "Coming soon",
};

function ColoFacilities() {
  const ref = useReveal<HTMLDivElement>();
  const europe = FACILITIES.filter((f) => f.region === "Europe");
  const apac   = FACILITIES.filter((f) => f.region === "APAC");

  return (
    <Section variant="surface" id="colocation-facilities">
      <MonoLabel>Colocation</MonoLabel>
      <SectionHeading>Where you can put a rack today.</SectionHeading>
      <SectionLead>Carrier-neutral facilities across Europe and APAC — with our engineers already on site.</SectionLead>

      <div ref={ref} className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {[
          { label: "Europe Operations", items: europe },
          { label: "India & APAC",      items: apac   },
        ].map((group) => (
          <div key={group.label}>
            <h3 className="mb-6 tl-mono text-[color:var(--tl-accent-text)]">{group.label}</h3>
            <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
              {group.items.map((f) => (
                <li
                  key={f.city}
                  data-reveal
                  className="tl-reveal flex flex-col rounded-[var(--tl-r-lg)] border border-border bg-background [padding:1.25rem] shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="flex items-center [gap:0.375rem] text-body font-bold text-foreground">
                        <MapPin size={13} className="shrink-0 text-primary" aria-hidden="true" />
                        {f.city}
                      </p>
                      <p className="tl-mono text-muted-foreground">{f.country}</p>
                    </div>
                    <span className={`inline-flex shrink-0 items-center [gap:0.375rem] rounded-[var(--tl-r-pill)] border [padding:0.25rem_0.625rem] tl-mono text-label ${STATUS_STYLE[f.status]}`}>
                      {f.status === "available" && f.live && (
                        <span className="relative flex [height:0.375rem] [width:0.375rem]">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tl-live)] opacity-75" />
                          <span className="relative inline-flex [height:0.375rem] [width:0.375rem] rounded-full bg-[color:var(--tl-live)]" />
                        </span>
                      )}
                      {STATUS_LABEL[f.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-small text-muted-foreground">{f.note}</p>
                  {f.sla && (
                    <p className="mt-3 inline-flex items-center [gap:0.375rem] tl-mono text-label text-muted-foreground">
                      <Clock size={11} className="text-primary" aria-hidden="true" /> {f.sla}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="[margin-top:2.5rem] rounded-[var(--tl-r-lg)] border border-border bg-background p-8">
        <p className="tl-mono text-[color:var(--tl-accent-text)]">Need a different site?</p>
        <h3 className="mt-2 text-h3 font-bold text-foreground">We mobilise into new facilities on request.</h3>
        <p className="mt-2 text-small text-muted-foreground">Tell us the address and we'll confirm coverage and lead time.</p>
        <div className="mt-6">
          <ButtonLink to="/contact" variant="outline" arrow>Check coverage for your site</ButtonLink>
        </div>
      </div>
    </Section>
  );
}

function ServicesPage() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        lead={t("services.lead")}
        image={servicesHero}
        imageAlt="Technician terminating fibre patch cords in a dense cable management panel"
      />
      <DeliveryStats />
      <ServiceGrid />
      <ServiceNav />
      <Details />
      <ColoFacilities />
      <Capabilities variant="surface" />
    </SiteLayout>
  );
}
