import { createFileRoute } from "@tanstack/react-router";
import { Clock, Linkedin, Mail, Phone, MessageCircle, Zap, Shield, Users, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Contact } from "@/components/site/Contact";
import { Section, Container, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { useReveal } from "@/components/site/Reveal";
import { ButtonAnchor } from "@/components/site/Button";
import { CONTACT, HOURS } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({ component: ContactPage });

const PROMISES = [
  { icon: Zap, title: "Engineer answers", body: "Every call and email goes to a qualified engineer — not a call centre." },
  { icon: Clock, title: "24/7 emergency", body: "Remote hands and emergency support around the clock, 365 days a year." },
  { icon: Shield, title: "Straight answers", body: "We'll tell you what's in scope, what isn't, and what it costs upfront." },
  { icon: Users, title: "One contact", body: "One team handles deployment, testing, and operations. No handoffs." },
];

/* ── Hero — full-width contact header ───────────────────────────────────── */
function ContactHero() {
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
              <span className="tl-mono text-[color:var(--tl-live)]">Available now — EU &amp; APAC</span>
            </div>
            <MonoLabel>Contact</MonoLabel>
            <h1 className="mt-4 max-w-[20ch] text-display font-bold text-balance text-foreground">
              Tell us the facility, the task, and the timeline.
            </h1>
            <p className="mt-6 max-w-[60ch] text-body-lg text-muted-foreground">
              An engineer answers — not a call centre. Emergency remote hands runs 24/7, 365 days a year, across Europe and APAC.
            </p>
          </div>

          {/* Quick contact cards */}
          <div className="flex flex-col gap-4 lg:min-w-[280px]">
            <div className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Phone size={16} aria-hidden="true" />
              </span>
              <div className="flex flex-1 items-center justify-between gap-4">
                <p className="tl-mono text-muted-foreground">France &amp; Europe</p>
                <a href={CONTACT.phoneEuropeHref} className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-primary px-4 py-2 tl-mono text-white no-underline transition-opacity hover:opacity-90">
                  <Phone size={13} aria-hidden="true" /> Call EU
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Phone size={16} aria-hidden="true" />
              </span>
              <div className="flex flex-1 items-center justify-between gap-4">
                <p className="tl-mono text-muted-foreground">India &amp; APAC</p>
                <a href={CONTACT.phoneApacHref} className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-primary px-4 py-2 tl-mono text-white no-underline transition-opacity hover:opacity-90">
                  <Phone size={13} aria-hidden="true" /> Call APAC
                </a>
              </div>
            </div>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Mail size={16} aria-hidden="true" />
              </span>
              <div>
                <p className="tl-mono text-muted-foreground">Email</p>
                <p className="text-body font-semibold text-foreground">{CONTACT.emailDisplay}</p>
              </div>
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-[var(--tl-r-lg)] border border-border bg-background p-6 no-underline shadow-[var(--tl-edge),var(--tl-shadow-md)] transition-colors duration-[var(--tl-dur)] hover:border-primary/40">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--tl-r-sm)] border border-border bg-surface text-primary">
                <Linkedin size={16} aria-hidden="true" />
              </span>
              <div>
                <p className="tl-mono text-muted-foreground">LinkedIn</p>
                <p className="text-body font-semibold text-foreground">@telicomlink</p>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── What to expect ──────────────────────────────────────────────────────── */
function WhatToExpect() {
  const ref = useReveal<HTMLUListElement>();
  return (
    <Section variant="surface">
      <MonoLabel>What to expect</MonoLabel>
      <SectionHeading>How we handle every enquiry.</SectionHeading>
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

/* ── Business hours ──────────────────────────────────────────────────────── */
function BusinessHours() {
  const ref = useReveal<HTMLDListElement>();
  return (
    <Section variant="surface">
      <MonoLabel>Business hours</MonoLabel>
      <SectionHeading>Support that doesn&apos;t clock off.</SectionHeading>
      <SectionLead>Emergency and remote hands runs 24/7. Everything else follows business hours across both regions.</SectionLead>

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

      {/* Bases */}
      <div className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {[
          { label: "Europe base", value: CONTACT.europeBase, phone: CONTACT.phoneEurope, href: CONTACT.phoneEuropeHref },
          { label: "APAC base", value: CONTACT.apacBase, phone: CONTACT.phoneApac, href: CONTACT.phoneApacHref },
        ].map((b) => (
          <div key={b.label} className="rounded-[var(--tl-r-lg)] border border-border bg-background p-6">
            <p className="tl-mono text-muted-foreground">{b.label}</p>
            <p className="mt-1 text-body font-semibold text-foreground">{b.value}</p>
            <a href={b.href} className="mt-3 inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-primary/40 px-4 py-2 tl-mono text-primary no-underline transition-colors hover:bg-primary/10">
              <Phone size={12} aria-hidden="true" /> Call now
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── WhatsApp strip ──────────────────────────────────────────────────────── */
function WhatsAppStrip() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[var(--tl-r-lg)] border border-border bg-surface p-8 shadow-[var(--tl-edge),var(--tl-shadow-md)] lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="tl-mono text-[color:var(--tl-accent-text)]">Prefer messaging?</p>
          <h2 className="mt-2 text-h3 font-bold text-foreground">Reach us on WhatsApp.</h2>
          <p className="mt-2 text-small text-muted-foreground">
            Message us directly — we respond during business hours and for emergencies 24/7.
          </p>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0">
            {["Faster than email for urgent tasks", "Direct line to an engineer", "Available for EU and APAC enquiries"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-small text-muted-foreground">
                <Check size={13} aria-hidden="true" className="text-primary" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <ButtonAnchor href={CONTACT.whatsapp} external variant="outline">
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp EU
          </ButtonAnchor>
          <ButtonAnchor href={CONTACT.whatsappApac} external variant="outline">
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp APAC
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
