import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight, Check, ShieldCheck, Zap, Globe2, Users,
  Clock, ChevronRight,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Services, Capabilities } from "@/components/site/Services";
import { Coverage } from "@/components/site/WhyCoverageProcess";
import { Faq } from "@/components/site/FaqFooter";
import {
  Section, Container, MonoLabel, SectionHeading, SectionLead,
} from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import {
  DIFFERENTIATORS, INDUSTRIES, PROCESS_STEPS, CONTACT,
} from "@/lib/site-data";
import whyImage from "@/assets/why-engineer.webp";
import { PageSeo, ORG_SCHEMA } from "@/components/site/PageSeo";

export const Route = createFileRoute("/")({ component: Index });

function WhySection() {
  const { t } = useTranslation();
  const cardsRef = useReveal<HTMLUListElement>();

  const WHY_CARDS = [
    { icon: Zap,    title: t("whyUs.credential2Label"), body: t("whyUs.credential2Body") },
    { icon: Clock,  title: t("whyUs.credential1Label"), body: t("whyUs.credential1Body") },
    { icon: Globe2, title: t("whyUs.credential3Label"), body: t("whyUs.credential3Body") },
    { icon: Users,  title: t("whyUs.credential4Label"), body: t("whyUs.credential4Body") },
  ];

  return (
    <Section variant="surface">
      <div className="grid items-start gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-lg)]">
            <img src={whyImage} alt="Engineer patching fibre optic cables inside a data center rack" width={1200} height={900} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 20%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--tl-bg) 55%, transparent) 100%)" }} />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-[color-mix(in_srgb,var(--tl-surface)_88%,transparent)] px-3 py-2 text-small font-medium text-foreground backdrop-blur-[12px]">
              <ShieldCheck size={14} aria-hidden="true" className="text-primary" />
              {t("whyUs.vettedEngineers")}
            </span>
          </div>
        </div>
        <div>
          <MonoLabel>{t("whyUs.whyTelicom")}</MonoLabel>
          <SectionHeading>{t("whyUs.handsExpertise")}</SectionHeading>
          <SectionLead>{t("whyUs.handsLead")}</SectionLead>
          <ul className="mt-6 flex list-none flex-col gap-3 p-0">
            {DIFFERENTIATORS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-small text-muted-foreground">
                <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <ul ref={cardsRef} className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {WHY_CARDS.map((c) => (
              <li key={c.title} data-reveal className="tl-reveal rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
                <c.icon size={18} aria-hidden="true" className="text-primary" />
                <h3 className="mt-3 text-body font-bold text-foreground">{c.title}</h3>
                <p className="mt-1 text-small text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink to="/why-us" variant="outline" arrow>{t("whyUs.moreAbout")}</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProcessSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const step = PROCESS_STEPS[active]!;

  return (
    <Section>
      <MonoLabel>{t("home.howItWorks")}</MonoLabel>
      <SectionHeading>{t("home.fromSurvey")}</SectionHeading>
      <SectionLead>{t("home.fourStages")}</SectionLead>
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
        <ol className="flex list-none flex-col gap-2 p-0">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.step}>
              <button type="button" onClick={() => setActive(i)}
                className={`group flex w-full cursor-pointer items-center gap-4 rounded-[var(--tl-r-lg)] border px-6 py-4 text-left transition-colors duration-[var(--tl-dur)] ${active === i ? "border-primary bg-[color-mix(in_srgb,var(--tl-accent)_8%,var(--tl-surface))]" : "border-border bg-surface hover:border-border hover:bg-surface-raised"}`}
              >
                <span className={`tl-figure shrink-0 text-figure transition-colors duration-[var(--tl-dur)] ${active === i ? "text-primary" : "text-muted-foreground opacity-40"}`}>{s.step}</span>
                <span className="flex-1">
                  <span className={`block text-body font-bold transition-colors duration-[var(--tl-dur)] ${active === i ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
                </span>
                <ChevronRight size={16} aria-hidden="true" className={`shrink-0 transition-colors duration-[var(--tl-dur)] ${active === i ? "text-primary" : "text-border group-hover:text-muted-foreground"}`} />
              </button>
            </li>
          ))}
        </ol>
        <div className="flex flex-col justify-center rounded-[var(--tl-r-lg)] border border-border bg-surface p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
          <span className="tl-figure text-figure text-primary opacity-30">{step.step}</span>
          <h3 className="mt-4 text-h2 font-bold text-foreground">{step.title}</h3>
          <p className="mt-4 text-body-lg text-muted-foreground">{step.body}</p>
          <div className="mt-8 h-px w-full bg-border" />
          <p className="mt-6 text-small text-muted-foreground">
            {active < PROCESS_STEPS.length - 1
              ? `${t("home.nextStep")} ${PROCESS_STEPS[active + 1]?.title}`
              : t("home.ongoingOps")}
          </p>
        </div>
      </div>
    </Section>
  );
}

function MidCta() {
  const { t } = useTranslation();
  return (
    <Section variant="deep" bleed>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <MonoLabel>{t("home.dispatch247")}</MonoLabel>
            <h2 className="mt-4 max-w-[28ch] text-h2 font-bold text-balance text-foreground">
              {t("home.needEngineer")}
            </h2>
            <p className="mt-4 max-w-[60ch] text-body text-muted-foreground">
              {t("home.needEngineerLead")}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <ButtonLink to="/contact" glow arrow>{t("nav.talkToEngineer")}</ButtonLink>
            <a href={CONTACT.phoneEuropeHref} className="inline-flex min-h-[var(--tl-control-h)] items-center justify-center gap-2 rounded-[var(--tl-r-md)] border border-border bg-transparent px-[28px] text-body font-semibold text-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:border-primary hover:text-[color:var(--tl-accent-text)]">
              {t("contact.callEu")}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IndustriesSection() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLUListElement>();
  return (
    <Section variant="surface">
      <MonoLabel>{t("home.whoWeWork")}</MonoLabel>
      <SectionHeading>{t("home.builtFor")}</SectionHeading>
      <SectionLead>{t("home.builtForLead")}</SectionLead>
      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2">
        {INDUSTRIES.map((ind) => (
          <li key={ind.name} data-reveal className="tl-reveal group relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border bg-background p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40">
            <div aria-hidden="true" className="absolute right-0 top-0 h-24 w-24 rounded-bl-[var(--tl-r-lg)] opacity-0 transition-opacity duration-[var(--tl-dur)] group-hover:opacity-100" style={{ background: "radial-gradient(circle at top right, color-mix(in srgb, var(--tl-accent) 10%, transparent), transparent 70%)" }} />
            <h3 className="text-h3 font-bold text-foreground">{ind.name}</h3>
            <p className="mt-2 text-small text-muted-foreground">{ind.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function PageNav() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLUListElement>();

  const PAGE_LINKS = [
    { to: "/services/", label: t("nav.services"), num: "01", body: t("home.servicesBody") },
    { to: "/why-us",    label: t("nav.whyUs"),    num: "02", body: t("home.whyUsBody") },
    { to: "/coverage",  label: t("nav.coverage"), num: "03", body: t("home.coverageBody") },
    { to: "/contact",   label: t("nav.contact"),  num: "04", body: t("home.contactBody") },
  ] as const;

  return (
    <Section>
      <MonoLabel>{t("home.explore")}</MonoLabel>
      <SectionHeading>{t("home.everythingToKnow")}</SectionHeading>
      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {PAGE_LINKS.map((page) => (
          <li key={page.to} data-reveal className="tl-reveal">
            <Link to={page.to} className="group flex h-full flex-col rounded-[var(--tl-r-lg)] border border-border bg-surface p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-[background-color,transform] duration-[var(--tl-dur)] hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-raised">
              <span className="tl-figure text-small text-muted-foreground opacity-40">{page.num}</span>
              <span className="mt-3 text-h3 font-bold text-foreground">{page.label}</span>
              <span className="mt-2 flex-1 text-small text-muted-foreground">{page.body}</span>
              <span className="tl-arrow mt-6 inline-flex items-center gap-2 tl-mono text-[color:var(--tl-accent-text)]">
                {t("home.open")} <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Index() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <PageSeo
        title="TelicomLink — Data Center Services Europe & APAC"
        description="24/7 data center deployment, remote hands, rack & stack, testing, and colocation across Europe and APAC. One team, two regions."
        canonical="https://telicomlink.com/"
        structuredData={ORG_SCHEMA}
      />
      <Hero />
      <Services
        limit={6}
        variant="surface"
        eyebrow={t("home.whatWeDo")}
        heading={t("home.oneTeam")}
        intro={t("home.oneTeamLead")}
      />
      <Capabilities variant="default" />
      <WhySection />
      <ProcessSection />
      <MidCta />
      <Coverage />
      <IndustriesSection />
      <Faq variant="surface" />
      <PageNav />
    </SiteLayout>
  );
}
