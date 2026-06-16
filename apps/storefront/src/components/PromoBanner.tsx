"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

export default function PromoBanner() {
  return (
    <section className="grid lg:grid-cols-2 border-b border-[var(--card-border)]">
      {/* Left: Content */}
      <div className="flex flex-col justify-center px-8 md:px-12 lg:px-24 py-12 bg-[var(--accent)] border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-6">Limited Edition</p>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-none">
            Winter <br/><span className="italic">Collection</span>
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-md font-light leading-relaxed">
            Discover warm, comforting scents perfect for the cozy season.
            Hand-poured candles and rich, woody fragrances available for a limited time.
          </p>

          <Link href="/shop?category=new">
            <button className="group relative px-10 py-5 bg-white text-[var(--accent)] font-medium inline-flex items-center gap-2 uppercase tracking-[0.2em] text-sm border border-white overflow-hidden transition-all duration-500 hover:bg-transparent hover:text-white">
              Shop Collection
              <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right: Image */}
      <div className="relative min-h-[500px] lg:min-h-auto">
        <Image
          src="https://images.pexels.com/photos/965978/pexels-photo-965978.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Winter candle collection"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        
        {/* Discount Badge Overlay - simplified */}
        <div className="absolute top-0 right-0 p-12 bg-white/10 backdrop-blur-md border-l border-b border-white/20 text-center text-white hidden md:block">
           <div className="text-6xl font-serif mb-1">30%</div>
           <div className="text-sm uppercase tracking-[0.2em] opacity-80">OFF</div>
        </div>
      </div>
    </section>
  );
}
