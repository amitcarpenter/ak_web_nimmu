import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchant Wallets",
  description: "Manage merchant wallets",
};

export default function MerchantWalletsPage() {
  return (
    <>
      <Breadcrumb pageName="Merchant Wallets" />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-4 sm:p-7.5">
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search merchants..."
              className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Business Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Balance
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                    Frozen Balance
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-dark dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <td colSpan={4} className="px-4 py-8 text-center text-body-sm text-dark-4 dark:text-dark-6">
                    No merchant wallets found.
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

