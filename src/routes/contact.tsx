import { createFileRoute } from "@tanstack/react-router";
import { Clock, Linkedin, Mail, Phone, MessageCircle, Zap, Shield, Users, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Contact } from "@/components/site/Contact";
import { Section, Container, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { useReveal } from "@/components/site/Reveal";
import { ButtonAnchor } from "@/components/site/Button";
import { CONTACT, HOURS } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactHero() {
  const { t } = useTranslation();
  return (
    <section className="border-b border-border bg-surface pb-[var(--tl-section-y)] pt-[calc(var(--tl-header-h)+var(--tl-s-16))]">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-background px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--tl-live)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--tl-live)]" />
              </span>
              <span className="tl-mono text-[color:var(--tl-live)]">{t("contact.available")}</span>
            </div>
            <MonoLabel>{t("nav.contact")}</MonoLabel>
            <h1 className="mt-4 max-w-[20ch] text-display font-bold text-balance text-foreground">
              {t("contact.heroTitle")}
            </h1>
            <p className="mt-6 max-w-[60ch] text-body-lg text-muted-foreground">
              {t("contact.heroSubtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:min-w-[280px]">
            <div className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Phone size={16} aria-hidden="true" />
              </span>
              <div className="flex flex-1 items-center justify-between gap-4">
                <p className="tl-mono text-muted-foreground">{t("contact.franceEurope")}</p>
                <a href={CONTACT.phoneEuropeHref} className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-primary px-4 py-2 tl-mono text-white no-underline transition-opacity hover:opacity-90">
                  <Phone size={13} aria-hidden="true" /> {t("contact.callEu")}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Phone size={16} aria-hidden="true" />
              </span>
              <div className="flex flex-1 items-center justify-between gap-4">
                <p className="tl-mono text-muted-foreground">{t("contact.indiaApac")}</p>
                <a href={CONTACT.phoneApacHref} className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-primary px-4 py-2 tl-mono text-white no-underline transition-opacity hover:opacity-90">
                  <Phone size={13} aria-hidden="true" /> {t("contact.callApac")}
                </a>
              </div>
            </div>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Mail size={16} aria-hidden="true" />
              </span>
              <div>
                <p className="tl-mono text-muted-foreground">{t("contact.email")}</p>
                <p className="text-body font-semibold text-foreground">{CONTACT.emailDisplay}</p>
              </div>
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Linkedin size={16} aria-hidden="true" />
              </span>
              <div>
                <p className="tl-mono text-muted-foreground">{t("contact.linkedin")}</p>
                <p className="text-body font-semibold text-foreground">@telicomlink</p>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhatToExpect() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLUListElement>();

  const PROMISES = [
    { icon: Zap,    title: t("contact.engineerAnswers"),  body: t("contact.engineerAnswersBody") },
    { icon: Clock,  title: t("contact.emergency247"),     body: t("contact.emergency247Body") },
    { icon: Shield, title: t("contact.straightAnswers"),  body: t("contact.straightAnswersBody") },
    { icon: Users,  title: t("contact.oneContact"),       body: t("contact.oneContactBody") },
  ];

  return (
    <Section variant="surface">
      <MonoLabel>{t("contact.whatToExpect")}</MonoLabel>
      <SectionHeading>{t("contact.howWeHandle")}</SectionHeading>
      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map((p) => (
          <li key={p.title} data-reveal className="tl-reveal rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
              <p.icon size={16} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-h3 font-bold text-foreground">{p.title}</h3>
            <p className="mt-2 text-small text-muted-foreground">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function BusinessHours() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDListElement>();

  const BASES = [
    { labelKey: "contact.europeBase", value: CONTACT.europeBase, href: CONTACT.phoneEuropeHref },
    { labelKey: "contact.apacBase",   value: CONTACT.apacBase,   href: CONTACT.phoneApacHref },
  ];

  return (
    <Section variant="surface">
      <MonoLabel>{t("contact.businessHours")}</MonoLabel>
      <SectionHeading>{t("contact.supportDoesntClockOff")}</SectionHeading>
      <SectionLead>{t("contact.supportLead")}</SectionLead>

      <dl ref={ref} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOURS.map((h) => (
          <div key={h.label} data-reveal className="tl-reveal rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
            <dt className="inline-flex items-center gap-2 tl-mono text-muted-foreground">
              <Clock size={12} aria-hidden="true" className="text-primary" /> {h.label}
            </dt>
            <dd className="mt-2 text-body font-semibold text-foreground">{h.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {BASES.map((b) => (
          <div key={b.labelKey} className="rounded-[var(--tl-r-lg)] border border-border bg-background p-6">
            <p className="tl-mono text-muted-foreground">{t(b.labelKey)}</p>
            <p className="mt-1 text-body font-semibold text-foreground">{b.value}</p>
            <a href={b.href} className="mt-3 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-primary/40 px-4 py-2 tl-mono text-primary no-underline transition-colors hover:bg-primary/10">
              <Phone size={12} aria-hidden="true" /> {t("contact.callNow")}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhatsAppStrip() {
  const { t } = useTranslation();
  return (
    <Section>
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[var(--tl-r-lg)] border border-border bg-surface p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)] lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="tl-mono text-[color:var(--tl-accent-text)]">{t("contact.preferMessaging")}</p>
          <h2 className="mt-2 text-h3 font-bold text-foreground">{t("contact.whatsappTitle")}</h2>
          <p className="mt-2 text-small text-muted-foreground">{t("contact.whatsappSubtitle")}</p>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0">
            {[t("contact.whatsappBullet1"), t("contact.whatsappBullet2"), t("contact.whatsappBullet3")].map((item) => (
              <li key={item} className="flex items-center gap-2 text-small text-muted-foreground">
                <Check size={13} aria-hidden="true" className="text-primary" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <ButtonAnchor href={CONTACT.whatsapp} external variant="outline">
            <MessageCircle size={16} aria-hidden="true" /> {t("contact.whatsappEu")}
          </ButtonAnchor>
          <ButtonAnchor href={CONTACT.whatsappApac} external variant="outline">
            <MessageCircle size={16} aria-hidden="true" /> {t("contact.whatsappApac")}
          </ButtonAnchor>
        </div>
      </div>
    </Section>
  );
}

function ContactPage() {
  return (
    <SiteLayout withCta={false}>
      <ContactHero />
      <WhatToExpect />
      <Contact />
      <BusinessHours />
      <WhatsAppStrip />
    </SiteLayout>
  );
}
