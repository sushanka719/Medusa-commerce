"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { blurDataURL } from "@/lib/image";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--background)] border-l border-[var(--card-border)] z-50 flex flex-col"
          >
            <div className="p-6 md:p-8 border-b border-[var(--card-border)] flex items-center justify-between">
              <h2 className="text-3xl font-serif text-[var(--foreground)]">
                Your <span className="italic">Cart</span>
              </h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={closeCart}
                className="p-2 text-[var(--foreground)] transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </motion.button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 md:px-8 text-center">
                <div className="w-24 h-24 bg-[var(--section-bg)] rounded-full flex items-center justify-center">
                  <ShoppingBag size={32} strokeWidth={1.5} className="text-[var(--text-secondary)]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[var(--foreground)] mb-2">Your cart is empty</h3>
                  <p className="text-[var(--text-secondary)] font-light">Looks like you haven't added anything yet.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeCart}
                  className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium"
                >
                  Start Shopping
                </motion.button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-6 pb-8 border-b border-[var(--card-border)] last:border-0 last:pb-0"
                    >
                      <div className="relative w-24 h-32 bg-[var(--section-bg)] flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--section-bg)]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="font-serif text-lg text-[var(--foreground)] leading-tight">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-[var(--text-secondary)] text-sm font-light mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-[var(--card-border)]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--section-bg)] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm text-[var(--foreground)] font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--section-bg)] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 md:p-8 border-t border-[var(--card-border)] bg-[var(--background)]">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[var(--text-secondary)] uppercase tracking-[0.2em] text-xs">Subtotal</span>
                    <span className="font-serif text-2xl text-[var(--foreground)]">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-8 font-light">
                    Shipping and taxes calculated at checkout
                  </p>
                  <Link href="/checkout" onClick={closeCart}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity uppercase tracking-[0.2em] text-xs font-medium text-center cursor-pointer"
                    >
                      Checkout
                    </motion.div>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
