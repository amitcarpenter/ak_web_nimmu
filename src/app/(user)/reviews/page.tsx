"use client";

import { FiStar, FiEdit, FiTrash2 } from "react-icons/fi";

export default function ReviewsPage() {
  const myReviews = [
    {
      id: 1,
      product: "Chicken Biryani Combo",
      rating: 5,
      comment: "Amazing biryani! Very flavorful and the chicken was tender.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      product: "Fresh Vegetable Pack",
      rating: 4,
      comment: "Good quality vegetables, fresh and well-packed.",
      date: "2024-01-10",
      verified: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">My Reviews</h1>

      {myReviews.length === 0 ? (
        <div className="text-center py-16">
          <FiStar className="mx-auto h-24 w-24 text-dark-5 dark:text-dark-6 mb-6" />
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">No reviews yet</h2>
          <p className="text-dark-5 dark:text-dark-6">
            Start reviewing products you've purchased
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {myReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-2">{review.product}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">Verified</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                    <FiEdit className="h-4 w-4 text-primary" />
                  </button>
                  <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                    <FiTrash2 className="h-4 w-4 text-red" />
                  </button>
                </div>
              </div>
              <p className="text-dark-5 dark:text-dark-6 mb-2">{review.comment}</p>
              <p className="text-sm text-dark-5 dark:text-dark-6">
                {new Date(review.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

