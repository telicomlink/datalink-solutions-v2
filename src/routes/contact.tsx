import { createFileRoute } from "@tanstack/react-router";
import { Clock, Linkedin, Mail, Phone } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Contact } from "@/components/site/Contact";
import { Reveal, Eyebrow, SectionHeading } from "@/components/site/Reveal";
import { CONTACT, HOURS } from "@/lib/site-data";

const TITLE = "Contact TelicomLink — 24/7 Data Center Support, EU & APAC";
const DESCRIPTION =
  "Reach TelicomLink 24/7: +33 6 46 01 80 40 for France and Europe, +91 90141 27090 for India and APAC, or info@telicomlink.com.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout withCta={false}>
      <PageHero
        eyebrow="Contact"
        title="Tell us the facility, the task, and the timeline."
        lead="An engineer answers — not a call centre. Emergency remote hands runs 24/7, 365 days a year, across Europe and APAC."
      />

      <section className="px-6 pb-[clamp(32px,6vw,64px)]">
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Phone,
              label: "France & Europe",
              value: CONTACT.phoneEurope,
              href: CONTACT.phoneEuropeHref,
            },
            {
              icon: Phone,
              label: "India & APAC",
              value: CONTACT.phoneApac,
              href: CONTACT.phoneApacHref,
            },
            { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
            { icon: Linkedin, label: "LinkedIn", value: "@telicomlink", href: CONTACT.linkedin },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 60}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-6 no-underline backdrop-blur transition-colors hover:border-primary/60"
              >
                <item.icon size={16} className="text-primary" />
                <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {item.label}
                </span>
                <span className="mt-1 font-display text-base font-semibold text-foreground">
                  {item.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />

      <section className="bg-surface/70 px-6 py-[clamp(48px,8vw,100px)] backdrop-blur-md">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>Business hours</Eyebrow>
          <SectionHeading>Support that doesn't clock off.</SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOURS.map((h, i) => (
              <Reveal key={h.label} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
                  <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    <Clock size={13} className="text-primary" /> {h.label}
                  </p>
                  <p className="mt-2 font-display text-base font-semibold">{h.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Bases: {CONTACT.europeBase} (Europe) · {CONTACT.apacBase} (APAC).
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
