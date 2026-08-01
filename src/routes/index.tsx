import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Services, Capabilities } from "@/components/site/Services";
import { WhyUs, Coverage, Process } from "@/components/site/WhyCoverageProcess";
import { Faq, CtaBand, SiteFooter } from "@/components/site/FaqFooter";
import { Contact } from "@/components/site/Contact";

const TITLE = "TelicomLink — Data Center Remote Hands, Rack & Stack, Testing";
const DESCRIPTION =
  "24/7 data center services across Europe and APAC: smart & remote hands, rack & stack, migrations, colocation, secure data destruction, and OTDR/400G testing.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TelicomLink",
  description:
    "Data center as a service: deployment, DWDM, patching, testing, remote hands, and colocation across Europe and APAC.",
  email: "info@telicomlink.com",
  url: "https://telicomlink.com",
  sameAs: ["https://www.linkedin.com/company/telicomlink/"],
  areaServed: ["Europe", "Asia Pacific"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+33646018040",
      areaServed: "EU",
      availableLanguage: ["English", "French"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+919014127090",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  ],
};

function Index() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <Services />
        <WhyUs />
        <Capabilities />
        <Coverage />
        <Process />
        <Faq />
        <Contact />
        <CtaBand />
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>

    </div>
  );
}
