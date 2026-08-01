import { useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/site-data";
import { MotionButton, MotionCard, MotionSubmit } from "./Motion";
import { Eyebrow, Reveal, SectionHeading } from "./Reveal";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary";
const labelClass =
  "block font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground";

export function Contact() {
  const [sent, setSent] = useState(false);

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
    <section id="contact" className="px-6 py-[clamp(56px,10vw,128px)]">
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow>Contact</Eyebrow>
        <SectionHeading>Tell us the facility, the task, and the timeline.</SectionHeading>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
          A real person replies — not a ticket queue.
        </p>

        <div className="mt-12 flex flex-wrap gap-12">
          <div className="min-w-[320px] flex-[2]">
            {sent ? (
              <div
                role="status"
                className="rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center"
              >
                <p className="font-display text-xl font-semibold">Message ready to send.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your email app should have opened with the details — send it and we'll get back to
                  you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="cf-name">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input id="cf-name" name="name" required className={fieldClass} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="cf-email">
                      Work email <span className="text-primary">*</span>
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
                    <input id="cf-company" name="company" className={fieldClass} placeholder="Company name" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="cf-phone">
                      Phone
                    </label>
                    <input id="cf-phone" name="phone" className={fieldClass} placeholder="+33 …" />
                  </div>
                </div>

                <div className="mt-5">
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

                <div className="mt-5">
                  <label className={labelClass} htmlFor="cf-message">
                    Message <span className="text-primary">*</span>
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

                <MotionSubmit
                  type="submit"
                  className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent"
                >
                  Send message <ArrowRight size={18} />
                </MotionSubmit>
              </form>
            )}
          </div>

          <div className="flex min-w-[280px] flex-1 flex-col gap-5">
            <Reveal>
              <MotionCard className="rounded-2xl"><div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/40">
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  Europe
                </h3>
                <p className="mt-2 font-display text-lg font-semibold">{CONTACT.europeBase}</p>
                <div className="mt-3.5 flex flex-col gap-1.5 text-sm">
                  <a
                    href={CONTACT.phoneEuropeHref}
                    className="inline-flex items-center gap-2 text-foreground no-underline hover:text-primary"
                  >
                    <Phone size={14} /> {CONTACT.phoneEurope}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2 text-muted-foreground no-underline hover:text-primary"
                  >
                    <Mail size={14} /> {CONTACT.email}
                  </a>
                </div>
              </div></MotionCard>
            </Reveal>

            <Reveal delay={80}>
              <MotionCard className="rounded-2xl"><div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/40">
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  India &amp; APAC
                </h3>
                <p className="mt-2 font-display text-lg font-semibold">{CONTACT.apacBase}</p>
                <div className="mt-3.5 flex flex-col gap-1.5 text-sm">
                  <a
                    href={CONTACT.phoneApacHref}
                    className="inline-flex items-center gap-2 text-foreground no-underline hover:text-primary"
                  >
                    <Phone size={14} /> {CONTACT.phoneApac}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2 text-muted-foreground no-underline hover:text-primary"
                  >
                    <Mail size={14} /> {CONTACT.email}
                  </a>
                </div>
              </div></MotionCard>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  Hours
                </h3>
                <p className="mt-2.5 text-sm text-muted-foreground">
                  Emergency &amp; remote hands support
                </p>
                <p className="mt-1 inline-flex items-center gap-2 font-display text-base font-semibold text-foreground">
                  <Clock size={15} className="text-primary" /> 24/7, 365 days
                </p>
              </div>
            </Reveal>

            <MotionButton
              href={CONTACT.whatsapp}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 text-sm font-semibold text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle size={18} /> Message us on WhatsApp
            </MotionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
