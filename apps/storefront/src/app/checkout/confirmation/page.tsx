"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("order");

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] border-b border-[var(--card-border)]">
      {/* Left: Confirmation message */}
      <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-16 py-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-[var(--foreground)] flex items-center justify-center mb-10"
          >
            <Check size={28} className="text-[var(--background)]" strokeWidth={2.5} />
          </motion.div>

          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-[var(--text-secondary)]">
            Order Confirmed
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--foreground)] mb-6 leading-tight">
            Thank <span className="italic">you.</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-4 text-lg max-w-sm">
            Your order has been placed and is being processed. A confirmation will be sent to your email.
          </p>

          {orderId && orderId !== "unknown" && (
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-10">
              Order #{orderId.slice(-8).toUpperCase()}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/shop"
              className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border border-[var(--card-border)] text-[var(--foreground)] hover:bg-[var(--section-bg)] transition-colors uppercase tracking-[0.2em] text-xs font-medium text-center"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right: Decorative panel */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-[var(--section-bg)] flex-col justify-center px-16 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-8">
            What happens next
          </p>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Order Processing",
                desc: "We're preparing your items with care.",
              },
              {
                step: "02",
                title: "Shipping",
                desc: "Your order will be dispatched and tracked.",
              },
              {
                step: "03",
                title: "Delivery",
                desc: "Enjoy your new arrival.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6">
                <span className="text-2xl font-serif italic text-[var(--foreground)] w-10 shrink-0">
                  {item.step}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--foreground)] font-medium mb-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
