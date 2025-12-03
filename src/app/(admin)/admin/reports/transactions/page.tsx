import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Reports",
  description: "View and export transaction reports",
};

export default function TransactionReportsPage() {
  return (
    <>
      <Breadcrumb pageName="Transaction Reports" />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="date"
                className="rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
              <span className="text-body-sm text-dark-4 dark:text-dark-6">to</span>
              <input
                type="date"
                className="rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition">
                Export PDF
              </button>
              <button className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition">
                Export Excel
              </button>
            </div>
          </div>

          <div className="text-center py-12">
            <p className="text-body-sm text-dark-4 dark:text-dark-6">
              Select date range and generate report
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

