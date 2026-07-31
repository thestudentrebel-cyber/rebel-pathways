import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { SectionHeading, staggerChild, StaggerGroup } from "./motion-primitives";

const AUDIENCES = [
  "B2B Companies",
  "SaaS Businesses",
  "Startups",
  "Agencies",
  "Professional Services",
  "Technology Companies",
  "Growing Businesses",
  "Founders & Entrepreneurs",
];

const COMPARISON: Array<[string, string]> = [
  ["Generic", "Research-led"],
  ["Mass messaging", "Targeted"],
  ["Low relevance", "Personalized"],
  ["Spam-heavy", "Human"],
  ["Quantity-focused", "Opportunity-focused"],
];

export function WhoWeHelpSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading eyebrow="Audience" title="Who we help" />
        <StaggerGroup className="mt-12 flex flex-wrap gap-3">
          {AUDIENCES.map((a) => (
            <motion.span
              key={a}
              variants={staggerChild}
              whileHover={{ y: -4 }}
              data-cursor="card"
              className="rounded-full border border-border bg-card/40 px-5 py-3 font-display text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-foreground sm:px-7 sm:py-4 sm:text-sm"
            >
              {a}
            </motion.span>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function DifferenceSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <SectionHeading eyebrow="Comparison" title="The Rebel difference" align="center" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Typical Outreach
            </h3>
            <StaggerGroup className="mt-6 space-y-4">
              {COMPARISON.map(([left]) => (
                <motion.div
                  key={left}
                  variants={staggerChild}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <X size={15} className="shrink-0 opacity-60" />
                  {left}
                </motion.div>
              ))}
            </StaggerGroup>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card/60 p-6 shadow-ember sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background:
                  "radial-gradient(500px circle at 80% 0%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 65%)",
              }}
            />
            <h3 className="relative font-display text-xs uppercase tracking-[0.2em] text-primary">
              The Rebel Approach
            </h3>
            <StaggerGroup className="relative mt-6 space-y-4">
              {COMPARISON.map(([, right]) => (
                <motion.div
                  key={right}
                  variants={staggerChild}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <Check size={15} className="shrink-0 text-primary" />
                  {right}
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
