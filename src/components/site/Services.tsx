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
import { SERVICES, CAPABILITIES } from "@/lib/site-data";
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

            return (
              <Reveal key={svc.slug} delay={(i % 3) * 80} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 shadow-[inset_0_1px_0_color-mix(in_oklab,white_6%,transparent)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-surface-raised">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_20%,transparent)]">
                      <Icon size={22} />
                    </span>
                    <span className="font-mono text-xs text-subtle">{svc.num}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{svc.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {svc.descriptor}
                  </p>
                </div>
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
    <section className="border-y border-border bg-surface px-6 py-[clamp(48px,8vw,96px)]">
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

