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

/** Shared by the header mega-menu and the service card grid. */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
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

export function serviceIcon(key: string): LucideIcon {
  return SERVICE_ICONS[key] ?? Server;
}
