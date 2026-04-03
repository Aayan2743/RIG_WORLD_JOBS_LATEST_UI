import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ApplyNowPaymentModal({
  feeAmount = 5,
  feeLabel = 'Application Fee',
  paymentPath = '/payment',
  triggerLabel = 'Apply Now',
  triggerClassName = '',
  triggerStyle,
}) {
  const navigate = useNavigate();
  const titleId = useId();
  const descId = useId();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const proceed = () => {
    setOpen(false);
    navigate(paymentPath);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={triggerClassName}
        style={triggerStyle}
      >
        {triggerLabel}
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.button
              type="button"
              aria-label="Close modal"
              onClick={close}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 id={titleId} className="text-base sm:text-lg font-semibold text-foreground">
                      Payment Required
                    </h2>
                    <p id={descId} className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      This job requires payment before applying. Redirecting to payment.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
                    aria-label="Close"
                  >
                    <span className="text-lg leading-none">×</span>
                  </button>
                </div>

                <div className="mt-5 rounded-xl border border-border/70 bg-muted/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</p>
                  <div className="mt-1 flex items-baseline justify-between gap-3">
                    <p className="text-xl font-bold text-foreground">${feeAmount}</p>
                    <p className="text-sm font-medium text-muted-foreground">{feeLabel}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={proceed}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    Proceed to Payment
                  </button>

                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold border border-border/80 bg-white text-foreground transition hover:bg-muted/40 active:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  You'll be redirected to a secure payment page to complete your application.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
