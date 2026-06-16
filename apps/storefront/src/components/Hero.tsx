"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

export default function Hero({
  featuredProduct,
}: {
  featuredProduct?: { name: string; price: number; slug: string } | null;
}) {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] border-b border-[var(--card-border)] overflow-hidden">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1745125996166-aa81a27d4653?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero candle background"
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full min-h-[calc(100vh-5rem)] flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="max-w-3xl"
          >
            {/* Issue Number - Magazine Style */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--text-secondary)]">
                Issue No. 01
              </span>
              <span className="w-12 h-px bg-[var(--card-border)]" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--text-secondary)]">
                Winter 2025
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif leading-[1] md:leading-[0.9] text-[var(--foreground)] mb-2 md:mb-4">
              The Art of
            </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif leading-[1] md:leading-[0.9] text-[var(--foreground)] mb-12 md:mb-14 italic">
              Slow Living
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-md mb-12 leading-relaxed">
              Discover handcrafted candles and home fragrance that transform your space into a sanctuary of calm.
            </p>

            {/* CTA */}
            <Link href="/shop" className="inline-flex items-center gap-3 group">
              <span className="text-sm uppercase tracking-[0.2em] font-medium text-[var(--foreground)] group-hover:text-[var(--text-secondary)] transition-colors">
                Explore Collection
              </span>
              <ArrowDownRight 
                size={20} 
                className="text-[var(--foreground)] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" 
              />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Bar - Editorial Style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="border-t border-[var(--card-border)] px-6 md:px-12 lg:px-16 py-6"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Featured
              </span>
              <span className="text-sm text-[var(--foreground)]">
                {featuredProduct?.name ?? "New Collection"}
              </span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Starting at
              </span>
              <span className="text-sm font-medium text-[var(--foreground)]">
                {featuredProduct ? `$${featuredProduct.price.toFixed(2)}` : "Shop Now"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
