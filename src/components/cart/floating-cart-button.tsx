"use client";

import { useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { MiniCart } from "./mini-cart";

interface FloatingCartButtonProps {
  itemCount?: number;
}

export function FloatingCartButton({ itemCount = 0 }: FloatingCartButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Mock cart items - replace with actual cart context
  const cartItems = itemCount > 0 ? [
    { id: 1, name: "Chicken Biryani Combo", price: 299, quantity: 2, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&q=90" },
    { id: 2, name: "Fresh Vegetable Pack", price: 199, quantity: 1, image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop&q=90" },
  ] : [];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (itemCount === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
      >
        <div className="relative">
          <FiShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-primary text-xs font-bold">
              {itemCount}
            </span>
          )}
        </div>
        <span className="font-semibold">₹{total}</span>
      </button>

      <MiniCart
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={cartItems}
        total={total}
      />
    </>
  );
}

