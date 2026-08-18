import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft, ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section, MonoLabel, SectionHeading, SectionLead, Container } from "@/components/site/Section";
import { ButtonLink, ButtonAnchor } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { serviceIcon } from "@/lib/service-icons";
import { SERVICE_IMAGES } from "@/components/site/Services";
import { SERVICES, SERVICE_DETAILS, CONTACT, FACILITIES } from "@/lib/site-data";
import { PageSeo } from "@/components/site/PageSeo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const svc = SERVICES.find((s) => s.slug === params.slug);
    if (!svc) throw notFound();
    return svc;
  },
  component: ServicePage,
  notFoundComponent: () => {
    const { t } = useTranslation();
    return (
    <SiteLayout>
      <Section>
        <MonoLabel>{t("services.notFound")}</MonoLabel>
        <SectionHeading>{t("services.notFound")}</SectionHeading>
        <div className="mt-8">
          <ButtonLink to="/services/" arrow>{t("services.backToServices")}</ButtonLink>
        </div>
      </Section>
    </SiteLayout>
  );},
});

function ServicePage() {
  const { t } = useTranslation();
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
      <PageSeo
        title={`${svc.name} — Data Center Services | TelicomLink`}
        description={detail?.intro.slice(0, 155) ?? svc.descriptor}
        canonical={`https://telicomlink.com/services/${svc.slug}`}
      />
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
                {t("services.allServices")}
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
                <ButtonLink to="/contact" arrow glow>{t("services.scopeService")}</ButtonLink>
                <ButtonAnchor href={CONTACT.phoneEuropeHref} variant="outline">{t("services.callEurope")}</ButtonAnchor>
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
          <MonoLabel>{t("services.whatsIncluded")}</MonoLabel>
          <SectionHeading>{t("services.everythingInScope")}</SectionHeading>
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

      {/* Colocation facilities grid */}
      {svc.slug === "colocation" && (
        <Section>
          <MonoLabel>{t("colocation.ourFacilities")}</MonoLabel>
          <SectionHeading>{t("colocation.whereRack")}</SectionHeading>
          <SectionLead>{t("colocation.carrierNeutral")}</SectionLead>

          <div className="mt-12 flex flex-col gap-16">
            {(["Europe", "APAC"] as const).map((region) => {
              const items = FACILITIES.filter((f) => f.region === region);
              const available = items.filter((f) => f.status === "available");
              const coming = items.filter((f) => f.status !== "available");
              return (
                <div key={region}>
                  {/* Region header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary rounded-full" style={{ height: "20px", width: "2px" }} />
                      <h3 className="text-h3 font-bold text-foreground">
                        {region === "Europe" ? t("colocation.europeOps") : t("colocation.indiaApac")}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--tl-live-a30)] bg-[color:var(--tl-live-a12)] px-3 py-1 tl-mono text-xs text-[color:var(--tl-live)]">
                      <span className="relative flex" style={{ height: "6px", width: "6px" }}>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tl-live)] opacity-75" />
                        <span className="relative inline-flex rounded-full bg-[color:var(--tl-live)]" style={{ height: "6px", width: "6px" }} />
                      </span>
                      {available.length} {t("colocation.live")}
                    </span>
                  </div>

                  {/* Active sites — row list */}
                  <div className="flex flex-col divide-y divide-border rounded-xl border border-border overflow-hidden">
                    {available.map((f, i) => (
                      <div key={f.city} className="flex items-center justify-between gap-6 px-6 py-4 bg-background hover:bg-surface transition-colors duration-200">
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="tl-mono text-xs text-muted-foreground/50" style={{ width: "20px" }}>{String(i + 1).padStart(2, "0")}</span>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground">{f.city}</p>
                            <p className="tl-mono text-label uppercase tracking-wider text-muted-foreground">{f.country}</p>
                          </div>
                        </div>
                        <p className="hidden sm:block flex-1 text-sm text-muted-foreground px-4 truncate">{f.note}</p>
                        <div className="flex items-center gap-3 shrink-0">
                          {f.sla && (
                            <span className="hidden md:inline-flex items-center tl-mono text-label text-primary" style={{ gap: "6px" }}>
                              <Clock size={11} className="text-primary" />
                              {f.sla}
                            </span>
                          )}
                          <span className="inline-flex items-center rounded-full border border-[color:var(--tl-live-a30)] bg-[color:var(--tl-live-a12)] tl-mono text-label text-[color:var(--tl-live)]" style={{ gap: "6px", padding: "4px 10px" }}>
                            {f.live && (
                              <span className="relative flex" style={{ height: "6px", width: "6px" }}>
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tl-live)] opacity-75" />
                                <span className="relative inline-flex rounded-full bg-[color:var(--tl-live)]" style={{ height: "6px", width: "6px" }} />
                              </span>
                            )}
                            Live
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expanding soon */}
                  {coming.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="tl-mono text-label text-muted-foreground/50">{t("colocation.expandingSoon")}</span>
                      <span className="text-border">—</span>
                      {coming.map((f) => (
                        <span key={f.city} className="tl-mono text-label text-muted-foreground/50">{f.city}</span>
                      )).reduce((acc: React.ReactNode[], el, i) => i === 0 ? [el] : [...acc, <span key={`dot-${i}`} className="text-border/50">·</span>, el], [])}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="relative [margin-top:3.5rem] overflow-hidden rounded-2xl border border-primary/20 bg-surface p-8 md:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 [height:18rem] [width:18rem] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)" }} />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="tl-mono text-xs uppercase tracking-widest text-[color:var(--tl-accent-text)]">{t("colocation.needDifferent")}</p>
                <h3 className="mt-2 text-h3 font-bold text-foreground">{t("colocation.mobilise")}</h3>
                <p className="mt-2 max-w-[48ch] text-sm text-muted-foreground">{t("colocation.mobiliseBody")}</p>
              </div>
              <ButtonLink to="/contact" arrow className="shrink-0">{t("colocation.checkCoverage")}</ButtonLink>
            </div>
          </div>
        </Section>
      )}

      {/* SLA + contact strip */}
      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-[var(--tl-r-lg)] border border-border bg-surface p-6">
            <p className="tl-mono text-[color:var(--tl-accent-text)]">{t("services.sla")}</p>
            <p className="mt-2 text-h3 font-bold text-foreground">{detail?.sla}</p>
          </div>
          <div className="rounded-[var(--tl-r-lg)] border border-border bg-surface p-6">
            <p className="tl-mono text-[color:var(--tl-accent-text)]">Europe</p>
            <p className="mt-2 text-body font-semibold text-foreground">{CONTACT.europeBase}</p>
            <a href={CONTACT.phoneEuropeHref} className="mt-3 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-primary px-4 py-2 tl-mono text-white no-underline transition-opacity hover:opacity-90">
              <Phone size={13} aria-hidden="true" /> {t("contact.callEu")}
            </a>
          </div>
          <div className="rounded-[var(--tl-r-lg)] border border-border bg-surface p-6">
            <p className="tl-mono text-[color:var(--tl-accent-text)]">India &amp; APAC</p>
            <p className="mt-2 text-body font-semibold text-foreground">{CONTACT.apacBase}</p>
            <a href={CONTACT.phoneApacHref} className="mt-3 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-primary px-4 py-2 tl-mono text-white no-underline transition-opacity hover:opacity-90">
              <Phone size={13} aria-hidden="true" /> {t("contact.callApac")}
            </a>
          </div>
        </div>
      </Section>

      {/* Prev / Next navigation */}
      <Section variant="surface">
        <MonoLabel>{t("services.otherServices")}</MonoLabel>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/services/$slug"
              params={{ slug: prev.slug }}
              className="group flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors hover:border-primary/40"
            >
              <ArrowLeft size={18} aria-hidden="true" className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="tl-mono text-muted-foreground">{t("services.previous")}</p>
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
                <p className="tl-mono text-muted-foreground">{t("services.next")}</p>
                <p className="mt-1 text-body font-semibold text-foreground">{next.name}</p>
              </div>
              <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </div>
        <div className="mt-8">
          <ButtonLink to="/services/" variant="outline" arrow>{t("services.viewAllServices")}</ButtonLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
