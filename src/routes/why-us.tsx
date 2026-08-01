import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { WhyUs, Process } from "@/components/site/WhyCoverageProcess";
import { Faq } from "@/components/site/FaqFooter";
import { Reveal, Eyebrow, SectionHeading } from "@/components/site/Reveal";
import { MotionCard, MotionButton } from "@/components/site/Motion";
import { WHY_STATS, INDUSTRIES } from "@/lib/site-data";
import whyImage from "@/assets/why-engineer.jpg";

const TITLE = "Why TelicomLink — Data Center Engineering Partner in EU & APAC";
const DESCRIPTION =
  "One accountable team for deployment, testing, and decommissioning: 24/7 dispatch, 400G BERT and OTDR capability, and local engineers across Europe and APAC.";

export const Route = createFileRoute("/why-us")({
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
  component: WhyUsPage,
});

function WhyUsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Why us"
        title="Data center as a service, run like an engineering team."
        lead="We work inside the facility on your behalf — deploying servers and DWDM, patching, testing, and keeping it running. No handoffs between three vendors, no business-hours-only excuses."
        image={whyImage}
        imageAlt="Engineer patching fibre optic cables into a network switch"
      />

      <section className="px-6 pb-[clamp(40px,7vw,80px)]">
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70}>
              <div className="rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur">
                <p className="font-mono text-[clamp(1.6rem,3vw,2.2rem)] font-medium text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <WhyUs />

      <section className="px-6 py-[clamp(56px,10vw,120px)]">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>Who we work with</Eyebrow>
          <SectionHeading>Built for the people who own the equipment.</SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 2) * 80}>
                <MotionCard className="h-full rounded-2xl">
                  <div className="h-full rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-primary/50">
                    <h3 className="font-display text-xl font-semibold">{ind.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.body}</p>
                  </div>
                </MotionCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <Faq />

      <section className="px-6 pb-[clamp(40px,7vw,80px)]">
        <div className="mx-auto flex max-w-[1200px] justify-center">
          <MotionButton href="/contact">
            Talk to an engineer <ArrowRight size={18} />
          </MotionButton>
        </div>
      </section>
    </SiteLayout>
  );
}
