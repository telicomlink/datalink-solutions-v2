import { useState } from "react";
import { Plus, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FAQS, SERVICES, CONTACT } from "@/lib/site-data";
import { Section, Container, MonoLabel, SectionHeading, SectionLead } from "./Section";
import type { SectionVariant } from "./Section";
import { ButtonLink } from "./Button";
import { useReveal } from "./Reveal";
import { Wordmark } from "./Logo";

export function Faq({ variant = "surface" }: { variant?: SectionVariant } = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" variant={variant}>
      <MonoLabel>FAQ</MonoLabel>
      <SectionHeading>Common questions.</SectionHeading>
      <div className="mt-12 border-t border-border">
        {FAQS.map((faq, i) => (
          <div key={faq.q} className="border-b border-border">
            <h3>
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-0 py-4 text-left font-display text-h3 font-semibold text-foreground"
              >
                {faq.q}
                <Plus
                  size={20}
                  aria-hidden="true"
                  className={`shrink-0 text-primary transition-transform duration-[var(--tl-dur)] ease-tl ${
                    open === i ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            {open === i && (
              <p className="max-w-[65ch] pb-4 text-body text-muted-foreground">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * Full-bleed --tl-deep band. No radial accent wash, no background glow — the
 * glow lives on the button and nowhere else.
 */
export function CtaBand() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section variant="deep" bleed>
      <Container>
        <div ref={ref} className="flex flex-col items-start">
          <div data-reveal className="tl-reveal">
            <MonoLabel>Next step</MonoLabel>
          </div>
          <div data-reveal className="tl-reveal">
            <SectionHeading>Get your infrastructure moving.</SectionHeading>
          </div>
          <div data-reveal className="tl-reveal">
            <SectionLead className="max-w-[60ch]">
              Tell us the facility, the task, and the timeline — we&apos;ll take it from there.
            </SectionLead>
          </div>
          <div data-reveal className="tl-reveal mt-8">
            <ButtonLink to="/contact" arrow>
              Talk to an engineer
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Ghost-treatment footer link: dim -> full text, arrow slides 4px. */
function FooterLink({ to, hash, params, children }: { to: string; hash?: string; params?: Record<string, string>; children: string }) {
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      {...(params ? { params } : {})}
      className="tl-arrow group inline-flex min-h-[var(--tl-control-h-sm)] items-center gap-2 text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground"
    >
      {children}
      <ArrowRight
        size={14}
        aria-hidden="true"
        className="shrink-0 opacity-0 transition-opacity duration-[var(--tl-dur)] ease-tl group-hover:opacity-100"
      />
    </Link>
  );
}

function ColumnHeading({ children }: { children: string }) {
  return <h2 className="tl-mono text-muted-foreground">{children}</h2>;
}

const COMPANY_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/why-us", label: "Why us" },
  { to: "/coverage", label: "Coverage" },
  { to: "/careers", label: "Careers" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];

export function SiteFooter() {
  return (
    <footer className="bg-deep">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark size="sm" />
            <p className="mt-4 max-w-[32ch] text-small text-muted-foreground">
              We deploy, patch, test, and maintain your infrastructure inside the data center —
              across Europe and APAC.
            </p>
            {/* LinkedIn is the only social account with a real URL, so it is
                the only icon rendered. */}
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TelicomLink on LinkedIn"
              className="mt-6 inline-flex h-[var(--tl-control-h-sm)] w-[var(--tl-control-h-sm)] items-center justify-center rounded-[var(--tl-r-md)] border border-border text-muted-foreground transition-colors duration-[var(--tl-dur)] ease-tl hover:border-primary hover:text-foreground"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Services">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-4 flex list-none flex-col p-0">
              {SERVICES.map((svc) => (
                <li key={svc.slug}>
                  <FooterLink to="/services/$slug" params={{ slug: svc.slug }}>
                    {svc.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="mt-4 flex list-none flex-col p-0">
              {COMPANY_LINKS.map((link) => (
                <li key={link.to}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-4 flex list-none flex-col gap-3 p-0">
              <li>
                <p className="tl-mono text-muted-foreground">Europe</p>
                <p className="mt-1 text-small text-muted-foreground">{CONTACT.europeBase}</p>
                <a
                  href={CONTACT.phoneEuropeHref}
                  className="mt-1 inline-flex items-center rounded-full border border-border px-3 py-1 text-small text-muted-foreground no-underline transition-colors hover:border-primary/40 hover:text-foreground"
                  style={{ gap: "6px" }}
                >
                  Call EU
                </a>
              </li>
              <li>
                <p className="tl-mono text-muted-foreground">APAC</p>
                <p className="mt-1 text-small text-muted-foreground">{CONTACT.apacBase}</p>
                <a
                  href={CONTACT.phoneApacHref}
                  className="mt-1 inline-flex items-center rounded-full border border-border px-3 py-1 text-small text-muted-foreground no-underline transition-colors hover:border-primary/40 hover:text-foreground"
                  style={{ gap: "6px" }}
                >
                  Call APAC
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-[var(--tl-control-h-sm)] items-center text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground"
                >
                  {CONTACT.emailDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hours */}
        <div className="border-t border-border py-8">
          <h2 className="tl-mono text-muted-foreground">Hours</h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-small text-muted-foreground">
                Emergency &amp; remote hands support
              </dt>
              <dd className="mt-1 tl-figure text-small text-foreground">24/7, 365 days</dd>
            </div>
            <div>
              <dt className="text-small text-muted-foreground">Sales &amp; coordination</dt>
              <dd className="mt-1 tl-figure text-small text-foreground">
                Mon–Fri, 08:30–17:30 CET
                <span className="block text-muted-foreground">(12:00–21:00 IST)</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-muted-foreground">
            © {new Date().getFullYear()} TelicomLink. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
