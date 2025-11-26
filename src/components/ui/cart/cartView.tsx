"use client";

import { useEffect, useRef, useState } from "react";
import { BsCart4 } from "react-icons/bs";

const CartView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleAutoClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimeoutRef.current = null;
    }, 3000);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        scheduleAutoClose();
      } else if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      return next;
    });
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);
  return (
    <div className="relative">
      <div className="text-light bg-[#000] px-2 py-1 relative rounded-full hover:cursor-pointer " onClick={toggleMenu}>
        <BsCart4 size={18}/>
        <div className="text-[7px] absolute -top-1 -right-1 bg-[#ff1616] px-[5px] py-[1px] rounded-full">4</div>
      </div>
      <div className="text-[10px] text-center">Rs:</div>
      {isOpen && <div className="absolute w-full -top-1 right-0 min-w-[300px] text-[#fff] bg-primary shadow-xl p-2">Your cart is empty, add items to cart.</div>}
    </div>
  );
};

export default CartView;
