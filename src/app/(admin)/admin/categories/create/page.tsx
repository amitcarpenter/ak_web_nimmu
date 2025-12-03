import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Category",
  description: "Create a new business category with dynamic fields",
};

export default function CreateCategoryPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="Create Category" />
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
            Category Information
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

            <div>
              <label className="mb-2.5 block text-body-sm font-medium text-dark dark:text-white">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe this category..."
                className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2.5 block text-body-sm font-medium text-dark dark:text-white">
                Status
              </label>
              <select className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className="pt-4 border-t border-stroke dark:border-dark-3">
              <h3 className="text-heading-6 font-bold text-dark dark:text-white mb-4">
                Dynamic Fields
              </h3>
              <p className="text-body-sm text-dark-4 dark:text-dark-6 mb-4">
                Add custom fields that businesses in this category will need to fill.
              </p>
              <button
                type="button"
                className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
              >
                + Add Field
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-opacity-90 transition"
              >
                Create Category
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

