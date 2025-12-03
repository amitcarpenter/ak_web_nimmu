"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiTruck, FiMapPin } from "react-icons/fi";

export default function DeliveryPage() {
  const drivers = [
    { id: 1, name: "Raj Kumar", phone: "+91 98765 43210", status: "On Delivery", orders: 3 },
    { id: 2, name: "Amit Singh", phone: "+91 98765 43211", status: "Available", orders: 0 },
  ];

  return (
    <>
      <Breadcrumb pageName="Fleet Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Delivery Fleet</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {drivers.map((driver) => (
            <div key={driver.id} className="border border-stroke dark:border-stroke-dark rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-dark dark:text-white">{driver.name}</h3>
                  <p className="text-sm text-dark-5 dark:text-dark-6">{driver.phone}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  driver.status === "On Delivery" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-green-light-7 text-green"
                }`}>
                  {driver.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-dark-5 dark:text-dark-6">
                <div className="flex items-center gap-2">
                  <FiTruck />
                  <span>Orders: {driver.orders}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin />
                  <span>Track</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

