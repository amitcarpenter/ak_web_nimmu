"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

export default function AboutPage() {
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

  const philosophy = [
    { step: "Concept", description: "Ideation and strategic planning", icon: "💡" },
    { step: "Strategy", description: "Data-driven approach and roadmap", icon: "🎯" },
    { step: "Experience", description: "Execution with attention to detail", icon: "✨" },
    { step: "Impact", description: "Measurable results and transformation", icon: "🚀" },
  ];

  const leadership = [
    {
      name: "Leadership Team",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
      bio: "Visionary leader with 15+ years in event management and marketing",
    },
    {
      name: "Creative Director",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
      bio: "Award-winning creative professional specializing in experiential design",
    },
    {
      name: "Operations Head",
      role: "COO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
      bio: "Expert in logistics and on-ground execution across India",
    },
  ];

  const presence = [
    { region: "North India", cities: ["Delhi", "Punjab", "Haryana", "Uttar Pradesh"] },
    { region: "South India", cities: ["Karnataka", "Tamil Nadu", "Kerala", "Telangana"] },
    { region: "West India", cities: ["Maharashtra", "Gujarat", "Rajasthan"] },
    { region: "East India", cities: ["West Bengal", "Odisha", "Bihar", "Jharkhand"] },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2">
              Who We Are
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
              ATLA KNOTS EVENTIVE is a premier event management and experiential marketing agency
              with over 12 years of excellence in creating impactful experiences across India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Split Screen */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left: Mission/Vision */}
            <div className="fade-in-up order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-6 sm:mb-8">
                Our Mission & Vision
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">Mission</h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    To design and deliver exceptional experiences that create lasting impact,
                    connecting brands with their audiences through innovative events, activations,
                    and strategic communications.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">Vision</h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    To be India's most trusted partner for experiential marketing and event
                    management, recognized for creativity, excellence, and measurable results
                    across urban and rural markets.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Cinematic Images */}
            <div className="fade-in-up order-1 md:order-2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=600&fit=crop&q=80"
                    alt="Corporate Event"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mt-4 sm:mt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop&q=80"
                    alt="Exhibition Pavilion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl -mt-2 sm:-mt-4">
                  <Image
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=600&fit=crop&q=80"
                    alt="Rural Awareness Campaign"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1478146896981-3e85b5775864?w=600&h=600&fit=crop&q=80"
                    alt="Brand Activation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy - Timeline */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Our Philosophy
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              A proven process from concept to impact
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {philosophy.map((item, index) => (
                <div key={index} className="fade-in-up text-center relative">
                  {index < philosophy.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary transform translate-x-4" />
                  )}
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary rounded-full text-3xl sm:text-4xl mb-3 sm:mb-4 shadow-lg">
                      {item.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-2">
                      {item.step}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 sm:mt-12 text-center fade-in-up px-4">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
                <span className="font-bold text-primary">Concept</span>
                <FiArrowRight className="text-primary hidden sm:block" />
                <span className="font-bold text-primary">Strategy</span>
                <FiArrowRight className="text-primary hidden sm:block" />
                <span className="font-bold text-primary">Experience</span>
                <FiArrowRight className="text-primary hidden sm:block" />
                <span className="font-bold text-primary">Impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Spotlight */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Leadership Spotlight
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Meet the visionaries driving our success
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="fade-in-up group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-dark shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm">{leader.bio}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-primary font-semibold mb-2 text-sm sm:text-base">{leader.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Presence - Interactive Map */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Our Presence
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Pan-India coverage across urban and rural regions
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {presence.map((region, index) => (
                <div
                  key={index}
                  className="fade-in-up bg-white dark:bg-gray-dark rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <FiMapPin className="text-primary text-xl sm:text-2xl mr-2" />
                    <h3 className="text-lg sm:text-xl font-bold text-dark dark:text-white">
                      {region.region}
                    </h3>
                  </div>
                  <ul className="space-y-1 sm:space-y-2">
                    {region.cities.map((city, cityIndex) => (
                      <li
                        key={cityIndex}
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 sm:mt-12 text-center fade-in-up px-4">
              <div className="inline-block bg-primary text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg text-center">
                200+ Cities Covered | 1000+ Villages Reached
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
                Our Core Values
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[
                { title: "Excellence", desc: "Uncompromising quality in every project" },
                { title: "Innovation", desc: "Creative solutions that stand out" },
                { title: "Integrity", desc: "Transparent and ethical practices" },
                { title: "Impact", desc: "Measurable results that matter" },
              ].map((value, index) => (
                <div key={index} className="fade-in-up p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
