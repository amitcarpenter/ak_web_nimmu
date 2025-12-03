"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPackage, FiMapPin, FiCreditCard, FiChevronLeft, FiDownload } from "react-icons/fi";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const order = {
    id: "ORD-12345",
    date: "2024-01-15",
    status: "Delivered",
    total: 753,
    subtotal: 797,
    discount: 80,
    deliveryFee: 0,
    tax: 36,
    address: {
      name: "John Doe",
      address: "123, Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 98765 43210",
    },
    paymentMethod: "Credit Card ending in 3456",
    items: [
      { id: 1, name: "Chicken Biryani Combo", quantity: 2, price: 299, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&q=90" },
      { id: 2, name: "Fresh Vegetable Pack", quantity: 1, price: 199, image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop&q=90" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/orders" className="inline-flex items-center text-primary hover:underline mb-6">
        <FiChevronLeft className="mr-1" />
        Back to Orders
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">Order #{order.id}</h1>
            <p className="text-dark-5 dark:text-dark-6">
              Placed on {new Date(order.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10">
              <FiDownload />
              Download Invoice
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Reorder
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Order Items */}
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark dark:text-white">{item.name}</p>
                    <p className="text-sm text-dark-5 dark:text-dark-6">
                      Quantity: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-dark dark:text-white">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                <span className="text-dark dark:text-white">₹{order.subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Discount</span>
                <span className="text-green">-₹{order.discount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Delivery Fee</span>
                <span className="text-green">Free</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Tax (GST)</span>
                <span className="text-dark dark:text-white">₹{order.tax}</span>
              </div>
              <div className="border-t border-stroke dark:border-stroke-dark pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-dark dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Delivery Address */}
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin className="text-primary" />
              <h2 className="text-xl font-bold text-dark dark:text-white">Delivery Address</h2>
            </div>
            <div className="text-dark-5 dark:text-dark-6">
              <p className="font-semibold text-dark dark:text-white mb-1">{order.address.name}</p>
              <p>{order.address.address}</p>
              <p>
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p className="mt-2">{order.address.phone}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiCreditCard className="text-primary" />
              <h2 className="text-xl font-bold text-dark dark:text-white">Payment Information</h2>
            </div>
            <div className="text-dark-5 dark:text-dark-6">
              <p className="font-semibold text-dark dark:text-white mb-1">Payment Method</p>
              <p>{order.paymentMethod}</p>
              <p className="mt-2 font-semibold text-dark dark:text-white">Status</p>
              <span className="px-3 py-1 bg-green-light-7 text-green rounded-full text-sm font-semibold">
                Paid
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

