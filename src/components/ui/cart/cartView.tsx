"use client";

import { BsCart4 } from "react-icons/bs";
import { useCart } from "@/contexts/CartContext";
import CartPopup from "./cartPopup";
import { useEffect, useState } from "react";

const CartView = () => {
  const { getTotalItems, getTotalPrice, setIsOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent initial values
  const totalItems = isMounted ? getTotalItems() : 0;
  const totalPrice = isMounted ? getTotalPrice() : 0;

  return (
    <>
      <div className="relative">
        <button
          data-cart-button
          onClick={() => setIsOpen(true)}
          className="text-light bg-[#000] px-3 py-2 relative rounded-full hover:cursor-pointer hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
          aria-label={`Shopping cart with ${totalItems} items`}
        >
          <BsCart4 size={18} />
          {isMounted && totalItems > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center shadow-lg">
              {totalItems > 99 ? "99+" : totalItems}
            </div>
          )}
        </button>
        <div className="text-[11px] text-center mt-1 font-medium text-gray-700">
          ${totalPrice.toFixed(2)}
        </div>
      </div>
      <CartPopup />
    </>
  );
};

export default CartView;
