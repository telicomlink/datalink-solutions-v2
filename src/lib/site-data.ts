export const CONTACT = {
  email: "info@telicomlink.com",
  // Same address, written to be harder for scrapers to harvest — the mailto
  // href below still works, this is only the text shown on the page.
  emailDisplay: "info [at] telicomlink [dot] com",
  phoneEurope: "+33 6 46 01 80 40",
  phoneEuropeHref: "tel:+33646018040",
  phoneApac: "+91 90141 27090",
  phoneApacHref: "tel:+919014127090",
  whatsapp: "https://wa.me/33768486964",
  whatsappApac: "https://wa.me/919014127090",
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
    slug: "testing-certification",
    name: "Testing & Certification",
    descriptor: "OTDR, BERT at 10G/100G/400G, and full network validation",
    icon: "activity",
  },
  {
    num: "08",
    slug: "data-center-commissioning",
    name: "Data Center Commissioning",
    descriptor: "New-build and expansion commissioning, from power-on to handover",
    icon: "rocket",
  },
  {
    num: "09",
    slug: "spare-parts-management",
    name: "Spare Parts Management & Logistics",
    descriptor: "On-site spares pools, inventory control, and lifecycle tracking",
    icon: "package",
  },
] as const;

export const DIFFERENTIATORS = [
  "OTDR and BERT testing up to 400G — specialist capability most remote-hands vendors don't carry.",
  "24/7 emergency dispatch, not just business-hours coverage.",
  "One team across deployment, testing, and decommissioning — no handoff between vendors.",
  "Local presence in Europe and APAC, not a single time-zone operation.",
];

export const EUROPE_CITIES = ["Paris", "Marseille", "Frankfurt", "Amsterdam"];
export const APAC_CITIES = ["Mumbai", "Bangalore", "Visakhapatnam", "Singapore", "Jakarta"];

