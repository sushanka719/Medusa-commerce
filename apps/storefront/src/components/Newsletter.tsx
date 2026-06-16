"use client";

import Link from "next/link";

export default function Newsletter() {
  return (
    <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
      {/* Left: Header */}
      <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
          Stay Connected
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4 leading-tight">
          Newsletter
        </h2>
        <p className="text-[var(--text-secondary)] font-light leading-relaxed">
          Be the first to know about new collections, exclusive offers, and behind-the-scenes stories.
        </p>
      </div>

      {/* Right: Form & Links */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16">
        <form className="flex flex-col md:flex-row gap-0 max-w-2xl border-b border-[var(--card-border)] pb-2 mb-8">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 py-4 bg-transparent text-xl md:text-2xl font-serif placeholder:text-[var(--text-muted)] text-[var(--foreground)] outline-none"
          />
          <button
            type="submit"
            className="py-4 px-8 text-xs uppercase tracking-[0.2em] font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors text-right"
          >
            Subscribe
          </button>
        </form>

        <div className="flex gap-8">
          <Link href="/instagram" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
            Instagram
          </Link>
          <Link href="/pinterest" className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
            Pinterest
          </Link>
        </div>
      </div>
    </section>
  );
}
