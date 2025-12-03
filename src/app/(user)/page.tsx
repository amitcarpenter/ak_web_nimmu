"use client";

import Link from "next/link";
import Image from "next/image";
import { FiClock, FiStar, FiTruck, FiArrowRight } from "react-icons/fi";

export default function HomePage() {
  const categories = [
    { id: 1, name: "Prepared Meals", slug: "prepared-meals", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&q=90", count: 45 },
    { id: 2, name: "Groceries", slug: "groceries", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop&q=90", count: 120 },
    { id: 3, name: "Snacks", slug: "snacks", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop&q=90", count: 89 },
    { id: 4, name: "Beverages", slug: "beverages", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop&q=90", count: 67 },
    { id: 5, name: "Dairy & Eggs", slug: "dairy-eggs", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=600&fit=crop&q=90", count: 34 },
    { id: 6, name: "Fruits & Vegetables", slug: "fruits-vegetables", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop&q=90", count: 78 },
  ];

  const featuredProducts = [
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
    },
  ];

  const offers = [
    {
      id: 1,
      title: "50% OFF on First Order",
      description: "Use code FIRST50",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop&q=90",
      link: "/offers",
    },
    {
      id: 2,
      title: "Free Delivery on Orders Above ₹500",
      description: "Valid till month end",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop&q=90",
      link: "/offers",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark dark:text-white mb-6">
                Fresh Food Delivered to Your{" "}
                <span className="text-primary">Doorstep</span>
              </h1>
              <p className="text-lg text-dark-5 dark:text-dark-6 mb-8">
                Order fresh groceries, prepared meals, and more. Fast delivery, great prices, and quality you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/subscriptions"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  View Subscriptions
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop"
                alt="Fresh Food Delivery"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-y border-stroke dark:border-stroke-dark bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-dark-5 dark:text-dark-6">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-dark-5 dark:text-dark-6">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">30min</div>
              <div className="text-sm text-dark-5 dark:text-dark-6">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-dark-5 dark:text-dark-6">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-primary hover:underline flex items-center"
          >
            View All
            <FiArrowRight className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-lg transition-all hover:border-primary"
            >
              <div className="aspect-square rounded-lg mb-3 overflow-hidden group-hover:scale-105 transition-transform">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-dark dark:text-white mb-1">{category.name}</h3>
              <p className="text-sm text-dark-5 dark:text-dark-6">{category.count} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Offers Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={offer.link}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white p-8 hover:shadow-xl transition-shadow"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="text-white/90">{offer.description}</p>
                <button className="mt-4 px-4 py-2 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products / Recommended Combos */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">Recommended for You</h2>
          <Link
            href="/categories"
            className="text-primary hover:underline flex items-center"
          >
            View All
            <FiArrowRight className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
                  <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded z-10">
                    {product.badge}
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
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-2 dark:bg-gray-dark py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-dark rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <FiTruck className="text-2xl text-primary" />
              </div>
              <h3 className="font-semibold text-dark dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-sm text-dark-5 dark:text-dark-6">
                Get your orders delivered within 30 minutes in most areas
              </p>
            </div>
            <div className="bg-white dark:bg-gray-dark rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-dark dark:text-white mb-2">Fresh & Quality</h3>
              <p className="text-sm text-dark-5 dark:text-dark-6">
                All products are fresh and quality-checked before delivery
              </p>
            </div>
            <div className="bg-white dark:bg-gray-dark rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-dark dark:text-white mb-2">Best Prices</h3>
              <p className="text-sm text-dark-5 dark:text-dark-6">
                Competitive prices with regular offers and discounts
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

