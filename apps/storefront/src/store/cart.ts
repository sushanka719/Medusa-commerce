"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCart, addToCart, getCart } from "@/lib/data/cart";

export interface CartItem {
  id: string; // line item id from Medusa
  variantId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cartId: string | null;
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  toast: { message: string; type: "success" | "error"; isVisible: boolean };
  addItem: (variantId: string, productId: string, name: string, price: number, image: string, quantity?: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  showToast: (message: string, type: "success" | "error") => void;
  hideToast: () => void;
  syncCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      isOpen: false,
      isLoading: false,
      toast: { message: "", type: "success", isVisible: false },

      addItem: async (variantId, productId, name, price, image, quantity = 1) => {
        set({ isLoading: true });
        try {
          let { cartId } = get();
          if (!cartId) {
            const cart = await createCart();
            cartId = cart.id;
            set({ cartId });
          }
          const cart = await addToCart(cartId, variantId, quantity);
          // Sync items from Medusa response
          const items: CartItem[] = cart.items?.map((item: any) => ({
            id: item.id,
            variantId: item.variant_id,
            productId: item.product_id,
            name: item.title,
            price: item.unit_price,
            image: item.thumbnail || "",
            quantity: item.quantity,
          })) || [];
          set({ items, isOpen: true });
          get().showToast(`${name} added to cart`, "success");
        } catch (e) {
          get().showToast("Failed to add item", "error");
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineItemId) => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          const { sdk } = await import("@/lib/medusa");
          await sdk.store.cart.deleteLineItem(cartId, lineItemId);
          const cart = await getCart(cartId);
          const items: CartItem[] = cart.items?.map((item: any) => ({
            id: item.id,
            variantId: item.variant_id,
            productId: item.product_id,
            name: item.title,
            price: item.unit_price,
            image: item.thumbnail || "",
            quantity: item.quantity,
          })) || [];
          set({ items });
          get().showToast("Item removed", "success");
        } catch {
          get().showToast("Failed to remove item", "error");
        }
      },

      updateQuantity: async (lineItemId, quantity) => {
        if (quantity <= 0) { get().removeItem(lineItemId); return; }
        const { cartId } = get();
        if (!cartId) return;
        try {
          const { sdk } = await import("@/lib/medusa");
          await sdk.store.cart.updateLineItem(cartId, lineItemId, { quantity });
          const cart = await getCart(cartId);
          const items: CartItem[] = cart.items?.map((item: any) => ({
            id: item.id,
            variantId: item.variant_id,
            productId: item.product_id,
            name: item.title,
            price: item.unit_price,
            image: item.thumbnail || "",
            quantity: item.quantity,
          })) || [];
          set({ items });
        } catch {
          get().showToast("Failed to update quantity", "error");
        }
      },

      syncCart: async () => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          const cart = await getCart(cartId);
          const items: CartItem[] = cart.items?.map((item: any) => ({
            id: item.id,
            variantId: item.variant_id,
            productId: item.product_id,
            name: item.title,
            price: item.unit_price,
            image: item.thumbnail || "",
            quantity: item.quantity,
          })) || [];
          set({ items });
        } catch {}
      },

      clearCart: () => { set({ items: [], cartId: null }); get().showToast("Cart cleared", "success"); },
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotalItems: () => get().items.reduce((t, i) => t + i.quantity, 0),
      getTotalPrice: () => get().items.reduce((t, i) => t + i.price * i.quantity, 0),
      showToast: (message, type) => set({ toast: { message, type, isVisible: true } }),
      hideToast: () => set({ toast: { message: "", type: "success", isVisible: false } }),
    }),
    { name: "aluna-cart", partialize: (s) => ({ cartId: s.cartId, items: s.items }) }
  )
);
