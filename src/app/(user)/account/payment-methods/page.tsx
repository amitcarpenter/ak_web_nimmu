"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCreditCard, FiPlus, FiTrash2, FiEdit2, FiCheck } from "react-icons/fi";

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      cardNumber: "**** **** **** 4242",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      brand: "visa",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      cardNumber: "**** **** **** 8888",
      cardHolder: "John Doe",
      expiryDate: "06/26",
      brand: "mastercard",
      isDefault: false,
    },
    {
      id: 3,
      type: "upi",
      upiId: "john.doe@paytm",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentType, setPaymentType] = useState<"card" | "upi">("card");

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this payment method?")) {
      setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const getCardBrandIcon = (brand: string) => {
    return brand === "visa" ? "💳" : "💳";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/account"
            className="text-primary hover:underline mb-2 inline-block"
          >
            ← Back to Account
          </Link>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Payment Methods
          </h1>
          <p className="text-dark-5 dark:text-dark-6 mt-2">
            Manage your saved payment methods
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="h-5 w-5" />
          Add Payment Method
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg">
          <FiCreditCard className="h-16 w-16 text-dark-5 dark:text-dark-6 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
            No payment methods saved
          </h3>
          <p className="text-dark-5 dark:text-dark-6 mb-6">
            Add a payment method to make checkout faster
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add Payment Method
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`relative bg-white dark:bg-gray-dark border-2 rounded-lg p-6 ${
                method.isDefault
                  ? "border-primary"
                  : "border-stroke dark:border-stroke-dark"
              }`}
            >
              {method.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    Default
                  </span>
                </div>
              )}

              {method.type === "card" ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FiCreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{method.brand ? getCardBrandIcon(method.brand) : <FiCreditCard />}</span>
                        <span className="text-sm font-semibold text-dark dark:text-white uppercase">
                          {method.brand}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-dark dark:text-white">
                        {method.cardNumber}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-dark-5 dark:text-dark-6">
                    <p className="text-sm">
                      <span className="font-medium">Card Holder:</span> {method.cardHolder}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Expires:</span> {method.expiryDate}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FiCreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark dark:text-white mb-1">
                        UPI
                      </h3>
                      <p className="text-dark dark:text-white">{method.upiId}</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-stroke dark:border-stroke-dark">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiCheck className="h-4 w-4" />
                    Set Default
                  </button>
                )}
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <FiEdit2 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-dark rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-stroke dark:border-stroke-dark">
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                Add Payment Method
              </h2>
            </div>

            <form
              className="p-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddForm(false);
                alert("Payment method added successfully!");
              }}
            >
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Payment Type
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentType("card")}
                    className={`flex-1 px-4 py-3 border-2 rounded-lg transition-colors ${
                      paymentType === "card"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-stroke dark:border-stroke-dark text-dark dark:text-white"
                    }`}
                  >
                    <FiCreditCard className="h-5 w-5 mx-auto mb-1" />
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType("upi")}
                    className={`flex-1 px-4 py-3 border-2 rounded-lg transition-colors ${
                      paymentType === "upi"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-stroke dark:border-stroke-dark text-dark dark:text-white"
                    }`}
                  >
                    UPI
                  </button>
                </div>
              </div>

              {paymentType === "card" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="yourname@paytm"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary border-stroke dark:border-stroke-dark rounded"
                  />
                  <span className="text-sm text-dark dark:text-white">
                    Set as default payment method
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-stroke dark:border-stroke-dark">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-6 py-3 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-dark dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

