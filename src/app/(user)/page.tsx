"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      
      // Mark GSAP as ready
      document.body.classList.add("gsap-ready");

      // Ensure hero elements are visible first
      const heroTitle = document.querySelector(".hero-title");
      const heroTagline = document.querySelector(".hero-tagline");
      const heroCta = document.querySelector(".hero-cta");
      
      if (heroTitle) {
        (heroTitle as HTMLElement).style.opacity = "1";
        (heroTitle as HTMLElement).style.visibility = "visible";
      }
      if (heroTagline) {
        (heroTagline as HTMLElement).style.opacity = "1";
        (heroTagline as HTMLElement).style.visibility = "visible";
      }
      if (heroCta) {
        (heroCta as HTMLElement).style.opacity = "1";
        (heroCta as HTMLElement).style.visibility = "visible";
      }

      if (heroRef.current) {
        // Kill any existing animations first
        gsap.killTweensOf([".hero-title", ".hero-tagline", ".hero-cta"]);
        
        const tl = gsap.timeline();
        tl.fromTo(".hero-title", 
          { opacity: 1, y: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 0.1,
            ease: "power3.out",
          }
        )
          .fromTo(
            ".hero-tagline",
            { opacity: 1, y: 0 },
            {
              opacity: 1,
              y: 0,
              duration: 0.1,
              ease: "power3.out",
            },
            "-=0.1"
          )
          .fromTo(
            ".hero-cta",
            { opacity: 1, y: 0 },
            {
              opacity: 1,
              y: 0,
              duration: 0.1,
              ease: "power3.out",
            },
            "-=0.1"
          );
      }

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        gsap.utils.toArray(".fade-in-up").forEach((element: any) => {
          // Ensure element is visible first
          if (element) {
            element.style.opacity = "1";
            element.style.visibility = "visible";
            element.style.transform = "translateY(0)";
          }
          
          // Check if element is already in viewport
          const rect = element.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight * 0.85;
          
          if (isInViewport) {
            // Element already visible, just mark as animated
            element.classList.add("gsap-animated");
          } else {
            // Animate on scroll (but keep visible)
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
                if (element) {
                  element.classList.add("gsap-animated");
                  element.style.opacity = "1";
                  element.style.visibility = "visible";
                }
              },
            });
          }
        });
      }, 100);
    }).catch((error) => {
      // If GSAP fails to load, ensure content is visible
      console.warn("GSAP failed to load, content will be visible without animation:", error);
      document.body.classList.remove("gsap-ready");
      
      // Force all fade-in-up elements to be visible
      document.querySelectorAll(".fade-in-up").forEach((el: any) => {
        if (el) {
          el.style.opacity = "1";
          el.style.visibility = "visible";
          el.style.transform = "translateY(0)";
        }
      });
    });
  }, []);

  const coreExpertise = [
    {
      id: 1,
      title: "Event & Entertainment",
      description: "Corporate events, social gatherings, brand launches with complete decor and production management",
      icon: "🎉",
    },
    {
      id: 2,
      title: "Experiential Marketing",
      description: "Brand activations, roadshows, sensory experiences, and innovative module designs",
      icon: "🚀",
    },
    {
      id: 3,
      title: "Rural Communication",
      description: "Door-to-door awareness, govt scheme activations, street plays, and wall painting",
      icon: "🌾",
    },
    {
      id: 4,
      title: "Exhibition Design",
      description: "Govt pavilions, corporate stalls with 3D visualization and complete build operations",
      icon: "🏛️",
    },
    {
      id: 5,
      title: "Development Communication",
      description: "Strategic communication campaigns for social impact and awareness",
      icon: "📢",
    },
  ];

  const whyChooseUs = [
    {
      title: "Strategy",
      description: "Data-driven insights and strategic planning",
      icon: "🎯",
    },
    {
      title: "Creative",
      description: "Innovative designs and concepts",
      icon: "✨",
    },
    {
      title: "Production",
      description: "End-to-end execution excellence",
      icon: "🏭",
    },
    {
      title: "Delivery",
      description: "On-time, on-budget, on-brand delivery",
      icon: "🚚",
    },
  ];

  const stats = [
    { value: "12+", label: "Years Experience" },
    { value: "500+", label: "Successful Events" },
    { value: "50+", label: "Govt & Corporate Clients" },
    { value: "Pan-India", label: "Coverage" },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Corporate Brand Launch",
      category: "Events",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80",
      stats: { reach: "50K+", engagement: "85%" },
    },
    {
      id: 2,
      title: "Rural Awareness Campaign",
      category: "Rural",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
      stats: { villages: "200+", impact: "1M+" },
    },
    {
      id: 3,
      title: "Exhibition Pavilion Design",
      category: "Exhibitions",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&q=80",
      stats: { visitors: "100K+", awards: "3" },
    },
    {
      id: 4,
      title: "Experiential Roadshow",
      category: "Experiential",
      image: "https://images.unsplash.com/photo-1478146896981-3e85b5775864?w=800&h=600&fit=crop&q=80",
      stats: { cities: "25+", engagement: "92%" },
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <motion.section
        key="hero-section"
        ref={heroRef}
        className="relative min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-dark to-gray-900 py-8 sm:py-12"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-2" style={{ 
            textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
            color: '#ffffff',
            opacity: 1,
            visibility: 'visible'
          }}>
            <span className="text-white">We Design</span>
            <br />
            <span className="text-primary" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(220,38,38,0.3)' }}>Experiences.</span>
            <br />
            <span className="text-white">We Deliver</span>
            <br />
            <span className="text-primary" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(220,38,38,0.3)' }}>Impact.</span>
          </h1>
          <p className="hero-tagline text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4" style={{ 
            color: '#ffffff',
            textShadow: '1px 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
            opacity: 1,
            visibility: 'visible'
          }}>
            Creating memorable events, activations, and communications that inspire and transform
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4" style={{ opacity: 1, visibility: 'visible' }}>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-bold text-base sm:text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto"
            >
              View Our Expertise
              <FiArrowRight className="ml-2" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-lg font-bold text-base sm:text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/20 w-full sm:w-auto"
            >
              <FiPlay className="mr-2" />
              Watch Our Work
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </motion.section>

      <section className="bg-dark text-white py-8 sm:py-12 border-y border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in-up">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wide px-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Our Core Expertise
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Comprehensive solutions for events, marketing, and communication needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreExpertise.map((expertise, index) => (
              <motion.div
                key={expertise.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-gray-dark shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                {/* Half Red Background */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-primary" />
                {/* White Bottom Half */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white dark:bg-gray-dark" />
                
                <div className="relative z-10 p-4 sm:p-6 md:p-8">
                  {/* Top Red Section */}
                  <div className="mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-white">{expertise.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{expertise.title}</h3>
                  </div>
                  
                  {/* Bottom White Section */}
                  <div className="pt-4 sm:pt-6 border-t-2 border-primary/20">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed">{expertise.description}</p>
                    <Link
                      href={`/services#${expertise.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-sm sm:text-base text-primary font-semibold hover:text-primary-dark transition-colors group/link"
                    >
                      Learn More
                      <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Our proven process from concept to impact
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                }}
                className="text-center p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-dark rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center fade-in-up px-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
              <span className="font-bold text-primary">Strategy</span>
              <FiArrowRight className="text-primary hidden sm:block" />
              <span className="font-bold text-primary">Creative</span>
              <FiArrowRight className="text-primary hidden sm:block" />
              <span className="font-bold text-primary">Production</span>
              <FiArrowRight className="text-primary hidden sm:block" />
              <span className="font-bold text-primary">Delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-dark text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Our Work in Action</h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Past events, rural campaigns, and activations that made an impact
            </p>
          </div>
          <div className="relative">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 px-2" style={{ scrollSnapType: "x mandatory" }}>
              {[
                { id: 1, image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop&q=80", title: "Corporate Event" },
                { id: 2, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=80", title: "Exhibition Setup" },
                { id: 3, image: "https://images.unsplash.com/photo-1478146896981-3e85b5775864?w=1200&h=800&fit=crop&q=80", title: "Brand Activation" },
                { id: 4, image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80", title: "Rural Campaign" },
                { id: 5, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80", title: "Product Launch" },
                { id: 6, image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop&q=80", title: "Award Ceremony" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-2/3 lg:w-1/2 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300">Creating memorable experiences</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-dark border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Trusted By
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Government & Corporate Partners
            </p>
          </div>
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-marquee whitespace-nowrap" style={{ width: "fit-content" }}>
              {[
                "Government of India",
                "State Governments",
                "Fortune 500 Companies",
                "Leading Brands",
                "NGOs",
                "Public Sector Units",
              ].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center mx-3 sm:mx-6"
                >
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-dark dark:text-white whitespace-nowrap">{client}</span>
                </div>
              ))}
              {[
                "Government of India",
                "State Governments",
                "Fortune 500 Companies",
                "Leading Brands",
                "NGOs",
                "Public Sector Units",
              ].map((client, index) => (
                <div
                  key={`dup-${index}`}
                  className="flex-shrink-0 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center mx-3 sm:mx-6"
                >
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-dark dark:text-white whitespace-nowrap">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Showcasing our best work and impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Link
                  href={`/case-studies/${project.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 block"
                >
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <span className="inline-block px-2 sm:px-3 py-1 bg-primary rounded-full text-xs sm:text-sm font-semibold mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-bold">{value}</span> {key}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12 fade-in-up px-4">
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-bold text-base sm:text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              View All Case Studies
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
                Let's discuss how we can bring your vision to life with our expertise and passion
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-primary text-white rounded-lg font-bold text-base sm:text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto"
              >
                Get Started Today
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
