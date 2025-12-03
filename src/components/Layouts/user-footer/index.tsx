import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone } from "react-icons/fi";

export function UserFooter() {
  const footerLinks = {
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/careers', label: 'Careers' },
      { href: '/blog', label: 'Blog' },
    ],
    support: [
      { href: '/support', label: 'Help Center' },
      { href: '/faq', label: 'FAQ' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
    legal: [
      { href: '/delivery-policy', label: 'Delivery Policy' },
      { href: '/refund-policy', label: 'Refund Policy' },
      { href: '/food-safety', label: 'Food Safety' },
      { href: '/allergen-policy', label: 'Allergen Policy' },
    ],
  };

  return (
    <footer className="bg-gray-2 dark:bg-gray-dark border-t border-stroke dark:border-stroke-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/logo/food_hub_logo.png"
                alt="FoodHub"
                width={160}
                height={55}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-dark-5 dark:text-dark-6 mb-4">
              Your trusted food delivery partner. Fresh groceries, prepared meals, and more delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary">
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-dark dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 mb-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-5 hover:text-primary dark:text-dark-6 dark:hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a href="mailto:support@foodhub.com" className="flex items-center space-x-2 text-sm text-dark-5 dark:text-dark-6">
                <FiMail className="h-4 w-4" />
                <span>support@foodhub.com</span>
              </a>
              <a href="tel:+911234567890" className="flex items-center space-x-2 text-sm text-dark-5 dark:text-dark-6">
                <FiPhone className="h-4 w-4" />
                <span>+91 123 456 7890</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stroke dark:border-stroke-dark">
          <p className="text-center text-sm text-dark-5 dark:text-dark-6">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

