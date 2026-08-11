import { useState } from "react";
import { Plus, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FAQS, SERVICES, CONTACT } from "@/lib/site-data";
import { Section, Container, MonoLabel, SectionHeading, SectionLead } from "./Section";
import type { SectionVariant } from "./Section";
import { ButtonLink } from "./Button";
import { useReveal } from "./Reveal";
import { Wordmark } from "./Logo";

export function Faq({ variant = "surface" }: { variant?: SectionVariant } = {}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" variant={variant}>
      <MonoLabel>{t("faq.label")}</MonoLabel>
      <SectionHeading>{t("faq.heading")}</SectionHeading>
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
                  className={`shrink-0 text-primary transition-transform duration-[var(--tl-dur)] ease-tl ${open === i ? "rotate-45" : ""}`}
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

export function CtaBand() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section variant="deep" bleed>
      <Container>
        <div ref={ref} className="flex flex-col items-start">
          <div data-reveal className="tl-reveal">
            <MonoLabel>{t("cta.label")}</MonoLabel>
          </div>
          <div data-reveal className="tl-reveal">
            <SectionHeading>{t("cta.heading")}</SectionHeading>
          </div>
          <div data-reveal className="tl-reveal">
            <SectionLead className="max-w-[60ch]">{t("cta.lead")}</SectionLead>
          </div>
          <div data-reveal className="tl-reveal mt-8">
            <ButtonLink to="/contact" arrow>{t("cta.button")}</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FooterLink({ to, hash, params, children }: { to: string; hash?: string; params?: Record<string, string>; children: string }) {
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      {...(params ? { params } : {})}
      className="tl-arrow group inline-flex min-h-[var(--tl-control-h-sm)] items-center gap-2 text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground"
    >
      {children}
      <ArrowRight size={14} aria-hidden="true" className="shrink-0 opacity-0 transition-opacity duration-[var(--tl-dur)] ease-tl group-hover:opacity-100" />
    </Link>
  );
}

function ColumnHeading({ children }: { children: string }) {
  return <h2 className="tl-mono text-muted-foreground">{children}</h2>;
}

const COMPANY_LINKS = [
  { to: "/services", labelKey: "nav.services" },
  { to: "/why-us",  labelKey: "nav.whyUs" },
  { to: "/coverage", labelKey: "nav.coverage" },
  { to: "/contact",  labelKey: "nav.contact" },
];

