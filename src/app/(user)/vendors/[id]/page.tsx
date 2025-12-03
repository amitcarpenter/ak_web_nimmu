"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiStar, FiClock, FiMapPin, FiChevronLeft, FiHeart } from "react-icons/fi";

export default function VendorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const vendor = {
    name: "Spice Kitchen",
    rating: 4.6,
    reviews: 1234,
    deliveryTime: "30-40 min",
    address: "123, Main Street, Mumbai",
    cuisine: ["North Indian", "Biryani", "Tandoor"],
    open: true,
    description: "Authentic North Indian cuisine with fresh ingredients and traditional recipes.",
  };

  const menuItems = [
    { id: 1, name: "Chicken Biryani", price: 299, rating: 4.5, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=600&fit=crop&q=90" },
    { id: 2, name: "Paneer Tikka", price: 249, rating: 4.4, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop&q=90" },
    { id: 3, name: "Butter Chicken", price: 349, rating: 4.7, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&q=90" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
        <FiChevronLeft className="mr-1" />
        Back
      </Link>

      {/* Vendor Header */}
      <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">{vendor.name}</h1>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-semibold">{vendor.rating}</span>
                <span className="ml-1 text-dark-5 dark:text-dark-6">({vendor.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-dark-5 dark:text-dark-6">
                <FiClock className="mr-1" />
                {vendor.deliveryTime}
              </div>
              <div className="flex items-center text-dark-5 dark:text-dark-6">
                <FiMapPin className="mr-1" />
                {vendor.address}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {vendor.cuisine.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-dark-5 dark:text-dark-6">{vendor.description}</p>
          </div>
          <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded-lg">
            <FiHeart className="h-6 w-6 text-dark-5 dark:text-dark-6" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              vendor.open ? "bg-green-light-7 text-green" : "bg-red-light-5 text-red"
            }`}
          >
            {vendor.open ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div>
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Menu</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-dark dark:text-white mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm">{item.rating}</span>
                  </div>
                  <span className="text-lg font-bold text-dark dark:text-white">₹{item.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

