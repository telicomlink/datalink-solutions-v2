import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, Clock, Globe2, Zap, Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { WhyUs, Process } from "@/components/site/WhyCoverageProcess";
import { Faq } from "@/components/site/FaqFooter";
import { Section, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { WHY_STATS, INDUSTRIES } from "@/lib/site-data";
import whyHero from "@/assets/hero-why.webp";

export const Route = createFileRoute("/why-us")({ component: WhyUsPage });

function Stats() {
  const ref = useReveal<HTMLDListElement>();
  return (
    <Section>
      <MonoLabel>By the numbers</MonoLabel>
      <dl ref={ref} className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0">
        {WHY_STATS.map((stat) => (
          <div key={stat.label} data-reveal className="tl-reveal py-8 md:px-8 md:first:pl-0 md:last:pr-0">
            <dd className="tl-figure text-display font-bold leading-none text-primary">{stat.value}</dd>
            <dt className="mt-3 text-small text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Credentials() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLUListElement>();

  const CREDENTIALS = [
    { icon: Clock,  label: t("whyUs.credential1Label"), body: t("whyUs.credential1Body") },
    { icon: Zap,    label: t("whyUs.credential2Label"), body: t("whyUs.credential2Body") },
    { icon: Globe2, label: t("whyUs.credential3Label"), body: t("whyUs.credential3Body") },
    { icon: Award,  label: t("whyUs.credential4Label"), body: t("whyUs.credential4Body") },
  ];

  return (
    <Section variant="surface">
      <MonoLabel>{t("whyUs.setsApart")}</MonoLabel>
      <SectionHeading>{t("whyUs.builtDifferently")}</SectionHeading>
      <SectionLead>{t("whyUs.builtDifferentlyLead")}</SectionLead>
      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIALS.map((c) => (
          <li key={c.label} data-reveal className="tl-reveal group rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
              <c.icon size={16} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-h3 font-bold text-foreground">{c.label}</h3>
            <p className="mt-2 text-small text-muted-foreground">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Comparison() {
  const { t } = useTranslation();

  const COMPARISON = [
    { feature: t("whyUs.comp1"), us: true, them: false },
    { feature: t("whyUs.comp2"), us: true, them: false },
    { feature: t("whyUs.comp3"), us: true, them: false },
    { feature: t("whyUs.comp4"), us: true, them: false },
    { feature: t("whyUs.comp5"), us: true, them: false },
    { feature: t("whyUs.comp6"), us: true, them: false },
    { feature: t("whyUs.comp7"), us: true, them: false },
  ];

  return (
    <Section>
      <MonoLabel>{t("whyUs.howCompare")}</MonoLabel>
      <SectionHeading>{t("whyUs.vsTitle")}</SectionHeading>
      <SectionLead>{t("whyUs.vsLead")}</SectionLead>
      <div className="mt-12 overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-md)]">
        <div className="grid grid-cols-[1fr_auto_auto] border-b border-border bg-surface px-6 py-4">
          <span className="tl-mono text-muted-foreground">{t("whyUs.capability")}</span>
          <span className="w-32 text-center tl-mono text-[color:var(--tl-accent-text)]">TelicomLink</span>
          <span className="w-32 text-center tl-mono text-muted-foreground">{t("whyUs.typicalVendor")}</span>
        </div>
        {COMPARISON.map((row, i) => (
          <div key={row.feature} className={`grid grid-cols-[1fr_auto_auto] items-center px-6 py-4 ${i < COMPARISON.length - 1 ? "border-b border-border" : ""} ${i % 2 === 0 ? "bg-background" : "bg-surface"}`}>
            <span className="text-body text-foreground">{row.feature}</span>
            <span className="flex w-32 justify-center">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <Check size={14} aria-hidden="true" className="text-primary" />
              </span>
            </span>
            <span className="flex w-32 justify-center">
              <X size={16} aria-hidden="true" className="text-muted-foreground opacity-40" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink to="/contact" arrow>{t("nav.talkToEngineer")}</ButtonLink>
      </div>
    </Section>
  );
}

function Industries() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active]!;

  return (
    <Section variant="surface">
      <MonoLabel>{t("whyUs.whoWeWork")}</MonoLabel>
      <SectionHeading>{t("whyUs.builtFor")}</SectionHeading>
      <SectionLead>{t("whyUs.builtForLead")}</SectionLead>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
        <ul className="flex list-none flex-col gap-2 p-0">
          {INDUSTRIES.map((item, i) => (
            <li key={item.name}>
              <button type="button" onClick={() => setActive(i)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-[var(--tl-r-lg)] border px-6 py-4 text-left transition-colors duration-[var(--tl-dur)] ${active === i ? "border-primary bg-[color-mix(in_srgb,var(--tl-accent)_8%,var(--tl-surface))] text-foreground" : "border-border bg-background text-muted-foreground hover:bg-surface"}`}
              >
                <span className="text-body font-semibold">{item.name}</span>
                <span className={`tl-mono text-label transition-colors duration-[var(--tl-dur)] ${active === i ? "text-[color:var(--tl-accent-text)]" : "text-border"}`}>0{i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-center rounded-[var(--tl-r-lg)] border border-border bg-background p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
          <span className="tl-mono text-[color:var(--tl-accent-text)]">0{active + 1}</span>
          <h3 className="mt-3 text-h2 font-bold text-foreground">{ind.name}</h3>
          <p className="mt-4 text-body-lg text-muted-foreground">{ind.body}</p>
          <div className="mt-8">
            <ButtonLink to="/contact" variant="outline" arrow>{t("whyUs.getInTouch")}</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CtaStrip() {
  const { t } = useTranslation();
  return (
    <Section variant="deep">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <MonoLabel>{t("whyUs.readyToStart")}</MonoLabel>
          <SectionHeading>{t("whyUs.talkToday")}</SectionHeading>
          <SectionLead>{t("cta.lead")}</SectionLead>
        </div>
        <ButtonLink to="/contact" glow arrow className="shrink-0">{t("nav.talkToEngineer")}</ButtonLink>
      </div>
    </Section>
  );
}

function WhyUsPage() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("whyUs.eyebrow")}
        title={t("whyUs.title")}
        lead={t("whyUs.lead")}
        image={whyHero}
        imageAlt="Two engineers reviewing rack and network diagrams in a night operations room"
      />
      <Stats />
      <Credentials />
      <WhyUs />
      <Comparison />
      <Industries />
      <Process />
      <Faq variant="default" />
      <CtaStrip />
    </SiteLayout>
  );
}
