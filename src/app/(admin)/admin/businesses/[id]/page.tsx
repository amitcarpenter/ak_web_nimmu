import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Details",
  description: "View and manage business details",
};

export default function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="Business Details" />
        <Link
          href="/admin/businesses"
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
        >
          ← Back to Businesses
        </Link>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <h2 className="text-heading-5 font-bold text-dark dark:text-white mb-6">
            Business Information
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="mb-2.5 block text-body-sm font-medium text-dark dark:text-white">
                Business Name
              </label>
              <p className="text-body-sm text-dark-4 dark:text-dark-6">
                Loading...
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-opacity-90 transition">
                Approve
              </button>
              <button className="rounded-lg border border-red bg-white px-6 py-3 text-red font-medium hover:bg-red-light-6 dark:border-red dark:bg-gray-dark dark:hover:bg-red-light-6 transition">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

