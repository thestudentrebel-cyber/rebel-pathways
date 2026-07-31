import { ArrowRight } from "lucide-react";
import { NetworkCanvas } from "./NetworkCanvas";
import { RebelLogo } from "./RebelLogo";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./motion-primitives";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40 noise-overlay">
      <NetworkCanvas className="absolute inset-0 h-full w-full opacity-50" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]"
        style={{ background: "var(--gradient-ember)" }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
        <Reveal>
          <RebelLogo className="mx-auto h-16 w-16 sm:h-20 sm:w-20" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display-title mt-8 text-[clamp(2.2rem,7vw,5rem)]">
            Ready to start
            <span className="block text-gradient-ember">a better conversation?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Let's identify the right opportunities for your business.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href="#enquire" className="w-full sm:w-auto">
              Start a Conversation <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton href="#enquire" variant="ghost" className="w-full sm:w-auto">
              Enquire Now
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
