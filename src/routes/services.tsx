import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Services, Capabilities, SERVICE_IMAGES } from "@/components/site/Services";
import { Reveal, Eyebrow, SectionHeading } from "@/components/site/Reveal";
import { MotionButton } from "@/components/site/Motion";
import { SERVICES, SERVICE_DETAILS } from "@/lib/site-data";
import servicesHero from "@/assets/hero-services.jpg";

const TITLE = "Data Center Services — Remote Hands, Rack & Stack | TelicomLink";
const DESCRIPTION =
  "Nine data center services delivered 24/7 across Europe and APAC: smart hands, rack & stack, surveys, migrations, colocation, secure destruction, spares, OTDR/400G testing, and commissioning.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

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

      <Services />

      <section id="details" className="bg-surface/70 px-6 py-[clamp(56px,10vw,120px)] backdrop-blur-md">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>In detail</Eyebrow>
          <SectionHeading>What each service actually includes.</SectionHeading>

          <div className="mt-12 flex flex-col gap-14">
            {SERVICES.map((svc, i) => {
              const detail = SERVICE_DETAILS[svc.slug];
              const img = SERVICE_IMAGES[svc.slug];
              if (!detail) return null;

              return (
                <Reveal key={svc.slug}>
                  <article
                    id={svc.slug}
                    className={`grid items-center gap-8 lg:grid-cols-2 ${
                      i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                    }`}
                  >
                    <figure className="m-0 overflow-hidden rounded-3xl border border-border shadow-[0_30px_70px_-30px_rgba(0,0,0,.9)]">
                      {img && (
                        <img
                          src={img.src}
                          alt={img.alt}
                          width={800}
                          height={600}
                          loading="lazy"
                          className="aspect-16/10 w-full object-cover"
                        />
                      )}
                    </figure>
                    <div>
                      <span className="font-mono text-xs tracking-[0.08em] text-primary">
                        {svc.num}
                      </span>
                      <h3 className="mt-2 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-bold tracking-[-0.02em]">
                        {svc.name}
                      </h3>
                      <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
                        {detail.intro}
                      </p>
                      <ul className="mt-5 flex list-none flex-col gap-3 p-0">
                        {detail.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 inline-flex rounded-full border border-border bg-background/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                        {detail.sla}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <MotionButton href="/contact">
              Scope a job with an engineer <ArrowRight size={18} />
            </MotionButton>
          </div>
        </div>
      </section>

      <Capabilities />
    </SiteLayout>
  );
}
