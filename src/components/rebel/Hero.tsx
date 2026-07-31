import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useRef } from "react";
import { NetworkCanvas } from "./NetworkCanvas";
import { RebelLogo } from "./RebelLogo";
import { MagneticButton } from "./MagneticButton";
import { EASE } from "./motion-primitives";

const WORDS = ["We build", "business", "connections."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden noise-overlay"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <NetworkCanvas className="h-full w-full" />
      </motion.div>
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
        style={{ background: "var(--gradient-fade)" }}
      />
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full opacity-25 blur-[130px]"
        style={{ background: "var(--gradient-ember)" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-32 sm:px-6 sm:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mb-8 flex items-center gap-4"
        >
          <RebelLogo className="h-14 w-14 sm:h-16 sm:w-16" />
          <div className="h-10 w-px bg-border" />
          <p className="max-w-[10rem] text-[0.62rem] uppercase leading-relaxed tracking-[0.26em] text-muted-foreground">
            B2B Lead Generation & Growth Partner
          </p>
        </motion.div>

        <h1 className="display-title text-[clamp(2.9rem,11vw,9rem)]">
          {WORDS.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 2 ? "text-gradient-ember" : ""}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1, delay: 0.25 + i * 0.14, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          <span className="text-foreground">
            Strategic lead generation that puts your business in front of the right people.
          </span>{" "}
          Rebel Media HQ helps businesses discover the right prospects, start meaningful
          conversations, and turn attention into opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <MagneticButton href="#enquire" className="w-full sm:w-auto">
            Let's Grow Together <ArrowRight size={15} />
          </MagneticButton>
          <MagneticButton href="#meet" variant="ghost" className="w-full sm:w-auto">
            Discover Rebel <ArrowRight size={15} />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
