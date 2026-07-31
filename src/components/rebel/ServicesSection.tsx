import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Radar,
  Send,
  Search,
  CalendarCheck,
  TrendingUp,
  Link2,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { SectionHeading, staggerChild, StaggerGroup } from "./motion-primitives";

type Service = { num: string; title: string; body: string; Icon: LucideIcon };

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Lead Generation",
    body: "We identify and connect you with relevant prospects that match your ideal customer profile.",
    Icon: Radar,
  },
  {
    num: "02",
    title: "B2B Outreach",
    body: "Strategic outreach designed to get your business in front of decision-makers.",
    Icon: Send,
  },
  {
    num: "03",
    title: "Prospect Research",
    body: "We research companies, industries, decision-makers and business opportunities to identify the right prospects.",
    Icon: Search,
  },
  {
    num: "04",
    title: "Appointment Setting",
    body: "Turn qualified conversations into genuine business meetings.",
    Icon: CalendarCheck,
  },
  {
    num: "05",
    title: "Growth Strategy",
    body: "We help businesses build smarter approaches to acquiring new customers.",
    Icon: TrendingUp,
  },
  {
    num: "06",
    title: "Business Development",
    body: "We help create the bridge between your business and your next opportunity.",
    Icon: Link2,
  },
];

function ServiceCard({ service }: { service: Service }) {
  const [active, setActive] = useState(false);
  const { Icon } = service;

  return (
    <motion.article
      variants={staggerChild}
      data-cursor="card"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm sm:p-9"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at 20% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 60%)",
        }}
      />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px w-0 bg-gradient-ember transition-all duration-700 group-hover:w-full" />

      <div className="relative flex items-start justify-between">
        <div className="relative h-11 w-11">
          <motion.span
            animate={{ opacity: active ? 0 : 1, y: active ? -8 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 font-display text-2xl text-muted-foreground"
          >
            {service.num}
          </motion.span>
          <motion.span
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.7 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center rounded-full border border-primary/50 text-primary"
          >
            <Icon size={18} />
          </motion.span>
        </div>
        <motion.span
          animate={{ x: active ? 4 : 0, y: active ? -4 : 0, opacity: active ? 1 : 0.35 }}
          className="text-primary"
        >
          <ArrowUpRight size={20} />
        </motion.span>
      </div>

      <h3 className="relative mt-8 font-display text-xl uppercase tracking-tight sm:text-2xl">
        {service.title}
      </h3>
      <motion.p
        initial={false}
        animate={{ opacity: active ? 1 : 0.62 }}
        className="relative mt-3 text-sm leading-relaxed text-muted-foreground"
      >
        {service.body}
      </motion.p>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section id="what-we-do" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="What we provide"
          subtitle="Everything you need to start better business conversations."
        />
        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.num} service={s} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
