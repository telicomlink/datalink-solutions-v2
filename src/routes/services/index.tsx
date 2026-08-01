import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Capabilities, SERVICE_IMAGES } from "@/components/site/Services";
import { Section, MonoLabel, SectionHeading, SectionLead, Container } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { serviceIcon } from "@/lib/service-icons";
import { SERVICES, SERVICE_DETAILS } from "@/lib/site-data";
import servicesHero from "@/assets/hero-services.webp";

export const Route = createFileRoute("/services/")({ component: ServicesPage });

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

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Everything inside the rack, handled by one team."
        lead="From the first site survey to the final certificate of destruction — deployment, testing, and day-2 operations delivered by our own engineers in Europe and APAC."
        image={servicesHero}
        imageAlt="Technician terminating fibre patch cords in a dense cable management panel"
      />
      <ServiceGrid />
      <ServiceNav />
      <Details />
      <Capabilities variant="surface" />
    </SiteLayout>
  );
}
