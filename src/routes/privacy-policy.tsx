import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Section, Container, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/privacy-policy")({ component: PrivacyPolicyPage });

function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-h3 font-bold text-foreground">{heading}</h2>
      <div className="mt-3 flex flex-col gap-3 text-body text-muted-foreground">{children}</div>
    </div>
  );
}

function PrivacyPolicyPage() {
  return (
    <SiteLayout withCta={false}>
      <section className="pb-[var(--tl-section-y)] pt-[calc(var(--tl-header-h)+var(--tl-s-16))]">
        <Container className="flex flex-col items-start">
          <MonoLabel>Legal</MonoLabel>
          <SectionHeading>Privacy Policy.</SectionHeading>
          <SectionLead>
            How TelicomLink collects, uses, and protects personal data, in line with the EU
            General Data Protection Regulation (GDPR).
          </SectionLead>
          <p className="mt-4 tl-mono text-label text-muted-foreground">Last updated: August 2026</p>
        </Container>
      </section>

      <Section>
        <div className="flex max-w-[75ch] flex-col gap-8">
          <LegalBlock heading="1. Who we are">
            <p>
              TelicomLink (&quot;TelicomLink&quot;, &quot;we&quot;, &quot;us&quot;) is a data
              center engineering service provider operating across Europe and APAC. This policy
              explains how we handle personal data collected through this website and through the
              course of providing our services.
            </p>
          </LegalBlock>

          <LegalBlock heading="2. What we collect">
            <p>We collect personal data you give us directly, principally through our contact form and direct correspondence:</p>
            <ul className="ml-6 list-disc">
              <li>Name and company name</li>
              <li>Email address and phone number</li>
              <li>The service you&apos;re enquiring about and the content of your message</li>
            </ul>
            <p>
              This website is a static site with no user accounts and no advertising or tracking
              cookies. Any cookies in use are strictly necessary for the site to function and do
              not identify you personally.
            </p>
          </LegalBlock>

          <LegalBlock heading="3. How we use it">
            <ul className="ml-6 list-disc">
              <li>To respond to enquiries and provide quotes</li>
              <li>To scope, deliver, and coordinate the services you engage us for</li>
              <li>To meet legal, tax, and contractual record-keeping obligations</li>
            </ul>
          </LegalBlock>

          <LegalBlock heading="4. Legal basis for processing">
            <p>
              We process enquiry data on the basis of your consent when you submit the contact
              form, and process client data on the basis of the contract we enter into to deliver
              services, or our legitimate interest in responding to business enquiries.
            </p>
          </LegalBlock>

          <LegalBlock heading="5. Sharing your data">
            <p>
              We do not sell personal data. We share data only with service providers who support
              our operations (for example, email hosting) under confidentiality obligations, or
              where required by law.
            </p>
          </LegalBlock>

          <LegalBlock heading="6. International transfers">
            <p>
              TelicomLink operates in both the EU and India. Where data is transferred outside the
              European Economic Area, we take steps to ensure it receives an equivalent level of
              protection, consistent with GDPR requirements.
            </p>
          </LegalBlock>

          <LegalBlock heading="7. Retention">
            <p>
              We keep enquiry data only as long as needed to respond to it, and client data for as
              long as the business relationship continues plus any period required by law
              afterwards.
            </p>
          </LegalBlock>

          <LegalBlock heading="8. Your rights">
            <p>Under GDPR, you have the right to:</p>
            <ul className="ml-6 list-disc">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request erasure of your data</li>
              <li>Restrict or object to processing</li>
              <li>Receive your data in a portable format</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p>To exercise any of these rights, contact us using the details below.</p>
          </LegalBlock>

          <LegalBlock heading="9. Security">
            <p>
              We apply reasonable technical and organisational measures to protect personal data
              against unauthorised access, loss, or misuse.
            </p>
          </LegalBlock>

          <LegalBlock heading="10. Changes to this policy">
            <p>
              We may update this policy from time to time. The &quot;last updated&quot; date above
              reflects the most recent revision.
            </p>
          </LegalBlock>

          <LegalBlock heading="11. Contact us">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:text-primary"
            >
              <Mail size={14} aria-hidden="true" className="text-primary" /> {CONTACT.emailDisplay}
            </a>
          </LegalBlock>
        </div>
      </Section>
    </SiteLayout>
  );
}