export const PROCESS_STEPS = [
  { step: "01", title: "Assess", body: "Review the site, infrastructure, access requirements, risks, and scope of work." },
  { step: "02", title: "Design", body: "Prepare the technical plan, rack elevations, cabling, equipment list, and deployment runbook." },
  { step: "03", title: "Deploy", body: "Install, configure, patching, testing, documenting, and commission the infrastructure." },
  { step: "04", title: "Operate", body: "Provide remote hands, maintenance, monitoring support, spare-parts coordination, and 24/7 incident response." },
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
    a: "Europe and APAC, with colocation across nine facilities — Paris, Marseille, Frankfurt, Amsterdam, Mumbai, Bangalore, Visakhapatnam, Singapore, and Jakarta — plus dispatch coverage across 10+ countries, and more on request.",
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
      "On-site technical team, available when you cannot be there. Trained data center engineers for planned work, urgent incidents, and day-to-day operational support — working under your remote guidance or an agreed runbook, with clear updates and evidence from site.",
    bullets: [
      "Server reboot, power-cycle, and console access",
      "Visual inspection of LEDs, alarms, cables, and equipment status",
      "Rack & stack, device replacement, and spare-part installation",
      "Fibre and copper patching, cross-connect support, and labelling",
      "SFP/QSFP optic replacement and link troubleshooting",
      "Remote console setup and assistance with vendor engineers",
      "Asset verification, serial-number capture, and inventory updates",
      "Photo/video reporting before and after work",
      "Escort support for customers, carriers, and third-party vendors",
      "Emergency incident response and first-line troubleshooting",
    ],
    sla: "24/7 dispatch · emergency and scheduled",
  },
  "rack-and-stack": {
    intro:
      "From pallet to production: unboxing, rail installation, rack mounting, dual-power connection, structured cabling, labelling, and first power-on. Every deployment is completed with documented rack elevations and installation evidence.",
    bullets: [
      "Server, switch, router, storage, and appliance installation",
      "Rails, cable management, PDUs, and dual-power connections",
      "Copper, fibre, DAC, and AOC cabling",
      "Device labelling, serial-number capture, and asset records",
      "Rack elevation diagrams and before/after photographs",
      "Basic power-on checks and remote handover support",
    ],
    sla: "Per-rack or per-project scope",
  },
  "site-survey-audit": {
    intro:
      "Know the site before you deploy, migrate, or expand. Detailed on-site surveys and infrastructure audits to give you a clear, accurate view of your data center environment before work begins or after project handovers.",
    bullets: [
      "Rack space, available RU, and rack condition assessment",
      "Power capacity, PDU types, sockets, and A/B feed verification",
      "Fibre, copper, patch-panel, and cross-connect review",
      "Equipment, serial-number, and asset inventory verification",
      "Cabling condition, labelling, and documentation audit",
      "Cooling, airflow, and physical-access observations",
      "Photographs, rack elevations, and a detailed survey report",
      "Risk identification and recommendations before deployment or migration",
      "Ekahau wireless site survey, where required",
    ],
    sla: "Audit report delivered within 5 working days",
  },
  "migrations-decommissioning": {
    intro:
      "Move, refresh, or retire infrastructure with control at every stage. A clear runbook, on-site engineering, and full documentation — helping minimise risk and service disruption.",
    bullets: [
      "Pre-migration site survey, asset audit, and migration plan",
      "Safe shutdown, de-racking, packing, and transport handover",
      "Rack relocation, re-cabling, patching, and power reconnection",
      "Coordinated cutovers with your remote engineers, carriers, and facility teams",
      "Post-migration power-on checks and connectivity validation",
      "Secure removal of retired equipment, cables, and accessories",
      "Certified SSD and HDD destruction or disposal through approved partners",
      "Before-and-after photos, rack elevations, and completion documentation",
    ],
    sla: "Planned windows, including weekends and nights",
  },
  colocation: {
    intro:
      "Flexible colocation space, compute, storage, and connectivity across key data center markets — carrier-neutral facilities across Europe and APAC, with our own engineers already on site.",
    bullets: [
      "Rack, quarter-rack, half-rack, and dedicated-cabinet options, subject to availability",
      "A/B power, monitored environments, and 24/7 remote-hands support",
      "10G, 25G, 40G, and 100G uplinks designed to customer specifications",
      "Internet transit, cross-connects, fibre patching, and carrier coordination",
      "Storage: NVMe, SSD, HDD, and RAID configurations",
      "GPU capacity: multiple GPU options for AI, rendering, analytics, and high-performance workloads",
      "Paris, Marseille, Frankfurt, Amsterdam, Mumbai, Bangalore, Visakhapatnam, Singapore, Jakarta",
    ],
    sla: "Space in 9+ facilities, more on request",
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
  "testing-certification": {
    intro:
      "Proof, not assumptions. TelicomLink validates fibre, network, and data center infrastructure with specialist test equipment and clear, shareable reports — identifying faults early and confirming performance before service.",
    bullets: [
      "OTDR testing for fibre length, loss events, breaks, bends, and connector quality",
      "Ethernet bit-error-rate testing (BERT) at 10G, 100G, and up to 400G",
      "RFC 2544 throughput, latency, frame-loss, and back-to-back testing, where required",
      "Copper cabling continuity and basic network connectivity checks",
      "DWDM turn-up, channel provisioning, and link certification",
      "Ekahau wireless survey and testing, where required",
    ],
    sla: "Signed test reports with every job",
  },
  "data-center-commissioning": {
    intro:
      "Configuration, validation, and end-to-end readiness before live traffic moves. Our commissioning engineers take over after physical deployment to configure, validate, and hand over the complete environment.",
    bullets: [
      "Configure servers, operating systems, management interfaces, and remote access",
      "Configure switches, core routers, PDUs, console servers, and network equipment",
      "Apply approved IP addressing, VLANs, port configuration, routing, and access-control policies",
      "Verify A/B power, PDU status, device alarms, and redundant connections",
      "Validate copper, fibre, optics, patching, and port status",
      "Test end-to-end connectivity from the client environment to the deployed infrastructure",
      "Support traffic migration, change windows, and live-service activation",
      "Identify issues, perform first-line troubleshooting, and track corrective actions",
    ],
    sla: "Phased Lv1–Lv5 commissioning support",
  },
  "spare-parts-management": {
    intro:
      "The right parts, ready when your data center needs them. Secure storage, inventory, and inbound/outbound logistics for critical spares — keeping essential materials close to the point of need.",
    bullets: [
      "Secure storage for customer-owned equipment, tools, and spare parts",
      "Receipt of inbound deliveries, quantity checks, condition checks, and photo evidence",
      "Serial-number capture, asset registration, and inventory tracking",
      "Pick, pack, and dispatch support for site deployments and replacements",
      "Same-day or scheduled delivery coordination, where available",
      "Return-material handling and RMA preparation with your vendors",
      "Ready stock of common consumables — patch cords, optics, DAC/AOC cables, rails, and cage nuts",
    ],
    sla: "Same-day part swap where stock is on site",
  },
};

