"use client";

import { motion } from "framer-motion";

export default function ProductCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--background)] mb-4">
        {/* Skeleton image placeholder */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--accent-secondary)] to-[var(--background)] bg-[length:200%_100%]"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Skeleton badge placeholder */}
        <div className="absolute top-3 left-3">
          <div className="w-12 h-5 bg-[var(--accent-secondary)]/30 rounded-sm" />
        </div>
      </div>

      {/* Skeleton text content */}
      <div className="flex flex-col items-start space-y-2">
        {/* Category skeleton */}
        <div className="w-16 h-3 bg-[var(--accent-secondary)]/20 rounded-sm" />
        
        {/* Product name skeleton */}
        <div className="w-full h-5 bg-[var(--accent-secondary)]/20 rounded-sm" />
        <div className="w-3/4 h-5 bg-[var(--accent-secondary)]/20 rounded-sm" />
        
        {/* Price skeleton */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-20 h-4 bg-[var(--accent-secondary)]/20 rounded-sm" />
          <div className="w-16 h-4 bg-[var(--accent-secondary)]/15 rounded-sm" />
        </div>
      </div>
    </motion.div>
  );
}
