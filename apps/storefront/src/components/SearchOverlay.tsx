"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon } from "lucide-react";
import { StorefrontProduct } from "@/lib/data/types";
import { searchProducts } from "@/lib/data/products";
import { blurDataURL } from "@/lib/image";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StorefrontProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setQuery(""); setResults([]); }, 300);
    }
  }, [isOpen]);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setIsSearching(true);
    try {
      const found = await searchProducts(q);
      setResults(found);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => runSearch(query), 350);
    return () => clearTimeout(timer);
  }, [query, runSearch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-[var(--background)] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 h-20 border-b border-[var(--card-border)]">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Search</span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[var(--foreground)] hover:rotate-90 transition-transform duration-300"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Input */}
          <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12 border-b border-[var(--card-border)]">
            <div className="relative max-w-4xl mx-auto">
              <SearchIcon
                size={32}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full bg-transparent border-none text-3xl md:text-5xl font-serif text-[var(--foreground)] placeholder:text-[var(--card-border)] focus:ring-0 pl-12 md:pl-16 py-4 outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto bg-[var(--section-bg)]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-12">
              {!query ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50 mt-20">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {["Candle", "Diffuser", "Gift Set", "Body"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-2xl font-serif text-[var(--foreground)] hover:italic transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : isSearching ? (
                <div className="text-center mt-20">
                  <p className="text-[var(--text-secondary)] text-sm uppercase tracking-[0.2em]">Searching...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center mt-20">
                  <p className="text-xl font-serif text-[var(--foreground)] mb-2">No results for "{query}"</p>
                  <p className="text-[var(--text-secondary)]">Try different keywords.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[var(--background)]">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--section-bg)]" />
                        )}
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-lg text-[var(--foreground)] mb-1 group-hover:italic transition-all">
                            {product.name}
                          </h3>
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                            {product.category}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-[var(--foreground)]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
