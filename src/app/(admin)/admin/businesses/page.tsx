import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Businesses",
  description: "Manage all businesses on the platform",
};

export default function BusinessesPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="Businesses" />
        <div className="flex gap-3">
          <Link
            href="/admin/businesses/pending"
            className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
          >
            Pending Approvals
          </Link>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              placeholder="Search businesses..."
              className="w-full sm:w-auto sm:flex-1 rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
            <select className="w-full sm:w-auto rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Business Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Owner
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Category
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
                    No businesses found.
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

