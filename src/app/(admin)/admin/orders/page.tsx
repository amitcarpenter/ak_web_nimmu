"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiSearch, FiFilter, FiEye, FiEdit, FiDownload, FiPrinter, FiCheck, FiX, FiTruck, FiPackage } from "react-icons/fi";
import Image from "next/image";

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    {
      id: 1,
      orderId: "ORD-12345",
      customer: { name: "John Doe", email: "john@example.com", phone: "+91 98765 43210" },
      items: [
        { name: "Chicken Biryani", quantity: 2, price: 299, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop&q=90" },
        { name: "Fresh Vegetable Pack", quantity: 1, price: 199, image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop&q=90" },
      ],
      amount: 1299,
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "UPI",
      date: "2024-01-15",
      deliveryAddress: "123 Main St, Mumbai, 400001",
      deliveryTime: "30-45 min",
      notes: "Handle with care",
    },
    {
      id: 2,
      orderId: "ORD-12344",
      customer: { name: "Jane Smith", email: "jane@example.com", phone: "+91 98765 43211" },
      items: [
        { name: "Paneer Tikka", quantity: 1, price: 249, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=100&h=100&fit=crop&q=90" },
      ],
      amount: 899,
      status: "preparing",
      paymentStatus: "paid",
      paymentMethod: "Card",
      date: "2024-01-15",
      deliveryAddress: "456 Park Ave, Mumbai, 400052",
      deliveryTime: "45-60 min",
      notes: "",
    },
    {
      id: 3,
      orderId: "ORD-12343",
      customer: { name: "Mike Johnson", email: "mike@example.com", phone: "+91 98765 43212" },
      items: [
        { name: "Butter Chicken", quantity: 2, price: 349, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop&q=90" },
        { name: "Naan Bread", quantity: 4, price: 40, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop&q=90" },
      ],
      amount: 1599,
      status: "out_for_delivery",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      date: "2024-01-15",
      deliveryAddress: "789 Business Park, Mumbai, 400070",
      deliveryTime: "15-30 min",
      notes: "Call before delivery",
    },
    {
      id: 4,
      orderId: "ORD-12342",
      customer: { name: "Sarah Williams", email: "sarah@example.com", phone: "+91 98765 43213" },
      items: [
        { name: "Fresh Fruits Pack", quantity: 1, price: 299, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100&h=100&fit=crop&q=90" },
      ],
      amount: 649,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "UPI",
      date: "2024-01-15",
      deliveryAddress: "321 Residential Complex, Mumbai, 400080",
      deliveryTime: "60-90 min",
      notes: "",
    },
    {
      id: 5,
      orderId: "ORD-12341",
      customer: { name: "David Lee", email: "david@example.com", phone: "+91 98765 43214" },
      items: [
        { name: "Breakfast Combo", quantity: 2, price: 199, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop&q=90" },
      ],
      amount: 1199,
      status: "cancelled",
      paymentStatus: "refunded",
      paymentMethod: "Card",
      date: "2024-01-14",
      deliveryAddress: "654 Street Name, Mumbai, 400090",
      deliveryTime: "N/A",
      notes: "Customer cancelled",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending", className: "bg-yellow-light-4 text-yellow-dark" },
      confirmed: { label: "Confirmed", className: "bg-blue-light-5 text-blue" },
      preparing: { label: "Preparing", className: "bg-orange-light-5 text-orange" },
      ready: { label: "Ready", className: "bg-purple-light-5 text-purple" },
      out_for_delivery: { label: "Out for Delivery", className: "bg-blue-light-5 text-blue" },
      delivered: { label: "Delivered", className: "bg-green-light-7 text-green" },
      cancelled: { label: "Cancelled", className: "bg-red-light-5 text-red" },
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      paid: { label: "Paid", className: "bg-green-light-7 text-green" },
      pending: { label: "Pending", className: "bg-yellow-light-4 text-yellow-dark" },
      failed: { label: "Failed", className: "bg-red-light-5 text-red" },
      refunded: { label: "Refunded", className: "bg-gray-3 text-dark-5" },
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBulkAction = (action: string) => {
    if (selectedOrders.length === 0) {
      alert("Please select orders first");
      return;
    }
    alert(`Bulk action: ${action} on ${selectedOrders.length} orders`);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    alert(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <>
      <Breadcrumb pageName="Orders Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Orders</h2>
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Total: {filteredOrders.length} orders
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiDownload className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiPrinter className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
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
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="mb-4 p-4 bg-primary/10 border border-primary rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-dark dark:text-white">
              {selectedOrders.length} order(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("confirm")}
                className="px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/90 text-sm"
              >
                Confirm Selected
              </button>
              <button
                onClick={() => handleBulkAction("cancel")}
                className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red/90 text-sm"
              >
                Cancel Selected
              </button>
              <button
                onClick={() => setSelectedOrders([])}
                className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(filteredOrders.map((o) => o.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                    className="w-4 h-4"
                  />
                </th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Order ID</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Customer</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Items</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Amount</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Payment</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-dark-5 dark:text-dark-6">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders([...selectedOrders, order.id]);
                          } else {
                            setSelectedOrders(selectedOrders.filter((id) => id !== order.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order.orderId}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {order.orderId}
                      </Link>
                      <div className="text-xs text-dark-5 dark:text-dark-6 mt-1">{order.date}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-dark dark:text-white">{order.customer.name}</div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">{order.customer.email}</div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">{order.customer.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={32}
                              height={32}
                              className="rounded"
                            />
                            <div className="text-sm">
                              <div className="text-dark dark:text-white">{item.name}</div>
                              <div className="text-xs text-dark-5 dark:text-dark-6">
                                Qty: {item.quantity} × {formatCurrency(item.price)}
                              </div>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-xs text-primary">+{order.items.length - 2} more</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-dark dark:text-white">{formatCurrency(order.amount)}</div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">{order.paymentMethod}</div>
                    </td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4">{getPaymentStatusBadge(order.paymentStatus)}</td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">{order.date}</div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">{order.deliveryTime}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/orders/${order.orderId}`}
                          className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                          title="View Details"
                        >
                          <FiEye className="h-4 w-4 text-primary" />
                        </Link>
                        <button
                          className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                          title="Edit Order"
                        >
                          <FiEdit className="h-4 w-4 text-blue" />
                        </button>
                        {order.status === "pending" && (
                          <button
                            onClick={() => handleStatusChange(order.orderId, "confirmed")}
                            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                            title="Confirm Order"
                          >
                            <FiCheck className="h-4 w-4 text-green" />
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button
                            onClick={() => handleStatusChange(order.orderId, "ready")}
                            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                            title="Mark Ready"
                          >
                            <FiPackage className="h-4 w-4 text-purple" />
                          </button>
                        )}
                        {order.status === "ready" && (
                          <button
                            onClick={() => handleStatusChange(order.orderId, "out_for_delivery")}
                            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                            title="Out for Delivery"
                          >
                            <FiTruck className="h-4 w-4 text-blue" />
                          </button>
                        )}
                        {order.status !== "delivered" && order.status !== "cancelled" && (
                          <button
                            onClick={() => handleStatusChange(order.orderId, "cancelled")}
                            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                            title="Cancel Order"
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
            Showing 1-{filteredOrders.length} of {filteredOrders.length} orders
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
