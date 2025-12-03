"use client";

import { useState, useEffect } from "react";
import { FiChevronDown, FiCheck, FiArrowRight } from "react-icons/fi";

interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  services: string[];
  process: string[];
}

export default function ServicesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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

  const categories: ServiceCategory[] = [
    {
      id: "events",
      title: "Event & Entertainment",
      icon: "🎉",
      color: "from-red-600 to-red-800",
      description:
        "Complete event management solutions from corporate gatherings to grand celebrations",
      services: [
        "Corporate Events",
        "Social Events",
        "Brand Launches",
        "Decor & Staging",
        "Invitation Design",
        "Gift Curation",
        "Production Management",
        "AV & Technical Support",
      ],
      process: [
        "Consultation & Planning",
        "Concept Development",
        "Vendor Coordination",
        "On-site Execution",
        "Post-event Analysis",
      ],
    },
    {
      id: "experiential",
      title: "Experiential Marketing",
      icon: "🚀",
      color: "from-orange-600 to-orange-800",
      description:
        "Create immersive brand experiences that engage and inspire your target audience",
      services: [
        "Brand Activations",
        "Roadshows",
        "Sensory Experiences",
        "Product Sampling",
        "Module Design (Kiosks, Vans)",
        "Interactive Installations",
        "Pop-up Experiences",
        "Consumer Engagement Programs",
      ],
      process: [
        "Audience Research",
        "Experience Design",
        "Module Development",
        "Activation Execution",
        "ROI Measurement",
      ],
    },
    {
      id: "rural",
      title: "Rural & Development Communication",
      icon: "🌾",
      color: "from-yellow-600 to-yellow-800",
      description:
        "Reaching rural India with effective communication strategies and on-ground activations",
      services: [
        "Door-to-Door Awareness",
        "Government Scheme Activations",
        "Street Plays & Performances",
        "Van Promotions",
        "Wall Painting & Murals",
        "Data Collection & Reporting",
        "Community Engagement",
        "Rural Market Research",
      ],
      process: [
        "Terrain Analysis",
        "Content Localization",
        "Team Deployment",
        "On-ground Execution",
        "Impact Assessment",
      ],
    },
    {
      id: "exhibitions",
      title: "Exhibitions",
      icon: "🏛️",
      color: "from-purple-600 to-purple-800",
      description:
        "Stunning exhibition spaces that showcase your brand and captivate visitors",
      services: [
        "Government Pavilion Design",
        "Corporate Stall Design",
        "3D Visualization & Rendering",
        "Build & Fabrication",
        "On-ground Operations",
        "Interactive Displays",
        "Lighting & AV Setup",
        "Visitor Management",
      ],
      process: [
        "Concept & Design",
        "3D Visualization",
        "Fabrication",
        "Installation",
        "Operations & Maintenance",
      ],
    },
  ];

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive solutions for events, marketing, and communication needs across India
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                id={category.id}
                className="fade-in-up scroll-mt-20"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-2xl`}
                >
                  <div className="p-8 md:p-12">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-6xl mb-4">{category.icon}</div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                          {category.title}
                        </h2>
                        <p className="text-lg text-white/90 mb-6 max-w-3xl">
                          {category.description}
                        </p>
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
                        >
                          {expandedCategory === category.id ? "Show Less" : "View Details"}
                          <FiChevronDown
                            className={`ml-2 transition-transform duration-300 ${
                              expandedCategory === category.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedCategory === category.id && (
                      <div className="mt-8 pt-8 border-t border-white/20 animate-fadeIn">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Services List */}
                          <div>
                            <h3 className="text-2xl font-bold mb-4">Our Services</h3>
                            <ul className="space-y-3">
                              {category.services.map((service, serviceIndex) => (
                                <li
                                  key={serviceIndex}
                                  className="flex items-start space-x-3"
                                >
                                  <FiCheck className="text-2xl flex-shrink-0 mt-0.5" />
                                  <span className="text-lg">{service}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Process Flow */}
                          <div>
                            <h3 className="text-2xl font-bold mb-4">Our Process</h3>
                            <div className="space-y-4">
                              {category.process.map((step, stepIndex) => (
                                <div
                                  key={stepIndex}
                                  className="flex items-start space-x-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                                    {stepIndex + 1}
                                  </div>
                                  <div>
                                    <p className="text-lg font-semibold">{step}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/20">
                          <a
                            href="/contact"
                            className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
                          >
                            Get a Quote
                            <FiArrowRight className="ml-2" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
              Why Choose Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              What sets us apart in the industry
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "End-to-End Solutions",
                description:
                  "From concept to execution, we handle every aspect of your project",
                icon: "🔄",
              },
              {
                title: "Pan-India Reach",
                description:
                  "Extensive network across urban and rural markets nationwide",
                icon: "🗺️",
              },
              {
                title: "Custom Creative Team",
                description:
                  "Dedicated designers and strategists for unique solutions",
                icon: "🎨",
              },
              {
                title: "24/7 Support",
                description:
                  "Round-the-clock on-ground support for seamless execution",
                icon: "📞",
              },
              {
                title: "Proven Track Record",
                description: "500+ successful events and campaigns delivered",
                icon: "🏆",
              },
              {
                title: "Cost-Effective",
                description:
                  "Optimized solutions that deliver maximum value and impact",
                icon: "💰",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="fade-in-up p-8 bg-white dark:bg-gray-dark rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can bring your vision to life
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Get in Touch
              <FiArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

