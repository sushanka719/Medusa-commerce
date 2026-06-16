"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";
import { StorefrontCategory } from "@/lib/data/types";

// Aesthetic fallback images cycled when categories have no image
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1662820368409-19b31e11d639?q=80&w=987&auto=format&fit=crop",
  "https://images.pexels.com/photos/16038073/pexels-photo-16038073.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.unsplash.com/photo-1595679733716-e5d1bc847446?q=80&w=988&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574106682754-89f682c8a2db?q=80&w=987&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587556930799-8dca6fad6d41?q=80&w=987&auto=format&fit=crop",
];

export default function CategoriesGrid({ categories }: { categories: StorefrontCategory[] }) {
  const displayCategories = categories.filter((c) => c.slug !== "all").slice(0, 6);

  if (displayCategories.length === 0) return null;

  return (
    <section className="border-b border-[var(--card-border)]">
      {/* Header - Top Aligned */}
      <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16 border-b border-[var(--card-border)] flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
            Browse Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] leading-tight">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors underline underline-offset-4"
        >
          View All
        </Link>
      </div>

      {/* Grid - up to 3 Columns Portrait */}
      <div className={`grid grid-cols-1 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)] ${displayCategories.length === 1 ? "md:grid-cols-1" : displayCategories.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {displayCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group"
          >
            <Link href={`/shop?category=${category.slug}`} className="block h-full">
              {/* Image - Portrait Aspect Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--section-bg)]">
                <Image
                  src={category.image ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
                {/* Overlay Text on Hover - Optional subtle tint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              
              {/* Content - Below Image with Strict Alignment */}
              <div className={`py-8 flex flex-col ${
                index === 0 ? 'px-6 md:pl-12 lg:pl-16 pr-6' : 
                index === 2 ? 'px-6 md:pr-12 lg:pr-16' : 
                'px-6'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">0{index + 1}</span>
                  <ArrowRight 
                    size={18} 
                    className="text-[var(--foreground)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-2xl font-serif text-[var(--foreground)] mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {category.description ?? ""}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
