"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiStar, FiClock, FiChevronLeft } from "react-icons/fi";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const category = {
    name: "Prepared Meals",
    description: "Delicious ready-to-eat meals prepared fresh daily",
    productCount: 45,
  };

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
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=600&fit=crop&q=90",
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      price: 249,
      originalPrice: 299,
      rating: 4.4,
      reviews: 167,
      prepTime: "25 min",
      badge: null,
      inStock: true,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=90",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="text-dark-5 dark:text-dark-6 hover:text-primary">Home</Link></li>
          <li className="text-dark-5 dark:text-dark-6">/</li>
          <li><Link href="/categories" className="text-dark-5 dark:text-dark-6 hover:text-primary">Categories</Link></li>
          <li className="text-dark-5 dark:text-dark-6">/</li>
          <li className="text-dark dark:text-white font-medium">{category.name}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <Link href="/categories" className="inline-flex items-center text-primary hover:underline mb-4">
          <FiChevronLeft className="mr-1" />
          Back to Categories
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-2">
          {category.name}
        </h1>
        <p className="text-dark-5 dark:text-dark-6 mb-2">{category.description}</p>
        <p className="text-sm text-dark-5 dark:text-dark-6">{category.productCount} products available</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {product.badge && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded z-10">
                  {product.badge}
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <span className="text-white font-semibold">Out of Stock</span>
                </div>
              )}
              <div className="absolute top-2 right-2 z-10">
                <button className="p-2 bg-white/90 dark:bg-gray-dark/90 rounded-full hover:bg-primary hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
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
  );
}

