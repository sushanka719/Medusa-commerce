"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { StorefrontProduct } from "@/lib/data/types";
import { blurDataURL } from "@/lib/image";

interface ProductCardProps {
  product: StorefrontProduct;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group cursor-pointer h-full flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--background)] mb-6">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              placeholder="blur"
              blurDataURL={blurDataURL}
              priority={index < 4}
            />
          ) : (
            <div className="w-full h-full bg-[var(--section-bg)]" />
          )}
        </div>

        <div className="flex justify-between items-start gap-4">
          <h3 className="font-serif text-lg text-[var(--foreground)] leading-tight group-hover:text-[var(--text-secondary)] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-[var(--foreground)] tracking-wide whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
