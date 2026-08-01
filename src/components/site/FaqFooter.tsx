import { useState } from "react";
import { Plus, ArrowRight, Linkedin } from "lucide-react";
import { FAQS, SERVICES, CONTACT } from "@/lib/site-data";
import { Eyebrow, SectionHeading } from "./Reveal";
import { Wordmark } from "./SiteHeader";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-6 py-[clamp(56px,10vw,128px)]">
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow>FAQ</Eyebrow>
        <SectionHeading>Common questions.</SectionHeading>
        <div className="mt-10 border-t border-border">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="border-b border-border">
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left"
              >
                <span className="font-display text-lg font-semibold text-foreground">{faq.q}</span>
                <Plus
                  size={20}
                  className={`shrink-0 text-primary transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              {open === i && (
                <p className="max-w-[65ch] pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-deep px-6 py-[clamp(64px,10vw,128px)] text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 20% 50%, color-mix(in oklab, var(--primary) 10%, transparent) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 80% 50%, color-mix(in oklab, var(--primary) 7%, transparent) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto mb-6 h-px w-16 bg-primary/60" />
        <h2 className="mx-auto max-w-[640px] font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.028em]">
          Get your infrastructure moving.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-lg leading-relaxed text-muted-foreground">
          Tell us the facility, the task, and the timeline — we'll take it from there.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground no-underline transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent"
          >
            Talk to an engineer <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-deep px-6 pt-16">
      <div className="mx-auto grid max-w-[1200px] gap-8 pb-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark className="text-[19px]" />
          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
            We deploy, patch, test, and maintain your infrastructure inside the data center — across
            Europe and APAC.
          </p>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TelicomLink on LinkedIn"
            className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Linkedin size={16} />
          </a>
        </div>
        <div>
          <h3 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Services
          </h3>
          <ul className="mt-4 flex list-none flex-col gap-3 p-0">
            {SERVICES.map((svc) => (
              <li key={svc.slug} className="text-sm text-muted-foreground">
                {svc.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Company
          </h3>
          <ul className="mt-4 flex list-none flex-col gap-3 p-0">
            {[
              { href: "#why", label: "About" },
              { href: "#coverage", label: "Coverage" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground no-underline hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Contact
          </h3>
          <ul className="mt-4 flex list-none flex-col gap-3 p-0 text-sm text-muted-foreground">
            <li>Europe — {CONTACT.europeBase}</li>
            <li>APAC — {CONTACT.apacBase}</li>
            <li>
              <a href={CONTACT.phoneEuropeHref} className="text-muted-foreground no-underline hover:text-foreground">
                {CONTACT.phoneEurope}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneApacHref} className="text-muted-foreground no-underline hover:text-foreground">
                {CONTACT.phoneApac}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="text-muted-foreground no-underline hover:text-foreground">
                {CONTACT.email}
              </a>
            </li>
            <li className="pt-1 text-xs text-subtle">24/7, 365 days — support</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TelicomLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
