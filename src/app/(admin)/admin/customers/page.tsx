"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiSearch, FiEye, FiMail, FiPhone, FiMapPin, FiTrendingUp, FiTrendingDown, FiFilter, FiDownload } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      orders: 12,
      totalSpent: 15000,
      averageOrder: 1250,
      lastOrder: "2024-01-15",
      status: "active",
      segment: "vip",
      joinDate: "2023-06-15",
      address: "123 Main St, Mumbai, 400001",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 98765 43211",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      orders: 8,
      totalSpent: 9500,
      averageOrder: 1187,
      lastOrder: "2024-01-14",
      status: "active",
      segment: "regular",
      joinDate: "2023-08-20",
      address: "456 Park Ave, Mumbai, 400052",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 98765 43212",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      orders: 25,
      totalSpent: 32000,
      averageOrder: 1280,
      lastOrder: "2024-01-15",
      status: "active",
      segment: "vip",
      joinDate: "2023-03-10",
      address: "789 Business Park, Mumbai, 400070",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+91 98765 43213",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      orders: 3,
      totalSpent: 2500,
      averageOrder: 833,
      lastOrder: "2024-01-10",
      status: "inactive",
      segment: "new",
      joinDate: "2023-12-01",
      address: "321 Residential Complex, Mumbai, 400080",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@example.com",
      phone: "+91 98765 43214",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      orders: 18,
      totalSpent: 22000,
      averageOrder: 1222,
      lastOrder: "2024-01-13",
      status: "active",
      segment: "regular",
      joinDate: "2023-05-05",
      address: "654 Street Name, Mumbai, 400090",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSegmentBadge = (segment: string) => {
    const segmentMap: Record<string, { label: string; className: string }> = {
      vip: { label: "VIP", className: "bg-purple-light-5 text-purple" },
      regular: { label: "Regular", className: "bg-blue-light-5 text-blue" },
      new: { label: "New", className: "bg-green-light-7 text-green" },
    };
    const segmentInfo = segmentMap[segment] || segmentMap.regular;
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${segmentInfo.className}`}>
        {segmentInfo.label}
      </span>
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    return matchesStatus && matchesSegment && matchesSearch;
  });

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    vip: customers.filter((c) => c.segment === "vip").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <>
      <Breadcrumb pageName="Customers Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Customers</div>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">{stats.total}</div>
          </div>
          <div className="p-4 bg-green-light-7/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Active Customers</div>
            <div className="text-2xl font-bold text-green mt-1">{stats.active}</div>
          </div>
          <div className="p-4 bg-purple-light-5/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">VIP Customers</div>
            <div className="text-2xl font-bold text-purple mt-1">{stats.vip}</div>
          </div>
          <div className="p-4 bg-blue-light-5/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Revenue</div>
            <div className="text-2xl font-bold text-blue mt-1">{formatCurrency(stats.totalRevenue)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
          >
            <option value="all">All Segments</option>
            <option value="vip">VIP</option>
            <option value="regular">Regular</option>
            <option value="new">New</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Customer</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Contact</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Orders</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Total Spent</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Avg Order</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Segment</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Last Order</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-dark-5 dark:text-dark-6">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={customer.avatar}
                          alt={customer.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <Link
                            href={`/admin/customers/${customer.id}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {customer.name}
                          </Link>
                          <div className="text-xs text-dark-5 dark:text-dark-6">
                            Joined: {customer.joinDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white flex items-center gap-1 mb-1">
                        <FiMail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="text-sm text-dark dark:text-white flex items-center gap-1">
                        <FiPhone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-dark dark:text-white">{customer.orders}</div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">orders</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-dark dark:text-white">
                        {formatCurrency(customer.totalSpent)}
                      </div>
                      <div className="text-xs text-green flex items-center gap-1">
                        <FiTrendingUp className="h-3 w-3" />
                        +12%
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">
                        {formatCurrency(customer.averageOrder)}
                      </div>
                    </td>
                    <td className="p-4">{getSegmentBadge(customer.segment)}</td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">{customer.lastOrder}</div>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded inline-block"
                        title="View Details"
                      >
                        <FiEye className="h-4 w-4 text-primary" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-dark-5 dark:text-dark-6">
            Showing 1-{filteredCustomers.length} of {filteredCustomers.length} customers
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              Previous
            </button>
            <button className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
