import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { RebelLogo } from "./RebelLogo";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Why Rebel", href: "#why-rebel" },
  { label: "Process", href: "#process" },
  { label: "Enquire", href: "#enquire" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <RebelLogo className="h-11 w-11" />
              <span className="font-display text-sm uppercase tracking-[0.2em]">
                Rebel Media HQ
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              Build Better Business Connections.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <h3 className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-primary">
              Navigate
            </h3>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-primary">
              Contact
            </h3>
            <a
              href="mailto:hello@rebelmediahq.com"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={14} /> hello@rebelmediahq.com
            </a>
            <div className="mt-2 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Rebel Media HQ. All rights reserved.</p>
          <p className="flex items-center gap-4">
            Built to create conversations that matter.
            <Link to="/admin" className="opacity-40 transition-opacity hover:opacity-100">
              ·
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
