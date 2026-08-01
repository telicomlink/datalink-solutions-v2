import { MotionButton } from "./Motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICES } from "@/lib/site-data";

const NAV = [
  { to: "/services", label: "Services", mega: true },
  { to: "/why-us", label: "Why us" },
  { to: "/coverage", label: "Coverage" },
  { to: "/contact", label: "Contact" },
] as const;

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`font-display font-bold tracking-[-0.03em] text-foreground no-underline ${className}`}
    >
      TELICOM<span className="text-primary">LINK</span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = (delay = 160) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), delay);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mega
          ? "border-border bg-background/80 backdrop-blur-2xl"
          : "border-transparent bg-transparent"
      }`}
      onMouseLeave={() => closeMega(120)}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6">
        <Wordmark className="text-[21px]" />

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) =>
            "mega" in item && item.mega ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={openMega}
                onFocus={openMega}
              >
                <Link
                  to={item.to}
                  activeProps={{ className: "!text-primary" }}
                  aria-expanded={mega}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`}
                  />
                </Link>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onMouseEnter={() => closeMega(0)}
                activeProps={{ className: "!text-primary" }}
                className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <MotionButton
          href="/contact"
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

      {/* Apple-style mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: reduce ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.6 }}
            className="absolute inset-x-0 top-16 hidden overflow-hidden border-b border-border bg-background/90 backdrop-blur-2xl md:block"
            onMouseEnter={openMega}
            onMouseLeave={() => closeMega(120)}
          >
            <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-10 lg:grid-cols-[1fr_260px]">
              <div>
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  All services
                </p>
                <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICES.map((svc, i) => (
                    <motion.div
                      key={svc.slug}
                      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.03 + i * 0.025, duration: 0.28 }}
                    >
                      <Link
                        to="/services"
                        hash={svc.slug}
                        onClick={() => setMega(false)}
                        className="group block rounded-xl px-3 py-2.5 no-underline transition-colors hover:bg-surface"
                      >
                        <span className="flex items-baseline gap-2">
                          <span className="font-mono text-[11px] text-primary/70">{svc.num}</span>
                          <span className="font-display text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
                            {svc.name}
                          </span>
                        </span>
                        <span className="mt-0.5 block pl-6 text-xs leading-snug text-muted-foreground">
                          {svc.descriptor}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface/70 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  24×7 dispatch
                </p>
                <p className="mt-3 font-display text-lg font-semibold text-foreground">
                  One team, deployment to decommissioning.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Engineers across Europe and APAC, on site when it matters.
                </p>
                <Link
                  to="/services"
                  onClick={() => setMega(false)}
                  className="mt-5 inline-flex text-sm font-semibold text-primary no-underline hover:underline"
                >
                  View all services →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background px-6 pb-8 md:hidden">
          <button
            type="button"
            onClick={() => setMobileServices((v) => !v)}
            className="flex w-full items-center justify-between border-b border-border py-4 font-display text-lg font-semibold text-foreground"
          >
            Services
            <ChevronDown
              size={18}
              className={`transition-transform ${mobileServices ? "rotate-180" : ""}`}
            />
          </button>
          {mobileServices && (
            <div className="border-b border-border py-2">
              {SERVICES.map((svc) => (
                <Link
                  key={svc.slug}
                  to="/services"
                  hash={svc.slug}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm text-muted-foreground no-underline"
                >
                  <span className="font-mono text-[11px] text-primary/70">{svc.num}</span>{" "}
                  {svc.name}
                </Link>
              ))}
            </div>
          )}
          {NAV.filter((n) => n.to !== "/services").map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-lg font-semibold text-foreground no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground no-underline"
          >
            Talk to an engineer
          </Link>
        </div>
      )}
    </header>
  );
}
