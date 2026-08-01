export const CONTACT = {
  email: "info@telicomlink.com",
  phoneEurope: "+33 6 46 01 80 40",
  phoneEuropeHref: "tel:+33646018040",
  phoneApac: "+91 90141 27090",
  phoneApacHref: "tel:+919014127090",
  whatsapp: "https://wa.me/919014127090",
  linkedin: "https://www.linkedin.com/company/telicomlink/",
  europeBase: "Paris, France",
  apacBase: "Andhra Pradesh, India",
} as const;

export const SERVICES = [
  {
    num: "01",
    slug: "smart-remote-hands",
    name: "Smart & Remote Hands",
    descriptor: "24×7 on-site technicians for anything your team can't reach",
    icon: "headset",
  },
  {
    num: "02",
    slug: "rack-and-stack",
    name: "Rack & Stack",
    descriptor: "Server and network gear racked, cabled, powered, and labelled",
    icon: "server",
  },
  {
    num: "03",
    slug: "site-survey-audit",
    name: "Site Survey & Audit",
    descriptor: "Pre-deployment surveys and full asset and cabling audits",
    icon: "clipboard",
  },
  {
    num: "04",
    slug: "migrations-decommissioning",
    name: "Migrations & Decommissioning",
    descriptor: "Planned moves and clean exits, with zero-downtime cutovers",
    icon: "swap",
  },
  {
    num: "05",
    slug: "colocation",
    name: "Colocation",
    descriptor: "Rack and cage space across Europe, India, and Singapore",
    icon: "building",
  },
  {
    num: "06",
    slug: "secure-data-destruction",
    name: "Secure Data Destruction",
    descriptor: "Certified SSD and HDD destruction with chain-of-custody",
    icon: "shield",
  },
  {
    num: "07",
    slug: "spare-parts-management",
    name: "Spare Parts Management",
    descriptor: "On-site spares pools, inventory control, and lifecycle tracking",
    icon: "package",
  },
  {
    num: "08",
    slug: "testing-certification",
    name: "Testing & Certification",
    descriptor: "OTDR, BERT at 10G/100G/400G, and full network validation",
    icon: "activity",
  },
  {
    num: "09",
    slug: "data-center-commissioning",
    name: "Data Center Commissioning",
    descriptor: "New-build and expansion commissioning, from power-on to handover",
    icon: "rocket",
  },
] as const;

export const DIFFERENTIATORS = [
  "OTDR and BERT testing up to 400G — specialist capability most remote-hands vendors don't carry.",
  "24/7 emergency dispatch, not just business-hours coverage.",
  "One team across deployment, testing, and decommissioning — no handoff between vendors.",
  "Local presence in Europe and APAC, not a single time-zone operation.",
];

export const EUROPE_CITIES = ["Paris", "Marseille", "Frankfurt", "Amsterdam"];
export const APAC_CITIES = ["Mumbai", "Bangalore", "Visakhapatnam", "Singapore"];

export const PROCESS_STEPS = [
  { step: "01", title: "Assess", body: "Site survey, asset audit, and scope confirmed before anything moves." },
  { step: "02", title: "Design", body: "A sequenced plan — deployment, migration, or commissioning runbook." },
  { step: "03", title: "Deploy", body: "Executed on-site by our engineers, verified as it happens." },
  { step: "04", title: "Operate", body: "Ongoing smart hands, spares, and testing keep it running." },
];

export const CAPABILITIES = [
  { label: "Fibre & OTDR", value: "Single-mode and multi-mode certification with trace reports" },
  { label: "BERT to 400G", value: "10G, 100G and 400G bit-error-rate validation" },
  { label: "DWDM turn-up", value: "Transponder install, channel provisioning, and turn-up" },
  { label: "Structured cabling", value: "Copper and fibre builds, labelling, and documentation" },
];

