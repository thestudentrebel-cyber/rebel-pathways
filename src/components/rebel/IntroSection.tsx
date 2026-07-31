import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./motion-primitives";

export function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} id="meet" className="relative overflow-hidden py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="eyebrow mb-5">Meet Rebel Media HQ</p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div style={{ y: yLeft }}>
            <h2 className="display-title text-[clamp(2.2rem,6.5vw,4.5rem)]">
              Your next client
              <span className="block text-gradient-ember">is already out there.</span>
            </h2>
          </motion.div>

          <motion.div style={{ y: yRight }} className="lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-foreground">
                Rebel Media HQ is a modern lead generation and business growth partner focused on
                helping companies connect with the people who matter most.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                We combine strategy, research, outreach and human connection to help businesses
                create meaningful conversations and better opportunities.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-2">
                {["Strategy", "Research", "Outreach", "Human Connection"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-4 py-2 font-display text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
