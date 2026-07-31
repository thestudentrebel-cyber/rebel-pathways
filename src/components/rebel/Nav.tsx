import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { RebelLogo } from "./RebelLogo";
import { EASE } from "./motion-primitives";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Why Rebel", href: "#why-rebel" },
  { label: "Process", href: "#process" },
  { label: "Enquire", href: "#enquire" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-ember"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="fixed inset-x-0 top-3 z-[70] px-4 sm:top-5 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            scrolled ? "glass-panel shadow-panel" : "border border-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-3">
            <RebelLogo className="h-9 w-9" />
            <span className="font-display text-[0.7rem] uppercase tracking-[0.22em] sm:text-xs">
              Rebel Media HQ
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-display text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#enquire"
              data-cursor="cta"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-ember px-5 py-2.5 font-display text-[0.68rem] uppercase tracking-[0.16em] text-primary-foreground transition-transform duration-300 hover:scale-[1.04] sm:flex"
            >
              Let's Talk <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-border p-2.5 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 6%)" }}
            animate={{ clipPath: "circle(150% at 90% 6%)" }}
            exit={{ clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[85] flex flex-col bg-background noise-overlay lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <RebelLogo className="h-9 w-9" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-border p-2.5"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: EASE }}
                  className="display-title border-b border-border py-4 text-4xl"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="px-6 pb-10">
              <a
                href="#enquire"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-ember px-6 py-4 font-display text-xs uppercase tracking-[0.2em] text-primary-foreground"
              >
                Let's Talk <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
