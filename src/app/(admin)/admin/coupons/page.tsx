"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

export default function CouponsPage() {
  const coupons = [
    { id: 1, code: "WEEKEND20", discount: "20%", minOrder: "₹300", status: "Active" },
    { id: 2, code: "SUBSCRIBE15", discount: "15%", minOrder: "₹1000", status: "Active" },
  ];

  return (
    <>
      <Breadcrumb pageName="Coupons Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark dark:text-white">Coupons</h2>
          <Link
            href="/admin/coupons/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            <FiPlus />
            Create Coupon
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Coupon Code</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Discount</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Min Order</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]">
                  <td className="p-4 text-sm font-mono font-semibold text-dark dark:text-white">{coupon.code}</td>
                  <td className="p-4 text-sm font-semibold text-dark dark:text-white">{coupon.discount}</td>
                  <td className="p-4 text-sm text-dark dark:text-white">{coupon.minOrder}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-light-7 text-green">
                      {coupon.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                        <FiEdit className="h-4 w-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                        <FiTrash2 className="h-4 w-4 text-red" />
                      </button>
                    </div>
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

