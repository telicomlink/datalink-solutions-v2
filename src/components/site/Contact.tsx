import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/site-data";
import { Button, ButtonAnchor } from "./Button";
import { Section, MonoLabel, SectionHeading, SectionLead } from "./Section";
import { useReveal } from "./Reveal";

const fieldClass =
  "mt-2 w-full rounded-[var(--tl-r-sm)] border border-border bg-surface px-4 py-3 text-small text-foreground outline-none transition-colors duration-[var(--tl-dur)] ease-tl placeholder:text-muted-foreground focus:border-primary";
const labelClass = "block tl-mono text-muted-foreground";

function ContactCard({
  title,
  place,
  phone,
  phoneHref,
}: {
  title: string;
  place: string;
  phone: string;
  phoneHref: string;
}) {
  return (
    <div
      data-reveal
      className="tl-reveal rounded-[var(--tl-r-lg)] border border-border bg-surface p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]"
    >
      <h3 className="tl-mono text-muted-foreground">{title}</h3>
      <p className="mt-2 font-display text-h3 font-bold text-foreground">{place}</p>
      <div className="mt-4 flex flex-col">
        <a
          href={phoneHref}
          className="inline-flex min-h-[var(--tl-control-h-sm)] items-center gap-2 text-small text-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-muted-foreground"
        >
          <Phone size={14} aria-hidden="true" /> {phone}
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex min-h-[var(--tl-control-h-sm)] items-center gap-2 text-small text-muted-foreground no-underline transition-colors duration-[var(--tl-dur)] ease-tl hover:text-foreground"
        >
          <Mail size={14} aria-hidden="true" /> {CONTACT.email}
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const asideRef = useReveal<HTMLDivElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company")}`,
      `Phone: ${data.get("phone")}`,
      `Service: ${data.get("service")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Enquiry from ${data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Section id="contact">
      <MonoLabel>Contact</MonoLabel>
      <SectionHeading className="max-w-[24ch]">
        Tell us the facility, the task, and the timeline.
      </SectionHeading>
      <SectionLead>A real person replies — not a ticket queue.</SectionLead>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          {sent ? (
            <div
              role="status"
              className="rounded-[var(--tl-r-lg)] border border-border bg-background p-8"
            >
              <p className="font-display text-h3 font-bold text-foreground">
                Message ready to send.
              </p>
              <p className="mt-2 text-small text-muted-foreground">
                Your email app should have opened with the details — send it and we&apos;ll get back
                to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="cf-name">
                    Name <span className="text-[color:var(--tl-accent-text)]">*</span>
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    required
                    className={fieldClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="cf-email">
                    Work email <span className="text-[color:var(--tl-accent-text)]">*</span>
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    className={fieldClass}
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="cf-company">
                    Company
                  </label>
                  <input
                    id="cf-company"
                    name="company"
                    className={fieldClass}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="cf-phone">
                    Phone
                  </label>
                  <input id="cf-phone" name="phone" className={fieldClass} placeholder="+33 …" />
                </div>
              </div>

              <div className="mt-6">
                <label className={labelClass} htmlFor="cf-service">
                  Service interest
                </label>
                <select id="cf-service" name="service" className={fieldClass} defaultValue="">
                  <option value="">Not sure yet</option>
                  {SERVICES.map((svc) => (
                    <option key={svc.slug} value={svc.name}>
                      {svc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label className={labelClass} htmlFor="cf-message">
                  Message <span className="text-[color:var(--tl-accent-text)]">*</span>
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  required
                  rows={5}
                  className={fieldClass}
                  placeholder="Facility, scope, and timeline"
                />
              </div>

              <Button type="submit" arrow className="mt-8 w-full sm:w-auto">
                Send message
              </Button>
            </form>
          )}
        </div>

        <div ref={asideRef} className="flex flex-col gap-6">
          <ContactCard
            title="Europe"
            place={CONTACT.europeBase}
            phone={CONTACT.phoneEurope}
            phoneHref={CONTACT.phoneEuropeHref}
          />
          <ContactCard
            title="India & APAC"
            place={CONTACT.apacBase}
            phone={CONTACT.phoneApac}
            phoneHref={CONTACT.phoneApacHref}
          />

          <div
            data-reveal
            className="tl-reveal rounded-[var(--tl-r-lg)] border border-border bg-surface p-6 shadow-[var(--tl-edge),var(--tl-shadow-md)]"
          >
            <h3 className="tl-mono text-muted-foreground">Hours</h3>
            <dl className="mt-4 flex flex-col gap-4">
              <div>
                <dt className="text-small text-muted-foreground">
                  Emergency &amp; remote hands support
                </dt>
                <dd className="mt-1 inline-flex items-center gap-2 tl-figure text-small text-foreground">
                  <Clock size={14} aria-hidden="true" className="text-primary" /> 24/7, 365 days
                </dd>
              </div>
              <div>
                <dt className="text-small text-muted-foreground">Sales &amp; coordination</dt>
                <dd className="mt-1 tl-figure text-small text-foreground">
                  Mon–Fri, 08:30–17:30 CET
                  <span className="block text-muted-foreground">(12:00–21:00 IST)</span>
                </dd>
              </div>
            </dl>
          </div>

          <ButtonAnchor href={CONTACT.whatsapp} external variant="outline" className="w-full">
            <MessageCircle size={16} aria-hidden="true" /> Message us on WhatsApp
          </ButtonAnchor>
        </div>
      </div>
    </Section>
  );
}
