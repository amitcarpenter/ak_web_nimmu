"use client";

import { use } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiPackage, FiDollarSign, FiTrendingUp, FiEdit, FiPrinter } from "react-icons/fi";
import Image from "next/image";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // In real app, fetch customer data by ID
  const customer = {
    id: parseInt(id),
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    status: "active",
    segment: "vip",
    joinDate: "2023-06-15",
    lastLogin: "2024-01-15 10:30 AM",
    address: "123 Main St, Mumbai, Maharashtra 400001",
    orders: 12,
    totalSpent: 15000,
    averageOrder: 1250,
    lastOrder: "2024-01-15",
    lifetimeValue: 15000,
    favoriteCategories: ["Prepared Meals", "Groceries"],
    paymentMethods: ["UPI", "Card"],
  };

  const recentOrders = [
    {
      id: "ORD-12345",
      date: "2024-01-15",
      items: 3,
      amount: 1299,
      status: "Delivered",
      itemsList: [
        { name: "Chicken Biryani", quantity: 2, price: 299 },
        { name: "Fresh Vegetable Pack", quantity: 1, price: 199 },
      ],
    },
    {
      id: "ORD-12340",
      date: "2024-01-12",
      items: 2,
      amount: 899,
      status: "Delivered",
      itemsList: [
        { name: "Paneer Tikka", quantity: 1, price: 249 },
        { name: "Naan Bread", quantity: 4, price: 40 },
      ],
    },
    {
      id: "ORD-12335",
      date: "2024-01-10",
      items: 1,
      amount: 649,
      status: "Delivered",
      itemsList: [
        { name: "Fresh Fruits Pack", quantity: 1, price: 299 },
      ],
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
            href="/admin/customers"
            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg"
          >
            <FiArrowLeft className="h-5 w-5 text-dark dark:text-white" />
          </Link>
          <Breadcrumb pageName={`Customer Details - ${customer.name}`} />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiEdit className="h-4 w-4" />
            Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiPrinter className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info Card */}
        <div className="lg:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={customer.avatar}
                  alt={customer.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">{customer.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                customer.segment === "vip"
                  ? "bg-purple-light-5 text-purple"
                  : customer.segment === "regular"
                  ? "bg-blue-light-5 text-blue"
                  : "bg-green-light-7 text-green"
              }`}>
                {customer.segment.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiMail className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Email</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{customer.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiPhone className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Phone</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{customer.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiMapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Address</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{customer.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <FiCalendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-dark-5 dark:text-dark-6">Joined</div>
                  <div className="text-sm font-medium text-dark dark:text-white">{customer.joinDate}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-stroke dark:border-stroke-dark">
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-2">Payment Methods</div>
                <div className="flex flex-wrap gap-2">
                  {customer.paymentMethods.map((method, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stroke dark:border-stroke-dark">
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-2">Favorite Categories</div>
                <div className="flex flex-wrap gap-2">
                  {customer.favoriteCategories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-light-5/20 text-blue text-xs rounded"
                    >
                      {cat}
                    </span>
                  ))}
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
              <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Total Orders</div>
              <div className="text-2xl font-bold text-dark dark:text-white">{customer.orders}</div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Total Spent</div>
              <div className="text-2xl font-bold text-green">{formatCurrency(customer.totalSpent)}</div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Avg Order</div>
              <div className="text-2xl font-bold text-blue">{formatCurrency(customer.averageOrder)}</div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Lifetime Value</div>
              <div className="text-2xl font-bold text-purple">{formatCurrency(customer.lifetimeValue)}</div>
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

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:bg-gray-1 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {order.id}
                      </Link>
                      <div className="text-xs text-dark-5 dark:text-dark-6 mt-1">
                        {order.date} • {order.items} items
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-dark dark:text-white">
                        {formatCurrency(order.amount)}
                      </div>
                      <span className="px-2 py-1 bg-green-light-7 text-green text-xs rounded">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {order.itemsList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm text-dark-5 dark:text-dark-6"
                      >
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

