"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const logs = [
    {
      id: 1,
      user: "Admin User",
      action: "Created Product",
      resource: "Chicken Biryani Combo",
      ip: "192.168.1.1",
      timestamp: "2024-01-15 10:30 AM",
      status: "Success",
    },
    {
      id: 2,
      user: "Manager",
      action: "Updated Order",
      resource: "ORD-12345",
      ip: "192.168.1.2",
      timestamp: "2024-01-15 09:15 AM",
      status: "Success",
    },
    {
      id: 3,
      user: "Admin User",
      action: "Deleted Product",
      resource: "Old Product",
      ip: "192.168.1.1",
      timestamp: "2024-01-14 05:20 PM",
      status: "Success",
    },
  ];

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Breadcrumb pageName="Audit Logs" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark dark:text-white">Activity Logs</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiDownload />
            Export
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">User</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Action</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Resource</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">IP Address</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Timestamp</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                >
                  <td className="p-4 text-sm text-dark dark:text-white">{log.user}</td>
                  <td className="p-4 text-sm text-dark dark:text-white">{log.action}</td>
                  <td className="p-4 text-sm text-dark-5 dark:text-dark-6">{log.resource}</td>
                  <td className="p-4 text-sm text-dark-5 dark:text-dark-6">{log.ip}</td>
                  <td className="p-4 text-sm text-dark-5 dark:text-dark-6">{log.timestamp}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-light-7 text-green">
                      {log.status}
                    </span>
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

