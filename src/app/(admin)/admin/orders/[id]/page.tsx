"use client";

import { use } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiPackage, FiDollarSign, FiTruck, FiCheck, FiX, FiEdit, FiPrinter, FiClock } from "react-icons/fi";
import Image from "next/image";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // In real app, fetch order data by ID
  const order = {
    id: id,
    orderId: id,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: 1,
        name: "Chicken Biryani",
        quantity: 2,
        price: 299,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop&q=90",
      },
      {
        id: 2,
        name: "Fresh Vegetable Pack",
        quantity: 1,
        price: 199,
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop&q=90",
      },
    ],
    amount: 1299,
    subtotal: 797,
    deliveryFee: 50,
    tax: 100,
    discount: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    date: "2024-01-15",
    time: "10:30 AM",
    deliveryAddress: "123 Main Street, Mumbai, Maharashtra 400001",
    deliveryTime: "30-45 min",
    notes: "Handle with care",
    deliveryPartner: "Raj Kumar",
    deliveryPhone: "+91 98765 43210",
  };

  const statusHistory = [
    { status: "Order Placed", time: "2024-01-15 10:30 AM", completed: true },
    { status: "Confirmed", time: "2024-01-15 10:32 AM", completed: true },
    { status: "Preparing", time: "2024-01-15 10:35 AM", completed: true },
    { status: "Ready", time: "2024-01-15 11:00 AM", completed: true },
    { status: "Out for Delivery", time: "2024-01-15 11:05 AM", completed: true },
    { status: "Delivered", time: "2024-01-15 11:30 AM", completed: true },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending", className: "bg-yellow-light-4 text-yellow-dark" },
      confirmed: { label: "Confirmed", className: "bg-blue-light-5 text-blue" },
      preparing: { label: "Preparing", className: "bg-orange-light-5 text-orange" },
      ready: { label: "Ready", className: "bg-purple-light-5 text-purple" },
      out_for_delivery: { label: "Out for Delivery", className: "bg-blue-light-5 text-blue" },
      delivered: { label: "Delivered", className: "bg-green-light-7 text-green" },
      cancelled: { label: "Cancelled", className: "bg-red-light-5 text-red" },
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg"
          >
            <FiArrowLeft className="h-5 w-5 text-dark dark:text-white" />
          </Link>
          <Breadcrumb pageName={`Order Details - ${order.orderId}`} />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiEdit className="h-4 w-4" />
            Edit Order
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiPrinter className="h-4 w-4" />
            Print Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border border-stroke dark:border-stroke-dark rounded-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-dark dark:text-white mb-1">{item.name}</div>
                    <div className="text-sm text-dark-5 dark:text-dark-6">
                      Quantity: {item.quantity} × {formatCurrency(item.price)}
                    </div>
                  </div>
                  <div className="font-semibold text-dark dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status Timeline */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Order Status</h3>
            <div className="space-y-4">
              {statusHistory.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-green-light-7 text-green"
                      : "bg-gray-2 dark:bg-gray-800 text-dark-5 dark:text-dark-6"
                  }`}>
                    {step.completed ? (
                      <FiCheck className="h-5 w-5" />
                    ) : (
                      <FiClock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-dark dark:text-white">{step.status}</div>
                    <div className="text-sm text-dark-5 dark:text-dark-6">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Subtotal</span>
                <span className="text-dark dark:text-white">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Delivery Fee</span>
                <span className="text-dark dark:text-white">{formatCurrency(order.deliveryFee)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Tax</span>
                <span className="text-dark dark:text-white">{formatCurrency(order.tax)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Discount</span>
                  <span className="text-green">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-stroke dark:border-stroke-dark flex items-center justify-between">
                <span className="font-semibold text-dark dark:text-white">Total</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(order.amount)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-stroke dark:border-stroke-dark">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Status:</span>
                {getStatusBadge(order.status)}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Payment:</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  order.paymentStatus === "paid"
                    ? "bg-green-light-7 text-green"
                    : "bg-yellow-light-4 text-yellow-dark"
                }`}>
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Method:</span>
                <span className="text-dark dark:text-white">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Customer</h3>
            <div className="space-y-3">
              <div>
                <Link
                  href={`/admin/customers/${order.customer.name.toLowerCase().replace(" ", "-")}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {order.customer.name}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                <FiMail className="h-4 w-4" />
                {order.customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                <FiPhone className="h-4 w-4" />
                {order.customer.phone}
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Delivery</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <FiMapPin className="h-4 w-4 text-primary mt-1" />
                <div className="text-dark-5 dark:text-dark-6">{order.deliveryAddress}</div>
              </div>
              {order.deliveryPartner && (
                <>
                  <div className="flex items-center gap-2 text-sm text-dark dark:text-white">
                    <FiTruck className="h-4 w-4 text-primary" />
                    {order.deliveryPartner}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                    <FiPhone className="h-4 w-4" />
                    {order.deliveryPhone}
                  </div>
                </>
              )}
              <div className="text-sm text-dark-5 dark:text-dark-6">
                Estimated: {order.deliveryTime}
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Order Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-dark-5 dark:text-dark-6">Order ID:</span>
                <span className="text-dark dark:text-white font-mono">{order.orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-5 dark:text-dark-6">Date:</span>
                <span className="text-dark dark:text-white">{order.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-5 dark:text-dark-6">Time:</span>
                <span className="text-dark dark:text-white">{order.time}</span>
              </div>
              {order.notes && (
                <div className="pt-2 border-t border-stroke dark:border-stroke-dark">
                  <div className="text-dark-5 dark:text-dark-6 mb-1">Notes:</div>
                  <div className="text-dark dark:text-white">{order.notes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

