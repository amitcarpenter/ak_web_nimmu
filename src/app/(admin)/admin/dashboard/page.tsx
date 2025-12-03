'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiPackage, FiShoppingCart, FiDollarSign, FiUsers, FiTrendingUp, FiAlertCircle, FiTruck, FiBox } from "react-icons/fi";

interface DashboardStats {
  total_orders: number;
  today_orders: number;
  pending_orders: number;
  total_revenue: number;
  today_revenue: number;
  total_products: number;
  low_stock_products: number;
  total_customers: number;
  active_customers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total_orders: 1245,
    today_orders: 47,
    pending_orders: 12,
    total_revenue: 1250000,
    today_revenue: 47500,
    total_products: 234,
    low_stock_products: 8,
    total_customers: 5678,
    active_customers: 3421,
  });
  const [loading, setLoading] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Breadcrumb pageName="📊 E-Commerce Dashboard" />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6 2xl:gap-7.5 mt-4">
        {/* Today's Orders */}
        <Link href="/admin/orders" className="group">
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 transition-all hover:shadow-2 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  📦 Today's Orders
                </p>
                <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                  {stats.today_orders}
                </h3>
                <Link href="/admin/orders" className="mt-1 text-xs text-primary hover:underline">
                  View All →
                </Link>
              </div>
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-primary/10">
                <FiShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </Link>

        {/* Total Revenue */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                💰 Total Revenue
              </p>
              <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                {formatCurrency(stats.total_revenue)}
              </h3>
              <p className="mt-1 text-xs text-green">
                Today: {formatCurrency(stats.today_revenue)}
              </p>
            </div>
            <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-green-light-7 dark:bg-green-dark/20">
              <FiDollarSign className="h-6 w-6 text-green" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <Link href="/admin/orders?status=pending" className="group">
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 transition-all hover:shadow-2 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  ⏳ Pending Orders
                </p>
                <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                  {stats.pending_orders}
                </h3>
                {stats.pending_orders > 0 && (
                  <Link href="/admin/orders?status=pending" className="mt-1 text-xs text-yellow-dark hover:underline">
                    Action Required →
                  </Link>
                )}
              </div>
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-yellow-light-4 dark:bg-yellow-dark/20">
                <FiAlertCircle className="h-6 w-6 text-yellow-dark" />
              </div>
            </div>
          </div>
        </Link>

        {/* Total Products */}
        <Link href="/admin/products" className="group">
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 transition-all hover:shadow-2 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  🛍️ Total Products
                </p>
                <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                  {stats.total_products}
                </h3>
                <Link href="/admin/products" className="mt-1 text-xs text-primary hover:underline">
                  Manage →
                </Link>
              </div>
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-blue-light-5 dark:bg-blue-dark/20">
                <FiPackage className="h-6 w-6 text-blue" />
              </div>
            </div>
          </div>
        </Link>

        {/* Total Customers */}
        <Link href="/admin/customers" className="group">
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 transition-all hover:shadow-2 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  👥 Total Customers
                </p>
                <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                  {stats.total_customers.toLocaleString()}
                </h3>
                <p className="mt-1 text-xs text-green">
                  {stats.active_customers} active
                </p>
              </div>
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-primary/10">
                <FiUsers className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </Link>

        {/* Low Stock Alert */}
        <Link href="/admin/inventory?filter=low_stock" className="group">
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 transition-all hover:shadow-2 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  ⚠️ Low Stock Products
                </p>
                <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                  {stats.low_stock_products}
                </h3>
                {stats.low_stock_products > 0 && (
                  <Link href="/admin/inventory?filter=low_stock" className="mt-1 text-xs text-red hover:underline">
                    Restock Now →
                  </Link>
                )}
              </div>
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-red-light-5 dark:bg-red-dark/20">
                <FiBox className="h-6 w-6 text-red" />
              </div>
            </div>
          </div>
        </Link>

        {/* Total Orders */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                📊 Total Orders
              </p>
              <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                {stats.total_orders.toLocaleString()}
              </h3>
              <p className="mt-1 text-xs text-dark-4 dark:text-dark-6">
                All time
              </p>
            </div>
            <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-primary/10">
              <FiTrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Delivery Status */}
        <Link href="/admin/delivery" className="group">
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 transition-all hover:shadow-2 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  🚚 Out for Delivery
                </p>
                <h3 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
                  23
                </h3>
                <Link href="/admin/delivery" className="mt-1 text-xs text-blue hover:underline">
                  Track →
                </Link>
              </div>
              <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-blue-light-5 dark:bg-blue-dark/20">
                <FiTruck className="h-6 w-6 text-blue" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-body-2xlg font-bold text-dark dark:text-white">
              📋 Recent Orders
            </h3>
            <Link href="/admin/orders" className="text-body-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { id: "ORD-12345", customer: "John Doe", amount: "₹1,299", status: "Delivered", time: "2 min ago" },
              { id: "ORD-12344", customer: "Jane Smith", amount: "₹899", status: "Preparing", time: "15 min ago" },
              { id: "ORD-12343", customer: "Mike Johnson", amount: "₹1,599", status: "Out for Delivery", time: "30 min ago" },
              { id: "ORD-12342", customer: "Sarah Williams", amount: "₹649", status: "Pending", time: "1 hour ago" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-stroke pb-4 last:border-0 last:pb-0 dark:border-strokedark">
                <div className="flex-1">
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {order.id} - {order.customer}
                  </p>
                  <p className="text-xs text-dark-4 dark:text-dark-6 mt-1">
                    {order.amount} • {order.status}
                  </p>
                </div>
                <span className="text-xs text-dark-4 dark:text-dark-6">
                  {order.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <h3 className="text-body-2xlg font-bold text-dark dark:text-white mb-6">
            ⚡ Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/products/create"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <FiPackage className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-dark dark:text-white">Add Product</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-light-5 hover:bg-blue-light-4 transition-colors"
            >
              <FiShoppingCart className="h-8 w-8 text-blue mb-2" />
              <span className="text-sm font-medium text-dark dark:text-white">View Orders</span>
            </Link>
            <Link
              href="/admin/inventory"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-yellow-light-4 hover:bg-yellow-light-3 transition-colors"
            >
              <FiBox className="h-8 w-8 text-yellow-dark mb-2" />
              <span className="text-sm font-medium text-dark dark:text-white">Inventory</span>
            </Link>
            <Link
              href="/admin/promotions"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-light-7 hover:bg-green-light-6 transition-colors"
            >
              <FiTrendingUp className="h-8 w-8 text-green mb-2" />
              <span className="text-sm font-medium text-dark dark:text-white">Promotions</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
