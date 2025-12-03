"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck, FiX } from "react-icons/fi";

export default function NutritionFilterPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const dietaryOptions = [
    { id: "veg", label: "Vegetarian", icon: "🥬" },
    { id: "non-veg", label: "Non-Vegetarian", icon: "🍗" },
    { id: "vegan", label: "Vegan", icon: "🌱" },
    { id: "organic", label: "Organic", icon: "🌿" },
    { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
    { id: "dairy-free", label: "Dairy-Free", icon: "🥛" },
  ];

  const allergenOptions = [
    "Gluten",
    "Dairy",
    "Nuts",
    "Fish",
    "Eggs",
    "Soy",
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Nutrition & Allergen Filters</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark dark:text-white">Filters</h2>
              {selectedFilters.length > 0 && (
                <button
                  onClick={() => setSelectedFilters([])}
                  className="text-sm text-primary hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Dietary Preferences */}
            <div className="mb-6">
              <h3 className="font-semibold text-dark dark:text-white mb-4">Dietary Preferences</h3>
              <div className="grid grid-cols-2 gap-3">
                {dietaryOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleFilter(option.id)}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      selectedFilters.includes(option.id)
                        ? "border-primary bg-primary/10"
                        : "border-stroke dark:border-stroke-dark hover:border-primary/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium text-dark dark:text-white">{option.label}</div>
                    {selectedFilters.includes(option.id) && (
                      <FiCheck className="mx-auto mt-2 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergens */}
            <div>
              <h3 className="font-semibold text-dark dark:text-white mb-4">Exclude Allergens</h3>
              <div className="space-y-2">
                {allergenOptions.map((allergen) => (
                  <label
                    key={allergen}
                    className="flex items-center p-3 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(allergen)}
                      onChange={() => toggleFilter(allergen)}
                      className="rounded border-stroke text-primary focus:ring-primary"
                    />
                    <span className="ml-3 text-sm text-dark dark:text-white">{allergen}</span>
                  </label>
                ))}
              </div>
            </div>

            <Link
              href="/categories"
              className="mt-6 block w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
            >
              Apply Filters
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">
              About Nutrition & Allergen Information
            </h2>
            <div className="space-y-4 text-dark-5 dark:text-dark-6">
              <p>
                We provide detailed nutritional information and allergen warnings for all our products
                to help you make informed choices.
              </p>
              <p>
                All products are clearly labeled with dietary information (Vegetarian, Non-Vegetarian,
                Vegan, etc.) and allergen warnings.
              </p>
              <p>
                If you have specific dietary requirements or allergies, please use the filters above
                to find suitable products.
              </p>
            </div>
          </div>

          {/* Selected Filters */}
          {selectedFilters.length > 0 && (
            <div className="bg-primary/10 border border-primary rounded-lg p-6">
              <h3 className="font-semibold text-dark dark:text-white mb-4">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filter) => (
                  <span
                    key={filter}
                    className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-dark rounded-full text-sm font-medium text-dark dark:text-white"
                  >
                    {filter}
                    <button
                      onClick={() => toggleFilter(filter)}
                      className="hover:text-red"
                    >
                      <FiX />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

