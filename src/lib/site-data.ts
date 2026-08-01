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
