"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiSearch, FiEye, FiEdit, FiCheck, FiX, FiStar, FiTrendingUp, FiTrendingDown, FiMail, FiPhone, FiMapPin, FiDownload, FiPlus } from "react-icons/fi";
import Image from "next/image";

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const vendors = [
    {
      id: 1,
      name: "Spice Kitchen",
      email: "spice@example.com",
      phone: "+91 98765 43210",
      logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&q=90",
      rating: 4.5,
      totalReviews: 234,
      status: "active",
      joinDate: "2023-01-15",
      totalOrders: 1245,
      totalRevenue: 450000,
      commission: 15,
      address: "123 Restaurant Street, Mumbai, 400001",
      cuisine: "Indian",
      deliveryTime: "30-45 min",
      minOrder: 200,
      isVerified: true,
    },
    {
      id: 2,
      name: "Fresh Farm",
      email: "fresh@example.com",
      phone: "+91 98765 43211",
      logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop&q=90",
      rating: 4.8,
      totalReviews: 189,
      status: "active",
      joinDate: "2023-03-20",
      totalOrders: 892,
      totalRevenue: 320000,
      commission: 12,
      address: "456 Farm Road, Mumbai, 400052",
      cuisine: "Organic",
      deliveryTime: "45-60 min",
      minOrder: 150,
      isVerified: true,
    },
    {
      id: 3,
      name: "Morning Delights",
      email: "morning@example.com",
      phone: "+91 98765 43212",
      logo: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop&q=90",
      rating: 4.2,
      totalReviews: 156,
      status: "pending",
      joinDate: "2024-01-10",
      totalOrders: 0,
      totalRevenue: 0,
      commission: 15,
      address: "789 Breakfast Lane, Mumbai, 400070",
      cuisine: "Breakfast",
      deliveryTime: "25-35 min",
      minOrder: 100,
      isVerified: false,
    },
    {
      id: 4,
      name: "Pizza Paradise",
      email: "pizza@example.com",
      phone: "+91 98765 43213",
      logo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&h=100&fit=crop&q=90",
      rating: 4.6,
      totalReviews: 298,
      status: "active",
      joinDate: "2023-06-05",
      totalOrders: 2156,
      totalRevenue: 780000,
      commission: 18,
      address: "321 Pizza Street, Mumbai, 400080",
      cuisine: "Italian",
      deliveryTime: "35-50 min",
      minOrder: 250,
      isVerified: true,
    },
    {
      id: 5,
      name: "Sweet Treats",
      email: "sweets@example.com",
      phone: "+91 98765 43214",
      logo: "https://images.unsplash.com/photo-1551024506-0bccd028d483?w=100&h=100&fit=crop&q=90",
      rating: 4.7,
      totalReviews: 167,
      status: "suspended",
      joinDate: "2023-08-12",
      totalOrders: 456,
      totalRevenue: 145000,
      commission: 15,
      address: "654 Dessert Avenue, Mumbai, 400090",
      cuisine: "Desserts",
      deliveryTime: "20-30 min",
      minOrder: 150,
      isVerified: true,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      active: { label: "Active", className: "bg-green-light-7 text-green" },
      pending: { label: "Pending", className: "bg-yellow-light-4 text-yellow-dark" },
      suspended: { label: "Suspended", className: "bg-red-light-5 text-red" },
      inactive: { label: "Inactive", className: "bg-gray-3 text-dark-5" },
    };
    const statusInfo = statusMap[status] || statusMap.inactive;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter;
    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "high" && vendor.rating >= 4.5) ||
      (ratingFilter === "medium" && vendor.rating >= 4.0 && vendor.rating < 4.5) ||
      (ratingFilter === "low" && vendor.rating < 4.0);
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesRating && matchesSearch;
  });

  const stats = {
    total: vendors.length,
    active: vendors.filter((v) => v.status === "active").length,
    pending: vendors.filter((v) => v.status === "pending").length,
    totalRevenue: vendors.reduce((sum, v) => sum + v.totalRevenue, 0),
  };

  const handleApprove = (vendorId: number) => {
    alert(`Vendor ${vendorId} approved`);
  };

  const handleSuspend = (vendorId: number) => {
    if (confirm("Are you sure you want to suspend this vendor?")) {
      alert(`Vendor ${vendorId} suspended`);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Vendors Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Vendors</div>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">{stats.total}</div>
          </div>
          <div className="p-4 bg-green-light-7/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Active Vendors</div>
            <div className="text-2xl font-bold text-green mt-1">{stats.active}</div>
          </div>
          <div className="p-4 bg-yellow-light-4/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Pending Approval</div>
            <div className="text-2xl font-bold text-yellow-dark mt-1">{stats.pending}</div>
          </div>
          <div className="p-4 bg-blue-light-5/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Revenue</div>
            <div className="text-2xl font-bold text-blue mt-1">{formatCurrency(stats.totalRevenue)}</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Vendors</h2>
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Manage restaurant partners and vendors
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiDownload className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              <FiPlus className="h-4 w-4" />
              Add Vendor
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              placeholder="Search by name, email, or cuisine..."
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
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
          >
            <option value="all">All Ratings</option>
            <option value="high">4.5+ Stars</option>
            <option value="medium">4.0 - 4.4 Stars</option>
            <option value="low">Below 4.0</option>
          </select>
        </div>

        {/* Vendors Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Vendor</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Contact</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Rating</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Orders</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Revenue</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Commission</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-dark-5 dark:text-dark-6">
                    No vendors found
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={vendor.logo}
                          alt={vendor.name}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/vendors/${vendor.id}`}
                              className="font-semibold text-primary hover:underline"
                            >
                              {vendor.name}
                            </Link>
                            {vendor.isVerified && (
                              <span className="px-2 py-0.5 bg-blue-light-5 text-blue text-xs rounded">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-dark-5 dark:text-dark-6">{vendor.cuisine}</div>
                          <div className="text-xs text-dark-5 dark:text-dark-6">
                            Joined: {vendor.joinDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white flex items-center gap-1 mb-1">
                        <FiMail className="h-3 w-3" />
                        {vendor.email}
                      </div>
                      <div className="text-sm text-dark dark:text-white flex items-center gap-1">
                        <FiPhone className="h-3 w-3" />
                        {vendor.phone}
                      </div>
                      <div className="text-xs text-dark-5 dark:text-dark-6 flex items-center gap-1 mt-1">
                        <FiMapPin className="h-3 w-3" />
                        {vendor.address.split(",")[0]}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FiStar className="h-4 w-4 text-yellow-dark fill-yellow-dark" />
                        <span className="font-semibold text-dark dark:text-white">{vendor.rating}</span>
                      </div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">
                        {vendor.totalReviews} reviews
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-dark dark:text-white">
                        {vendor.totalOrders.toLocaleString()}
                      </div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">
                        {vendor.deliveryTime} • Min: {formatCurrency(vendor.minOrder)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-dark dark:text-white">
                        {formatCurrency(vendor.totalRevenue)}
                      </div>
                      <div className="text-xs text-green flex items-center gap-1">
                        <FiTrendingUp className="h-3 w-3" />
                        +12%
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-dark dark:text-white">
                        {vendor.commission}%
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(vendor.status)}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/vendors/${vendor.id}`}
                          className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                          title="View Details"
                        >
                          <FiEye className="h-4 w-4 text-primary" />
                        </Link>
                        <button
                          className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                          title="Edit"
                        >
                          <FiEdit className="h-4 w-4 text-blue" />
                        </button>
                        {vendor.status === "pending" && (
                          <button
                            onClick={() => handleApprove(vendor.id)}
                            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                            title="Approve"
                          >
                            <FiCheck className="h-4 w-4 text-green" />
                          </button>
                        )}
                        {vendor.status === "active" && (
                          <button
                            onClick={() => handleSuspend(vendor.id)}
                            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                            title="Suspend"
                          >
                            <FiX className="h-4 w-4 text-red" />
                          </button>
                        )}
                      </div>
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
            Showing 1-{filteredVendors.length} of {filteredVendors.length} vendors
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
