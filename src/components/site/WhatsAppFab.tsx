import { CONTACT } from "@/lib/site-data";

export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[var(--tl-wa-glow)] transition-transform duration-[var(--tl-dur)] ease-tl hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-wa)]"
    >
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="24" cy="24" r="24" fill="var(--tl-wa)"/>
        <path fill="white" d="M24 10C16.27 10 10 16.27 10 24c0 2.82.78 5.46 2.14 7.72L10 38l6.47-1.97A13.93 13.93 0 0 0 24 38c7.73 0 14-6.27 14-14S31.73 10 24 10Zm0 25.6a11.55 11.55 0 0 1-5.89-1.61l-.42-.25-3.87.93.96-3.76-.28-.44A11.56 11.56 0 0 1 12.4 24c0-6.4 5.2-11.6 11.6-11.6S35.6 17.6 35.6 24 30.4 35.6 24 35.6Zm6.34-8.64c-.35-.17-2.06-1.01-2.38-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.41.26-.75.09-.35-.17-1.46-.54-2.79-1.72-1.03-.92-1.73-2.05-1.93-2.4-.2-.35-.02-.53.15-.71.16-.16.35-.41.52-.61.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.17-.78-1.89-1.07-2.59-.28-.68-.57-.59-.78-.6l-.67-.01c-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.9s1.25 3.37 1.42 3.6c.17.23 2.45 3.74 5.94 5.25.83.36 1.48.57 1.99.73.83.26 1.59.23 2.19.14.67-.1 2.06-.84 2.35-1.65.29-.81.29-1.51.2-1.65-.08-.15-.32-.23-.67-.41Z"/>
      </svg>
    </a>
  );
}
