"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginCustomer,
  registerCustomer,
  logoutCustomer,
  getCustomer,
  Customer,
} from "@/lib/data/auth";

interface AuthStore {
  customer: Customer | null;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchCustomer: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      customer: null,
      isLoading: false,
      error: null,
      _hasHydrated: false,
      setHasHydrated: (val) => set({ _hasHydrated: val }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          await loginCustomer(email, password);
          const customer = await getCustomer();
          set({ customer, isLoading: false });
          return true;
        } catch (e: any) {
          set({
            isLoading: false,
            error: e?.message || "Invalid email or password.",
          });
          return false;
        }
      },

      register: async (email, password, firstName, lastName) => {
        set({ isLoading: true, error: null });
        try {
          await registerCustomer(email, password, firstName, lastName);
          const customer = await getCustomer();
          set({ customer, isLoading: false });
          return true;
        } catch (e: any) {
          set({
            isLoading: false,
            error: e?.message || "Registration failed. Please try again.",
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutCustomer();
        } finally {
          set({ customer: null, isLoading: false, error: null });
        }
      },

      fetchCustomer: async () => {
        const customer = await getCustomer();
        set({ customer });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "aluna-auth",
      partialize: (s) => ({ customer: s.customer }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
