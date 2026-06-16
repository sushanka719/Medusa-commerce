"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { blurDataURL } from "@/lib/image";

export default function LoginPage() {
  const router = useRouter();
  const { customer, login, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (customer) router.replace("/");
  }, [customer, router]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const ok = await login(email, password);
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
            Welcome Back
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 leading-tight">
            Sign <span className="italic">In</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-light mb-10">
            Enter your credentials to access your account.
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-300 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--foreground)] focus:border-[var(--foreground)] outline-none transition-colors pr-10"
                  placeholder="••••••••"
                  required
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
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-[var(--card-border)]">
            <p className="text-[var(--text-secondary)] text-sm font-light text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[var(--foreground)] hover:opacity-70 transition-opacity underline underline-offset-4"
              >
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block w-full lg:w-2/3 relative min-h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1631014858587-71607fd96391?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Candlelit login ambiance"
          fill
          sizes="66vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-white/80 text-xs uppercase tracking-[0.3em] mb-4">Member Benefits</p>
          <h2 className="text-3xl md:text-4xl font-serif leading-tight text-white">
            Exclusive access to <span className="italic">new releases</span> and member-only offers.
          </h2>
        </div>
      </div>
    </div>
  );
}
