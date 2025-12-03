"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiStar, FiCheck, FiX, FiFilter } from "react-icons/fi";

export default function ReviewsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const reviews = [
    {
      id: 1,
      product: "Chicken Biryani Combo",
      user: "John Doe",
      rating: 5,
      comment: "Amazing biryani! Very flavorful and the chicken was tender.",
      status: "Approved",
      date: "2024-01-15",
    },
    {
      id: 2,
      product: "Fresh Vegetable Pack",
      user: "Jane Smith",
      rating: 4,
      comment: "Good quality vegetables, fresh and well-packed.",
      status: "Approved",
      date: "2024-01-14",
    },
    {
      id: 3,
      product: "Breakfast Combo",
      user: "Mike Johnson",
      rating: 3,
      comment: "Average quality, could be better.",
      status: "Pending",
      date: "2024-01-13",
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    if (filter === "pending") return review.status === "Pending";
    if (filter === "approved") return review.status === "Approved";
    if (filter === "rejected") return review.status === "Rejected";
    return true;
  });

  return (
    <>
      <Breadcrumb pageName="Reviews Moderation" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark dark:text-white">Reviews & Feedback</h2>
          <div className="flex gap-2 border border-stroke dark:border-stroke-dark rounded-lg p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "pending"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === "approved"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6 hover:text-primary"
              }`}
            >
              Approved
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-dark dark:text-white">{review.product}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        review.status === "Approved"
                          ? "bg-green-light-7 text-green"
                          : review.status === "Pending"
                          ? "bg-yellow-light-7 text-yellow-dark"
                          : "bg-red-light-5 text-red"
                      }`}
                    >
                      {review.status}
                    </span>
                  </div>
                  <p className="text-sm text-dark-5 dark:text-dark-6 mb-2">{review.comment}</p>
                  <div className="flex items-center gap-4 text-xs text-dark-5 dark:text-dark-6">
                    <span>By: {review.user}</span>
                    <span>Date: {review.date}</span>
                  </div>
                </div>
                {review.status === "Pending" && (
                  <div className="flex gap-2">
                    <button className="p-2 bg-green-light-7 text-green rounded hover:bg-green-light-7/80">
                      <FiCheck />
                    </button>
                    <button className="p-2 bg-red-light-5 text-red rounded hover:bg-red-light-5/80">
                      <FiX />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

