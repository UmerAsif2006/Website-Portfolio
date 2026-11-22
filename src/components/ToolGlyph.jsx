import {
  Binary,
  Bot,
  Braces,
  Clapperboard,
  Compass,
  ContactRound,
  Database,
  FileDown,
  FileText,
  Globe,
  Hash,
  PhoneCall,
  Route,
  ScanSearch,
  SearchCode,
  Sparkles,
  Terminal,
  Video,
  Webhook,
} from "lucide-react";
import { brandIcons, getToolIcon } from "../data/toolIcons";

const LUCIDE = {
  Binary,
  Bot,
  Braces,
  Clapperboard,
  Compass,
  ContactRound,
  Database,
  FileDown,
  FileText,
  Globe,
  Hash,
  PhoneCall,
  Route,
  ScanSearch,
  SearchCode,
  Sparkles,
  Terminal,
  Video,
  Webhook,
};

/** The logo (or a matching generic icon) for a tool name from the data files. */
export default function ToolGlyph({ name, size = 15 }) {
  const icon = getToolIcon(name);

  if (icon.brand) {
    const brand = brandIcons[icon.brand];
    if (!brand) return null;
    return (
      <svg viewBox={brand.viewBox} width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
        {brand.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  const LucideIcon = LUCIDE[icon.lucide] || Hash;
  return <LucideIcon size={size} aria-hidden="true" />;
}
