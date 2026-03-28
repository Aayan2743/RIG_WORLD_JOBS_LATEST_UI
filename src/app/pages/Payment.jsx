import { Link } from 'react-router';
import { motion } from 'motion/react';

export function Payment() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
        >
          <div className="h-1.5 w-full" style={{ background: 'var(--gradient-primary)' }} />

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Payment</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a placeholder payment page. Integrate your payment provider (Stripe/Razorpay) here.
            </p>

            <div className="mt-6 rounded-xl border border-border/70 bg-muted/30 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount Due</p>
                  <p className="mt-1 text-xl font-bold text-foreground">$5</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  Application Fee
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Pay $5
              </button>

              <Link
                to="/jobs"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold border border-border/80 bg-white text-foreground transition hover:bg-muted/40"
              >
                Back to Jobs
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
