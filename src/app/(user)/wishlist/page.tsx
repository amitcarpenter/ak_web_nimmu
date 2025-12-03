"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiShoppingCart, FiTrash2, FiStar, FiClock, FiMove } from "react-icons/fi";

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: "Chicken Biryani Combo",
      price: 299,
      originalPrice: 399,
      rating: 4.5,
      reviews: 234,
      prepTime: "30 min",
      inStock: true,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=600&fit=crop&q=90",
      description: "Delicious biryani with tender chicken pieces and aromatic spices",
    },
    {
      id: 2,
      name: "Fresh Vegetable Pack",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 156,
      prepTime: "Same Day",
      inStock: true,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop&q=90",
      description: "Fresh seasonal vegetables, organically grown and carefully selected",
    },
    {
      id: 3,
      name: "Breakfast Combo",
      price: 149,
      originalPrice: 199,
      rating: 4.6,
      reviews: 189,
      prepTime: "20 min",
      inStock: false,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=600&fit=crop&q=90",
      description: "Complete breakfast with eggs, toast, and fresh juice",
    },
  ];

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <FiHeart className="mx-auto h-24 w-24 text-dark-5 dark:text-dark-6 mb-6" />
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Your wishlist is empty</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-8">
            Start adding items you love to your wishlist
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-dark dark:text-white">My Wishlist</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-dark-5 dark:text-dark-6">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
          </span>
          <button className="text-sm text-primary hover:underline font-medium">
            Move all to Cart
          </button>
        </div>
      </div>

      {/* List Format */}
      <div className="space-y-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-md transition-all"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <Link href={`/products/${item.id}`} className="flex-shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold px-2 py-1 bg-red-500 rounded">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-lg font-semibold text-dark dark:text-white mb-1 hover:text-primary line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-dark-5 dark:text-dark-6 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg transition-colors flex-shrink-0">
                    <FiTrash2 className="h-5 w-5 text-red hover:text-red-600" />
                  </button>
                </div>

                {/* Rating and Prep Time */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400 fill-yellow-400 h-4 w-4" />
                    <span className="text-sm font-medium text-dark dark:text-white">{item.rating}</span>
                    <span className="text-sm text-dark-5 dark:text-dark-6">({item.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-dark-5 dark:text-dark-6">
                    <FiClock className="h-4 w-4" />
                    <span>{item.prepTime}</span>
                  </div>
                  {item.originalPrice && (
                    <span className="text-xs text-green font-medium">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-dark dark:text-white">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-dark-5 dark:text-dark-6 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-sm border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors flex items-center gap-2"
                      title="Move to cart"
                    >
                      <FiMove className="h-4 w-4" />
                      <span className="hidden sm:inline">Move</span>
                    </button>
                    <button
                      disabled={!item.inStock}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
                    >
                      <FiShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-dark-5 dark:text-dark-6 mb-1">Total Items</p>
            <p className="text-2xl font-bold text-dark dark:text-white">{wishlistItems.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-dark-5 dark:text-dark-6 mb-1">Total Value</p>
            <p className="text-2xl font-bold text-primary">
              ₹{wishlistItems.reduce((sum, item) => sum + item.price, 0)}
            </p>
          </div>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
            <FiShoppingCart />
            Add All to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

