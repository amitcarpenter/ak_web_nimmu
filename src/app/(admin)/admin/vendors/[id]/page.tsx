"use client";

import { use } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiStar, FiTrendingUp, FiEdit, FiPackage, FiDollarSign, FiUsers, FiCheck, FiX } from "react-icons/fi";
import Image from "next/image";

export default function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // In real app, fetch vendor data by ID
  const vendor = {
    id: parseInt(id),
    name: "Spice Kitchen",
    email: "spice@example.com",
    phone: "+91 98765 43210",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop&q=90",
    status: "active",
    rating: 4.5,
    totalReviews: 234,
    joinDate: "2023-01-15",
    address: "123 Restaurant Street, Mumbai, Maharashtra 400001",
    cuisine: "Indian",
    deliveryTime: "30-45 min",
    minOrder: 200,
    isVerified: true,
    commission: 15,
    totalOrders: 1245,
    totalRevenue: 450000,
    activeProducts: 45,
    pendingOrders: 3,
  };

  const recentOrders = [
    {
      id: "ORD-12345",
      customer: "John Doe",
      date: "2024-01-15",
      amount: 1299,
      status: "Delivered",
    },
    {
      id: "ORD-12340",
      customer: "Jane Smith",
      date: "2024-01-14",
      amount: 899,
      status: "Preparing",
    },
    {
      id: "ORD-12335",
      customer: "Mike Johnson",
      date: "2024-01-13",
      amount: 1599,
      status: "Delivered",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/vendors"
            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg"
          >
            <FiArrowLeft className="h-5 w-5 text-dark dark:text-white" />
          </Link>
          <Breadcrumb pageName={`Vendor Details - ${vendor.name}`} />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiEdit className="h-4 w-4" />
            Edit
          </button>
          {vendor.status === "active" ? (
            <button className="flex items-center gap-2 px-4 py-2 bg-red text-white rounded-lg hover:bg-red/90">
              <FiX className="h-4 w-4" />
              Suspend
            </button>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-green/90">
              <FiCheck className="h-4 w-4" />
              Activate
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor Info Card */}
        <div className="lg:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden">
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">{vendor.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <FiStar className="h-4 w-4 text-yellow-dark fill-yellow-dark" />
                <span className="font-semibold text-dark dark:text-white">{vendor.rating}</span>
                <span className="text-sm text-dark-5 dark:text-dark-6">
                  ({vendor.totalReviews} reviews)
                </span>
              </div>
              {vendor.isVerified && (
                <span className="px-3 py-1 bg-blue-light-5 text-blue text-xs rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiMail className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Email</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{vendor.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiPhone className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Phone</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{vendor.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiMapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Address</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{vendor.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiCalendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Joined</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{vendor.joinDate}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-stroke dark:border-stroke-dark space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Cuisine:</span>
                  <span className="font-medium text-dark dark:text-white">{vendor.cuisine}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Delivery Time:</span>
                  <span className="font-medium text-dark dark:text-white">{vendor.deliveryTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Min Order:</span>
                  <span className="font-medium text-dark dark:text-white">{formatCurrency(vendor.minOrder)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-5 dark:text-dark-6">Commission:</span>
                  <span className="font-medium text-primary">{vendor.commission}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiPackage className="h-5 w-5 text-primary" />
                <div className="text-xs text-dark-5 dark:text-dark-6">Total Orders</div>
              </div>
              <div className="text-2xl font-bold text-dark dark:text-white">{vendor.totalOrders.toLocaleString()}</div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiDollarSign className="h-5 w-5 text-green" />
                <div className="text-xs text-dark-5 dark:text-dark-6">Total Revenue</div>
              </div>
              <div className="text-2xl font-bold text-green">{formatCurrency(vendor.totalRevenue)}</div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiPackage className="h-5 w-5 text-blue" />
                <div className="text-xs text-dark-5 dark:text-dark-6">Active Products</div>
              </div>
              <div className="text-2xl font-bold text-blue">{vendor.activeProducts}</div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiUsers className="h-5 w-5 text-yellow-dark" />
                <div className="text-xs text-dark-5 dark:text-dark-6">Pending Orders</div>
              </div>
              <div className="text-2xl font-bold text-yellow-dark">{vendor.pendingOrders}</div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-dark dark:text-white">Recent Orders</h3>
              <Link
                href="/admin/orders"
                className="text-sm text-primary hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stroke dark:border-stroke-dark">
                    <th className="text-left p-3 text-sm font-semibold text-dark dark:text-white">Order ID</th>
                    <th className="text-left p-3 text-sm font-semibold text-dark dark:text-white">Customer</th>
                    <th className="text-left p-3 text-sm font-semibold text-dark dark:text-white">Date</th>
                    <th className="text-left p-3 text-sm font-semibold text-dark dark:text-white">Amount</th>
                    <th className="text-left p-3 text-sm font-semibold text-dark dark:text-white">Status</th>
                    <th className="text-left p-3 text-sm font-semibold text-dark dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-1 dark:hover:bg-gray-800"
                    >
                      <td className="p-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="p-3 text-sm text-dark dark:text-white">{order.customer}</td>
                      <td className="p-3 text-sm text-dark-5 dark:text-dark-6">{order.date}</td>
                      <td className="p-3 text-sm font-semibold text-dark dark:text-white">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-light-7 text-green"
                            : "bg-yellow-light-4 text-yellow-dark"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-primary hover:underline text-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

