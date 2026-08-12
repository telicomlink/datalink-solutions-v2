import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 rounded-[var(--tl-r-lg)] border border-border bg-surface p-4 shadow-[var(--tl-shadow-md)] w-56">
          <p className="tl-mono text-muted-foreground text-[11px] uppercase tracking-widest mb-1">WhatsApp</p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-[#25d366] px-4 py-2 text-small font-medium text-white no-underline transition-opacity hover:opacity-90"
          >
            <Phone size={14} aria-hidden="true" /> EU · France
          </a>
          <a
            href={CONTACT.whatsappApac}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--tl-r-pill)] bg-[#25d366] px-4 py-2 text-small font-medium text-white no-underline transition-opacity hover:opacity-90"
          >
            <Phone size={14} aria-hidden="true" /> APAC · India
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp menu" : "Open WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[var(--tl-shadow-md)] transition-transform duration-[var(--tl-dur)] ease-tl hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]"
      >
        {open ? <X size={22} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
      </button>
    </div>
  );
}
