"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMinus, FiPlus, FiX, FiTag, FiArrowRight, FiShoppingBag } from "react-icons/fi";

export default function CartPage() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani Combo",
      price: 299,
      originalPrice: 399,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&q=90",
    },
    {
      id: 2,
      name: "Fresh Vegetable Pack",
      price: 199,
      originalPrice: 249,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop&q=90",
    },
    {
      id: 3,
      name: "Breakfast Combo",
      price: 149,
      originalPrice: 199,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=300&fit=crop&q=90",
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as typeof cartItems);
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode);
      setCouponCode("");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0; // 10% discount
  const deliveryFee = subtotal >= 500 ? 0 : 50;
  const tax = Math.round((subtotal - discount) * 0.05); // 5% tax
  const total = subtotal - discount + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <FiShoppingBag className="mx-auto h-24 w-24 text-dark-5 dark:text-dark-6 mb-6" />
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg"
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Link
                      href={`/products/${item.id}`}
                      className="font-semibold text-dark dark:text-white hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-dark dark:text-white">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-dark-5 dark:text-dark-6 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg transition-colors"
                  >
                    <FiX className="h-5 w-5 text-dark-5 dark:text-dark-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-stroke dark:border-stroke-dark rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-dark dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                    >
                      <FiPlus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-lg font-bold text-dark dark:text-white">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Save for Later */}
          <div className="mt-6">
            <button className="text-primary hover:underline text-sm font-medium">
              Save items for later
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-6">Order Summary</h2>

            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Coupon Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiTag className="text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {appliedCoupon} applied
                    </span>
                  </div>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-sm text-green-600 dark:text-green-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                <span className="text-dark dark:text-white font-medium">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Discount</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">-₹{discount}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Delivery Fee</span>
                <span className="text-dark dark:text-white font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Tax (GST)</span>
                <span className="text-dark dark:text-white font-medium">₹{tax}</span>
              </div>
              <div className="border-t border-stroke dark:border-stroke-dark pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-dark dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                className="block w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
              >
                Proceed to Checkout
                <FiArrowRight className="inline-block ml-2" />
              </Link>
              <Link
                href="/categories"
                className="block w-full px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold text-center hover:bg-primary/10 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-gray-2 dark:bg-[#020D1A] rounded-lg">
              <p className="text-sm text-dark-5 dark:text-dark-6">
                {subtotal < 500 ? (
                  <>
                    Add ₹{500 - subtotal} more for <span className="font-semibold text-primary">FREE delivery</span>
                  </>
                ) : (
                  <span className="font-semibold text-green-600 dark:text-green-400">You qualify for FREE delivery!</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

