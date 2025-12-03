import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Reports - Dhol Matrimony",
  description: "View and manage pending reports",
};

const pendingReports = [
  { id: 234, reporter: "Priya Patel", reported: "Amit Kumar", type: "Harassment & Abuse", priority: "high", date: "26/11/2024, 10:30 AM" },
  { id: 235, reporter: "Rahul Sharma", reported: "Sneha Gupta", type: "Fake Profile", priority: "medium", date: "25/11/2024, 2:15 PM" },
];

export default function PendingReports() {
  return (
    <>
      <Breadcrumb pageName="🚨 Pending Reports" />

      <div className="mb-6 flex items-center justify-end">
        <Link
          href="/admin/reports"
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-body-sm font-medium hover:bg-gray-2 dark:border-strokedark dark:bg-gray-dark"
        >
          ← All Reports
        </Link>
      </div>

      <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-stroke dark:border-strokedark">
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Report ID
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Reporter
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Reported User
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Type
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Priority
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Date
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingReports.map((report) => (
                <tr key={report.id} className="border-b border-stroke dark:border-strokedark">
                  <td className="px-4 py-4 font-medium text-primary">
                    #{report.id}
                  </td>
                  <td className="px-4 py-4">{report.reporter}</td>
                  <td className="px-4 py-4">{report.reported}</td>
                  <td className="px-4 py-4 text-body-sm">{report.type}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      report.priority === 'high' 
                        ? 'bg-red-light-5 text-red' 
                        : 'bg-yellow-light-4 text-yellow-dark'
                    }`}>
                      {report.priority === 'high' ? '🔴 High' : '🟡 Medium'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-body-sm">{report.date}</td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/reports/${report.id}`}
                      className="text-body-sm font-medium text-primary hover:underline"
                    >
                      Review →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

