import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RebelLogo } from "./RebelLogo";
import { EASE } from "./motion-primitives";

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1700;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
      else {
        setVisible(false);
        window.setTimeout(onDone, 650);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background noise-overlay"
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.04 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, filter: "blur(24px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <RebelLogo variant="full" className="h-28 w-28 sm:h-36 sm:w-36" />
          </motion.div>

          <motion.h1
            className="display-title mt-8 text-[clamp(1.5rem,5vw,2.5rem)]"
            initial={{ opacity: 0, y: 16, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.12em" }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Rebel Media HQ
          </motion.h1>

          <motion.p
            className="mt-3 text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Building better business connections.
          </motion.p>

          <div className="mt-10 h-px w-48 overflow-hidden bg-border sm:w-64">
            <div
              className="h-full bg-gradient-ember"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
