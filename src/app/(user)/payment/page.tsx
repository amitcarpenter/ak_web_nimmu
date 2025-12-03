"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiCreditCard, FiSmartphone, FiWallet, FiLock, FiChevronLeft, FiCheck } from "react-icons/fi";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: FiCreditCard,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "upi",
      name: "UPI",
      icon: FiSmartphone,
      description: "Google Pay, PhonePe, Paytm",
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: FiWallet,
      description: "Paytm, Amazon Pay, Mobikwik",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: FiWallet,
      description: "Pay when you receive",
    },
  ];

  const handleCardInput = (field: string, value: string) => {
    if (field === "number") {
      value = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (value.length <= 19) setCardData({ ...cardData, number: value });
    } else if (field === "expiry") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").substring(0, 5);
      setCardData({ ...cardData, expiry: value });
    } else if (field === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 3);
      setCardData({ ...cardData, cvv: value });
    } else {
      setCardData({ ...cardData, [field]: value });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/checkout" className="inline-flex items-center text-primary hover:underline mb-6">
        <FiChevronLeft className="mr-1" />
        Back to Checkout
      </Link>

      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Payment</h1>

      <div className="max-w-2xl mx-auto">
        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Select Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-stroke dark:border-stroke-dark hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold text-dark dark:text-white">{method.name}</div>
                        <div className="text-sm text-dark-5 dark:text-dark-6">{method.description}</div>
                      </div>
                    </div>
                    {isSelected && <FiCheck className="text-primary" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Details Form */}
        {selectedMethod === "card" && (
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Card Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => handleCardInput("number", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => handleCardInput("name", e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => handleCardInput("expiry", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => handleCardInput("cvv", e.target.value)}
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                <FiLock />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>
        )}

        {/* UPI Form */}
        {selectedMethod === "upi" && (
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">UPI Details</h2>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@paytm"
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
              <span className="text-dark dark:text-white">₹1,297</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-5 dark:text-dark-6">Delivery Fee</span>
              <span className="text-green">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-5 dark:text-dark-6">Tax (GST)</span>
              <span className="text-dark dark:text-white">₹36</span>
            </div>
            <div className="border-t border-stroke dark:border-stroke-dark pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-dark dark:text-white">Total</span>
                <span className="text-2xl font-bold text-primary">₹1,333</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/checkout"
            className="flex-1 px-6 py-3 border border-stroke dark:border-stroke-dark rounded-lg font-semibold text-center hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors"
          >
            Cancel
          </Link>
          <button
            disabled={!selectedMethod}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FiLock />
            Pay Securely
          </button>
        </div>
      </div>
    </div>
  );
}

