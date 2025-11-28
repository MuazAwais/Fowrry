"use client";
import { useCart } from "@/contexts/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTimes, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef } from "react";

const CartPopup = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    isOpen,
    setIsOpen,
  } = useCart();

  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-cart-button]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Popup */}
      <div
        ref={popupRef}
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] md:w-[480px] lg:w-[520px] bg-white shadow-2xl z-[9999] flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="flex items-center gap-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FaShoppingBag className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                Shopping Cart
              </h2>
              <p className="text-xs text-white/80">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <FaShoppingCart className="text-5xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => {
                const itemPrice = item.offer > 0 
                  ? item.price * (1 - item.offer / 100) 
                  : item.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex gap-x-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-x-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            {item.shopName && (
                              <p className="text-xs text-gray-500 mb-2">
                                from {item.shopName}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center gap-x-2 mb-3">
                          {item.offer > 0 ? (
                            <>
                              <span className="font-bold text-lg text-primary">
                                ${itemPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                                -{item.offer}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-lg text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls and Total */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-1 border-2 border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus className="text-xs text-gray-600" />
                            </button>
                            <span className="px-4 py-2 font-bold text-base min-w-[3ch] text-center border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                              aria-label="Increase quantity"
                            >
                              <FaPlus className="text-xs text-gray-600" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                            <p className="font-bold text-lg text-gray-900">
                              ${itemTotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div className="border-t bg-white shadow-lg">
            <div className="p-5 space-y-4">
              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="text-sm">Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="text-sm">Delivery Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-4 bg-primary text-white rounded-xl font-bold text-center hover:bg-primary/90 transition-all hover:shadow-lg"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CartPopup;

