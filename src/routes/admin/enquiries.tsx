import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Search, Trash2, Loader2, Mail, Phone, Globe } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  listEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/enquiries.functions";
import { RebelLogo } from "@/components/rebel/RebelLogo";

export const Route = createFileRoute("/admin/enquiries")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Rebel Admin — Enquiries" },
      {
        name: "description",
        content:
          "Internal dashboard for tracking Rebel Media HQ enquiries: search leads, update their status and remove handled B2B enquiry records.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Rebel Admin — Enquiries" },
      {
        property: "og:description",
        content:
          "Internal dashboard for tracking Rebel Media HQ enquiries: search leads, update their status and remove handled B2B enquiry records.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminEnquiries,
});

type Enquiry = {
  id: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  service_required: string | null;
  business_description: string | null;
  requirement: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "contacted", "converted", "closed"] as const;

const statusStyle: Record<string, string> = {
  new: "border-primary/50 text-primary",
  contacted: "border-border text-foreground",
  converted: "border-emerald-500/50 text-emerald-400",
  closed: "border-border text-muted-foreground",
};

function AdminEnquiries() {
  const navigate = useNavigate();
  const fetchList = useServerFn(listEnquiries);
  const setStatus = useServerFn(updateEnquiryStatus);
  const removeOne = useServerFn(deleteEnquiry);

  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? sessionStorage.getItem("rebel_admin_token") : null;

  const load = useCallback(async () => {
    if (!token) {
      navigate({ to: "/admin" });
      return;
    }
    setLoading(true);
    try {
      const data = await fetchList({ data: { token } });
      setRows(data as Enquiry[]);
    } catch {
      sessionStorage.removeItem("rebel_admin_token");
      navigate({ to: "/admin" });
    } finally {
      setLoading(false);
    }
  }, [token, fetchList, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesStatus = filter === "all" || r.status === filter;
      const matchesQuery =
        !q ||
        [r.full_name, r.company_name, r.email, r.requirement ?? "", r.service_required ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [rows, query, filter]);

  const changeStatus = async (id: string, status: (typeof STATUSES)[number]) => {
    if (!token) return;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await setStatus({ data: { token, id, status } });
  };

  const remove = async (id: string) => {
    if (!token) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
    await removeOne({ data: { token, id } });
  };

  const logout = () => {
    sessionStorage.removeItem("rebel_admin_token");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-[100svh] pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <RebelLogo className="h-9 w-9" />
            <span className="font-display text-xs uppercase tracking-[0.22em]">Rebel Admin</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <LogOut size={13} /> Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-10 sm:px-6">
        <h1 className="display-title text-3xl sm:text-4xl">Enquiries</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {rows.length} total · {rows.filter((r) => r.status === "new").length} new
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, company, email…"
              className="w-full rounded-full border border-border bg-card/50 py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["all", ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full border px-4 py-2 font-display text-[0.62rem] uppercase tracking-[0.16em] transition-colors ${
                  filter === s
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-20 flex justify-center text-muted-foreground">
            <Loader2 className="animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-20 text-center text-sm text-muted-foreground">No enquiries found.</p>
        ) : (
          <div className="mt-8 space-y-3">
            <AnimatePresence initial={false}>
              {filtered.map((r) => (
                <motion.article
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden rounded-2xl border border-border bg-card/50"
                >
                  <button
                    onClick={() => setOpen(open === r.id ? null : r.id)}
                    className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-sm uppercase tracking-[0.1em]">
                        {r.full_name}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {r.company_name} · {r.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 font-display text-[0.58rem] uppercase tracking-[0.16em] ${
                          statusStyle[r.status] ?? statusStyle["new"]
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {open === r.id ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="border-t border-border"
                      >
                        <div className="space-y-4 p-5 text-sm">
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Mail size={12} /> {r.email}
                            </span>
                            {r.phone ? (
                              <span className="flex items-center gap-1.5">
                                <Phone size={12} /> {r.phone}
                              </span>
                            ) : null}
                            {r.website ? (
                              <span className="flex items-center gap-1.5">
                                <Globe size={12} /> {r.website}
                              </span>
                            ) : null}
                          </div>
                          {r.service_required ? (
                            <p>
                              <span className="text-muted-foreground">Looking for: </span>
                              {r.service_required}
                            </p>
                          ) : null}
                          {r.business_description ? (
                            <p>
                              <span className="text-muted-foreground">Business: </span>
                              {r.business_description}
                            </p>
                          ) : null}
                          {r.requirement ? (
                            <p>
                              <span className="text-muted-foreground">Requirement: </span>
                              {r.requirement}
                            </p>
                          ) : null}

                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            {STATUSES.map((s) => (
                              <button
                                key={s}
                                onClick={() => changeStatus(r.id, s)}
                                className={`rounded-full border px-3.5 py-1.5 font-display text-[0.58rem] uppercase tracking-[0.16em] transition-colors ${
                                  r.status === s
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                            <button
                              onClick={() => remove(r.id)}
                              className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
