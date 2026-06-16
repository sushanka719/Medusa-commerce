"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "Vogue", logo: "VOGUE" },
  { name: "Elle", logo: "ELLE" },
  { name: "Harper's Bazaar", logo: "BAZAAR" },
  { name: "Cosmopolitan", logo: "COSMO" },
  { name: "Marie Claire", logo: "MARIE CLAIRE" },
  { name: "Glamour", logo: "GLAMOUR" },
];

export default function LogoCloud() {
  return (
    <section className="bg-[var(--background)] border-b border-[var(--card-border)]">
      <div className="border-b border-[var(--card-border)] px-8 md:px-12 lg:px-24 py-12 text-center">
         <p className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">As Featured In</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-[var(--card-border)]">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-center p-8 md:p-10 hover:bg-[var(--card-bg)] transition-colors"
          >
            <span className="text-xl md:text-2xl font-serif font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors cursor-default italic">
              {brand.logo}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
