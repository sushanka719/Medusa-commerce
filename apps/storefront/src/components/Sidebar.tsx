"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen border-r border-[var(--card-border)] bg-[var(--background)] flex flex-col justify-between p-8 z-40 hidden md:flex">
      {/* Top: Logo */}
      <div>
        <Link href="/" className="block mb-12">
          <h1 className="text-4xl font-serif font-bold text-[var(--accent)] tracking-tighter">
            ALUNA
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-serif text-[var(--foreground)] hover:text-[var(--text-secondary)] hover:italic transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom: Utilities */}
      <div className="flex flex-col gap-6 text-[var(--foreground)]">
        <button className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] hover:text-[var(--text-secondary)] transition-colors">
          <Search size={18} />
          <span>Search</span>
        </button>

        <button
          onClick={toggleCart}
          className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] hover:text-[var(--text-secondary)] transition-colors"
        >
          <div className="relative">
            <ShoppingBag size={18} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent)] text-[8px] text-white flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <span>Cart ({mounted ? totalItems : 0})</span>
        </button>

        <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] mt-8">
          © 2024 Aluna
        </div>
      </div>
    </aside>
  );
}
