import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { MagneticButton } from "./MagneticButton";
import { Reveal, EASE } from "./motion-primitives";

const SERVICES = [
  "Lead Generation",
  "B2B Outreach",
  "Appointment Setting",
  "Prospect Research",
  "Business Development",
  "Growth Strategy",
  "Not Sure Yet",
];

const emptyForm = {
  full_name: "",
  company_name: "",
  email: "",
  phone: "",
  website: "",
  service_required: "",
  business_description: "",
  requirement: "",
};

const enquirySchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  company_name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50),
  website: z.string().trim().max(200),
  service_required: z.string().trim().max(80),
  business_description: z.string().trim().max(2000),
  requirement: z.string().trim().max(4000),
});

const fieldClass =
  "w-full rounded-xl border border-border bg-card/50 px-4 py-3.5 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/60 focus:border-primary";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label} {required ? <span className="text-primary">*</span> : null}
      </span>
      {children}
    </label>
  );
}

export function EnquirySection() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    try {
      const values = enquirySchema.parse(form);
      const { error: submissionError } = await supabase.from("enquiries").insert({
        full_name: values.full_name,
        company_name: values.company_name,
        email: values.email,
        phone: values.phone || null,
        website: values.website || null,
        service_required: values.service_required || null,
        business_description: values.business_description || null,
        requirement: values.requirement || null,
      });
      if (submissionError) throw submissionError;

      setStatus("done");
      setForm(emptyForm);
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="enquire" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="rounded-3xl border border-primary/40 bg-card/50 px-6 py-20 text-center shadow-ember sm:px-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-ember"
              >
                <Check size={34} className="text-primary-foreground" />
              </motion.div>
              <h2 className="display-title mt-8 text-[clamp(1.8rem,5vw,3rem)]">Enquiry received.</h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Thanks for reaching out to Rebel Media HQ. We'll be in touch soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 font-display text-[0.68rem] uppercase tracking-[0.2em] text-primary"
              >
                Send another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <Reveal>
                <p className="eyebrow mb-5">Enquiry</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="display-title text-[clamp(2.4rem,8vw,5rem)]">Let's talk.</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-xl text-muted-foreground">
                  Tell us a little about your business and what you're looking to achieve.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <form onSubmit={onSubmit} className="mt-12 grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" required>
                    <input
                      required
                      value={form.full_name}
                      onChange={set("full_name")}
                      className={fieldClass}
                      placeholder="Jane Doe"
                    />
                  </Field>
                  <Field label="Company Name" required>
                    <input
                      required
                      value={form.company_name}
                      onChange={set("company_name")}
                      className={fieldClass}
                      placeholder="Acme Ltd"
                    />
                  </Field>
                  <Field label="Work Email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      className={fieldClass}
                      placeholder="jane@acme.com"
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      className={fieldClass}
                      placeholder="+44 7000 000000"
                    />
                  </Field>
                  <Field label="Website">
                    <input
                      value={form.website}
                      onChange={set("website")}
                      className={fieldClass}
                      placeholder="acme.com"
                    />
                  </Field>
                  <Field label="What are you looking for?">
                    <select
                      value={form.service_required}
                      onChange={set("service_required")}
                      className={fieldClass}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="What does your business do?">
                      <textarea
                        rows={3}
                        value={form.business_description}
                        onChange={set("business_description")}
                        className={`${fieldClass} resize-none`}
                        placeholder="A short description of your business"
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Tell us about your requirement">
                      <textarea
                        rows={4}
                        value={form.requirement}
                        onChange={set("requirement")}
                        className={`${fieldClass} resize-none`}
                        placeholder="What would you like to achieve?"
                      />
                    </Field>
                  </div>

                  {error ? (
                    <p className="text-sm text-destructive sm:col-span-2">{error}</p>
                  ) : null}

                  <div className="sm:col-span-2">
                    <MagneticButton
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full sm:w-auto"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" /> Sending
                        </>
                      ) : (
                        <>
                          Send Enquiry <ArrowRight size={15} />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
