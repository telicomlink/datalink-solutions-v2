import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Reveal } from "@/components/site/Reveal";

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

const PAGES = [
  { to: "/services", label: "Services", body: "Nine services, from survey and rack & stack to 400G testing and decommissioning." },
  { to: "/why-us", label: "Why us", body: "How we work, who we work with, our four-step process, and the questions we get asked." },
  { to: "/coverage", label: "Coverage", body: "Eight facilities across Europe and APAC, plus dispatch into your own sites." },
  { to: "/contact", label: "Contact", body: "24/7 numbers for Europe and APAC, business hours, and a scoping form." },
];

function Index() {
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Hero />
      <Services />

      <section className="px-6 pb-[clamp(48px,8vw,96px)]">
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAGES.map((page, i) => (
            <Reveal key={page.to} delay={(i % 4) * 60}>
              <Link
                to={page.to}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-6 no-underline backdrop-blur transition-colors hover:border-primary/60"
              >
                <span className="font-display text-lg font-semibold text-foreground">
                  {page.label}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {page.body}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                  Open <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

    </SiteLayout>
  );
}
