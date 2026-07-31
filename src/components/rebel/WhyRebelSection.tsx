import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal, SectionHeading, staggerChild, StaggerGroup } from "./motion-primitives";

const PRINCIPLES = [
  { num: "01", title: "Right People", body: "We focus on prospects that actually fit your business." },
  {
    num: "02",
    title: "Smart Strategy",
    body: "Every outreach approach starts with understanding the audience.",
  },
  {
    num: "03",
    title: "Human Connection",
    body: "We believe conversations outperform generic spam.",
  },
  {
    num: "04",
    title: "Results First",
    body: "Our goal is simple: create opportunities that can become business.",
  },
];

const TRUST = [
  { title: "Research Before Outreach", body: "We don't believe in blindly sending messages." },
  { title: "Personalization Over Spam", body: "Every prospect deserves relevant communication." },
  { title: "Transparency", body: "Clear communication and honest reporting." },
  { title: "Consistency", body: "Growth is built through consistent execution." },
  {
    title: "Partnership",
    body: "We work as an extension of your business, not just another vendor.",
  },
];

export function WhyRebelSection() {
  return (
    <section id="why-rebel" className="relative overflow-hidden py-24 sm:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="The difference"
          title="Why Rebel?"
          subtitle={
            <>
              Because growth isn't about reaching everyone.
              <span className="block text-foreground">It's about reaching the right ones.</span>
            </>
          }
        />

        <StaggerGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.num}
              variants={staggerChild}
              className="group relative bg-background p-8 transition-colors duration-500 hover:bg-card sm:p-12"
            >
              <span className="font-display text-[3.5rem] leading-none text-transparent [-webkit-text-stroke:1px_var(--color-border)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_var(--color-primary)] sm:text-[5rem]">
                {p.num}
              </span>
              <h3 className="mt-6 font-display text-lg uppercase tracking-[0.06em] sm:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Trust</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-title text-[clamp(2rem,5.5vw,4rem)]">
                Built on trust.
                <span className="block text-gradient-ember">Driven by results.</span>
              </h2>
            </Reveal>
          </div>

          <StaggerGroup className="space-y-px overflow-hidden rounded-2xl border border-border bg-border">
            {TRUST.map((t) => (
              <motion.div
                key={t.title}
                variants={staggerChild}
                className="group flex gap-5 bg-background p-6 transition-colors duration-400 hover:bg-card sm:p-7"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors duration-400 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Check size={15} />
                </span>
                <div>
                  <h3 className="font-display text-sm uppercase tracking-[0.14em]">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
