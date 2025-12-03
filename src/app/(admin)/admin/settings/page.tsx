"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiSave, FiUsers, FiShield, FiSettings } from "react-icons/fi";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "roles">("general");
  const [settings, setSettings] = useState({
    platformName: "FoodHub",
    currency: "INR",
    minOrderAmount: 100,
    deliveryFee: 50,
    freeDeliveryThreshold: 500,
  });

  const roles = [
    { id: 1, name: "Super Admin", users: 1, permissions: ["All"] },
    { id: 2, name: "Admin", users: 5, permissions: ["Orders", "Products", "Inventory"] },
    { id: 3, name: "Manager", users: 12, permissions: ["Orders", "Inventory"] },
    { id: 4, name: "Staff", users: 25, permissions: ["Orders"] },
  ];

  return (
    <>
      <Breadcrumb pageName="Settings" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Settings</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-stroke dark:border-stroke-dark">
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-4 px-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "general"
                ? "text-primary border-b-2 border-primary"
                : "text-dark-5 dark:text-dark-6 hover:text-primary"
            }`}
          >
            <FiSettings />
            General
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`pb-4 px-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "roles"
                ? "text-primary border-b-2 border-primary"
                : "text-dark-5 dark:text-dark-6 hover:text-primary"
            }`}
          >
            <FiShield />
            Roles & Permissions
          </button>
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Default Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Minimum Order Amount (₹)
                </label>
                <input
                  type="number"
                  value={settings.minOrderAmount}
                  onChange={(e) => setSettings({ ...settings, minOrderAmount: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={settings.deliveryFee}
                  onChange={(e) => setSettings({ ...settings, deliveryFee: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Free Delivery Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
              />
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90">
              <FiSave />
              Save Settings
            </button>
          </div>
        )}

        {/* Roles & Permissions */}
        {activeTab === "roles" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark dark:text-white">Roles & Permissions</h3>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2">
                <FiUsers />
                Add Role
              </button>
            </div>

            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-dark dark:text-white mb-1">{role.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-dark-5 dark:text-dark-6">
                        <span>{role.users} users</span>
                        <span>Permissions: {role.permissions.join(", ")}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