const LEGAL_LINKS = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms",          label: "Terms of Service" },
];

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-deep">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark size="sm" />
            <p className="mt-4 max-w-[32ch] text-small text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TelicomLink on LinkedIn"
              className="mt-6 inline-flex h-[var(--tl-control-h-sm)] w-[var(--tl-control-h-sm)] items-center justify-center rounded-[var(--tl-r-md)] border border-border text-muted-foreground transition-colors duration-[var(--tl-dur)] ease-tl hover:border-primary hover:text-foreground"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>

            {/* ISO Certification Badges */}
            <div style={{ marginTop: "var(--tl-s-6)", display: "flex", flexDirection: "column", gap: "var(--tl-s-3)" }}>

              {/* ISO 9001:2015 */}
              <div style={{ background: "var(--tl-surface)", border: "1px solid var(--tl-border)", borderLeft: "3px solid var(--tl-accent)", borderRadius: "var(--tl-r-md)", padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                {/* Shield + checkmark SVG */}
                <svg width="32" height="36" viewBox="0 0 32 36" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M16 1L2 7v10c0 9.25 6 17.9 14 20 8-2.1 14-10.75 14-20V7L16 1z" fill="var(--tl-accent)" />
                  <path d="M16 1L2 7v10c0 9.25 6 17.9 14 20 8-2.1 14-10.75 14-20V7L16 1z" fill="url(#sh1)" opacity="0.3" />
                  <polyline points="9,18 14,23 23,13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <defs>
                    <linearGradient id="sh1" x1="16" y1="1" x2="16" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="white" />
                      <stop offset="1" stopColor="black" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "var(--tl-fs-label)", color: "var(--tl-accent-text)", letterSpacing: "var(--tl-tracking-label)", fontFamily: "var(--tl-font-mono)", textTransform: "uppercase", margin: 0 }}>Quality Management</p>
                  <p style={{ fontSize: "0.9rem", color: "var(--tl-text)", fontFamily: "var(--tl-font-display)", fontWeight: 700, margin: 0, marginTop: "2px", letterSpacing: "-0.01em" }}>ISO 9001:2015</p>
                  <div style={{ borderTop: "1px solid var(--tl-border)", marginTop: "8px", paddingTop: "6px" }}>
                    <p style={{ fontSize: "var(--tl-fs-label)", color: "var(--tl-text-dim)", margin: 0, fontFamily: "var(--tl-font-mono)" }}>
                      Cert No. <span style={{ color: "var(--tl-text)", fontWeight: 600 }}>110826013307</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ISO/IEC 27001:2022 */}
              <div style={{ background: "var(--tl-surface)", border: "1px solid var(--tl-border)", borderLeft: "3px solid var(--tl-accent)", borderRadius: "var(--tl-r-md)", padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                {/* Shield + lock SVG */}
                <svg width="32" height="36" viewBox="0 0 32 36" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M16 1L2 7v10c0 9.25 6 17.9 14 20 8-2.1 14-10.75 14-20V7L16 1z" fill="var(--tl-accent)" />
                  <path d="M16 1L2 7v10c0 9.25 6 17.9 14 20 8-2.1 14-10.75 14-20V7L16 1z" fill="url(#sh2)" opacity="0.3" />
                  <rect x="11" y="19" width="10" height="8" rx="1.5" fill="white" />
                  <path d="M13 19v-2.5a3 3 0 0 1 6 0V19" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="16" cy="23" r="1.2" fill="var(--tl-accent)" />
                  <defs>
                    <linearGradient id="sh2" x1="16" y1="1" x2="16" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="white" />
                      <stop offset="1" stopColor="black" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "var(--tl-fs-label)", color: "var(--tl-accent-text)", letterSpacing: "var(--tl-tracking-label)", fontFamily: "var(--tl-font-mono)", textTransform: "uppercase", margin: 0 }}>Info Security Mgmt</p>
                  <p style={{ fontSize: "0.9rem", color: "var(--tl-text)", fontFamily: "var(--tl-font-display)", fontWeight: 700, margin: 0, marginTop: "2px", letterSpacing: "-0.01em" }}>ISO/IEC 27001:2022</p>
                  <div style={{ borderTop: "1px solid var(--tl-border)", marginTop: "8px", paddingTop: "6px" }}>
                    <p style={{ fontSize: "var(--tl-fs-label)", color: "var(--tl-text-dim)", margin: 0, fontFamily: "var(--tl-font-mono)" }}>
                      Cert No. <span style={{ color: "var(--tl-text)", fontWeight: 600 }}>110826053308</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <nav aria-label="Services">
            <ColumnHeading>{t("footer.servicesCol")}</ColumnHeading>
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
            <ColumnHeading>{t("footer.companyCol")}</ColumnHeading>
            <ul className="mt-4 flex list-none flex-col p-0">
              {COMPANY_LINKS.map((link) => (
                <li key={link.to}>
                  <FooterLink to={link.to}>{t(link.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>{t("footer.contactCol")}</ColumnHeading>
            <ul className="mt-4 flex list-none flex-col gap-3 p-0">
              <li>
                <p className="tl-mono text-muted-foreground">{t("footer.europe")}</p>
                <p className="mt-1 text-small text-muted-foreground">{CONTACT.europeBase}</p>
                <a href={CONTACT.phoneEuropeHref} className="mt-1 inline-flex items-center rounded-full border border-border px-3 py-1 text-small text-muted-foreground no-underline transition-colors hover:border-primary/40 hover:text-foreground" style={{ gap: "6px" }}>
                  {t("contact.callEu")}
                </a>
              </li>
              <li>
                <p className="tl-mono text-muted-foreground">{t("footer.apac")}</p>
                <p className="mt-1 text-small text-muted-foreground">{CONTACT.apacBase}</p>
                <a href={CONTACT.phoneApacHref} className="mt-1 inline-flex items-center rounded-full border border-border px-3 py-1 text-small text-muted-foreground no-underline transition-colors hover:border-primary/40 hover:text-foreground" style={{ gap: "6px" }}>
                  {t("contact.callApac")}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-[var(--tl-control-h-sm)] items-center text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground">
                  {CONTACT.emailDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-8">
          <h2 className="tl-mono text-muted-foreground">{t("footer.hours")}</h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-small text-muted-foreground">{t("footer.emergency")}</dt>
              <dd className="mt-1 tl-figure text-small text-foreground">{t("footer.emergencyValue")}</dd>
            </div>
            <div>
              <dt className="text-small text-muted-foreground">{t("footer.sales")}</dt>
              <dd className="mt-1 tl-figure text-small text-foreground">
                {t("footer.salesValue")}
                <span className="block text-muted-foreground">{t("footer.salesValueSub")}</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-small text-muted-foreground" style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
              Made with{" "}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "inline", verticalAlign: "middle" }}>
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="var(--tl-accent)"/>
              </svg>
              {" "}by{" "}
              <a
                href="https://staffarc.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
              >
                {/* StaffArc mountain/triangle logo */}
                <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <polygon points="16,4 30,28 2,28" fill="var(--tl-staffarc)" />
                  <polygon points="16,10 24,28 8,28" fill="var(--tl-staffarc-light)" opacity="0.6" />
                </svg>
                <span style={{ color: "var(--tl-staffarc)", fontWeight: 700 }}>StaffArc</span>
              </a>
            </p>
            <p className="text-small text-muted-foreground">
              © {new Date().getFullYear()} TelicomLink. {t("footer.copyright")}
            </p>
          </div>
          <nav aria-label="Legal">
            <ul className="flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground">
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
