import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Section, Container, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/site-data";
import { PageSeo } from "@/components/site/PageSeo";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-h3 font-bold text-foreground">{heading}</h2>
      <div className="mt-3 flex flex-col gap-3 text-body text-muted-foreground">{children}</div>
    </div>
  );
}

function TermsPage() {
  return (
    <SiteLayout withCta={false}>
      <PageSeo
        title="Terms of Service | TelicomLink"
        description="The terms that apply to your use of the TelicomLink website and services."
        canonical="https://telicomlink.com/terms"
      />
      <section className="pb-[var(--tl-section-y)] pt-[calc(var(--tl-header-h)+var(--tl-s-16))]">
        <Container className="flex flex-col items-start">
          <MonoLabel>Legal</MonoLabel>
          <SectionHeading>Terms of Service.</SectionHeading>
          <SectionLead>The terms that apply to your use of this website.</SectionLead>
          <p className="mt-4 tl-mono text-label text-muted-foreground">Last updated: August 2026</p>
        </Container>
      </section>

      <Section>
        <div className="flex max-w-[75ch] flex-col gap-8">
          <LegalBlock heading="1. Acceptance of these terms">
            <p>
              By using this website, you agree to these terms. If you do not agree, please do not
              use the site.
            </p>
          </LegalBlock>

          <LegalBlock heading="2. About TelicomLink">
            <p>
              TelicomLink provides on-site data center engineering — deployment, testing,
              migrations, and related services — across Europe and APAC. This website is
              informational: it describes our services and lets you contact us. It does not, on
              its own, create a contract for services. Actual service engagements are governed by
              a separate written agreement between TelicomLink and the client.
            </p>
          </LegalBlock>

          <LegalBlock heading="3. Use of this website">
            <p>You agree to use this website only for lawful purposes, and not to:</p>
            <ul className="ml-6 list-disc">
              <li>Attempt to gain unauthorised access to the site or its infrastructure</li>
              <li>Scrape, harvest, or misuse content, including contact details, published here</li>
              <li>Interfere with the site&apos;s normal operation</li>
            </ul>
          </LegalBlock>

          <LegalBlock heading="4. Intellectual property">
            <p>
              The text, graphics, and layout of this website are owned by TelicomLink or used
              under licence, and may not be reproduced without permission.
            </p>
          </LegalBlock>

          <LegalBlock heading="5. No warranty">
            <p>
              This website and its content are provided &quot;as is&quot;, without warranties of
              any kind. We make reasonable efforts to keep information accurate and up to date but
              do not guarantee it is complete or error-free.
            </p>
          </LegalBlock>

          <LegalBlock heading="6. Limitation of liability">
            <p>
              To the extent permitted by law, TelicomLink is not liable for any indirect,
              incidental, or consequential loss arising from your use of this website. This does
              not limit liability that cannot be excluded under applicable law.
            </p>
          </LegalBlock>

          <LegalBlock heading="7. Governing law">
            <p>
              These terms are governed by French law. Any dispute arising from your use of this
              website will be subject to the exclusive jurisdiction of the courts of France, unless
              mandatory local law provides otherwise.
            </p>
          </LegalBlock>

          <LegalBlock heading="8. Changes to these terms">
            <p>
              We may update these terms from time to time. The &quot;last updated&quot; date above
              reflects the most recent revision.
            </p>
          </LegalBlock>

          <LegalBlock heading="9. Contact us">
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
