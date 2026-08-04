import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Section, MonoLabel, SectionHeading, SectionLead } from "@/components/site/Section";
import { ButtonAnchor } from "@/components/site/Button";
import { useReveal } from "@/components/site/Reveal";
import { FACILITIES, CONTACT } from "@/lib/site-data";
import careersHero from "@/assets/hero-why.webp";

export const Route = createFileRoute("/careers")({ component: CareersPage });

const HIRING_LOCATIONS = new Set(["Paris", "Visakhapatnam"]);
const ROLE = "Data Center On-Site Engineer";

function resumeHref(city: string) {
  const subject = encodeURIComponent(`Application — ${ROLE}, ${city}`);
  const body = encodeURIComponent(
    "Hi TelicomLink team,\n\nI'd like to apply for the Data Center On-Site Engineer role. My CV is attached.\n\n",
  );
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

/* ── Countries we operate in ─────────────────────────────────────────────── */
function OperatingCountries() {
  const countries = Array.from(new Set(FACILITIES.map((f) => f.country)));
  const ref = useReveal<HTMLUListElement>();

  return (
    <Section variant="surface">
      <MonoLabel>Where we operate</MonoLabel>
      <SectionHeading>Engineers on the ground across Europe and APAC.</SectionHeading>
      <SectionLead>Ten-plus countries of coverage today, with new sites opening regularly.</SectionLead>

      <ul ref={ref} className="mt-12 flex flex-wrap list-none gap-3 p-0">
        {countries.map((country) => (
          <li
            key={country}
            data-reveal
            className="tl-reveal inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] border border-border bg-background px-4 py-2 text-small text-foreground"
          >
            <MapPin size={13} aria-hidden="true" className="text-primary" />
            {country}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ── Open roles ───────────────────────────────────────────────────────────── */
function OpenRoles() {
  const ref = useReveal<HTMLUListElement>();
  const cities = Array.from(new Set(FACILITIES.map((f) => f.city)));

  return (
    <Section>
      <MonoLabel>Open roles</MonoLabel>
      <SectionHeading>Hiring in Paris and Visakhapatnam.</SectionHeading>
      <SectionLead>
        We hire locally, close to the facilities we serve. Every other location below is fully
        staffed for now — send your resume anyway and we&apos;ll keep it on file.
      </SectionLead>

      <ul ref={ref} className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => {
          const hiring = HIRING_LOCATIONS.has(city);
          return (
            <li
              key={city}
              data-reveal
              className={`tl-reveal rounded-[var(--tl-r-lg)] border p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)] ${
                hiring ? "border-primary/30 bg-surface" : "border-border bg-surface"
              }`}
            >
              <p className="inline-flex items-center gap-2 tl-mono text-muted-foreground">
                <MapPin size={12} aria-hidden="true" /> {city}
              </p>
              <h3 className="mt-2 text-h3 font-bold text-foreground">
                {hiring ? ROLE : "No open roles"}
              </h3>
              {hiring ? (
                <>
                  <p className="mt-2 text-small text-muted-foreground">
                    On-site deployment, testing, and remote-hands support.
                  </p>
                  <a
                    href={resumeHref(city)}
                    className="tl-arrow tl-mono mt-6 inline-flex items-center gap-2 text-[color:var(--tl-accent-text)] no-underline"
                  >
                    Post your resume →
                  </a>
                </>
              ) : (
                <p className="mt-2 text-small text-muted-foreground">
                  Not currently hiring at this location.
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-12 rounded-[var(--tl-r-lg)] border border-border bg-surface p-8">
        <p className="tl-mono text-[color:var(--tl-accent-text)]">Don&apos;t see your city?</p>
        <h3 className="mt-2 text-h3 font-bold text-foreground">We keep resumes on file for future openings.</h3>
        <p className="mt-2 text-small text-muted-foreground">
          Tell us your location and experience and we&apos;ll reach out when a role opens near you.
        </p>
        <div className="mt-6">
          <ButtonAnchor href={resumeHref("General application")} arrow>
            <Mail size={16} aria-hidden="true" /> Send your resume
          </ButtonAnchor>
        </div>
      </div>
    </Section>
  );
}

function CareersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Careers"
        title="Build the infrastructure that keeps the internet running."
        lead="We're a field engineering team, not a call centre — every hire works inside real data centers, on real infrastructure, across Europe and APAC."
        image={careersHero}
        imageAlt="Two engineers reviewing rack and network diagrams in a night operations room"
      />
      <OperatingCountries />
      <OpenRoles />
    </SiteLayout>
  );
}
