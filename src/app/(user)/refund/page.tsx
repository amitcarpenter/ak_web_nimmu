"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPackage, FiUpload, FiChevronRight } from "react-icons/fi";

export default function RefundPage() {
  const [selectedOrder, setSelectedOrder] = useState<string>("");

  const orders = [
    { id: "ORD-12345", date: "2024-01-15", amount: "₹1,299", status: "Delivered" },
    { id: "ORD-12344", date: "2024-01-14", amount: "₹899", status: "Delivered" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Request Refund</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Select Order */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Select Order</h2>
          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
          >
            <option value="">Select an order</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} - {order.amount} - {order.date}
              </option>
            ))}
          </select>
        </div>

        {/* Refund Form */}
        {selectedOrder && (
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Refund Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Reason for Refund
                </label>
                <select className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary">
                  <option>Damaged Item</option>
                  <option>Wrong Item</option>
                  <option>Missing Item</option>
                  <option>Quality Issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Please describe the issue..."
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Upload Evidence (Optional)
                </label>
                <div className="border-2 border-dashed border-stroke dark:border-stroke-dark rounded-lg p-6 text-center">
                  <FiUpload className="mx-auto h-8 w-8 text-dark-5 dark:text-dark-6 mb-2" />
                  <p className="text-sm text-dark-5 dark:text-dark-6 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Submit Refund Request
              </button>
            </form>
          </div>
        )}

        {/* Refund History */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Refund History</h2>
          <div className="space-y-3">
            {[
              { id: "REF-001", order: "ORD-12340", amount: "₹200", status: "Processing", date: "2024-01-12" },
              { id: "REF-002", order: "ORD-12335", amount: "₹150", status: "Approved", date: "2024-01-10" },
            ].map((refund) => (
              <Link
                key={refund.id}
                href={`/refund/${refund.id}`}
                className="flex items-center justify-between p-4 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors"
              >
                <div>
                  <p className="font-semibold text-dark dark:text-white">{refund.id}</p>
                  <p className="text-sm text-dark-5 dark:text-dark-6">
                    Order: {refund.order} • {refund.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-dark dark:text-white">{refund.amount}</p>
                  <span
                    className={`text-xs ${
                      refund.status === "Approved"
                        ? "text-green"
                        : refund.status === "Processing"
                        ? "text-yellow-dark"
                        : "text-red"
                    }`}
                  >
                    {refund.status}
                  </span>
                </div>
                <FiChevronRight className="text-dark-5 dark:text-dark-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

