"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    prepTime: "",
    dietary: [] as string[],
    allergens: [] as string[],
  });

  const categories = ["Prepared Meals", "Groceries", "Snacks", "Beverages", "Dairy & Eggs", "Fruits & Vegetables"];
  const dietaryOptions = ["Vegetarian", "Non-Vegetarian", "Vegan", "Organic", "Gluten-Free", "Dairy-Free"];
  const allergenOptions = ["Gluten", "Dairy", "Nuts", "Fish", "Eggs", "Soy"];

  const handleDietaryToggle = (option: string) => {
    setFormData({
      ...formData,
      dietary: formData.dietary.includes(option)
        ? formData.dietary.filter((d) => d !== option)
        : [...formData.dietary, option],
    });
  };

  const handleAllergenToggle = (option: string) => {
    setFormData({
      ...formData,
      allergens: formData.allergens.includes(option)
        ? formData.allergens.filter((a) => a !== option)
        : [...formData.allergens, option],
    });
  };

  return (
    <>
      <Breadcrumb pageName="Create Product" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark dark:text-white">Create New Product</h2>
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]"
          >
            <FiArrowLeft />
            Back
          </Link>
        </div>

        <form className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Prep Time *
                </label>
                <input
                  type="text"
                  value={formData.prepTime}
                  onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  placeholder="30 min"
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white">Inventory</h3>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Dietary & Allergens */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white">Dietary Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDietaryToggle(option)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    formData.dietary.includes(option)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-stroke dark:border-stroke-dark hover:border-primary/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white">Allergens</h3>
            <div className="flex flex-wrap gap-2">
              {allergenOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAllergenToggle(option)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    formData.allergens.includes(option)
                      ? "border-red bg-red-light-5 text-red"
                      : "border-stroke dark:border-stroke-dark hover:border-red/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Product Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white">Product Image</h3>
            <div className="border-2 border-dashed border-stroke dark:border-stroke-dark rounded-lg p-8 text-center">
              <FiUpload className="mx-auto h-12 w-12 text-dark-5 dark:text-dark-6 mb-4" />
              <p className="text-sm text-dark-5 dark:text-dark-6 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-dark-5 dark:text-dark-6">PNG, JPG up to 10MB</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link
              href="/admin/products"
              className="flex-1 px-6 py-3 border border-stroke dark:border-stroke-dark rounded-lg font-semibold text-center hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

