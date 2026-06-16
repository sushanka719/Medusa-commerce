"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blurDataURL } from "@/lib/image";

export default function AboutSection() {
  return (
    <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
      {/* Left: Content */}
      <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-6">
          Our Story
        </p>
        
        <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6 leading-tight">
          Crafted with passion, <span className="italic block mt-2">inspired by nature</span>
        </h2>
        
        <p className="text-[var(--text-secondary)] mb-8 font-light leading-relaxed">
          We believe in the power of candlelight and scent to transform everyday rituals into extraordinary moments. Each candle is thoughtfully poured with clean ingredients and a focus on sustainable luxury.
        </p>
        
        <Link 
          href="/about"
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--text-secondary)] transition-colors"
        >
          <span className="underline underline-offset-4">Learn more about us</span>
          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Right: Image */}
      <div className="w-full lg:w-2/3 relative min-h-[500px] lg:min-h-[600px] overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1655105501140-1d85e70715b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About Aluna candle collection"
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
    </section>
  );
}
