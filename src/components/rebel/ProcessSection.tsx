import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./motion-primitives";

const STEPS = [
  {
    num: "01",
    title: "Understand",
    body: "We learn about your business, offer, market and ideal customer.",
  },
  { num: "02", title: "Research", body: "We identify the companies and decision-makers that matter." },
  { num: "03", title: "Connect", body: "We create strategic outreach and start conversations." },
  { num: "04", title: "Qualify", body: "We identify genuine interest and business opportunities." },
  {
    num: "05",
    title: "Grow",
    body: "We help turn conversations into meaningful business outcomes.",
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading eyebrow="Process" title="How we work" />

        <div ref={ref} className="relative mt-16">
          {/* progress rail */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-border lg:left-0 lg:top-[38px] lg:h-px lg:w-full">
            <motion.div
              className="h-full w-full origin-top bg-gradient-ember lg:origin-left"
              style={{ scaleY: lineScale, scaleX: lineScale }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 lg:pl-0 lg:pt-20"
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-background font-display text-xs text-primary lg:left-0 lg:top-[18px]">
                  {s.num}
                </span>
                <h3 className="font-display text-xl uppercase tracking-tight sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
