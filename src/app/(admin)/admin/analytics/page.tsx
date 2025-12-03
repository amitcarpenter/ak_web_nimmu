import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics & Statistics - Dhol Matrimony",
  description: "View analytics and statistics",
};

export default function Analytics() {
  return (
    <>
      <Breadcrumb pageName="📈 Analytics & Statistics" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <h3 className="mb-6 text-heading-6 font-bold text-dark dark:text-white">
            📊 User Growth Trend
          </h3>
          <div className="flex h-64 items-center justify-center border-2 border-dashed border-stroke rounded-lg dark:border-strokedark">
            <p className="text-dark-4 dark:text-dark-6">
              Chart: User Growth (Last 30 Days)
            </p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <h3 className="mb-6 text-heading-6 font-bold text-dark dark:text-white">
            💰 Revenue Analysis
          </h3>
          <div className="flex h-64 items-center justify-center border-2 border-dashed border-stroke rounded-lg dark:border-strokedark">
            <p className="text-dark-4 dark:text-dark-6">
              Chart: Revenue (Last 30 Days)
            </p>
          </div>
        </div>

        {/* Match Statistics */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <h3 className="mb-6 text-heading-6 font-bold text-dark dark:text-white">
            ❤️ Match Statistics
          </h3>
          <div className="flex h-64 items-center justify-center border-2 border-dashed border-stroke rounded-lg dark:border-strokedark">
            <p className="text-dark-4 dark:text-dark-6">
              Chart: Match Success Rate
            </p>
          </div>
        </div>

        {/* Subscription Distribution */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <h3 className="mb-6 text-heading-6 font-bold text-dark dark:text-white">
            💎 Subscription Distribution
          </h3>
          <div className="flex h-64 items-center justify-center border-2 border-dashed border-stroke rounded-lg dark:border-strokedark">
            <p className="text-dark-4 dark:text-dark-6">
              Chart: Plan Distribution (Pie Chart)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