export const FAQS = [
  {
    q: 'What exactly does "Data Center as a Service" mean?',
    a: "We're the hands and expertise inside the facility — deploying, patching, testing, and maintaining infrastructure on your behalf. We don't own the buildings; we operate inside them, including our own colocation footprint.",
  },
  {
    q: "Which regions do you operate in?",
    a: "Europe and APAC, with colocation across eight facilities — Paris, Marseille, Frankfurt, Amsterdam, Mumbai, Bangalore, Visakhapatnam, and Singapore — and more on request.",
  },
  {
    q: "Do we need a contract, or can we book a single task?",
    a: "Both work. A one-off remote-hands dispatch needs no contract; ongoing coverage — spares management, standing smart-hands retainers, colocation — runs on an agreement scoped to what you need.",
  },
  {
    q: "Can you work inside our existing facility provider, or only your own colocation?",
    a: "Most of our engagements are inside client-selected facilities we don't own. Deployment, testing, remote hands, and data destruction all run the same way whether the rack is in our colocation footprint or someone else's.",
  },
  {
    q: "How fast can you respond to an urgent issue?",
    a: "Smart & Remote Hands support runs 24/7. Response time depends on the facility and the task — tell us the scope and we'll give you a straight answer for that specific site.",
  },
  {
    q: "Do you provide certificates for data destruction?",
    a: "Yes. Every SSD or HDD destruction job is logged with serial-level chain-of-custody and closed out with a certificate of destruction.",
  },
];

/** Long-form detail used on the /services page. */
export const SERVICE_DETAILS: Record<
  string,
  { intro: string; bullets: string[]; sla: string }
> = {
  "smart-remote-hands": {
    intro:
      "Vetted engineers on the floor 24/7 — reboots, cable swaps, optic replacements, console access, and escorted vendor visits, dispatched the moment you raise a ticket.",
    bullets: [
      "Reboots, power-cycles, and console/KVM access",
      "Optics, DAC, and patch-cord swaps with photo evidence",
      "Escorting third-party vendors and delivery acceptance",
      "Ticket-driven dispatch with written closeout notes",
    ],
    sla: "24/7 dispatch · emergency and scheduled",
  },
  "rack-and-stack": {
    intro:
      "From pallet to production: unboxing, rail install, racking, power, structured cabling, labelling, and first power-on — documented rack elevations included.",
    bullets: [
      "De-palletising, asset tagging, and serial capture",
      "Rail and cabinet install to your elevation drawings",
      "A/B power, copper and fibre cabling, dressed and labelled",
      "Power-on, BIOS/firmware checks, and handover pack",
    ],
    sla: "Per-rack or per-project scope",
  },
  "site-survey-audit": {
    intro:
      "Know exactly what is in the room before you commit. Full asset, power, cooling, and cabling audits with photographic records and a clean inventory export.",
    bullets: [
      "Rack-by-rack asset and serial inventory",
      "Power draw, circuit, and capacity assessment",
      "Cabling and patching trace with as-built documentation",
      "Gap report with prioritised remediation actions",
    ],
    sla: "Report delivered within 5 working days",
  },
  "migrations-decommissioning": {
    intro:
      "Move or exit a facility without the drama. Sequenced runbooks, labelled cabling, chain-of-custody transport, and verified cutovers with rollback plans.",
    bullets: [
      "Migration runbook with cutover windows and rollback",
      "Packing, transport, and chain-of-custody tracking",
      "Re-rack, re-cable, and post-move validation testing",
      "Decommissioning, room hand-back, and asset disposal",
    ],
    sla: "Planned windows, including weekends and nights",
  },
  colocation: {
    intro:
      "Rack, half-rack, and cage space in carrier-neutral facilities across Europe and APAC — with our own engineers already on site.",
    bullets: [
      "Paris, Marseille, Frankfurt, Amsterdam, Mumbai, Bangalore, Visakhapatnam, Singapore",
      "Redundant A/B power and resilient cooling",
      "Carrier-neutral cross-connects and IP transit options",
      "Remote hands bundled with the space, not billed as a stranger",
    ],
    sla: "Space in 8+ facilities, more on request",
  },
  "secure-data-destruction": {
    intro:
      "Certified SSD and HDD destruction with serial-level chain-of-custody, on-site or at a secure facility, closed out with a certificate of destruction.",
    bullets: [
      "On-site shredding, degaussing, or crypto-erase",
      "Serial-level logging from removal to destruction",
      "Certificate of destruction per asset batch",
      "Compliant disposal and recycling of the residue",
    ],
    sla: "On-site witnessed destruction available",
  },
  "spare-parts-management": {
    intro:
      "Keep critical spares next to the rack. We store, track, and rotate your on-site spares pool so failures are minutes to fix, not days.",
    bullets: [
      "On-site or near-site spares stocking",
      "Inventory system with consumption and reorder alerts",
      "RMA handling with your vendors",
      "Lifecycle tracking and end-of-life planning",
    ],
    sla: "Same-day part swap where stock is on site",
  },
  "testing-certification": {
    intro:
      "Specialist optical and packet test capability most remote-hands vendors don't carry: OTDR traces, insertion loss, and BERT up to 400G with signed reports.",
    bullets: [
      "OTDR single-mode and multi-mode traces at 1310/1550 nm",
      "Insertion loss, ORL, and end-face inspection",
      "BERT validation at 10G, 100G, and 400G",
      "DWDM turn-up, channel provisioning, and link certification",
    ],
    sla: "Signed test reports with every job",
  },
  "data-center-commissioning": {
    intro:
      "New-build and expansion commissioning — from power-on and level testing through integrated systems checks to a documented handover.",
    bullets: [
      "Pre-functional checks and equipment verification",
      "Functional and integrated systems testing",
      "Network fabric build, test, and certification",
      "As-built documentation and formal handover pack",
    ],
    sla: "Phased Lv1–Lv5 commissioning support",
  },
};

