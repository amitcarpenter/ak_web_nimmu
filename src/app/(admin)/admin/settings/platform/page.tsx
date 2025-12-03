import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Settings",
  description: "Configure platform settings",
};

export default function PlatformSettingsPage() {
  return (
    <>
      <Breadcrumb pageName="Platform Settings" />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <h2 className="text-heading-5 font-bold text-dark dark:text-white mb-6">
            Platform Configuration
          </h2>

          <form className="space-y-6">
            <div>
              <label className="mb-2.5 block text-body-sm font-medium text-dark dark:text-white">
                Commission Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="2.5"
                className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2.5 block text-body-sm font-medium text-dark dark:text-white">
                Minimum Wallet Balance
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="100"
                className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div className="pt-4 border-t border-stroke dark:border-dark-3">
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-opacity-90 transition"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

