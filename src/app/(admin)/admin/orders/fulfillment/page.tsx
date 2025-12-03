"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiClock, FiCheckCircle } from "react-icons/fi";

export default function OrderFulfillmentPage() {
  const orders = [
    { id: "ORD-12344", items: 3, prepTime: "25 min", status: "Preparing", station: "Kitchen 1" },
    { id: "ORD-12343", items: 2, prepTime: "15 min", status: "Ready", station: "Kitchen 2" },
  ];

  return (
    <>
      <Breadcrumb pageName="Order Fulfillment" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Kitchen Queue</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-stroke dark:border-stroke-dark rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-dark dark:text-white">{order.id}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-dark-5 dark:text-dark-6">
                <p>Items: {order.items}</p>
                <p>Station: {order.station}</p>
                <div className="flex items-center gap-2">
                  <FiClock />
                  <span>Prep Time: {order.prepTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

