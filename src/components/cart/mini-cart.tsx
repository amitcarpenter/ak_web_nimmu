"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiX, FiMinus, FiPlus, FiArrowRight } from "react-icons/fi";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
  total?: number;
}

export function MiniCart({ isOpen, onClose, items = [], total = 0 }: MiniCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculatedTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-dark shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stroke dark:border-stroke-dark">
          <h2 className="text-xl font-bold text-dark dark:text-white">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg transition-colors"
          >
            <FiX className="h-5 w-5 text-dark-5 dark:text-dark-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiShoppingCart className="h-16 w-16 text-dark-5 dark:text-dark-6 mb-4" />
              <p className="text-lg font-semibold text-dark dark:text-white mb-2">Your cart is empty</p>
              <p className="text-dark-5 dark:text-dark-6 mb-6">Add items to get started</p>
              <Link
                href="/categories"
                onClick={onClose}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-stroke dark:border-stroke-dark rounded-lg"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&q=90"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark dark:text-white mb-1">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-dark dark:text-white">₹{item.price}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-stroke dark:border-stroke-dark rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                        >
                          <FiMinus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-dark dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                        >
                          <FiPlus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-dark dark:text-white">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-stroke dark:border-stroke-dark p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-dark dark:text-white">Total</span>
              <span className="text-2xl font-bold text-primary">₹{calculatedTotal}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
            >
              View Cart
              <FiArrowRight className="inline-block ml-2" />
            </Link>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold text-center hover:bg-primary/10 transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

