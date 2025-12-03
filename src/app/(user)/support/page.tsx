"use client";

import { useState } from "react";
import { FiHelpCircle, FiMessageCircle, FiMail, FiPhone, FiSearch, FiChevronRight } from "react-icons/fi";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "chat">("faq");

  const faqCategories = [
    {
      category: "Orders",
      questions: [
        { q: "How can I track my order?", a: "You can track your order from the Orders page or use the order tracking link sent to your email." },
        { q: "Can I cancel my order?", a: "Yes, you can cancel your order within 30 minutes of placing it from the Orders page." },
      ],
    },
    {
      category: "Delivery",
      questions: [
        { q: "What are the delivery charges?", a: "Free delivery on orders above ₹500. Below that, delivery charges are ₹50." },
        { q: "How long does delivery take?", a: "Standard delivery takes 30-40 minutes. You can also schedule delivery for later." },
      ],
    },
    {
      category: "Payments",
      questions: [
        { q: "What payment methods do you accept?", a: "We accept Credit/Debit cards, UPI, Wallets, and Cash on Delivery." },
        { q: "Is my payment information secure?", a: "Yes, all payments are processed through secure payment gateways." },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Help & Support</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-stroke dark:border-stroke-dark">
        {[
          { id: "faq", label: "FAQ" },
          { id: "contact", label: "Contact Us" },
          { id: "chat", label: "Live Chat" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-dark-5 dark:text-dark-6 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div>
          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-6">
            {faqCategories.map((category) => (
              <div key={category.category} className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
                <h3 className="text-xl font-bold text-dark dark:text-white mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-dark dark:text-white mb-2">{item.q}</h4>
                      <p className="text-dark-5 dark:text-dark-6">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMail className="text-primary mt-1" />
                <div>
                  <p className="font-semibold text-dark dark:text-white">Email</p>
                  <a href="mailto:support@foodhub.com" className="text-primary hover:underline">
                    support@foodhub.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-primary mt-1" />
                <div>
                  <p className="font-semibold text-dark dark:text-white">Phone</p>
                  <a href="tel:+911234567890" className="text-primary hover:underline">
                    +91 123 456 7890
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === "chat" && (
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          <div className="text-center py-12">
            <FiMessageCircle className="mx-auto h-16 w-16 text-dark-5 dark:text-dark-6 mb-4" />
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Start a Live Chat</h3>
            <p className="text-dark-5 dark:text-dark-6 mb-6">
              Our support team is available 24/7 to help you
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Start Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

