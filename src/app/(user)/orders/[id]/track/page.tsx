"use client";

import Link from "next/link";
import { use } from "react";
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiMapPin, FiChevronLeft } from "react-icons/fi";

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const order = {
    id: "ORD-12345",
    status: "out-for-delivery",
    estimatedDelivery: "30-40 minutes",
    currentLocation: "Near City Center",
    driver: {
      name: "Raj Kumar",
      phone: "+91 98765 43210",
      vehicle: "Bike - DL 01 AB 1234",
    },
  };

  const statusSteps = [
    { id: "placed", label: "Order Placed", status: "completed", time: "10:30 AM" },
    { id: "confirmed", label: "Order Confirmed", status: "completed", time: "10:32 AM" },
    { id: "preparing", label: "Preparing", status: "completed", time: "10:35 AM" },
    { id: "ready", label: "Ready for Pickup", status: "completed", time: "11:00 AM" },
    { id: "out-for-delivery", label: "Out for Delivery", status: "active", time: "11:15 AM" },
    { id: "delivered", label: "Delivered", status: "pending", time: "Estimated 11:45 AM" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/orders" className="inline-flex items-center text-primary hover:underline mb-6">
        <FiChevronLeft className="mr-1" />
        Back to Orders
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">Track Your Order</h1>
        <p className="text-dark-5 dark:text-dark-6 mb-8">Order #{order.id}</p>

        {/* Status Timeline */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-6">Order Status</h2>
          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      step.status === "completed"
                        ? "bg-green-500 border-green-500 text-white"
                        : step.status === "active"
                        ? "bg-primary border-primary text-white animate-pulse"
                        : "bg-gray-2 dark:bg-[#020D1A] border-stroke dark:border-stroke-dark text-dark-5 dark:text-dark-6"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <FiCheckCircle className="h-6 w-6" />
                    ) : step.status === "active" ? (
                      <FiTruck className="h-6 w-6" />
                    ) : (
                      <FiClock className="h-6 w-6" />
                    )}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-16 ${
                        step.status === "completed" ? "bg-green-500" : "bg-gray-2 dark:bg-[#020D1A]"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-semibold text-dark dark:text-white mb-1">{step.label}</h3>
                  <p className="text-sm text-dark-5 dark:text-dark-6">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Driver Info */}
        {order.status === "out-for-delivery" && (
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Delivery Partner</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-dark-5 dark:text-dark-6 mb-1">Driver Name</p>
                <p className="font-semibold text-dark dark:text-white">{order.driver.name}</p>
              </div>
              <div>
                <p className="text-sm text-dark-5 dark:text-dark-6 mb-1">Phone</p>
                <a
                  href={`tel:${order.driver.phone}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {order.driver.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-dark-5 dark:text-dark-6 mb-1">Vehicle</p>
                <p className="font-semibold text-dark dark:text-white">{order.driver.vehicle}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                <FiMapPin />
                <span>Current Location: {order.currentLocation}</span>
              </div>
            </div>
          </div>
        )}

        {/* Estimated Delivery */}
        <div className="bg-primary/10 border border-primary rounded-lg p-6">
          <div className="flex items-center gap-3">
            <FiClock className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-dark dark:text-white">Estimated Delivery</p>
              <p className="text-sm text-dark-5 dark:text-dark-6">{order.estimatedDelivery}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

