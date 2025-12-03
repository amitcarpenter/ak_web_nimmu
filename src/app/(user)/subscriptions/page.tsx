"use client";

import Link from "next/link";
import { FiCheck, FiArrowRight, FiCalendar, FiDollarSign } from "react-icons/fi";

export default function SubscriptionsPage() {
  const plans = [
    {
      id: 1,
      name: "Daily Meal Plan",
      price: 299,
      duration: "Daily",
      meals: 2,
      features: ["2 meals per day", "Free delivery", "Flexible schedule", "Cancel anytime"],
      popular: true,
    },
    {
      id: 2,
      name: "Weekly Meal Plan",
      price: 1899,
      duration: "Weekly",
      meals: 14,
      features: ["14 meals per week", "Free delivery", "10% discount", "Flexible schedule"],
      popular: false,
    },
    {
      id: 3,
      name: "Monthly Meal Plan",
      price: 6999,
      duration: "Monthly",
      meals: 60,
      features: ["60 meals per month", "Free delivery", "15% discount", "Priority support"],
      popular: false,
    },
  ];

  const activeSubscriptions = [
    {
      id: 1,
      plan: "Daily Meal Plan",
      nextDelivery: "2024-01-16",
      status: "Active",
      mealsRemaining: 8,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Meal Subscriptions</h1>

      {/* Active Subscriptions */}
      {activeSubscriptions.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Active Subscriptions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activeSubscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{sub.plan}</h3>
                    <span className="px-3 py-1 bg-green-light-7 text-green rounded-full text-sm font-semibold">
                      {sub.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-dark-5 dark:text-dark-6 mb-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar />
                    <span>Next Delivery: {new Date(sub.nextDelivery).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck />
                    <span>Meals Remaining: {sub.mealsRemaining}</span>
                  </div>
                </div>
                <Link
                  href={`/subscriptions/${sub.id}`}
                  className="text-primary hover:underline font-medium"
                >
                  Manage Subscription →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white dark:bg-gray-dark border-2 rounded-lg p-6 relative ${
                plan.popular
                  ? "border-primary shadow-lg"
                  : "border-stroke dark:border-stroke-dark"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-dark dark:text-white">₹{plan.price}</span>
                <span className="text-dark-5 dark:text-dark-6">/{plan.duration.toLowerCase()}</span>
              </div>
              <div className="mb-6">
                <p className="text-sm text-dark-5 dark:text-dark-6 mb-4">
                  {plan.meals} meals included
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-dark dark:text-white">
                      <FiCheck className="text-green mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                Subscribe Now
                <FiArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

