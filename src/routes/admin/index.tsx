import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { adminLogin } from "@/lib/enquiries.functions";
import { RebelLogo } from "@/components/rebel/RebelLogo";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Rebel Admin — Sign in" },
      { name: "description", content: "Private administration area for Rebel Media HQ." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Rebel Admin — Sign in" },
      { property: "og:description", content: "Private administration area for Rebel Media HQ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const login = useServerFn(adminLogin);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await login({ data: { username, password } });
      if (res.ok) {
        sessionStorage.setItem("rebel_admin_token", res.token);
        navigate({ to: "/admin/enquiries" });
      } else {
        setError(res.error);
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-card/50 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary";

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-5 noise-overlay">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-3xl border border-border bg-card/60 p-8 shadow-panel backdrop-blur-xl"
      >
        <RebelLogo className="h-12 w-12" />
        <h1 className="display-title mt-6 text-2xl">Rebel Admin</h1>
        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Lock size={12} /> Private area
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            className={field}
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={field}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-ember px-6 py-3.5 font-display text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-60"
          >
            {busy ? <Loader2 size={15} className="animate-spin" /> : null}
            Sign in <ArrowRight size={14} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