/**
 * status drives the badge colour: "available" (green) / "full" (amber) /
 * "sold-out" (muted, "new space coming soon"). `live` adds the blinking
 * dot + `sla` badge — reserved for Paris & Marseille per client request.
 */
export type FacilityStatus = "available" | "full" | "sold-out";

export type Facility = {
  city: string;
  country: string;
  region: "Europe" | "APAC";
  note: string;
  status: FacilityStatus;
  statusNote?: string;
  live?: boolean;
  sla?: string;
  /** [longitude, latitude] — drives the pin on the coverage map. */
  coords: [number, number];
};

export const FACILITIES: Facility[] = [
  { city: "Paris", country: "France", region: "Europe", note: "Primary European hub and dispatch base", status: "available", live: true, sla: "2H SLA to site", coords: [2.3522, 48.8566] },
  { city: "Marseille", country: "France", region: "Europe", note: "Subsea cable landing gateway to EMEA", status: "available", live: true, sla: "2H SLA to site", coords: [5.3698, 43.2965] },
  { city: "Frankfurt", country: "Germany", region: "Europe", note: "DE-CIX interconnection density", status: "available", live: true, coords: [8.6821, 50.1109] },
  { city: "Amsterdam", country: "Netherlands", region: "Europe", note: "AMS-IX peering and cloud on-ramps", status: "available", live: true, coords: [4.9041, 52.3676] },
  { city: "Belgium", country: "Belgium", region: "Europe", note: "New coverage — dispatch on request", status: "sold-out", statusNote: "New space coming soon", coords: [4.3517, 50.8503] },
  { city: "Spain", country: "Spain", region: "Europe", note: "New coverage — dispatch on request", status: "sold-out", statusNote: "New space coming soon", coords: [-3.7038, 40.4168] },
  { city: "Italy", country: "Italy", region: "Europe", note: "New coverage — dispatch on request", status: "sold-out", statusNote: "New space coming soon", coords: [12.4964, 41.9028] },
  { city: "Finland", country: "Finland", region: "Europe", note: "New coverage — dispatch on request", status: "sold-out", statusNote: "New space coming soon", coords: [24.9384, 60.1699] },
  { city: "Norway", country: "Norway", region: "Europe", note: "New coverage — dispatch on request", status: "sold-out", statusNote: "New space coming soon", coords: [10.7522, 59.9139] },
  { city: "Sweden", country: "Sweden", region: "Europe", note: "New coverage — dispatch on request", status: "sold-out", statusNote: "New space coming soon", coords: [18.0686, 59.3293] },
  { city: "Luxembourg", country: "Luxembourg", region: "Europe", note: "New coverage — dispatch on request", status: "sold-out", statusNote: "New space coming soon", coords: [6.1319, 49.6116] },
  { city: "Mumbai", country: "India", region: "APAC", note: "India's largest interconnection market", status: "full", coords: [72.8777, 19.076] },
  { city: "Bangalore", country: "India", region: "APAC", note: "Enterprise and IT services corridor", status: "available", coords: [77.5946, 12.9716] },
  { city: "Visakhapatnam", country: "India", region: "APAC", note: "First data center service provider for Visakhapatnam — supporting the next generation of digital infrastructure in Andhra Pradesh and across APAC", status: "available", statusNote: "Construction in progress — high demand", coords: [83.2185, 17.6868] },
  { city: "Singapore", country: "Singapore", region: "APAC", note: "South-East Asia gateway", status: "full", coords: [103.8198, 1.3521] },
  { city: "Jakarta", country: "Indonesia", region: "APAC", note: "Fast-growing Southeast Asian digital infrastructure market", status: "available", coords: [106.8456, -6.2088] },
];

export const WHY_STATS = [
  { value: "24/7", label: "Dispatch, every day of the year" },
  { value: "400G", label: "BERT and optical certification" },
  { value: "09", label: "Colocation cities" },
  { value: "02", label: "Regions, one accountable team" },
];

/** Client-supplied delivery numbers — shown on the services page. */
export const PROJECT_STATS = [
  { value: "250+", label: "Projects handed over" },
  { value: "65,000+", label: "GPUs installed" },
  { value: "20,000+", label: "Miles of fibre deployed" },
  { value: "100+", label: "Field engineers" },
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
