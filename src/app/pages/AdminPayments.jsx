import { useEffect, useMemo, useState } from "react";
import { Building2, CheckCircle, DollarSign, Clock, Mail, CreditCard, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PAYMENTS_KEY = "rwj_payments";

function getPayments() {
  try {
    return JSON.parse(localStorage.getItem(PAYMENTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function savePayments(payments) {
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function AdminPayments() {
  const [payments, setPayments] = useState(getPayments);
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setPayments(getPayments());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return payments;
    return payments.filter((p) => {
      const hay = [p?.payerEmail, p?.payerName, p?.paymentFor, p?.feeLabel, p?.id]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [payments, query]);

  const markAllVisibleAsPaid = () => {
    // In this mock flow we always create `status: "paid"`, but keep this for future expansion.
    const updated = payments.map((p) => (p.status === "pending" ? { ...p, status: "paid" } : p));
    setPayments(updated);
    savePayments(updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Payments</h2>
        <p className="text-sm text-muted-foreground">Admin-only payment records (application fee).</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by email, payer, payment type..."
              className="w-full pl-9 pr-4 py-3 border border-border rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={markAllVisibleAsPaid}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted/40 transition"
        >
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Mark Pending as Paid
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border/60 p-10 text-center text-muted-foreground">
          <CreditCard className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No payments found.</p>
          <p className="text-sm mt-1">When candidates pay $5, records will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((p) => {
              const expanded = expandedId === p.id;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 p-5 flex-wrap">
                    <div className="flex items-start space-x-4 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-foreground truncate">
                          ${p.amount} {p.feeLabel ? `- ${p.feeLabel}` : ""}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          <Mail className="w-3.5 h-3.5 inline mr-1 opacity-70" />
                          {p.payerEmail || "Unknown"}
                        </p>
                        <div className="text-xs text-muted-foreground/70 mt-1 flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{p.createdAt ? formatDate(p.createdAt) : "—"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {String(p.status || "paid").toLowerCase()}
                      </span>

                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : p.id)}
                        className="p-2 rounded-xl border border-border hover:bg-muted/40 text-muted-foreground transition-all"
                        aria-label={expanded ? "Collapse payment details" : "Expand payment details"}
                      >
                        <span className="text-sm font-bold">{expanded ? "−" : "+"}</span>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-border/60"
                      >
                        <div className="p-5 bg-muted/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="w-4 h-4 text-muted-foreground/60" />
                            <span>{p.paymentFor || "Job Application"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground break-words">
                            <Mail className="w-4 h-4 text-muted-foreground/60" />
                            <span>{p.payerEmail}</span>
                          </div>
                          <div className="sm:col-span-2 bg-white border border-border/60 rounded-xl p-3.5">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                              Payment ID
                            </div>
                            <div className="font-mono text-sm">{p.id}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

