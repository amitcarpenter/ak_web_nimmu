"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiFilter, FiGrid, FiList, FiStar, FiClock, FiChevronDown } from "react-icons/fi";

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: "Chicken Biryani Combo",
      price: 299,
      originalPrice: 399,
      rating: 4.5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=600&fit=crop&q=90",
      prepTime: "30 min",
      badge: "Best Seller",
      inStock: true,
      dietary: ["Non-Veg"],
      allergens: ["Dairy"],
    },
    {
      id: 2,
      name: "Fresh Vegetable Pack",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop&q=90",
      prepTime: "Same Day",
      badge: "Fresh",
      inStock: true,
      dietary: ["Veg"],
      allergens: [],
    },
    {
      id: 3,
      name: "Breakfast Combo",
      price: 149,
      originalPrice: 199,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=600&fit=crop&q=90",
      prepTime: "20 min",
      badge: "Popular",
      inStock: true,
      dietary: ["Veg"],
      allergens: ["Gluten", "Dairy"],
    },
    {
      id: 4,
      name: "Organic Fruits Basket",
      price: 399,
      originalPrice: 499,
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=600&fit=crop&q=90",
      prepTime: "Same Day",
      badge: "Organic",
      inStock: true,
      dietary: ["Veg", "Organic"],
      allergens: [],
    },
    {
      id: 5,
      name: "Paneer Tikka Masala",
      price: 249,
      originalPrice: 299,
      rating: 4.4,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=90",
      prepTime: "25 min",
      badge: null,
      inStock: true,
      dietary: ["Veg"],
      allergens: ["Dairy"],
    },
    {
      id: 6,
      name: "Fish Curry Combo",
      price: 349,
      originalPrice: 399,
      rating: 4.3,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&q=90",
      prepTime: "35 min",
      badge: null,
      inStock: false,
      dietary: ["Non-Veg"],
      allergens: ["Fish"],
    },
  ];

  const filters = {
    dietary: ["Veg", "Non-Veg", "Vegan", "Organic"],
    allergens: ["Gluten", "Dairy", "Nuts", "Fish", "Eggs"],
    priceRange: [
      { label: "Under ₹200", min: 0, max: 200 },
      { label: "₹200 - ₹400", min: 200, max: 400 },
      { label: "₹400 - ₹600", min: 400, max: 600 },
      { label: "Above ₹600", min: 600, max: Infinity },
    ],
    rating: [4, 3, 2, 1],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="text-dark-5 dark:text-dark-6 hover:text-primary">Home</Link></li>
          <li className="text-dark-5 dark:text-dark-6">/</li>
          <li className="text-dark dark:text-white font-medium">Categories</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-dark dark:text-white">Filters</h3>
              <button className="text-sm text-primary hover:underline">Clear All</button>
            </div>

            {/* Dietary Preferences */}
            <div className="mb-6">
              <h4 className="font-medium text-dark dark:text-white mb-3">Dietary</h4>
              <div className="space-y-2">
                {filters.dietary.map((item) => (
                  <label key={item} className="flex items-center">
                    <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                    <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Allergens */}
            <div className="mb-6">
              <h4 className="font-medium text-dark dark:text-white mb-3">Allergens</h4>
              <div className="space-y-2">
                {filters.allergens.map((item) => (
                  <label key={item} className="flex items-center">
                    <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                    <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-dark dark:text-white mb-3">Price Range</h4>
              <div className="space-y-2">
                {filters.priceRange.map((range) => (
                  <label key={range.label} className="flex items-center">
                    <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
                    <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium text-dark dark:text-white mb-3">Minimum Rating</h4>
              <div className="space-y-2">
                {filters.rating.map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="radio" name="rating" className="border-stroke text-primary focus:ring-primary" />
                    <span className="ml-2 text-sm text-dark-5 dark:text-dark-6 flex items-center">
                      {rating}+ <FiStar className="ml-1 text-yellow-400 fill-yellow-400" />
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header with Sort and View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-2">
                All Products
              </h1>
              <p className="text-sm text-dark-5 dark:text-dark-6">
                Showing {products.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A]"
              >
                <FiFilter />
                Filters
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-8 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                >
                  <option value="popular">Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-dark-5 dark:text-dark-6" />
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-stroke dark:border-stroke-dark rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "text-dark-5 dark:text-dark-6"}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "text-dark-5 dark:text-dark-6"}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {viewMode === "grid" ? (
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
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <button className="p-2 bg-white/90 dark:bg-gray-dark/90 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark dark:text-white mb-2 line-clamp-1">{product.name}</h3>
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
                        disabled={!product.inStock}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group flex gap-4 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-lg transition-all"
                >
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.badge && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark dark:text-white mb-2">{product.name}</h3>
                    <div className="flex items-center gap-4 mb-2 text-sm text-dark-5 dark:text-dark-6">
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 fill-yellow-400" />
                        <span className="ml-1">{product.rating}</span>
                        <span className="ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex items-center">
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
                        disabled={!product.inStock}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

