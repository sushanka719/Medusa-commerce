"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

const categories = [
  {
    name: "Jar Candles",
    slug: "candles",
    image:
      "https://images.unsplash.com/photo-1662820368409-19b31e11d639?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "Everyday Glow",
  },
  {
    name: "Pillar Candles",
    slug: "candles",
    image:
      "https://images.pexels.com/photos/16038073/pexels-photo-16038073.jpeg?auto=compress&cs=tinysrgb&w=800",
    subtitle: "Sculptural Light",
  },
  {
    name: "Candle Sets",
    slug: "candles",
    image:
      "https://images.unsplash.com/photo-1595679733716-e5d1bc847446?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "Ritual Collections",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="border-b border-[var(--card-border)]">
      {/* Header */}
      <div className="px-8 md:px-12 lg:px-24 py-12 border-b border-[var(--card-border)] flex flex-col md:flex-row justify-between items-end gap-6 bg-[var(--background)]">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] mb-4 text-[var(--text-secondary)]">Curated Collections</p>
          <h2 className="text-5xl md:text-7xl font-serif leading-none text-[var(--foreground)]">
            Stunning <span className="italic">Categories</span>
          </h2>
        </div>
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity text-[var(--foreground)]">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)] bg-[var(--background)]">
        {categories.map((category) => (
          <Link key={category.name} href={`/shop?category=${category.slug}`} className="group block relative h-[600px] overflow-hidden">
             <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={blurDataURL}
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
             
             {/* Content Overlay/Bottom */}
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pt-32">
                <p className="text-white/80 text-xs uppercase tracking-[0.2em] mb-2">{category.subtitle}</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-3xl font-serif text-white italic">{category.name}</h3>
                  <div className="w-10 h-10 bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>
             </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
