import type { ReactNode } from "react";
import { PageBackground } from "./PageBackground";
import { ScrollProgress } from "./ScrollProgress";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter, CtaBand } from "./FaqFooter";
import { Eyebrow } from "./Reveal";

export function SiteLayout({
  children,
  withCta = true,
}: {
  children: ReactNode;
  withCta?: boolean;
}) {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <PageBackground />
      <ScrollProgress />
      <SiteHeader />
      <main className="relative z-10">
        {children}
        {withCta && <CtaBand />}
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}

/** Compact hero used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-[clamp(32px,6vw,72px)] pt-[clamp(112px,14vw,168px)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted-foreground">{lead}</p>
        </div>
        {image && (
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_70px_-25px_rgba(0,0,0,.85)]">
            <img
              src={image}
              alt={imageAlt ?? ""}
              width={1200}
              height={900}
              className="aspect-4/3 w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--background) 70%, transparent) 100%)",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
