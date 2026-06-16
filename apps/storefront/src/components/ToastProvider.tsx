"use client";

import { useEffect } from "react";
import Toast from "./Toast";
import { useCartStore } from "@/store/cart";

export default function ToastProvider() {
  const { toast, hideToast } = useCartStore();

  return (
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
  );
}
