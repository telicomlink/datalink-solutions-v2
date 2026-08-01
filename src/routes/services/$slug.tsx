import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section, MonoLabel, SectionHeading, SectionLead, Container } from "@/components/site/Section";
import { ButtonLink, ButtonAnchor } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { serviceIcon } from "@/lib/service-icons";
import { SERVICE_IMAGES } from "@/components/site/Services";
import { SERVICES, SERVICE_DETAILS, CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const svc = SERVICES.find((s) => s.slug === params.slug);
    if (!svc) throw notFound();
    return svc;
  },
  component: ServicePage,
  notFoundComponent: () => (
    <SiteLayout>
      <Section>
        <MonoLabel>Not found</MonoLabel>
        <SectionHeading>Service not found.</SectionHeading>
        <div className="mt-8">
          <ButtonLink to="/services/" arrow>Back to all services</ButtonLink>
        </div>
      </Section>
    </SiteLayout>
  ),
});

function ServicePage() {
  const svc = Route.useLoaderData();
  const detail = SERVICE_DETAILS[svc.slug];
  const img = SERVICE_IMAGES[svc.slug];
  const Icon = serviceIcon(svc.icon);
  const ref = useReveal<HTMLDivElement>();

  const currentIndex = SERVICES.findIndex((s) => s.slug === svc.slug);
  const prev = currentIndex > 0 ? SERVICES[currentIndex - 1] : null;
  const next = currentIndex < SERVICES.length - 1 ? SERVICES[currentIndex + 1] : null;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pb-[var(--tl-section-y)] pt-[calc(var(--tl-header-h)+var(--tl-s-16))]">
        <Container>
          <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[55fr_45fr]">
            <div data-reveal className="tl-reveal">
              <Link
                to="/services/"
                className="tl-arrow tl-mono mb-6 inline-flex items-center gap-2 text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                All services
              </Link>
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--tl-r-md)] border border-border bg-surface text-primary">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="tl-mono text-[color:var(--tl-accent-text)]">{svc.num}</span>
              </div>
              <h1 className="max-w-[20ch] text-display font-bold text-balance text-foreground">
                {svc.name}
              </h1>
              <p className="mt-6 max-w-[60ch] text-body-lg text-muted-foreground">
                {detail?.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink to="/contact" arrow glow>
                  Scope this service
                </ButtonLink>
                <ButtonAnchor href={CONTACT.phoneEuropeHref} variant="outline">
                  Call Europe
                </ButtonAnchor>
              </div>
            </div>

            {img && (
              <div
                data-reveal
                className="tl-reveal relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-md)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={900}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 20%, transparent) 0%, transparent 45%, color-mix(in srgb, var(--tl-bg) 55%, transparent) 100%)",
                  }}
                />
                {/* SLA badge */}
                {detail && (
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] px-3 py-2 tl-mono text-foreground backdrop-blur-[12px]">
                    <Clock size={13} aria-hidden="true" className="text-primary" />
                    {detail.sla}
                  </span>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* What's included */}
      {detail && (
        <Section variant="surface">
          <MonoLabel>What&apos;s included</MonoLabel>
          <SectionHeading>Everything in scope, nothing left out.</SectionHeading>
          <ul className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {detail.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check size={14} aria-hidden="true" className="text-primary" />
                </span>
                <span className="text-body text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* SLA + contact strip */}
      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-[var(--tl-r-lg)] border border-border bg-surface p-6">
            <p className="tl-mono text-[color:var(--tl-accent-text)]">SLA</p>
            <p className="mt-2 text-h3 font-bold text-foreground">{detail?.sla}</p>
          </div>
          <div className="rounded-[var(--tl-r-lg)] border border-border bg-surface p-6">
            <p className="tl-mono text-[color:var(--tl-accent-text)]">Europe</p>
            <p className="mt-2 text-body font-semibold text-foreground">{CONTACT.europeBase}</p>
            <a
              href={CONTACT.phoneEuropeHref}
              className="mt-1 block text-small text-muted-foreground no-underline hover:text-foreground"
            >
              {CONTACT.phoneEurope}
            </a>
          </div>
          <div className="rounded-[var(--tl-r-lg)] border border-border bg-surface p-6">
            <p className="tl-mono text-[color:var(--tl-accent-text)]">India &amp; APAC</p>
            <p className="mt-2 text-body font-semibold text-foreground">{CONTACT.apacBase}</p>
            <a
              href={CONTACT.phoneApacHref}
              className="mt-1 block text-small text-muted-foreground no-underline hover:text-foreground"
            >
              {CONTACT.phoneApac}
            </a>
          </div>
        </div>
      </Section>

      {/* Prev / Next navigation */}
      <Section variant="surface">
        <MonoLabel>Other services</MonoLabel>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/services/$slug"
              params={{ slug: prev.slug }}
              className="group flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors hover:border-primary/40"
            >
              <ArrowLeft size={18} aria-hidden="true" className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="tl-mono text-muted-foreground">Previous</p>
                <p className="mt-1 text-body font-semibold text-foreground">{prev.name}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to="/services/$slug"
              params={{ slug: next.slug }}
              className="group flex items-center justify-end gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors hover:border-primary/40 sm:text-right"
            >
              <div>
                <p className="tl-mono text-muted-foreground">Next</p>
                <p className="mt-1 text-body font-semibold text-foreground">{next.name}</p>
              </div>
              <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </div>
        <div className="mt-8">
          <ButtonLink to="/services/" variant="outline" arrow>
            View all services
          </ButtonLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
