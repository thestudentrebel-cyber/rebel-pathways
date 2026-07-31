import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function StatementSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const o1 = useTransform(scrollYProgress, [0.05, 0.2, 0.34, 0.42], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.42], [40, -40]);
  const o2 = useTransform(scrollYProgress, [0.42, 0.55, 0.68, 0.76], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.42, 0.76], [40, -40]);
  const o3 = useTransform(scrollYProgress, [0.76, 0.86, 1], [0, 1, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.2], ["14px", "0px"]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden noise-overlay">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[150px]"
          style={{ background: "var(--gradient-ember)" }}
        />
        <div className="relative mx-auto w-full max-w-5xl px-5 text-center sm:px-6">
          <motion.h2
            style={{ opacity: o1, y: y1, filter: blur }}
            className="display-title absolute inset-x-0 top-1/2 -translate-y-1/2 text-[clamp(2.4rem,9vw,7rem)]"
          >
            Stop chasing
            <span className="block">everyone.</span>
          </motion.h2>

          <motion.h2
            style={{ opacity: o2, y: y2 }}
            className="display-title absolute inset-x-0 top-1/2 -translate-y-1/2 text-[clamp(2.4rem,9vw,7rem)]"
          >
            Start talking
            <span className="block text-gradient-ember">to the right people.</span>
          </motion.h2>

          <motion.p
            style={{ opacity: o3 }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-display text-[clamp(1.1rem,3.4vw,2rem)] uppercase tracking-[0.2em]"
          >
            That's the Rebel approach.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
