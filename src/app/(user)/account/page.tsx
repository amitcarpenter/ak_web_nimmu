"use client";

import Link from "next/link";
import Image from "next/image";
import { FiUser, FiMapPin, FiCreditCard, FiHeart, FiSettings, FiPackage, FiBell, FiHelpCircle } from "react-icons/fi";

export default function AccountPage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    avatar: null,
  };

  const menuItems = [
    { icon: FiUser, label: "Personal Information", href: "/account/personal", description: "Update your name, email, and phone" },
    { icon: FiMapPin, label: "Addresses", href: "/account/addresses", description: "Manage delivery addresses" },
    { icon: FiCreditCard, label: "Payment Methods", href: "/account/payment-methods", description: "Saved cards and payment options" },
    { icon: FiHeart, label: "Wishlist", href: "/wishlist", description: "Your saved items" },
    { icon: FiPackage, label: "Orders", href: "/orders", description: "View order history" },
    { icon: FiBell, label: "Notifications", href: "/notifications", description: "Manage notification preferences" },
    { icon: FiSettings, label: "Preferences", href: "/account/preferences", description: "Dietary preferences and settings" },
    { icon: FiHelpCircle, label: "Help & Support", href: "/support", description: "Get help and contact support" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">My Account</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                alt="User Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl font-bold text-dark dark:text-white mb-1">{user.name}</h2>
            <p className="text-dark-5 dark:text-dark-6 mb-1">{user.email}</p>
            <p className="text-dark-5 dark:text-dark-6">{user.phone}</p>
            <button className="mt-4 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg hover:shadow-lg transition-all group"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-dark dark:text-white mb-1">{item.label}</h3>
                  <p className="text-sm text-dark-5 dark:text-dark-6">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
