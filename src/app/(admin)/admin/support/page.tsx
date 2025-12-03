"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiMessageCircle, FiCheck, FiClock, FiAlertCircle } from "react-icons/fi";

export default function SupportPage() {
  const [filter, setFilter] = useState<"all" | "open" | "resolved" | "closed">("all");

  const tickets = [
    {
      id: "TKT-001",
      subject: "Order not delivered",
      customer: "John Doe",
      priority: "High",
      status: "Open",
      createdAt: "2024-01-15 10:30 AM",
      lastReply: "2 hours ago",
    },
    {
      id: "TKT-002",
      subject: "Refund request",
      customer: "Jane Smith",
      priority: "Medium",
      status: "In Progress",
      createdAt: "2024-01-14 02:15 PM",
      lastReply: "1 day ago",
    },
    {
      id: "TKT-003",
      subject: "Product quality issue",
      customer: "Mike Johnson",
      priority: "Low",
      status: "Resolved",
      createdAt: "2024-01-13 09:00 AM",
      lastReply: "3 days ago",
    },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "open") return ticket.status === "Open" || ticket.status === "In Progress";
    if (filter === "resolved") return ticket.status === "Resolved";
    if (filter === "closed") return ticket.status === "Closed";
    return true;
  });

  return (
    <>
      <Breadcrumb pageName="Support Tickets" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark dark:text-white">Support Tickets</h2>
          <div className="flex gap-2 border border-stroke dark:border-stroke-dark rounded-lg p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("open")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "open"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "resolved"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-dark dark:text-white">{ticket.id}</h3>
                    <span className="text-sm text-dark-5 dark:text-dark-6">{ticket.subject}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.priority === "High"
                          ? "bg-red-light-5 text-red"
                          : ticket.priority === "Medium"
                          ? "bg-yellow-light-7 text-yellow-dark"
                          : "bg-green-light-7 text-green"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === "Open"
                          ? "bg-red-light-5 text-red"
                          : ticket.status === "In Progress"
                          ? "bg-yellow-light-7 text-yellow-dark"
                          : "bg-green-light-7 text-green"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-dark-5 dark:text-dark-6">
                    <span>Customer: {ticket.customer}</span>
                    <span>Created: {ticket.createdAt}</span>
                    <span>Last Reply: {ticket.lastReply}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2">
                  <FiMessageCircle />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

