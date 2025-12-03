"use client";

import Link from "next/link";
import { FiCheckCircle, FiPackage, FiMapPin, FiCalendar, FiCreditCard, FiArrowRight } from "react-icons/fi";

export default function CheckoutConfirmationPage() {
  const orderDetails = {
    orderId: "ORD-12345",
    estimatedDelivery: "30-40 minutes",
    deliveryAddress: "123, Main Street, Mumbai - 400001",
    paymentMethod: "Credit Card ending in 3456",
    total: 753,
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <FiCheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-dark-5 dark:text-dark-6 mb-2">
            Thank you for your order. We've received your order and will begin preparing it right away.
          </p>
          <p className="text-sm text-dark-5 dark:text-dark-6">
            Order ID: <span className="font-semibold text-dark dark:text-white">{orderDetails.orderId}</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Order Details</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FiPackage className="text-primary mt-1" />
              <div>
                <p className="text-sm text-dark-5 dark:text-dark-6">Estimated Delivery</p>
                <p className="font-semibold text-dark dark:text-white">{orderDetails.estimatedDelivery}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiMapPin className="text-primary mt-1" />
              <div>
                <p className="text-sm text-dark-5 dark:text-dark-6">Delivery Address</p>
                <p className="font-semibold text-dark dark:text-white">{orderDetails.deliveryAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiCreditCard className="text-primary mt-1" />
              <div>
                <p className="text-sm text-dark-5 dark:text-dark-6">Payment Method</p>
                <p className="font-semibold text-dark dark:text-white">{orderDetails.paymentMethod}</p>
              </div>
            </div>
            <div className="border-t border-stroke dark:border-stroke-dark pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-dark dark:text-white">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{orderDetails.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/orders"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            View Orders
            <FiArrowRight />
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

