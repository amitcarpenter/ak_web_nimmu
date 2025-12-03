"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FiAward, FiCheck } from "react-icons/fi";

export default function ClientsPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]).then(([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Wait a bit more for all elements to render
        requestAnimationFrame(() => {
          gsap.utils.toArray(".fade-in-up").forEach((element: any) => {
            if (!element) return;
            
            // Check if element is already in viewport
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const isInViewport = rect.top < viewportHeight * 0.9 && rect.top > -rect.height;
            
            if (isInViewport) {
              // Element already visible, just mark as animated and ensure visible
              gsap.set(element, { opacity: 1, y: 0, clearProps: "all" });
              element.classList.add("gsap-animated");
            } else {
              // Set initial state for animation
              gsap.set(element, { opacity: 0, y: 60 });
              
              // Animate on scroll
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 90%",
                  toggleActions: "play none none none",
                  once: true,
                },
                onComplete: () => {
                  if (element) {
                    element.classList.add("gsap-animated");
                    gsap.set(element, { opacity: 1, y: 0 });
                  }
                },
              });
            }
          });
        });
      }).catch((error) => {
        // If GSAP fails to load, ensure content is visible
        console.warn("GSAP failed to load, content will be visible without animation:", error);
        // Force all fade-in-up elements to be visible
        document.querySelectorAll(".fade-in-up").forEach((el: any) => {
          if (el) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.visibility = "visible";
          }
        });
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const govtClients = [
    { name: "Government of India", logo: null, category: "Central" },
    { name: "State Government", logo: null, category: "State" },
    { name: "Public Sector Unit", logo: null, category: "PSU" },
    { name: "Ministry", logo: null, category: "Central" },
  ];

  const corporateClients = [
    { name: "Fortune 500 Company", logo: null, sector: "Technology" },
    { name: "Leading Brand", logo: null, sector: "FMCG" },
    { name: "Global Corporation", logo: null, sector: "Manufacturing" },
    { name: "Enterprise Client", logo: null, sector: "Services" },
    { name: "Major Retailer", logo: null, sector: "Retail" },
    { name: "Financial Institution", logo: null, sector: "Finance" },
  ];

  const certificates = [
    { title: "ISO Certification", year: "2023", image: null },
    { title: "Industry Excellence Award", year: "2022", image: null },
    { title: "Best Event Management", year: "2021", image: null },
    { title: "Innovation Award", year: "2020", image: null },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Clients</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Trusted by government agencies and leading corporations across India
            </p>
          </div>
        </div>
      </section>

      {/* Public Sector Clients */}
      <section className="py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
              Public Sector Clients
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Serving government agencies and public sector organizations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {govtClients.map((client, index) => (
              <div
                key={index}
                className="fade-in-up group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-dark border-2 border-gray-200 dark:border-gray-800 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-24 mb-4 flex items-center justify-center">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={200}
                      height={100}
                      className="object-contain max-h-20"
                    />
                  ) : (
                    <div className="w-full h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        {client.name.split(' ')[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-dark dark:text-white mb-2">
                    {client.name}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {client.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                    Govt
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Clients */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
              Corporate Clients
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Partnering with leading brands and enterprises
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateClients.map((client, index) => (
              <div
                key={index}
                className="fade-in-up group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-dark p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-24 mb-4 flex items-center justify-center">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={200}
                      height={100}
                      className="object-contain max-h-20 opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        {client.name.split(' ')[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-dark dark:text-white mb-2">
                    {client.name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{client.sector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
              Strategic Partnerships
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Collaborating with industry leaders for exceptional results
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Vendor Network", desc: "500+ trusted partners", icon: "🤝" },
                { title: "Technology Partners", desc: "Cutting-edge solutions", icon: "💻" },
                { title: "Media Partners", desc: "Wide reach and coverage", icon: "📺" },
              ].map((partnership, index) => (
                <div
                  key={index}
                  className="fade-in-up text-center p-8 bg-gray-100 dark:bg-gray-900 rounded-2xl"
                >
                  <div className="text-5xl mb-4">{partnership.icon}</div>
                  <h3 className="text-2xl font-bold text-dark dark:text-white mb-2">
                    {partnership.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{partnership.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates & Awards */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
              Certificates & Awards
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Recognized for excellence and innovation
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollSnapType: "x mandatory" }}>
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 fade-in-up"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-dark shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-[4/3]">
                      {cert.image ? (
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                          <FiAward className="text-6xl text-primary/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <FiAward className="text-4xl text-primary" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                        <p className="text-gray-300">{cert.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
              Client Testimonials
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "ATLA KNOTS delivered an exceptional event that exceeded our expectations. Their attention to detail and professionalism is unmatched.",
                author: "Government Official",
                role: "Ministry Representative",
              },
              {
                quote:
                  "Working with ATLA KNOTS has been a game-changer. They understand our brand and deliver results that matter.",
                author: "Corporate Executive",
                role: "Fortune 500 Company",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="fade-in-up p-8 bg-gray-100 dark:bg-gray-900 rounded-2xl"
              >
                <div className="flex items-start mb-4">
                  <FiCheck className="text-primary text-2xl mr-2 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-bold text-dark dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

