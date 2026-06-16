"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "Free Shipping on Orders Over $100",
  "New Collection Available",
  "Handcrafted with Natural Ingredients",
  "Sustainable & Eco-Friendly",
];

export default function MarqueeBanner() {
  return (
    <div className="border-b border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] py-4 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-8 text-xs uppercase tracking-[0.2em] font-medium">
              {item}
            </span>
            <span className="text-[var(--text-secondary)] mx-4">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
