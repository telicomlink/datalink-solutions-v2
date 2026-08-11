import { useEffect, useId, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, Home, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SERVICES } from "@/lib/site-data";
import { serviceIcon } from "@/lib/service-icons";
import { ButtonLink } from "./Button";
import { Wordmark } from "./Logo";

const HOVER_OPEN_DELAY = 100;
const HOVER_CLOSE_DELAY = 160;

function NavLink({
  to,
  children,
  onMouseEnter,
  exact = false,
}: {
  to: string;
  children: string;
  onMouseEnter?: () => void;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      onMouseEnter={onMouseEnter}
      activeProps={{ "aria-current": "page" }}
      activeOptions={exact ? { exact: true } : undefined}
      className="group relative inline-flex items-center py-2 text-small font-medium text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground aria-[current=page]:text-foreground"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-[var(--tl-dur-fast)] ease-tl group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100"
      />
    </Link>
  );
}

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<"en" | "fr">(
    () => (typeof window !== "undefined" && localStorage.getItem("tl-lang") === "fr" ? "fr" : "en")
  );
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  const megaId = useId();
  const mobileServicesId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const servicesActive = pathname.startsWith("/services");

  const toggleLang = () => {
    const next: "en" | "fr" = lang === "en" ? "fr" : "en";
    setLang(next);
    i18n.changeLanguage(next);
    localStorage.setItem("tl-lang", next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(false);
    setMobileOpen(false);
    setMobileServices(false);
  }, [pathname]);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mega]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(
    () => () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const hoverOpen = () => {
    clearTimers();
    openTimer.current = setTimeout(() => setMega(true), HOVER_OPEN_DELAY);
  };
  const hoverClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setMega(false), HOVER_CLOSE_DELAY);
  };

  return (
    <>
      <a
        href="#main"
        className="tl-sr-focusable rounded-[var(--tl-r-md)] bg-primary px-4 py-2 text-small font-semibold text-primary-foreground no-underline"
      >
        {t("nav.skipToContent")}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--tl-dur)] ease-tl ${
          scrolled || mega
            ? "border-b border-border bg-[color-mix(in_srgb,var(--tl-surface)_92%,transparent)] shadow-md backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        }`}
        onMouseLeave={hoverClose}
      >
        <div className="mx-auto flex h-[var(--tl-header-h-mobile)] max-w-[var(--tl-container)] items-center justify-between px-[var(--tl-gutter)] lg:h-[var(--tl-header-h)] lg:gap-6">
          <Wordmark />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" exact>{t("nav.home")}</NavLink>

            <button
              ref={triggerRef}
              type="button"
              aria-expanded={mega}
              aria-controls={megaId}
              aria-current={servicesActive ? "page" : undefined}
              onClick={() => { clearTimers(); setMega((v) => !v); }}
              onMouseEnter={hoverOpen}
              className="group relative inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent py-2 text-small font-medium text-muted-foreground transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground aria-[current=page]:text-foreground aria-expanded:text-foreground"
            >
              {t("nav.services")}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-[var(--tl-dur)] ease-tl ${mega ? "rotate-180" : ""}`}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-[var(--tl-dur-fast)] ease-tl group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100 group-aria-expanded:scale-x-100"
              />
            </button>

            <NavLink to="/why-us" onMouseEnter={hoverClose}>{t("nav.whyUs")}</NavLink>
            <NavLink to="/coverage" onMouseEnter={hoverClose}>{t("nav.coverage")}</NavLink>
            <NavLink to="/contact" onMouseEnter={hoverClose}>{t("nav.contact")}</NavLink>

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
              className="inline-flex items-center gap-1 rounded-[var(--tl-r-md)] border border-border bg-surface px-3 py-1 tl-mono text-small transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <span className={lang === "en" ? "text-foreground font-semibold" : "text-muted-foreground"}>EN</span>
              <span className="text-border mx-px">|</span>
              <span className={lang === "fr" ? "text-foreground font-semibold" : "text-muted-foreground"}>FR</span>
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-[var(--tl-control-h-sm)] w-[var(--tl-control-h-sm)] cursor-pointer items-center justify-center rounded-[var(--tl-r-md)] border border-border bg-transparent text-foreground transition-colors duration-[var(--tl-dur)] hover:bg-surface lg:hidden"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {/* Desktop mega-menu */}
        <div
          id={megaId}
          onMouseEnter={clearTimers}
          onMouseLeave={hoverClose}
          className={`absolute inset-x-0 top-full border-b border-border bg-surface shadow-lg ${mega ? "hidden lg:block" : "hidden"}`}
        >
          <div className="mx-auto max-w-[var(--tl-container)] px-[var(--tl-gutter)] py-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="tl-mono text-[color:var(--tl-accent-text)]">{t("nav.allServices")}</p>
              <Link
                to="/services/"
                onClick={() => setMega(false)}
                className="tl-arrow inline-flex items-center gap-2 tl-mono text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:text-foreground"
              >
                {t("nav.viewAll")} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid list-none grid-cols-3 gap-x-8 gap-y-1 p-0">
              {SERVICES.map((svc) => {
                const Icon = serviceIcon(svc.icon);
                return (
                  <li key={svc.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: svc.slug }}
                      onClick={() => setMega(false)}
                      className="group flex items-start gap-3 rounded-[var(--tl-r-md)] p-3 no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:bg-surface-raised"
                    >
                      <Icon size={18} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                      <span className="block">
                        <span className="block text-small font-semibold text-foreground">{svc.name}</span>
                        <span className="mt-1 block text-small text-muted-foreground">{svc.descriptor}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-background lg:hidden"
          style={{ paddingTop: "var(--tl-header-h-mobile)" }}
        >
          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col overflow-y-auto px-[var(--tl-gutter)] py-6"
          >
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              activeProps={{ "aria-current": "page" }}
              activeOptions={{ exact: true }}
              className="flex min-h-[var(--tl-control-h)] items-center gap-3 rounded-[var(--tl-r-lg)] border border-transparent px-4 text-body font-semibold text-foreground no-underline transition-colors duration-[var(--tl-dur)] hover:bg-surface aria-[current=page]:border-border aria-[current=page]:bg-surface aria-[current=page]:text-[color:var(--tl-accent-text)]"
            >
              <Home size={18} aria-hidden="true" className="shrink-0 text-primary" />
              {t("nav.home")}
            </Link>

            <div className="my-3 h-px bg-border" />

            <div>
              <button
                type="button"
                aria-expanded={mobileServices}
                aria-controls={mobileServicesId}
                onClick={() => setMobileServices((v) => !v)}
                className={`flex min-h-[var(--tl-control-h)] w-full cursor-pointer items-center justify-between gap-3 rounded-[var(--tl-r-lg)] border px-4 text-body font-semibold transition-colors duration-[var(--tl-dur)] ${
                  servicesActive
                    ? "border-border bg-surface text-[color:var(--tl-accent-text)]"
                    : "border-transparent bg-transparent text-foreground hover:bg-surface"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-[var(--tl-dur)] ${mobileServices ? "rotate-180" : ""}`} />
                  </span>
                  {t("nav.services")}
                </span>
                <span className="tl-mono text-label text-muted-foreground">9</span>
              </button>

              {mobileServices && (
                <ul
                  id={mobileServicesId}
                  className="mt-2 flex list-none flex-col gap-1 rounded-[var(--tl-r-lg)] border border-border bg-surface p-2"
                >
                  {SERVICES.map((svc) => {
                    const Icon = serviceIcon(svc.icon);
                    return (
                      <li key={svc.slug}>
                        <Link
                          to="/services/$slug"
                          params={{ slug: svc.slug }}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-[var(--tl-control-h-sm)] items-center gap-3 rounded-[var(--tl-r-md)] px-3 no-underline transition-colors duration-[var(--tl-dur)] hover:bg-surface-raised"
                        >
                          <Icon size={15} aria-hidden="true" className="shrink-0 text-primary" />
                          <span className="text-small font-medium text-foreground">{svc.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mt-1 border-t border-border pt-1">
                    <Link
                      to="/services/"
                      onClick={() => setMobileOpen(false)}
                      className="tl-arrow flex min-h-[var(--tl-control-h-sm)] items-center gap-2 rounded-[var(--tl-r-md)] px-3 tl-mono text-[color:var(--tl-accent-text)] no-underline transition-colors duration-[var(--tl-dur)] hover:bg-surface-raised"
                    >
                      {t("nav.allServices")} <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            <div className="my-3 h-px bg-border" />

            <NavLink to="/why-us">{t("nav.whyUs")}</NavLink>
            <NavLink to="/coverage">{t("nav.coverage")}</NavLink>
            <NavLink to="/contact">{t("nav.contact")}</NavLink>

            <div className="my-3 h-px bg-border" />

            {/* Mobile language toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex min-h-[var(--tl-control-h)] items-center justify-center gap-3 rounded-[var(--tl-r-lg)] border border-border bg-surface px-4 text-body font-semibold text-foreground"
            >
              <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN — English</span>
              <span className="text-border">/</span>
              <span className={lang === "fr" ? "text-primary" : "text-muted-foreground"}>FR — Français</span>
            </button>
          </nav>

          <div className="border-t border-border bg-surface px-[var(--tl-gutter)] py-4">
            <ButtonLink
              to="/contact"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.talkToEngineer")}
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
