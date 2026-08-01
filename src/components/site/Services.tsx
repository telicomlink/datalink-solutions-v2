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
            const Icon = ICONS[svc.icon];
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
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow>Test &amp; certification capability</Eyebrow>
        <SectionHeading>Proof, not assumptions, before you take handover.</SectionHeading>
        <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}
