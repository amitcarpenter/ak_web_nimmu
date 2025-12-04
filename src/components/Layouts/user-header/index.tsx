"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeToggleSwitch } from "../header/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

export function UserHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/clients', label: 'Clients' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white dark:bg-gray-dark shadow-lg border-b border-stroke dark:border-stroke-dark' 
          : 'bg-white dark:bg-gray-dark lg:bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <Image
              src="/images/logo/new_ak_logo.png"
              alt="ATLA KNOTS EVENTIVE"
              width={220}
              height={80}
              className="h-14 md:h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors relative group ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-dark dark:text-white hover:text-primary'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === link.href ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggleSwitch />

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-dark dark:text-white"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-gray-dark"
              id="mobile-menu"
            >
              <nav className="flex flex-col space-y-4 py-4 border-t border-stroke dark:border-stroke-dark bg-white dark:bg-gray-dark" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-2 text-base font-semibold uppercase tracking-wide transition-colors block ${
                        pathname === link.href
                          ? 'text-primary border-l-4 border-primary'
                          : 'text-dark dark:text-white hover:text-primary hover:border-l-4 hover:border-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mx-4 mt-4 inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
