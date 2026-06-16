"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  { text: "Luxury Fragrances", icon: "✦" },
  { text: "Artisan Crafted", icon: "◆" },
  { text: "Natural Ingredients", icon: "✦" },
  { text: "Sustainable Beauty", icon: "◆" },
  { text: "Premium Quality", icon: "✦" },
  { text: "Timeless Elegance", icon: "◆" },
];

export default function MarqueeText() {
  return (
    <section className="py-6 border-y border-[var(--card-border)] overflow-hidden bg-[var(--background)]">
      <div className="flex">
        <motion.div
          className="flex gap-8 items-center whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-xl md:text-2xl font-serif font-medium text-[var(--foreground)]">
                {item.text}
              </span>
              <span className="text-[var(--accent-secondary)] text-lg">{item.icon}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
