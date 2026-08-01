import { MotionButton } from "./Motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why us" },
  { href: "#coverage", label: "Coverage" },
  { href: "#contact", label: "Contact" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`font-display font-bold tracking-[-0.03em] text-foreground no-underline ${className}`}
    >
      TELICOM<span className="text-primary">LINK</span>
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-6">
        <Wordmark className="text-[21px]" />

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <MotionButton
          href="#contact"
          className="hidden !min-h-11 !px-5 !py-2.5 !text-sm md:inline-flex"
        >
          Talk to an engineer
        </MotionButton>


        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-8 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-lg font-semibold text-foreground no-underline"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground no-underline"
          >
            Talk to an engineer <ArrowRight size={18} />
          </a>
        </div>
      )}
    </header>
  );
}
