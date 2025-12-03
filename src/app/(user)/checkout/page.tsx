"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiCheck, FiMapPin, FiCalendar, FiCreditCard, FiPlus, FiEdit2, FiArrowRight, FiArrowLeft } from "react-icons/fi";

type Step = "address" | "delivery-slot" | "payment" | "review";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>("address");
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const addresses = [
    {
      id: 1,
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123, Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      type: "Home",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "456, Office Building",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002",
      type: "Work",
      isDefault: false,
    },
  ];

  const deliverySlots = [
    { id: "asap", label: "ASAP (30-40 min)", available: true },
    { id: "slot1", label: "Today, 12:00 PM - 1:00 PM", available: true },
    { id: "slot2", label: "Today, 1:00 PM - 2:00 PM", available: true },
    { id: "slot3", label: "Today, 2:00 PM - 3:00 PM", available: false },
    { id: "slot4", label: "Today, 3:00 PM - 4:00 PM", available: true },
  ];

  const paymentMethods = [
    { id: "card", label: "Credit/Debit Card", icon: "💳" },
    { id: "upi", label: "UPI", icon: "📱" },
    { id: "wallet", label: "Wallet", icon: "👛" },
    { id: "cod", label: "Cash on Delivery", icon: "💵" },
  ];

  const cartItems = [
    {
      id: 1,
      name: "Chicken Biryani Combo",
      price: 299,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&q=90",
    },
    {
      id: 2,
      name: "Fresh Vegetable Pack",
      price: 199,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop&q=90",
    },
    {
      id: 3,
      name: "Breakfast Combo",
      price: 149,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=300&fit=crop&q=90",
    },
  ];

  const orderSummary = {
    subtotal: 797,
    discount: 80,
    deliveryFee: 0,
    tax: 36,
    total: 753,
  };

  const steps = [
    { id: "address", label: "Address", number: 1 },
    { id: "delivery-slot", label: "Delivery Slot", number: 2 },
    { id: "payment", label: "Payment", number: 3 },
    { id: "review", label: "Review", number: 4 },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.id === currentStep);
  };

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as Step);
    }
  };

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as Step);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    getCurrentStepIndex() >= index
                      ? "bg-primary border-primary text-white"
                      : "border-stroke dark:border-stroke-dark text-dark-5 dark:text-dark-6"
                  }`}
                >
                  {getCurrentStepIndex() > index ? (
                    <FiCheck className="h-5 w-5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    getCurrentStepIndex() >= index
                      ? "text-primary font-medium"
                      : "text-dark-5 dark:text-dark-6"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    getCurrentStepIndex() > index ? "bg-primary" : "bg-gray-2 dark:bg-[#020D1A]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address Selection */}
          {currentStep === "address" && (
            <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark dark:text-white">Delivery Address</h2>
                <Link
                  href="/account/addresses"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <FiPlus />
                  Add New Address
                </Link>
              </div>

              <div className="space-y-4">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAddress === address.id
                        ? "border-primary bg-primary/5"
                        : "border-stroke dark:border-stroke-dark hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(Number(e.target.value))}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-dark dark:text-white">{address.name}</span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                          {address.type}
                        </span>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-dark-5 dark:text-dark-6 mb-1">{address.address}</p>
                      <p className="text-dark-5 dark:text-dark-6 mb-1">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-dark-5 dark:text-dark-6">{address.phone}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg">
                      <FiEdit2 />
                    </button>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!selectedAddress}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue
                  <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Delivery Slot */}
          {currentStep === "delivery-slot" && (
            <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark dark:text-white">Select Delivery Slot</h2>
              </div>

              <div className="space-y-3">
                {deliverySlots.map((slot) => (
                  <label
                    key={slot.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSlot === slot.id
                        ? "border-primary bg-primary/5"
                        : slot.available
                        ? "border-stroke dark:border-stroke-dark hover:border-primary/50"
                        : "border-stroke dark:border-stroke-dark opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot.id}
                      checked={selectedSlot === slot.id}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      disabled={!slot.available}
                      className=""
                    />
                    <div className="flex-1">
                      <span className="font-medium text-dark dark:text-white">{slot.label}</span>
                      {!slot.available && (
                        <span className="ml-2 text-sm text-red-500">(Unavailable)</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                >
                  <FiArrowLeft />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!selectedSlot}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue
                  <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === "payment" && (
            <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark dark:text-white">Payment Method</h2>
              </div>

              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-stroke dark:border-stroke-dark hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className=""
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium text-dark dark:text-white flex-1">{method.label}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="p-4 bg-gray-2 dark:bg-[#020D1A] rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
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
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                >
                  <FiArrowLeft />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Review Order
                  <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === "review" && (
            <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
              <h2 className="text-xl font-bold text-dark dark:text-white mb-6">Review Your Order</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Delivery Address</h3>
                  <div className="p-4 bg-gray-2 dark:bg-[#020D1A] rounded-lg">
                    {addresses.find(a => a.id === selectedAddress) && (
                      <>
                        <p className="font-medium text-dark dark:text-white">
                          {addresses.find(a => a.id === selectedAddress)?.name}
                        </p>
                        <p className="text-dark-5 dark:text-dark-6">
                          {addresses.find(a => a.id === selectedAddress)?.address}
                        </p>
                        <p className="text-dark-5 dark:text-dark-6">
                          {addresses.find(a => a.id === selectedAddress)?.city}, {addresses.find(a => a.id === selectedAddress)?.state} - {addresses.find(a => a.id === selectedAddress)?.pincode}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Delivery Slot</h3>
                  <div className="p-4 bg-gray-2 dark:bg-[#020D1A] rounded-lg">
                    <p className="text-dark dark:text-white">
                      {deliverySlots.find(s => s.id === selectedSlot)?.label}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Payment Method</h3>
                  <div className="p-4 bg-gray-2 dark:bg-[#020D1A] rounded-lg">
                    <p className="text-dark dark:text-white">
                      {paymentMethods.find(m => m.id === paymentMethod)?.label}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                >
                  <FiArrowLeft />
                  Back
                </button>
                <Link
                  href="/checkout/confirmation"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Place Order
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-6 pb-6 border-b border-stroke dark:border-stroke-dark">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-dark dark:text-white text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-dark dark:text-white text-sm">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                <span className="text-dark dark:text-white font-medium">₹{orderSummary.subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Discount</span>
                <span className="text-green-600 dark:text-green-400 font-medium">-₹{orderSummary.discount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Delivery Fee</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Tax (GST)</span>
                <span className="text-dark dark:text-white font-medium">₹{orderSummary.tax}</span>
              </div>
              <div className="border-t border-stroke dark:border-stroke-dark pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-dark dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{orderSummary.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

