"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Check } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { blurDataURL } from "@/lib/image";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newsletter: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const ok = await register(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );
    if (ok) router.push("/");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] border-b border-[var(--card-border)]">
      {/* Left: Form */}
      <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)] bg-[var(--background)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-6 text-[var(--text-secondary)]">
            Join Us
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 leading-tight">
            Create <span className="italic">Account</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-light mb-10">
            Join the community for exclusive benefits.
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-300 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors"
                  placeholder="Jane"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors"
                  placeholder="Doe"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors pr-10"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-2">Must be at least 8 characters</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border border-[var(--card-border)] peer-checked:bg-[var(--foreground)] peer-checked:border-[var(--foreground)] transition-colors flex items-center justify-center">
                  {formData.newsletter && <Check size={12} className="text-[var(--background)]" />}
                </div>
              </div>
              <span className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                Subscribe to our newsletter for exclusive offers and new product announcements.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-[var(--card-border)]">
            <p className="text-[var(--text-secondary)] text-sm font-light text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[var(--foreground)] hover:opacity-70 transition-opacity underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block w-full lg:w-2/3 relative min-h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1631014858587-71607fd96391?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Candlelit register experience"
          fill
          sizes="66vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-white/80 text-xs uppercase tracking-[0.3em] mb-4">Why Join?</p>
          <ul className="space-y-3">
            {[
              "Early access to new collections",
              "Exclusive member discounts",
              "Order tracking & history",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-white">
                <Check size={16} />
                <span className="font-light">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
