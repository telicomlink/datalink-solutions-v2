import { createFileRoute } from "@tanstack/react-router";
import { Container, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ButtonLink } from "@/components/site/Button";

export const Route = createFileRoute("/blog")({ component: BlogPage });

function BlogPage() {
  return (
    <SiteLayout withCta={false}>
      <section className="pb-[var(--tl-section-y)] pt-[calc(var(--tl-header-h)+var(--tl-s-16))]">
        <Container className="flex flex-col items-start">
          <MonoLabel>Blog</MonoLabel>
          <SectionHeading>Coming soon.</SectionHeading>
          <SectionLead>
            Field notes on deployments, testing, and data center operations — we&apos;re writing
            them now. Check back soon, or talk to an engineer in the meantime.
          </SectionLead>
          <div className="mt-8">
            <ButtonLink to="/contact" arrow>Talk to an engineer</ButtonLink>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
