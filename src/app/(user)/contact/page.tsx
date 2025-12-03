"use client";

import { useState, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray(".fade-in-up").forEach((element: any) => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight * 0.85;
        
        if (isInViewport) {
          element.classList.add("gsap-animated");
        } else {
          gsap.set(element, { opacity: 0, y: 60 });
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            onComplete: () => {
              if (element) element.classList.add("gsap-animated");
            },
          });
        }
      });
    }).catch(() => {
      // Content stays visible if GSAP fails
    });
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
        setErrors({});
      }, 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Let's discuss how we can bring your vision to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="fade-in-up">
              <h2 className="text-4xl font-bold text-dark dark:text-white mb-8">
                Send Us a Message
              </h2>
              {isSubmitted ? (
                <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-green-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <FiCheck className="text-3xl text-green-500" />
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
                      Thank You!
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-dark dark:text-white focus:outline-none transition-colors ${
                          errors.name
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-700 focus:border-primary"
                        }`}
                        placeholder="Your Name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-dark dark:text-white focus:outline-none transition-colors ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-700 focus:border-primary"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-dark dark:text-white focus:outline-none transition-colors ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-700 focus:border-primary"
                        }`}
                        placeholder="+91 123 456 7890"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-dark dark:text-white focus:border-primary focus:outline-none"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-dark dark:text-white focus:border-primary focus:outline-none"
                    >
                      <option value="">Select a Service</option>
                      <option value="events">Event & Entertainment</option>
                      <option value="experiential">Experiential Marketing</option>
                      <option value="rural">Rural Communication</option>
                      <option value="exhibitions">Exhibitions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-dark dark:text-white focus:outline-none resize-none transition-colors ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:border-primary"
                      }`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  >
                    Send Message
                    <FiSend className="ml-2" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="fade-in-up">
              <h2 className="text-4xl font-bold text-dark dark:text-white mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiMail className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Email</h3>
                    <a
                      href="mailto:info@atlaknots.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      info@atlaknots.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Phone</h3>
                    <a
                      href="tel:+911234567890"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiMapPin className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Pan-India Coverage
                      <br />
                      Serving Urban & Rural Markets
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-gray-100 dark:bg-gray-900 rounded-2xl">
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">
                  Why Work With Us?
                </h3>
                <ul className="space-y-3">
                  {[
                    "12+ Years of Experience",
                    "500+ Successful Projects",
                    "Pan-India Network",
                    "24/7 Support",
                    "End-to-End Solutions",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <FiCheck className="text-primary flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
