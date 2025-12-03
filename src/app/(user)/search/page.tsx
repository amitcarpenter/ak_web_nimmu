"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiStar, FiClock, FiX, FiFilter } from "react-icons/fi";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const popularSearches = [
    "Chicken Biryani",
    "Vegetable Pack",
    "Breakfast Combo",
    "Organic Fruits",
    "Paneer Tikka",
  ];

  const suggestionChips = ["veg", "non-veg", "gluten-free", "dairy-free", "organic"];

  const products = [
    {
      id: 1,
      name: "Chicken Biryani Combo",
      price: 299,
      originalPrice: 399,
      rating: 4.5,
      reviews: 234,
      prepTime: "30 min",
      badge: "Best Seller",
      inStock: true,
      matchType: "exact",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=600&fit=crop&q=90",
    },
    {
      id: 2,
      name: "Fresh Vegetable Pack",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 156,
      prepTime: "Same Day",
      badge: "Fresh",
      inStock: true,
      matchType: "partial",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop&q=90",
    },
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate autocomplete suggestions
      const mockSuggestions = [
        `${searchQuery} - Biryani`,
        `${searchQuery} - Combo`,
        `${searchQuery} - Pack`,
      ];
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for food, groceries..."
            className="w-full rounded-lg border border-stroke bg-white py-3 pl-12 pr-12 text-sm focus:border-primary focus:outline-none dark:border-stroke-dark dark:bg-gray-dark"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6 hover:text-primary"
            >
              <FiX />
            </button>
          )}

          {/* Autocomplete Suggestions */}
          {showSuggestions && (suggestions.length > 0 || searchQuery.length === 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg shadow-lg z-10">
              {searchQuery.length === 0 && (
                <div className="p-4">
                  <p className="text-sm font-medium text-dark dark:text-white mb-2">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => {
                          setSearchQuery(search);
                          setShowSuggestions(false);
                        }}
                        className="px-3 py-1 text-sm bg-gray-2 dark:bg-[#020D1A] rounded-full hover:bg-primary hover:text-white transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {suggestions.length > 0 && (
                <div className="p-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded flex items-center"
                    >
                      <FiSearch className="mr-2 text-dark-5 dark:text-dark-6" />
                      <span className="text-sm text-dark dark:text-white">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        {searchQuery && (
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                className="px-3 py-1 text-sm bg-gray-2 dark:bg-[#020D1A] rounded-full hover:bg-primary hover:text-white transition-colors capitalize"
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Section */}
      {searchQuery ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-dark dark:text-white">Filters</h3>
                <button className="text-sm text-primary hover:underline">Clear All</button>
              </div>

              {/* Quick Filters */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-dark dark:text-white mb-3">Dietary</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">Vegetarian</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">Non-Vegetarian</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">Vegan</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-dark dark:text-white mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">Under ₹200</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">₹200 - ₹400</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">Above ₹400</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-dark dark:text-white">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-sm text-dark-5 dark:text-dark-6 mt-1">
                  Found {products.length} results
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]"
              >
                <FiFilter />
                Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded">
                        {product.badge}
                      </div>
                    )}
                    {product.matchType === "exact" && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                        Exact Match
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark dark:text-white mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-dark-5 dark:text-dark-6">({product.reviews})</span>
                      <div className="flex items-center ml-auto text-sm text-dark-5 dark:text-dark-6">
                        <FiClock className="mr-1" />
                        {product.prepTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-dark dark:text-white">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-dark-5 dark:text-dark-6 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <FiSearch className="mx-auto h-16 w-16 text-dark-5 dark:text-dark-6 mb-4" />
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
            Start searching for your favorite food
          </h3>
          <p className="text-dark-5 dark:text-dark-6">
            Enter a search term above to find products
          </p>
        </div>
      )}
    </div>
  );
}

