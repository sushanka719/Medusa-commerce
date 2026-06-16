"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, Loader2, Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import {
  updateCartContact,
  listShippingOptions,
  addShippingMethod,
  getCart,
  getCartRegionCountries,
} from "@/lib/data/cart";
import { sdk } from "@/lib/medusa";
import { blurDataURL } from "@/lib/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

type Step = "address" | "delivery" | "payment";

const STEPS: { key: Step; label: string }[] = [
  { key: "address", label: "Address" },
  { key: "delivery", label: "Delivery" },
  { key: "payment", label: "Payment" },
];

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-2 mb-12">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${done ? "bg-[var(--foreground)] text-[var(--background)]" : active ? "border-2 border-[var(--foreground)] text-[var(--foreground)]" : "border border-[var(--card-border)] text-[var(--text-secondary)]"}`}>
              {done ? <Check size={12} /> : i + 1}
            </div>
            <span className={`text-xs uppercase tracking-[0.15em] ${active ? "text-[var(--foreground)]" : "text-[var(--text-secondary)]"}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && <ChevronRight size={14} className="text-[var(--card-border)] mx-1" />}
          </div>
        );
      })}
    </div>
  );
}

function InputField({ label, id, value, onChange, type = "text", placeholder, required, disabled }: {
  label: string; id: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean; disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">{label}</label>
      <input type={type} id={id} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} required={required} disabled={disabled}
        className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors disabled:opacity-50" />
    </div>
  );
}

function ReviewBlock({ label, onEdit, children }: { label: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start p-4 border border-[var(--card-border)]">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] mb-1">{label}</p>
        {children}
      </div>
      <button onClick={onEdit} className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4">
        Edit
      </button>
    </div>
  );
}

// --- Stripe Payment Form ---
function StripePaymentForm({
  clientSecret,
  onSuccess,
  onBack,
}: {
  clientSecret: string;
  onSuccess: (orderId: string) => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartId, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !cartId) return;
    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Payment failed");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: `${window.location.origin}/checkout/confirmation` },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
      setIsProcessing(false);
      return;
    }

    // Payment succeeded — complete the cart
    try {
      const result = await sdk.store.cart.complete(cartId) as any;
      const orderId = result?.order?.id ?? result?.id ?? "unknown";
      clearCart();
      onSuccess(orderId);
    } catch (e: any) {
      setError(e?.message ?? "Failed to complete order");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] font-bold mb-6">
        Payment Details
      </h2>

      <div className="p-4 border border-[var(--card-border)] bg-[var(--section-bg)]">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {error && (
        <div className="px-4 py-3 border border-red-300 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button type="button" onClick={onBack}
          className="flex-1 py-4 border border-[var(--card-border)] text-[var(--foreground)] hover:bg-[var(--section-bg)] transition-colors uppercase tracking-[0.2em] text-xs font-medium">
          Back
        </button>
        <button type="submit" disabled={!stripe || isProcessing}
          className="flex-1 py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Lock size={14} />}
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>

      <p className="text-xs text-[var(--text-secondary)] text-center flex items-center justify-center gap-1">
        <Lock size={11} /> Secured by Stripe
      </p>
    </form>
  );
}

// --- Main Checkout Page ---
export default function CheckoutPage() {
  const router = useRouter();
  const { cartId, items, getTotalPrice, clearCart } = useCartStore();
  const { customer } = useAuthStore();

  const [step, setStep] = useState<Step>("address");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regionCountries, setRegionCountries] = useState<{ code: string; name: string }[]>([]);

  const [address, setAddress] = useState({
    email: customer?.email ?? "",
    firstName: customer?.first_name ?? "",
    lastName: customer?.last_name ?? "",
    address1: "",
    city: "",
    postalCode: "",
    countryCode: "",
    phone: "",
  });

  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Stripe payment state
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!cartId) return;
    getCartRegionCountries(cartId).then((countries) => {
      if (countries.length > 0) {
        setRegionCountries(countries);
        setAddress((a) => ({ ...a, countryCode: a.countryCode || countries[0].code }));
      }
    });
  }, [cartId]);

  useEffect(() => {
    if (customer) {
      setAddress((a) => ({
        ...a,
        email: a.email || customer.email,
        firstName: a.firstName || customer.first_name,
        lastName: a.lastName || customer.last_name,
      }));
    }
  }, [customer]);

  useEffect(() => {
    if (!cartId || items.length === 0) router.push("/shop");
  }, [cartId, items, router]);

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartId) return;
    setIsLoading(true);
    setError(null);
    try {
      await updateCartContact(cartId, address.email, {
        first_name: address.firstName,
        last_name: address.lastName,
        address_1: address.address1,
        city: address.city,
        postal_code: address.postalCode,
        country_code: address.countryCode,
        phone: address.phone,
      });
      const options = await listShippingOptions(cartId);
      setShippingOptions(options);
      if (options.length > 0) setSelectedOptionId(options[0].id);
      setStep("delivery");
    } catch (e: any) {
      setError(e?.message || "Failed to save address. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeliverySubmit = async () => {
    if (!cartId || !selectedOptionId) return;
    setIsLoading(true);
    setError(null);
    try {
      await sdk.store.cart.addShippingMethod(cartId, { option_id: selectedOptionId });

      // Initiate Stripe payment session
      const cart = await getCart(cartId);
      const { payment_collection } = await sdk.store.payment.initiatePaymentSession(cart, {
        provider_id: "pp_stripe_stripe",
      }) as any;

      const session = payment_collection?.payment_sessions?.[0];
      const secret = session?.data?.client_secret as string | undefined;
      const sessionId = session?.id as string | undefined;

      if (!secret) throw new Error("Could not initialize payment. Make sure Stripe is enabled in your region.");

      setClientSecret(secret);
      setPaymentSessionId(sessionId ?? null);
      setStep("payment");
    } catch (e: any) {
      setError(e?.message || "Failed to set up payment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = useCallback((orderId: string) => {
    router.push(`/checkout/confirmation?order=${orderId}`);
  }, [router]);

  const total = getTotalPrice();
  const selectedOption = shippingOptions.find((o) => o.id === selectedOptionId);
  const shippingPrice = selectedOption?.amount ?? 0;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen border-b border-[var(--card-border)]">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-16 py-16 border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors mb-12 block">
          ← Back to shop
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-2 leading-tight">
          Check<span className="italic">out</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-light mb-12">Complete your order below.</p>

        <StepIndicator current={step} />

        {error && (
          <div className="mb-8 px-4 py-3 border border-red-300 bg-red-50 text-red-700 text-sm">{error}</div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Address */}
          {step === "address" && (
            <motion.form key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              onSubmit={handleAddressSubmit} className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] font-bold mb-6">Contact & Shipping</h2>
              <InputField label="Email Address" id="email" type="email" value={address.email}
                onChange={(v) => setAddress((a) => ({ ...a, email: v }))} placeholder="you@example.com" required disabled={isLoading} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" id="firstName" value={address.firstName}
                  onChange={(v) => setAddress((a) => ({ ...a, firstName: v }))} placeholder="Jane" required disabled={isLoading} />
                <InputField label="Last Name" id="lastName" value={address.lastName}
                  onChange={(v) => setAddress((a) => ({ ...a, lastName: v }))} placeholder="Doe" required disabled={isLoading} />
              </div>
              <InputField label="Address" id="address1" value={address.address1}
                onChange={(v) => setAddress((a) => ({ ...a, address1: v }))} placeholder="123 Main Street" required disabled={isLoading} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="City" id="city" value={address.city}
                  onChange={(v) => setAddress((a) => ({ ...a, city: v }))} placeholder="New York" required disabled={isLoading} />
                <InputField label="Postal Code" id="postalCode" value={address.postalCode}
                  onChange={(v) => setAddress((a) => ({ ...a, postalCode: v }))} placeholder="10001" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Country</label>
                <select id="country" value={address.countryCode}
                  onChange={(e) => setAddress((a) => ({ ...a, countryCode: e.target.value }))}
                  disabled={isLoading}
                  className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors disabled:opacity-50">
                  {regionCountries.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <InputField label="Phone (optional)" id="phone" type="tel" value={address.phone}
                onChange={(v) => setAddress((a) => ({ ...a, phone: v }))} placeholder="+1 555 000 0000" disabled={isLoading} />
              <button type="submit" disabled={isLoading}
                className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8">
                {isLoading && <Loader2 size={16} className="animate-spin" />}
                {isLoading ? "Saving..." : "Continue to Delivery"}
              </button>
            </motion.form>
          )}

          {/* Step 2: Delivery */}
          {step === "delivery" && (
            <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] font-bold mb-6">Shipping Method</h2>
              {shippingOptions.length === 0 ? (
                <div className="py-8 text-center text-[var(--text-secondary)]">
                  <p>No shipping methods available for this address.</p>
                  <button onClick={() => setStep("address")} className="mt-4 text-xs uppercase tracking-[0.2em] underline hover:opacity-70">Edit address</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label key={option.id}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${selectedOptionId === option.id ? "border-[var(--foreground)] bg-[var(--section-bg)]" : "border-[var(--card-border)] hover:border-[var(--foreground)]"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOptionId === option.id ? "border-[var(--foreground)]" : "border-[var(--card-border)]"}`}>
                          {selectedOptionId === option.id && <div className="w-2 h-2 rounded-full bg-[var(--foreground)]" />}
                        </div>
                        <input type="radio" className="sr-only" checked={selectedOptionId === option.id} onChange={() => setSelectedOptionId(option.id)} />
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{option.name}</p>
                          {option.metadata?.estimated_delivery && (
                            <p className="text-xs text-[var(--text-secondary)]">{option.metadata.estimated_delivery}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {option.amount === 0 ? "Free" : `$${Number(option.amount).toFixed(2)}`}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep("address")}
                  className="flex-1 py-4 border border-[var(--card-border)] text-[var(--foreground)] hover:bg-[var(--section-bg)] transition-colors uppercase tracking-[0.2em] text-xs font-medium">
                  Back
                </button>
                <button onClick={handleDeliverySubmit} disabled={isLoading || !selectedOptionId}
                  className="flex-1 py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading && <Loader2 size={16} className="animate-spin" />}
                  {isLoading ? "Setting up payment..." : "Continue to Payment"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === "payment" && clientSecret && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Review blocks */}
              <div className="space-y-3 mb-8">
                <ReviewBlock label="Contact" onEdit={() => setStep("address")}>
                  <p className="text-sm text-[var(--foreground)]">{address.email}</p>
                </ReviewBlock>
                <ReviewBlock label="Ship to" onEdit={() => setStep("address")}>
                  <p className="text-sm text-[var(--foreground)]">
                    {address.firstName} {address.lastName}<br />
                    {address.address1}, {address.city}, {address.postalCode}<br />
                    {address.countryCode.toUpperCase()}
                  </p>
                </ReviewBlock>
                <ReviewBlock label="Shipping" onEdit={() => setStep("delivery")}>
                  <p className="text-sm text-[var(--foreground)]">
                    {selectedOption?.name ?? "—"} · {shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}
                  </p>
                </ReviewBlock>
              </div>

              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
                <StripePaymentForm
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onBack={() => setStep("delivery")}
                />
              </Elements>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-16 py-16 bg-[var(--section-bg)]">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] font-bold mb-8">Order Summary</h2>
        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-16 h-20 bg-[var(--background)] flex-shrink-0 border border-[var(--card-border)]">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" placeholder="blur" blurDataURL={blurDataURL} />
                ) : (
                  <div className="w-full h-full bg-[var(--card-border)]" />
                )}
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--foreground)] text-[var(--background)] text-xs rounded-full flex items-center justify-center font-medium">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <p className="font-serif text-[var(--foreground)]">{item.name}</p>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)]">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--card-border)] pt-6 space-y-3">
          <div className="flex justify-between text-sm text-[var(--text-secondary)]">
            <span>Subtotal</span><span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--text-secondary)]">
            <span>Shipping</span>
            <span>{step === "payment" ? (shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`) : "Calculated next"}</span>
          </div>
          <div className="flex justify-between font-serif text-xl text-[var(--foreground)] pt-3 border-t border-[var(--card-border)]">
            <span>Total</span>
            <span>${(total + (step === "payment" ? shippingPrice : 0)).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
