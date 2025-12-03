import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export function UserFooter() {
  const footerLinks = {
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/services', label: 'Services' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/clients', label: 'Clients' },
    ],
    services: [
      { href: '/services#events', label: 'Event & Entertainment' },
      { href: '/services#experiential', label: 'Experiential Marketing' },
      { href: '/services#rural', label: 'Rural Communication' },
      { href: '/services#exhibitions', label: 'Exhibitions' },
    ],
    legal: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
    ],
  };

  return (
    <footer className="bg-dark dark:bg-gray-dark border-t border-stroke dark:border-stroke-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/images/logo/new_ak_logo.png"
                alt="ATLA KNOTS EVENTIVE"
                width={240}
                height={90}
                className="h-20 md:h-24 w-auto brightness-0 invert dark:brightness-100 dark:invert-0"
                priority
              />
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              We Design Experiences. We Deliver Impact. Creating memorable events, activations, and communications across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@atlaknots.com" className="flex items-start space-x-3 text-sm text-gray-400 hover:text-primary transition-colors">
                  <FiMail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>info@atlaknots.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+911234567890" className="flex items-start space-x-3 text-sm text-gray-400 hover:text-primary transition-colors">
                  <FiPhone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>+91 123 456 7890</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-sm text-gray-400">
                  <FiMapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Pan-India Coverage</span>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-center md:text-left text-sm text-gray-400">
              © {new Date().getFullYear()} ATLA KNOTS EVENTIVE. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
