import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter, CtaBand } from "./FaqFooter";
import { Container, MonoLabel } from "./Section";
import { useReveal } from "./Reveal";

export function SiteLayout({
  children,
  withCta = true,
}: {
  children: ReactNode;
  withCta?: boolean;
}) {
  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
        {withCta && <CtaBand />}
      </main>
      <SiteFooter />
    </div>
  );
}

/**
 * Compact hero for inner pages. Owns its own top padding because it has to
 * clear the fixed header; every other section defers to <Section>.
 */
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
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="pb-[var(--tl-section-y)] pt-[calc(var(--tl-header-h)+var(--tl-s-16))]">
      <Container>
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[55fr_45fr]">
          <div data-reveal className="tl-reveal">
            <MonoLabel>{eyebrow}</MonoLabel>
            <h1 className="max-w-[20ch] text-display font-bold text-balance text-foreground">
              {title}
            </h1>
            <p className="mt-6 max-w-[60ch] text-body-lg text-muted-foreground">{lead}</p>
          </div>
          {image && (
            <div
              data-reveal
              className="tl-reveal relative overflow-hidden rounded-[var(--tl-r-lg)] border border-border shadow-[var(--tl-edge),var(--tl-shadow-md)]"
            >
              <img
                src={image}
                alt={imageAlt ?? ""}
                width={1200}
                height={900}
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--tl-bg) 25%, transparent) 0%, transparent 45%, color-mix(in srgb, var(--tl-bg) 60%, transparent) 100%)",
                }}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
