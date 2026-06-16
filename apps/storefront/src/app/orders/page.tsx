"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, Package, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { getOrders, Order } from "@/lib/data/orders";
import { blurDataURL } from "@/lib/image";

function statusLabel(status: string) {
  const map: Record<string, { label: string; color: string }> = {
    pending:    { label: "Pending",    color: "text-yellow-600" },
    processing: { label: "Processing", color: "text-blue-600" },
    completed:  { label: "Completed",  color: "text-green-600" },
    cancelled:  { label: "Cancelled",  color: "text-red-500" },
    requires_action: { label: "Action Required", color: "text-orange-500" },
  };
  return map[status] ?? { label: status, color: "text-[var(--text-secondary)]" };
}

export default function OrdersPage() {
  const router = useRouter();
  const { customer, _hasHydrated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!_hasHydrated) return;
    if (!customer) { router.replace("/login"); return; }
    getOrders().then((o) => { setOrders(o); setIsLoading(false); });
  }, [_hasHydrated, customer, router]);

  if (!_hasHydrated || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
          Account
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--foreground)]">
          My Orders
        </h1>
        {customer && (
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {customer.first_name} {customer.last_name} · {customer.email}
          </p>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="px-6 md:px-12 lg:px-16 py-24 flex flex-col items-center text-center gap-6">
          <Package size={40} className="text-[var(--text-secondary)]" strokeWidth={1} />
          <div>
            <p className="font-serif text-2xl text-[var(--foreground)] mb-2">No orders yet</p>
            <p className="text-sm text-[var(--text-secondary)] font-light">
              When you place an order, it will appear here.
            </p>
          </div>
          <Link
            href="/shop"
            className="mt-2 px-8 py-3 bg-[var(--foreground)] text-[var(--background)] text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[var(--card-border)]">
          {orders.map((order, i) => {
            const { label, color } = statusLabel(order.status);
            const date = new Date(order.created_at).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            });
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-6 md:px-12 lg:px-16 py-8"
              >
                {/* Order meta */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        Order #{order.display_id}
                      </span>
                      <span className={`text-xs uppercase tracking-[0.1em] font-medium ${color}`}>
                        {label}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">{date}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {order.currency_code?.toUpperCase()} {Number(order.total).toFixed(2)}
                    </span>
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors group"
                    >
                      Details
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Items */}
                <div className="flex gap-3 flex-wrap">
                  {order.items?.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 bg-[var(--section-bg)] border border-[var(--card-border)] shrink-0 overflow-hidden">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={20} className="text-[var(--text-secondary)]" strokeWidth={1} />
                          </div>
                        )}
                        {item.quantity > 1 && (
                          <span className="absolute bottom-0 right-0 bg-[var(--foreground)] text-[var(--background)] text-[10px] px-1">
                            ×{item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-xs font-medium text-[var(--foreground)] line-clamp-1">{item.title}</p>
                        {item.variant?.title && (
                          <p className="text-xs text-[var(--text-secondary)]">{item.variant.title}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {(order.items?.length ?? 0) > 4 && (
                    <div className="w-16 h-16 border border-dashed border-[var(--card-border)] flex items-center justify-center">
                      <span className="text-xs text-[var(--text-secondary)]">+{order.items.length - 4}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
