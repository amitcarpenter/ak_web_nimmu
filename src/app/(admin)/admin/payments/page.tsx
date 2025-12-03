import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payments",
  description: "Monitor and manage all transactions",
};

export default function PaymentsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="Payments" />
        <div className="flex gap-3">
          <Link
            href="/admin/payments/refunds"
            className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
          >
            Refunds
          </Link>
          <Link
            href="/admin/payments/settlements"
            className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
          >
            Settlements
          </Link>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              placeholder="Search transactions..."
              className="w-full sm:w-auto sm:flex-1 rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
            <select className="w-full sm:w-auto rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
              <option value="">All Status</option>
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Business
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-dark dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <td colSpan={7} className="px-4 py-8 text-center text-body-sm text-dark-4 dark:text-dark-6">
                    No transactions found.
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

