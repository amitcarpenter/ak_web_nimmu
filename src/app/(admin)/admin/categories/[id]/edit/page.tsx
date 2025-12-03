import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Category",
  description: "Edit category and dynamic fields",
};

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="Edit Category" />
        <Link
          href="/admin/categories"
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <h2 className="text-heading-5 font-bold text-dark dark:text-white mb-6">
            Edit Category Information
          </h2>
          
          <form className="space-y-6">
            <div>
              <label className="mb-2.5 block text-body-sm font-medium text-dark dark:text-white">
                Category Name <span className="text-red">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Restaurant, Fuel Station"
                className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-opacity-90 transition"
              >
                Update Category
              </button>
              <Link
                href="/admin/categories"
                className="rounded-lg border border-stroke bg-white px-6 py-3 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

