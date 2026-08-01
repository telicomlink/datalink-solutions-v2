import {
  Headset,
  Server,
  ClipboardCheck,
  ArrowLeftRight,
  Building2,
  ShieldOff,
  PackageSearch,
  Activity,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import fiberImage from "@/assets/fiber-testing.jpg";
import imgRemoteHands from "@/assets/svc-remote-hands.jpg";
import imgRackStack from "@/assets/svc-rack-stack.jpg";
import imgSurvey from "@/assets/svc-survey.jpg";
import imgMigration from "@/assets/svc-migration.jpg";
import imgColocation from "@/assets/svc-colocation.jpg";
import imgDestruction from "@/assets/svc-destruction.jpg";
import imgSpares from "@/assets/svc-spares.jpg";
import imgTesting from "@/assets/svc-testing.jpg";
import imgCommissioning from "@/assets/svc-commissioning.jpg";
import { SERVICES, CAPABILITIES } from "@/lib/site-data";

import { MotionCard } from "./Motion";
import { Eyebrow, Reveal, SectionHeading } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  headset: Headset,
  server: Server,
  clipboard: ClipboardCheck,
  swap: ArrowLeftRight,
  building: Building2,
  shield: ShieldOff,
  package: PackageSearch,
  activity: Activity,
  rocket: Rocket,
};

const IMAGES: Record<string, { src: string; alt: string }> = {
  "smart-remote-hands": {
    src: imgRemoteHands,
    alt: "Technician with a headset working at a server rack during a night shift",
  },
  "rack-and-stack": {
    src: imgRackStack,
    alt: "Engineer sliding a rackmount server into a cabinet",
  },
  "site-survey-audit": {
    src: imgSurvey,
    alt: "Engineer auditing rack assets on a tablet in a data center aisle",
  },
  "migrations-decommissioning": {
    src: imgMigration,
    alt: "Servers loaded on a transport trolley during a data center migration",
  },
  colocation: {
    src: imgColocation,
    alt: "Rows of locked colocation cabinets with green status lights",
  },
  "secure-data-destruction": {
    src: imgDestruction,
    alt: "Stacked hard drives staged for certified secure destruction",
  },
  "spare-parts-management": {
    src: imgSpares,
    alt: "Labelled shelving of data center spare parts and optics",
  },
  "testing-certification": {
    src: imgTesting,
    alt: "OTDR handset connected to a fiber patch panel during testing",
  },
  "data-center-commissioning": {
    src: imgCommissioning,
    alt: "New data center hall powering on during commissioning",
  },
};


export function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-6 py-[clamp(56px,10vw,128px)]">
      <div className="relative mx-auto max-w-[1200px]">
        <Eyebrow>What we do</Eyebrow>
        <SectionHeading>
          Nine services, one team, from deployment to decommissioning.
        </SectionHeading>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => {
            const Icon = ICONS[svc.icon] ?? Server;
            const img = IMAGES[svc.slug];

            return (
              <Reveal key={svc.slug} delay={(i % 3) * 80} className="h-full">
                <MotionCard className="h-full rounded-2xl">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[inset_0_1px_0_color-mix(in_oklab,white_6%,transparent)] transition-colors duration-300 hover:border-primary/50 hover:bg-surface-raised">
                  <div className="relative h-44 overflow-hidden">
                    {img && (
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, color-mix(in oklab, var(--background) 20%, transparent) 0%, color-mix(in oklab, var(--background) 55%, transparent) 55%, var(--surface) 100%)",
                      }}
                    />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/80 text-primary shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_22%,transparent)] backdrop-blur">
                      <Icon size={20} />
                    </span>
                    <span className="absolute right-4 top-4 rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-[11px] text-subtle backdrop-blur">
                      {svc.num}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 pt-5">
                    <h3 className="font-display text-xl font-semibold">{svc.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {svc.descriptor}
                    </p>
                  </div>
                </div>
                </MotionCard>
              </Reveal>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section className="border-y border-border bg-surface/70 backdrop-blur-md px-6 py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_70px_-25px_rgba(0,0,0,.85)]">
            <img
              src={fiberImage}
              alt="Fiber optic patch panel under test with an OTDR handset"
              width={1200}
              height={912}
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-border bg-background/75 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground backdrop-blur">
              OTDR · 1550 nm trace
            </div>
          </div>
        </Reveal>

        <div>
          <Eyebrow>Test &amp; certification capability</Eyebrow>
          <SectionHeading>Proof, not assumptions, before you take handover.</SectionHeading>
          <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.label} delay={i * 70}>
                <div className="border-t-2 border-border pt-5 transition-colors hover:border-primary">
                  <h3 className="font-display text-lg font-semibold">{cap.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

