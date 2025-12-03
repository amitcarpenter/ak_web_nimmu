"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiPlus, FiDownload, FiUpload, FiEye, FiMoreVertical, FiCheck, FiX } from "react-icons/fi";
import Image from "next/image";

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      name: "Chicken Biryani",
      sku: "PROD-001",
      category: "Prepared Meals",
      price: 299,
      comparePrice: 349,
      stock: 45,
      lowStockThreshold: 10,
      status: "active",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop&q=90",
      rating: 4.5,
      sales: 234,
      vendor: "Spice Kitchen",
    },
    {
      id: 2,
      name: "Fresh Vegetable Pack",
      sku: "PROD-002",
      category: "Groceries",
      price: 199,
      comparePrice: null,
      stock: 120,
      lowStockThreshold: 20,
      status: "active",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop&q=90",
      rating: 4.3,
      sales: 189,
      vendor: "Fresh Farm",
    },
    {
      id: 3,
      name: "Paneer Tikka",
      sku: "PROD-003",
      category: "Prepared Meals",
      price: 249,
      comparePrice: 299,
      stock: 5,
      lowStockThreshold: 10,
      status: "active",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=100&h=100&fit=crop&q=90",
      rating: 4.7,
      sales: 156,
      vendor: "Spice Kitchen",
    },
    {
      id: 4,
      name: "Butter Chicken",
      sku: "PROD-004",
      category: "Prepared Meals",
      price: 349,
      comparePrice: null,
      stock: 0,
      lowStockThreshold: 10,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop&q=90",
      rating: 4.8,
      sales: 298,
      vendor: "Spice Kitchen",
    },
    {
      id: 5,
      name: "Fresh Fruits Pack",
      sku: "PROD-005",
      category: "Groceries",
      price: 299,
      comparePrice: 349,
      stock: 78,
      lowStockThreshold: 20,
      status: "active",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100&h=100&fit=crop&q=90",
      rating: 4.4,
      sales: 145,
      vendor: "Fresh Farm",
    },
    {
      id: 6,
      name: "Breakfast Combo",
      sku: "PROD-006",
      category: "Prepared Meals",
      price: 199,
      comparePrice: null,
      stock: 32,
      lowStockThreshold: 10,
      status: "draft",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop&q=90",
      rating: 0,
      sales: 0,
      vendor: "Morning Delights",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      active: { label: "Active", className: "bg-green-light-7 text-green" },
      draft: { label: "Draft", className: "bg-gray-3 text-dark-5" },
      out_of_stock: { label: "Out of Stock", className: "bg-red-light-5 text-red" },
      archived: { label: "Archived", className: "bg-gray-3 text-dark-5" },
    };
    const statusInfo = statusMap[status] || statusMap.draft;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getStockBadge = (stock: number, threshold: number) => {
    if (stock === 0) {
      return <span className="px-2 py-1 rounded text-xs font-semibold bg-red-light-5 text-red">Out of Stock</span>;
    }
    if (stock <= threshold) {
      return <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-light-4 text-yellow-dark">Low Stock</span>;
    }
    return <span className="px-2 py-1 rounded text-xs font-semibold bg-green-light-7 text-green">In Stock</span>;
  };

  const filteredProducts = products.filter((product) => {
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in_stock" && product.stock > 0) ||
      (stockFilter === "low_stock" && product.stock > 0 && product.stock <= product.lowStockThreshold) ||
      (stockFilter === "out_of_stock" && product.stock === 0);
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesStock && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBulkAction = (action: string) => {
    if (selectedProducts.length === 0) {
      alert("Please select products first");
      return;
    }
    alert(`Bulk action: ${action} on ${selectedProducts.length} products`);
  };

  return (
    <>
      <Breadcrumb pageName="Products Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Products</h2>
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Total: {filteredProducts.length} products
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/products/create"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <FiPlus className="h-4 w-4" />
              Add Product
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiUpload className="h-4 w-4" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
              <FiDownload className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or vendor..."
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
            <option value="draft">Draft</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="Prepared Meals">Prepared Meals</option>
            <option value="Groceries">Groceries</option>
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
          >
            <option value="all">All Stock</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mb-4 p-4 bg-primary/10 border border-primary rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-dark dark:text-white">
              {selectedProducts.length} product(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("activate")}
                className="px-4 py-2 bg-green text-white rounded-lg hover:bg-green/90 text-sm"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="px-4 py-2 bg-yellow-dark text-white rounded-lg hover:bg-yellow-dark/90 text-sm"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red/90 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => handleBulkAction("export")}
                className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] text-sm"
              >
                Export Selected
              </button>
              <button
                onClick={() => setSelectedProducts([])}
                className="px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(filteredProducts.map((p) => p.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                    className="w-4 h-4"
                  />
                </th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Product</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">SKU</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Category</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Price</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Stock</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Sales</th>
                <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-dark-5 dark:text-dark-6">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="font-semibold text-primary hover:underline"
                          >
                            {product.name}
                          </Link>
                          <div className="text-xs text-dark-5 dark:text-dark-6">{product.vendor}</div>
                          {product.rating > 0 && (
                            <div className="text-xs text-yellow-dark">⭐ {product.rating}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">{product.sku}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">{product.category}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-dark dark:text-white">{formatCurrency(product.price)}</div>
                      {product.comparePrice && (
                        <div className="text-xs text-dark-5 dark:text-dark-6 line-through">
                          {formatCurrency(product.comparePrice)}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-dark dark:text-white">{product.stock}</div>
                      {getStockBadge(product.stock, product.lowStockThreshold)}
                    </td>
                    <td className="p-4">{getStatusBadge(product.status)}</td>
                    <td className="p-4">
                      <div className="text-sm text-dark dark:text-white">{product.sales}</div>
                      <div className="text-xs text-green">units sold</div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
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
                        <button
                          className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                          title="Delete"
                        >
                          <FiTrash2 className="h-4 w-4 text-red" />
                        </button>
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
            Showing 1-{filteredProducts.length} of {filteredProducts.length} products
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
