"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiAlertCircle, FiBox, FiRefreshCw, FiFilter, FiSearch, FiEdit, FiPlus, FiDownload, FiUpload, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function InventoryPage() {
  const [filter, setFilter] = useState<"all" | "low" | "out" | "expiring">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const inventory = [
    {
      id: 1,
      name: "Chicken Biryani",
      sku: "PROD-001",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop&q=90",
      currentStock: 5,
      minStock: 10,
      maxStock: 100,
      unit: "units",
      expiryDate: "2024-01-20",
      status: "Low Stock",
      alert: true,
      category: "Prepared Meals",
      vendor: "Spice Kitchen",
      lastRestocked: "2024-01-10",
      cost: 150,
      sellingPrice: 299,
    },
    {
      id: 2,
      name: "Fresh Vegetables",
      sku: "PROD-002",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop&q=90",
      currentStock: 25,
      minStock: 20,
      maxStock: 200,
      unit: "kg",
      expiryDate: "2024-01-25",
      status: "In Stock",
      alert: false,
      category: "Groceries",
      vendor: "Fresh Farm",
      lastRestocked: "2024-01-12",
      cost: 80,
      sellingPrice: 199,
    },
    {
      id: 3,
      name: "Paneer Tikka",
      sku: "PROD-003",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=100&h=100&fit=crop&q=90",
      currentStock: 0,
      minStock: 15,
      maxStock: 80,
      unit: "units",
      expiryDate: "2024-01-18",
      status: "Out of Stock",
      alert: true,
      category: "Prepared Meals",
      vendor: "Spice Kitchen",
      lastRestocked: "2024-01-05",
      cost: 120,
      sellingPrice: 249,
    },
    {
      id: 4,
      name: "Breakfast Combo",
      sku: "PROD-006",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop&q=90",
      currentStock: 8,
      minStock: 10,
      maxStock: 50,
      unit: "units",
      expiryDate: "2024-01-16",
      status: "Low Stock",
      alert: true,
      category: "Prepared Meals",
      vendor: "Morning Delights",
      lastRestocked: "2024-01-08",
      cost: 100,
      sellingPrice: 199,
    },
    {
      id: 5,
      name: "Fresh Fruits Pack",
      sku: "PROD-005",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100&h=100&fit=crop&q=90",
      currentStock: 78,
      minStock: 20,
      maxStock: 150,
      unit: "kg",
      expiryDate: "2024-01-30",
      status: "In Stock",
      alert: false,
      category: "Groceries",
      vendor: "Fresh Farm",
      lastRestocked: "2024-01-14",
      cost: 150,
      sellingPrice: 299,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "low" && item.status === "Low Stock") ||
      (filter === "out" && item.status === "Out of Stock") ||
      (filter === "expiring" && new Date(item.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const lowStockCount = inventory.filter((item) => item.status === "Low Stock" || item.status === "Out of Stock").length;
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.cost, 0);
  const expiringSoon = inventory.filter(
    (item) => new Date(item.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <>
      <Breadcrumb pageName="Inventory Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Products</div>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">{inventory.length}</div>
          </div>
          <div className="p-4 bg-red-light-5/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Low/Out of Stock</div>
            <div className="text-2xl font-bold text-red mt-1">{lowStockCount}</div>
            {lowStockCount > 0 && (
              <div className="text-xs text-red mt-1 flex items-center gap-1">
                <FiAlertCircle className="h-3 w-3" />
                Needs attention
              </div>
            )}
          </div>
          <div className="p-4 bg-yellow-light-4/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Expiring Soon</div>
            <div className="text-2xl font-bold text-yellow-dark mt-1">{expiringSoon}</div>
            {expiringSoon > 0 && (
              <div className="text-xs text-yellow-dark mt-1">Within 7 days</div>
            )}
          </div>
          <div className="p-4 bg-blue-light-5/20 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Inventory Value</div>
            <div className="text-2xl font-bold text-blue mt-1">{formatCurrency(totalValue)}</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Inventory</h2>
            {lowStockCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-red">
                <FiAlertCircle />
                <span>{lowStockCount} items need attention</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiUpload className="h-4 w-4" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiDownload className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiRefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              <FiPlus className="h-4 w-4" />
              Bulk Restock
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
            />
          </div>
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
              onClick={() => setFilter("low")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "low"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setFilter("out")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "out"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              Out of Stock
            </button>
            <button
              onClick={() => setFilter("expiring")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "expiring"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              Expiring Soon
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Product</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">SKU</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Current Stock</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Min/Max</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Expiry Date</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Value</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-dark-5 dark:text-dark-6">
                    No inventory items found
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A] ${
                      item.alert ? "bg-red-light-7/10" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {item.alert && (
                          <FiAlertCircle className="h-5 w-5 text-red flex-shrink-0" />
                        )}
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-semibold text-dark dark:text-white">{item.name}</div>
                          <div className="text-xs text-dark-5 dark:text-dark-6">{item.category}</div>
                          <div className="text-xs text-dark-5 dark:text-dark-6">{item.vendor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">{item.sku}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-dark dark:text-white">
                          {item.currentStock} {item.unit}
                        </div>
                        {item.currentStock < item.minStock && (
                          <FiTrendingDown className="h-4 w-4 text-red" />
                        )}
                        {item.currentStock >= item.minStock && (
                          <FiTrendingUp className="h-4 w-4 text-green" />
                        )}
                      </div>
                      <div className="text-xs text-dark-5 dark:text-dark-6 mt-1">
                        Last restocked: {item.lastRestocked}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">
                        Min: {item.minStock} {item.unit}
                      </div>
                      <div className="text-sm text-dark dark:text-white">
                        Max: {item.maxStock} {item.unit}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">{item.expiryDate}</div>
                      {new Date(item.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                        <div className="text-xs text-yellow-dark mt-1">Expiring soon</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-dark dark:text-white">
                        {formatCurrency(item.currentStock * item.cost)}
                      </div>
                      <div className="text-xs text-dark-5 dark:text-dark-6">
                        Cost: {formatCurrency(item.cost)}/unit
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Low Stock"
                            ? "bg-yellow-light-7 text-yellow-dark"
                            : item.status === "Out of Stock"
                            ? "bg-red-light-5 text-red"
                            : "bg-green-light-7 text-green"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90">
                        Restock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
