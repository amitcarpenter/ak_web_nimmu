"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiMapPin } from "react-icons/fi";
import { ThemeToggleSwitch } from "../header/theme-toggle";

export function UserHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3); // TODO: Get from cart context

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/offers', label: 'Offers' },
    { href: '/subscriptions', label: 'Subscriptions' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-white shadow-sm dark:border-stroke-dark dark:bg-gray-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo/food_hub_logo.png"
              alt="FoodHub"
              width={160}
              height={55}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
              <input
                type="text"
                placeholder="Search for food, groceries..."
                className="w-full rounded-lg border border-stroke bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none dark:border-stroke-dark dark:bg-gray-dark"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Location - Desktop */}
            <button className="hidden md:flex items-center space-x-1 text-sm text-dark-5 dark:text-dark-6">
              <FiMapPin />
              <span>Deliver to</span>
            </button>

            {/* Search Icon - Mobile */}
            <Link href="/search" className="lg:hidden">
              <FiSearch className="h-5 w-5 text-dark-5 dark:text-dark-6" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <FiHeart className="h-5 w-5 text-dark-5 dark:text-dark-6" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <FiShoppingCart className="h-5 w-5 text-dark-5 dark:text-dark-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link href="/account">
              <FiUser className="h-5 w-5 text-dark-5 dark:text-dark-6" />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggleSwitch />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-5 w-5 text-dark-5 dark:text-dark-6" />
              ) : (
                <FiMenu className="h-5 w-5 text-dark-5 dark:text-dark-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-stroke py-4 dark:border-stroke-dark md:hidden">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-dark-5 dark:text-dark-6'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

