"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiDollarSign } from "react-icons/fi";

export default function SettlementsPage() {
  const settlements = [
    { id: 1, vendor: "Spice Kitchen", amount: "₹45,000", status: "Pending", date: "2024-01-15" },
    { id: 2, vendor: "Fresh Foods", amount: "₹32,500", status: "Paid", date: "2024-01-14" },
  ];

  return (
    <>
      <Breadcrumb pageName="Settlements" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Vendor Settlements</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Vendor</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Amount</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement) => (
                <tr key={settlement.id} className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]">
                  <td className="p-4 text-sm text-dark dark:text-white">{settlement.vendor}</td>
                  <td className="p-4 text-sm font-semibold text-dark dark:text-white">{settlement.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      settlement.status === "Paid" 
                        ? "bg-green-light-7 text-green" 
                        : "bg-yellow-light-4 text-yellow-dark"
                    }`}>
                      {settlement.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-dark-5 dark:text-dark-6">{settlement.date}</td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                      <FiDollarSign className="h-4 w-4 text-primary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

