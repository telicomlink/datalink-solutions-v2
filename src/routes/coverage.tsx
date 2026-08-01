import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Globe2 } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Coverage } from "@/components/site/WhyCoverageProcess";
import { Reveal, Eyebrow, SectionHeading } from "@/components/site/Reveal";
import { MotionCard, MotionButton } from "@/components/site/Motion";
import { FACILITIES, CONTACT } from "@/lib/site-data";
import coverageMap from "@/assets/coverage-map.jpg";

const TITLE = "Coverage — Colocation & Field Engineering in Europe and APAC";
const DESCRIPTION =
  "TelicomLink covers Paris, Marseille, Frankfurt, Amsterdam, Mumbai, Bangalore, Visakhapatnam, and Singapore, with engineers based in Paris, France and Andhra Pradesh, India.";

export const Route = createFileRoute("/coverage")({
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
  component: CoveragePage,
});

const BASES = [
  {
    region: "Europe",
    base: CONTACT.europeBase,
    phone: CONTACT.phoneEurope,
    href: CONTACT.phoneEuropeHref,
    body: "Dispatch across France, Germany, and the Netherlands from our Paris base — including subsea gateway work in Marseille.",
  },
  {
    region: "India & APAC",
    base: CONTACT.apacBase,
    phone: CONTACT.phoneApac,
    href: CONTACT.phoneApacHref,
    body: "Operations run from Andhra Pradesh, covering Mumbai, Bangalore, Visakhapatnam, and Singapore.",
  },
];

function CoveragePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Coverage"
        title="Two regions, eight facilities, one accountable team."
        lead="Colocation space and field engineering across Europe and APAC — and dispatch into client-selected facilities we don't own, which is where most of our work happens."
        image={coverageMap}
        imageAlt="Network coverage visualisation across Europe and Asia Pacific"
      />

      <section className="px-6 pb-[clamp(40px,7vw,80px)]">
        <div className="mx-auto grid max-w-[1200px] gap-5 lg:grid-cols-2">
          {BASES.map((b, i) => (
            <Reveal key={b.region} delay={i * 80}>
              <MotionCard className="h-full rounded-2xl">
                <div className="h-full rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-primary/50">
                  <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                    <Globe2 size={14} className="text-primary" /> {b.region}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold">{b.base}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                  <a
                    href={b.href}
                    className="mt-4 inline-block font-mono text-sm text-primary no-underline hover:underline"
                  >
                    {b.phone}
                  </a>
                </div>
              </MotionCard>
            </Reveal>
          ))}
        </div>
      </section>

      <Coverage />

      <section className="bg-surface/70 px-6 py-[clamp(56px,10vw,120px)] backdrop-blur-md">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>Facility list</Eyebrow>
          <SectionHeading>Where you can put a rack today.</SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.city} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl border border-border bg-background/60 p-6 backdrop-blur transition-colors hover:border-primary/50">
                  <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                    <MapPin size={13} /> {f.region}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{f.city}</h3>
                  <p className="text-xs text-subtle">{f.country}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-[70ch] text-sm text-muted-foreground">
            Need a site that isn't listed? We regularly mobilise into new facilities on request —
            tell us the address and we'll confirm coverage and lead time.
          </p>
          <div className="mt-10">
            <MotionButton href="/contact">
              Check coverage for your site <ArrowRight size={18} />
            </MotionButton>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
