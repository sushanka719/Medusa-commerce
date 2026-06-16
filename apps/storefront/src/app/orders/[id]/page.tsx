"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, Package, ArrowLeft, MapPin, CreditCard, Truck } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { getOrder, Order, OrderAddress } from "@/lib/data/orders";
import { blurDataURL } from "@/lib/image";

function statusLabel(status: string) {
  const map: Record<string, { label: string; color: string }> = {
    pending:         { label: "Pending",        color: "text-yellow-600 bg-yellow-50" },
    processing:      { label: "Processing",     color: "text-blue-600 bg-blue-50" },
    completed:       { label: "Completed",      color: "text-green-600 bg-green-50" },
    cancelled:       { label: "Cancelled",      color: "text-red-500 bg-red-50" },
    requires_action: { label: "Action Required",color: "text-orange-500 bg-orange-50" },
    not_fulfilled:   { label: "Not Fulfilled",  color: "text-yellow-600 bg-yellow-50" },
    fulfilled:       { label: "Fulfilled",      color: "text-green-600 bg-green-50" },
    partially_fulfilled: { label: "Partially Fulfilled", color: "text-blue-600 bg-blue-50" },
    paid:            { label: "Paid",           color: "text-green-600 bg-green-50" },
    awaiting:        { label: "Awaiting",       color: "text-yellow-600 bg-yellow-50" },
    captured:        { label: "Captured",       color: "text-green-600 bg-green-50" },
    refunded:        { label: "Refunded",       color: "text-red-500 bg-red-50" },
  };
  return map[status] ?? { label: status, color: "text-[var(--text-secondary)] bg-[var(--section-bg)]" };
}

function StatusBadge({ status }: { status: string }) {
  const { label, color } = statusLabel(status);
  return (
    <span className={`inline-block px-2 py-1 text-[10px] uppercase tracking-[0.15em] font-medium rounded-sm ${color}`}>
      {label}
    </span>
  );
}

function AddressBlock({ address, label }: { address: OrderAddress; label: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-3">{label}</p>
      <div className="text-sm text-[var(--foreground)] leading-relaxed space-y-0.5">
        <p className="font-medium">{address.first_name} {address.last_name}</p>
        {address.address_1 && <p className="text-[var(--text-secondary)]">{address.address_1}</p>}
        {address.address_2 && <p className="text-[var(--text-secondary)]">{address.address_2}</p>}
        <p className="text-[var(--text-secondary)]">
          {[address.city, address.province, address.postal_code].filter(Boolean).join(", ")}
        </p>
        {address.country_code && (
          <p className="text-[var(--text-secondary)] uppercase">{address.country_code}</p>
        )}
      </div>
    </div>
  );
}

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { customer, _hasHydrated } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!_hasHydrated) return;
    if (!customer) { router.replace("/login"); return; }
    getOrder(id).then((o) => { setOrder(o); setIsLoading(false); });
  }, [_hasHydrated, customer, id, router]);

  if (!_hasHydrated || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl text-[var(--foreground)]">Order not found</p>
        <Link href="/orders" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
          Back to Orders
        </Link>
      </div>
    );
  }

  const currency = order.currency_code?.toUpperCase();
  const fmt = (n: number) => `${currency} ${Number(n).toFixed(2)}`;

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 py-12 border-b border-[var(--card-border)]">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft size={12} /> All Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-3">Order</p>
            <h1 className="text-4xl md:text-5xl font-serif text-[var(--foreground)]">
              #{order.display_id}
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={order.status} />
            {order.payment_status && <StatusBadge status={order.payment_status} />}
            {order.fulfillment_status && <StatusBadge status={order.fulfillment_status} />}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Items */}
        <div className="lg:col-span-2 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Items</p>
          <div className="divide-y divide-[var(--card-border)] border-t border-b border-[var(--card-border)]">
            {order.items?.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 py-6"
              >
                <div className="relative w-20 h-20 shrink-0 bg-[var(--section-bg)] border border-[var(--card-border)] overflow-hidden">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={20} className="text-[var(--text-secondary)]" strokeWidth={1} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">{item.title}</p>
                  {item.variant?.title && (
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.variant.title}</p>
                  )}
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {fmt(item.unit_price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {fmt(item.unit_price)} each
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-3 pt-2">
            {[
              { label: "Subtotal", value: order.subtotal },
              { label: "Shipping", value: order.shipping_total },
              { label: "Tax", value: order.tax_total },
              ...(order.discount_total > 0 ? [{ label: "Discount", value: -order.discount_total }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">{label}</span>
                <span className="text-[var(--foreground)]">{fmt(value)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-medium border-t border-[var(--card-border)] pt-3">
              <span className="text-[var(--foreground)]">Total</span>
              <span className="text-[var(--foreground)]">{fmt(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-10">
          {order.shipping_address && (
            <div className="flex gap-3">
              <Truck size={16} className="text-[var(--text-secondary)] mt-0.5 shrink-0" strokeWidth={1.5} />
              <AddressBlock address={order.shipping_address} label="Shipping Address" />
            </div>
          )}
          {order.billing_address && (
            <div className="flex gap-3">
              <CreditCard size={16} className="text-[var(--text-secondary)] mt-0.5 shrink-0" strokeWidth={1.5} />
              <AddressBlock address={order.billing_address} label="Billing Address" />
            </div>
          )}
          {order.email && (
            <div className="flex gap-3">
              <MapPin size={16} className="text-[var(--text-secondary)] mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-3">Contact</p>
                <p className="text-sm text-[var(--foreground)]">{order.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
