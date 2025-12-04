"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSave, FiHeart, FiShield, FiBell, FiMoon } from "react-icons/fi";

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      halal: false,
      keto: false,
      lowCarb: false,
    },
    allergens: {
      peanuts: false,
      treeNuts: false,
      shellfish: false,
      fish: false,
      eggs: false,
      soy: false,
      wheat: false,
      dairy: false,
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
      orderUpdates: true,
      promotions: false,
      newsletters: true,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
    },
    language: "en",
    currency: "INR",
  });

  const handleSave = () => {
    // Here you would typically save to backend
    alert("Preferences saved successfully!");
  };

  const togglePreference = (category: string, key: string) => {
    setPreferences((prev) => {
      const categoryValue = prev[category as keyof typeof prev];
      if (typeof categoryValue === 'object' && categoryValue !== null) {
        return {
          ...prev,
          [category]: {
            ...categoryValue,
            [key]: !(categoryValue as any)[key],
          },
        };
      }
      return prev;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/account"
          className="text-primary hover:underline mb-2 inline-block"
        >
          ← Back to Account
        </Link>
        <h1 className="text-3xl font-bold text-dark dark:text-white">
          Preferences
        </h1>
        <p className="text-dark-5 dark:text-dark-6 mt-2">
          Customize your experience and dietary preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Dietary Preferences */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiHeart className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Dietary Preferences
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(preferences.dietary).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 p-4 border border-stroke dark:border-stroke-dark rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => togglePreference("dietary", key)}
                  className="w-5 h-5 text-primary border-stroke dark:border-stroke-dark rounded"
                />
                <span className="text-dark dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Allergen Information */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiShield className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Allergen Information
            </h2>
          </div>
          <p className="text-sm text-dark-5 dark:text-dark-6 mb-4">
            Select allergens you want to avoid. We'll filter products accordingly.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(preferences.allergens).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 p-4 border border-stroke dark:border-stroke-dark rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => togglePreference("allergens", key)}
                  className="w-5 h-5 text-primary border-stroke dark:border-stroke-dark rounded"
                />
                <span className="text-dark dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiBell className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Notification Preferences
            </h2>
          </div>
          <div className="space-y-4">
            {Object.entries(preferences.notifications).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center justify-between p-4 border border-stroke dark:border-stroke-dark rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-dark dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => togglePreference("notifications", key)}
                  className="w-5 h-5 text-primary border-stroke dark:border-stroke-dark rounded"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiShield className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Privacy Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Profile Visibility
              </label>
              <select
                value={preferences.privacy.profileVisibility}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      profileVisibility: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>

            <label className="flex items-center justify-between p-4 border border-stroke dark:border-stroke-dark rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="text-dark dark:text-white">Show Email Address</span>
              <input
                type="checkbox"
                checked={preferences.privacy.showEmail}
                onChange={() => togglePreference("privacy", "showEmail")}
                className="w-5 h-5 text-primary border-stroke dark:border-stroke-dark rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-stroke dark:border-stroke-dark rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="text-dark dark:text-white">Show Phone Number</span>
              <input
                type="checkbox"
                checked={preferences.privacy.showPhone}
                onChange={() => togglePreference("privacy", "showPhone")}
                className="w-5 h-5 text-primary border-stroke dark:border-stroke-dark rounded"
              />
            </label>
          </div>
        </div>

        {/* Language & Currency */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiMoon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Language & Currency
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    language: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="gu">Gujarati</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Currency
              </label>
              <select
                value={preferences.currency}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    currency: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FiSave className="h-5 w-5" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

