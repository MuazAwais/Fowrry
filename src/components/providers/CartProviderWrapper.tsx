"use client";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/components/ui/toastProvider";
import { ReactNode } from "react";

export const CartProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
};

