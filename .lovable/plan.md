# TelicomLink — Data Center Services Website

## Color decision

**Black & Green.** Green reads as "operational / live / uptime" in the data center and network world (it's what Introl and Reboot Monkey lean on), it signals status-OK and 24/7 monitoring, and it stays legible on a near-black UI. Gold skews luxury/finance and would fight the technical, engineering-led tone. The uploaded design already commits to black + signal green (`#0d0f12` / `#35d96a`) — we build on that.

## What gets built

A single-page marketing site at `/` (dark, technical, engineering-first), plus a legal-lite footer. Sections in order:

1. **Sticky header** — TELICOM**LINK** wordmark, nav (Services, Why us, Coverage, Contact), "Talk to an engineer" CTA, mobile slide-in menu.
2. **Hero** — "Your engineers, inside the data center." Sub-line about deploying servers, DWDM, patching and testing for clients. Two CTAs. Live stat strip: 09 services / 08+ facilities / 24/7 support / 2 regions. Subtle animated grid + glow backdrop.
3. **Services** — all 9 services as a numbered card grid: Smart & Remote Hands (24x7), Rack & Stack, Site Survey & Audit, DC Migrations & Decommissioning, Colocation, SSD/HDD Secure Destruction, Spare Parts Management & Inventory, Testing (OTDR, 10G/100G/400G BERT, network testing), DC Commissioning. Each with a one-line description and an icon.
4. **Why TelicomLink** — vendor-neutral engineers, single point of contact across EU + APAC, 24/7 dispatch, documented and photo-evidenced work, chain-of-custody on data destruction.
5. **Coverage** — colocation city grid: Paris, Marseille, Frankfurt, Amsterdam, Mumbai, Bangalore, Visakhapatnam, Singapore, grouped Europe / APAC, with "+ many more" and a "ask about a specific facility" link.
6. **How it works** — 4 steps: Survey → Scope & quote → Deploy → Steady-state support.
7. **Testing & capability band** — pulled from the reference sites' credibility pattern: fibre/OTDR, high-speed BERT up to 400G, structured cabling, DWDM turn-up.
8. **FAQ** — response times, ticket raising, out-of-hours, data destruction certificates, spares logistics (accordion).
9. **Contact** — form (name, work email, company, service interest, message) side-by-side with direct contact rail:
   - France & Europe: +33 6 46 01 80 40
   - India & APAC: +91 90141 27090
   - info@telicomlink.com
   - Presence: "Heart of France — Paris" and "Andhra Pradesh, India" (no street address)
   - 24/7 support; office hours Mon–Fri with weekend on-call noted as 24/7
   - LinkedIn link; Facebook/Instagram omitted until URLs are provided
10. **Footer** — wordmark, nav, contact repeat, LinkedIn, copyright.

Form behaviour: client-side validation + success toast, and it also composes a `mailto:info@telicomlink.com` fallback so no message is lost. No backend in this pass.

## Improvements over the reference sites

- Real service depth (9 concrete services with plain-English scope) instead of vague "we do IT".
- Region-aware contact: two phone numbers presented as separate dispatch desks, not one generic number.
- A coverage grid that names actual facilities' cities — the strongest trust signal for colocation buyers.
- Response-time/SLA framing in the FAQ rather than buried in fine print.
- Motion is restrained: hover lifts, one drifting grid, reduced-motion respected.

## Technical notes

- TanStack Start; page built as `src/routes/index.tsx` (replaces the placeholder) with section components under `src/components/`.
- Design tokens added to `src/styles.css` in oklch: near-black background `#0d0f12`, raised surface `#13171c`, border `#232930`, foreground `#edf1f5`, muted `#98a3ae`, primary signal green `#35d96a` with `#2aa757` hover and `#062814` on-green text. No hardcoded color utilities in components.
- Fonts Inter Tight (headings), Inter (body), JetBrains Mono (labels/stats) loaded via `<link>` in `__root.tsx` — never `@import` in CSS.
- A generated SVG/PNG TL wordmark logo saved to `src/assets/` and used in header + footer + favicon-style mark.
- SEO: unique `head()` on `/` with title, description, og/twitter tags, plus JSON-LD `Organization` + `LocalBusiness`-style data (no street address), single H1, alt text on imagery.

## Open items (won't block the build)

- Facebook and Instagram URLs — omitted until supplied.
- Real logo file, if one exists, can replace the generated wordmark later.
