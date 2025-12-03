"use client";

import Link from "next/link";
import Image from "next/image";
import { FiTag, FiCopy, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offers = [
    {
      id: 1,
      code: "FIRST50",
      title: "50% OFF on First Order",
      description: "Get 50% discount on your first order. Maximum discount ₹500.",
      discount: "50%",
      validTill: "2024-12-31",
      minOrder: 500,
      applicable: "All Products",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=300&fit=crop",
    },
    {
      id: 2,
      code: "FREEDEL",
      title: "Free Delivery",
      description: "Free delivery on orders above ₹500. Valid for all users.",
      discount: "Free Delivery",
      validTill: "2024-12-31",
      minOrder: 500,
      applicable: "All Orders",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=300&fit=crop",
    },
    {
      id: 3,
      code: "WEEKEND20",
      title: "20% OFF Weekend Special",
      description: "Enjoy 20% off on all orders placed during weekends.",
      discount: "20%",
      validTill: "2024-12-31",
      minOrder: 300,
      applicable: "Weekend Orders",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=300&fit=crop",
    },
    {
      id: 4,
      code: "SUBSCRIBE15",
      title: "15% OFF on Subscriptions",
      description: "Get 15% discount when you subscribe to any meal plan.",
      discount: "15%",
      validTill: "2024-12-31",
      minOrder: 1000,
      applicable: "Subscriptions Only",
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=300&fit=crop",
    },
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Offers & Coupons</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary rounded-lg p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute inset-0 opacity-10">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{offer.title}</h3>
                  <p className="text-dark-5 dark:text-dark-6 mb-4">{offer.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{offer.discount}</div>
                  <div className="text-sm text-dark-5 dark:text-dark-6">OFF</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 p-3 bg-white dark:bg-gray-dark rounded-lg">
                <FiTag className="text-primary" />
                <span className="font-mono font-bold text-dark dark:text-white flex-1">{offer.code}</span>
                <button
                  onClick={() => copyToClipboard(offer.code)}
                  className="px-3 py-1 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <FiCheckCircle />
                      Copied
                    </>
                  ) : (
                    <>
                      <FiCopy />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-sm text-dark-5 dark:text-dark-6">
                <div className="flex items-center justify-between">
                  <span>Minimum Order:</span>
                  <span className="font-medium text-dark dark:text-white">₹{offer.minOrder}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Valid Till:</span>
                  <span className="font-medium text-dark dark:text-white">
                    {new Date(offer.validTill).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Applicable On:</span>
                  <span className="font-medium text-dark dark:text-white">{offer.applicable}</span>
                </div>
              </div>

              <Link
                href="/categories"
                className="mt-4 block w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

