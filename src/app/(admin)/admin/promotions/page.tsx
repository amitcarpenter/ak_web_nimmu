"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter, FiEye, FiCalendar, FiTrendingUp, FiUsers, FiPercent } from "react-icons/fi";
import Image from "next/image";

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const promotions = [
    {
      id: 1,
      name: "50% OFF First Order",
      code: "FIRST50",
      type: "discount",
      discount: 50,
      discountType: "percentage",
      minOrder: 0,
      maxDiscount: 500,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      usageLimit: 1000,
      usedCount: 234,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=100&fit=crop&q=90",
      description: "Get 50% off on your first order",
      targetAudience: "New Customers",
    },
    {
      id: 2,
      name: "Free Delivery Weekend",
      code: "FREEDEL",
      type: "free_delivery",
      discount: 0,
      discountType: "free",
      minOrder: 200,
      maxDiscount: null,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-01-21",
      usageLimit: 500,
      usedCount: 89,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=100&fit=crop&q=90",
      description: "Free delivery on all orders above ₹200",
      targetAudience: "All Customers",
    },
    {
      id: 3,
      name: "Weekend Special - 20% OFF",
      code: "WEEKEND20",
      type: "discount",
      discount: 20,
      discountType: "percentage",
      minOrder: 300,
      maxDiscount: 200,
      status: "scheduled",
      startDate: "2024-01-20",
      endDate: "2024-01-21",
      usageLimit: 200,
      usedCount: 0,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=100&fit=crop&q=90",
      description: "20% off on weekend orders",
      targetAudience: "All Customers",
    },
    {
      id: 4,
      name: "Buy 1 Get 1 Free",
      code: "BOGO",
      type: "bogo",
      discount: 100,
      discountType: "percentage",
      minOrder: 500,
      maxDiscount: null,
      status: "expired",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      usageLimit: 100,
      usedCount: 98,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=100&fit=crop&q=90",
      description: "Buy one get one free on selected items",
      targetAudience: "All Customers",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      active: { label: "Active", className: "bg-green-light-7 text-green" },
      scheduled: { label: "Scheduled", className: "bg-blue-light-5 text-blue" },
      expired: { label: "Expired", className: "bg-gray-3 text-dark-5" },
      paused: { label: "Paused", className: "bg-yellow-light-4 text-yellow-dark" },
    };
    const statusInfo = statusMap[status] || statusMap.expired;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return limit > 0 ? Math.round((used / limit) * 100) : 0;
  };

  const filteredPromotions = promotions.filter((promo) => {
    const matchesStatus = statusFilter === "all" || promo.status === statusFilter;
    const matchesType = typeFilter === "all" || promo.type === typeFilter;
    const matchesSearch =
      promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const stats = {
    total: promotions.length,
    active: promotions.filter((p) => p.status === "active").length,
    totalUsage: promotions.reduce((sum, p) => sum + p.usedCount, 0),
    totalSavings: 125000, // This would be calculated from actual data
  };

  return (
    <>
      <Breadcrumb pageName="Promotions Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Promotions</div>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">{stats.total}</div>
          </div>
          <div className="p-4 bg-green-light-7/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Active Promotions</div>
            <div className="text-2xl font-bold text-green mt-1">{stats.active}</div>
          </div>
          <div className="p-4 bg-blue-light-5/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Usage</div>
            <div className="text-2xl font-bold text-blue mt-1">{stats.totalUsage.toLocaleString()}</div>
          </div>
          <div className="p-4 bg-purple-light-5/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Savings</div>
            <div className="text-2xl font-bold text-purple mt-1">₹{stats.totalSavings.toLocaleString()}</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Promotions</h2>
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Manage promotional campaigns and offers
            </p>
          </div>
          <Link
            href="/admin/promotions/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            <FiPlus className="h-4 w-4" />
            Create Promotion
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              placeholder="Search by name or code..."
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
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
            <option value="paused">Paused</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="discount">Discount</option>
            <option value="free_delivery">Free Delivery</option>
            <option value="bogo">Buy One Get One</option>
          </select>
        </div>

        {/* Promotions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.length === 0 ? (
            <div className="col-span-full p-8 text-center text-dark-5 dark:text-dark-6">
              No promotions found
            </div>
          ) : (
            filteredPromotions.map((promo) => (
              <div
                key={promo.id}
                className="border border-stroke dark:border-stroke-dark rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-32">
                  <Image
                    src={promo.image}
                    alt={promo.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">{getStatusBadge(promo.status)}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-dark dark:text-white mb-1">{promo.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded">
                          {promo.code}
                        </span>
                        {promo.discountType === "percentage" && (
                          <span className="text-lg font-bold text-primary">
                            {promo.discount}% OFF
                          </span>
                        )}
                        {promo.discountType === "free" && (
                          <span className="text-lg font-bold text-green">FREE</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-dark-5 dark:text-dark-6 mb-4">{promo.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-dark-5 dark:text-dark-6">Min Order:</span>
                      <span className="text-dark dark:text-white">₹{promo.minOrder}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-dark-5 dark:text-dark-6">Valid Till:</span>
                      <span className="text-dark dark:text-white">{promo.endDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-dark-5 dark:text-dark-6">Usage:</span>
                      <span className="text-dark dark:text-white">
                        {promo.usedCount} / {promo.usageLimit > 0 ? promo.usageLimit : "∞"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-2 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${getUsagePercentage(promo.usedCount, promo.usageLimit)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-stroke dark:border-stroke-dark">
                    <button
                      className="flex-1 px-3 py-2 text-sm border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                      title="View Details"
                    >
                      <FiEye className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      className="flex-1 px-3 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/10"
                      title="Edit"
                    >
                      <FiEdit className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                      className="px-3 py-2 text-sm text-red border border-red rounded-lg hover:bg-red/10"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
