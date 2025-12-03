"use client";

import { use } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiArrowLeft, FiEdit, FiPackage, FiTrendingUp, FiTrendingDown, FiStar, FiEye, FiBox, FiDollarSign } from "react-icons/fi";
import Image from "next/image";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // In real app, fetch product data by ID
  const product = {
    id: parseInt(id),
    name: "Chicken Biryani",
    sku: "PROD-001",
    category: "Prepared Meals",
    price: 299,
    comparePrice: 349,
    stock: 45,
    lowStockThreshold: 10,
    status: "active",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop&q=90",
    description: "Delicious chicken biryani with aromatic basmati rice, tender chicken pieces, and a blend of spices. Served with raita and pickle.",
    rating: 4.5,
    totalReviews: 234,
    sales: 1245,
    views: 3456,
    vendor: "Spice Kitchen",
    tags: ["Spicy", "Non-Veg", "Popular"],
    nutrition: {
      calories: 450,
      protein: "25g",
      carbs: "55g",
      fat: "12g",
    },
  };

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
            href="/admin/products"
            className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg"
          >
            <FiArrowLeft className="h-5 w-5 text-dark dark:text-white" />
          </Link>
          <Breadcrumb pageName={`Product Details - ${product.name}`} />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]">
            <FiEye className="h-4 w-4" />
            View on Site
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <FiEdit className="h-4 w-4" />
            Edit Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Image & Basic Info */}
        <div className="lg:col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <div className="mb-6">
              <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-dark dark:text-white">{product.name}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.status === "active"
                    ? "bg-green-light-7 text-green"
                    : "bg-gray-3 text-dark-5"
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="text-sm text-dark-5 dark:text-dark-6 mb-4">SKU: {product.sku}</div>
              <div className="flex items-center gap-2 mb-4">
                <FiStar className="h-5 w-5 text-yellow-dark fill-yellow-dark" />
                <span className="font-semibold text-dark dark:text-white">{product.rating}</span>
                <span className="text-sm text-dark-5 dark:text-dark-6">
                  ({product.totalReviews} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Price</div>
                <div className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</div>
                {product.comparePrice && (
                  <div className="text-sm text-dark-5 dark:text-dark-6 line-through">
                    {formatCurrency(product.comparePrice)}
                  </div>
                )}
              </div>

              <div className="p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Stock</div>
                <div className="text-2xl font-bold text-dark dark:text-white">{product.stock}</div>
                <div className="text-xs text-dark-5 dark:text-dark-6">
                  Low stock threshold: {product.lowStockThreshold}
                </div>
                {product.stock <= product.lowStockThreshold && (
                  <div className="text-xs text-red mt-1">⚠️ Low Stock Alert</div>
                )}
              </div>

              <div className="p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Category</div>
                <div className="text-sm font-medium text-dark dark:text-white">{product.category}</div>
              </div>

              <div className="p-3 bg-gray-1 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Vendor</div>
                <Link
                  href={`/admin/vendors/${product.vendor.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {product.vendor}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiPackage className="h-5 w-5 text-primary" />
                <div className="text-xs text-dark-5 dark:text-dark-6">Total Sales</div>
              </div>
              <div className="text-2xl font-bold text-dark dark:text-white">{product.sales.toLocaleString()}</div>
              <div className="text-xs text-green flex items-center gap-1 mt-1">
                <FiTrendingUp className="h-3 w-3" />
                +12% this month
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiEye className="h-5 w-5 text-blue" />
                <div className="text-xs text-dark-5 dark:text-dark-6">Total Views</div>
              </div>
              <div className="text-2xl font-bold text-blue">{product.views.toLocaleString()}</div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiDollarSign className="h-5 w-5 text-green" />
                <div className="text-xs text-dark-5 dark:text-dark-6">Revenue</div>
              </div>
              <div className="text-2xl font-bold text-green">
                {formatCurrency(product.sales * product.price)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Description</h3>
            <p className="text-dark-5 dark:text-dark-6">{product.description}</p>
          </div>

          {/* Tags */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Nutrition Info */}
          <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Nutrition Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Calories</div>
                <div className="text-lg font-semibold text-dark dark:text-white">{product.nutrition.calories}</div>
              </div>
              <div>
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Protein</div>
                <div className="text-lg font-semibold text-dark dark:text-white">{product.nutrition.protein}</div>
              </div>
              <div>
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Carbs</div>
                <div className="text-lg font-semibold text-dark dark:text-white">{product.nutrition.carbs}</div>
              </div>
              <div>
                <div className="text-xs text-dark-5 dark:text-dark-6 mb-1">Fat</div>
                <div className="text-lg font-semibold text-dark dark:text-white">{product.nutrition.fat}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