export const FACILITIES = [
  { city: "Paris", country: "France", region: "Europe", note: "Primary European hub and dispatch base" },
  { city: "Marseille", country: "France", region: "Europe", note: "Subsea cable landing gateway to EMEA" },
  { city: "Frankfurt", country: "Germany", region: "Europe", note: "DE-CIX interconnection density" },
  { city: "Amsterdam", country: "Netherlands", region: "Europe", note: "AMS-IX peering and cloud on-ramps" },
  { city: "Mumbai", country: "India", region: "APAC", note: "India's largest interconnection market" },
  { city: "Bangalore", country: "India", region: "APAC", note: "Enterprise and IT services corridor" },
  { city: "Visakhapatnam", country: "India", region: "APAC", note: "APAC operations base, Andhra Pradesh" },
  { city: "Singapore", country: "Singapore", region: "APAC", note: "South-East Asia gateway" },
] as const;

export const WHY_STATS = [
  { value: "24/7", label: "Dispatch, every day of the year" },
  { value: "400G", label: "BERT and optical certification" },
  { value: "08", label: "Colocation facilities live" },
  { value: "02", label: "Regions, one accountable team" },
];

export const INDUSTRIES = [
  { name: "Network operators", body: "DWDM turn-up, patching, and fibre certification across metro and long-haul routes." },
  { name: "Hyperscalers & cloud", body: "Large-scale rack & stack, structured cabling, and commissioning at build pace." },
  { name: "System integrators", body: "White-label field engineering so you can promise coverage you don't have to staff." },
  { name: "Enterprises", body: "Equipment in facilities you don't staff — we're your hands, spares pool, and audit trail." },
];

export const HOURS = [
  { label: "Emergency & remote hands", value: "24/7 · 365 days" },
  { label: "Monday – Friday", value: "Full operations · 08:00 – 20:00 local" },
  { label: "Saturday", value: "Scheduled works & on-call" },
  { label: "Sunday", value: "On-call and emergency dispatch" },
];
