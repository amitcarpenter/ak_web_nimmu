import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Management",
  description: "Manage refund requests",
};

export default function RefundsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="Refund Management" />
        <Link
          href="/admin/payments"
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
        >
          ← All Payments
        </Link>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search refunds..."
              className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-dark dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <td colSpan={5} className="px-4 py-8 text-center text-body-sm text-dark-4 dark:text-dark-6">
                    No refund requests found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

