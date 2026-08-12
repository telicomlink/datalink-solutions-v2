import { CONTACT } from "@/lib/site-data";

export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)] transition-transform duration-[var(--tl-dur)] ease-tl hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.829 1.782 6.86L2 30l7.347-1.757A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm0 25.6a11.55 11.55 0 0 1-5.89-1.608l-.422-.252-4.36 1.043 1.072-4.25-.276-.436A11.56 11.56 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6Zm6.34-8.64c-.347-.174-2.055-1.013-2.374-1.129-.319-.116-.551-.174-.783.174-.232.347-.899 1.129-1.102 1.362-.203.232-.406.26-.753.087-.347-.174-1.464-.54-2.788-1.72-1.03-.918-1.726-2.052-1.929-2.399-.203-.347-.022-.535.153-.708.157-.156.347-.406.521-.609.174-.203.232-.347.347-.579.116-.232.058-.435-.029-.609-.087-.174-.783-1.887-1.073-2.585-.283-.678-.57-.586-.783-.597l-.667-.011c-.232 0-.609.087-.928.435-.319.347-1.218 1.19-1.218 2.903s1.247 3.367 1.42 3.599c.174.232 2.453 3.745 5.944 5.252.831.359 1.48.573 1.985.733.834.265 1.594.228 2.194.138.669-.1 2.055-.84 2.345-1.652.29-.812.29-1.508.203-1.652-.086-.145-.318-.232-.666-.406Z"/>
      </svg>
    </a>
  );
}
