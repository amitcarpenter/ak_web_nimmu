"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiX, FiArrowRight, FiPlay, FiImage } from "react-icons/fi";

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  image: string;
  objective: string;
  strategy: string;
  execution: string;
  impact: { metric: string; value: string }[];
  images?: string[];
  video?: string;
}

export default function CaseStudiesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filters = ["All", "Events", "Branding", "Rural", "Experiential", "Exhibitions"];

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Corporate Brand Launch Event",
      category: "Events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&q=80",
      objective: "Launch new product line with maximum brand visibility and media coverage",
      strategy:
        "Multi-city launch events with influencer partnerships and digital amplification",
      execution:
        "Executed 5 city launches with 2000+ attendees, live streaming, and social media integration",
      impact: [
        { metric: "Reach", value: "50K+" },
        { metric: "Engagement", value: "85%" },
        { metric: "Media Coverage", value: "150+" },
      ],
      images: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
      ],
    },
    {
      id: 2,
      title: "Rural Awareness Campaign",
      category: "Rural",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
      objective: "Create awareness about government health schemes in rural areas",
      strategy:
        "Door-to-door campaigns, street plays, wall paintings, and community engagement",
      execution:
        "Covered 200+ villages across 5 states with multilingual content and local teams",
      impact: [
        { metric: "Villages Covered", value: "200+" },
        { metric: "People Reached", value: "1M+" },
        { metric: "Awareness Increase", value: "65%" },
      ],
      images: [
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&q=80",
      ],
    },
    {
      id: 3,
      title: "Exhibition Pavilion Design",
      category: "Exhibitions",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80",
      objective: "Design and build award-winning government pavilion for trade fair",
      strategy:
        "3D visualization, sustainable materials, interactive displays, and visitor engagement",
      execution:
        "Complete design, fabrication, and installation with 24/7 operations support",
      impact: [
        { metric: "Visitors", value: "100K+" },
        { metric: "Awards", value: "3" },
        { metric: "Engagement Time", value: "15 min avg" },
      ],
      images: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&q=80",
      ],
    },
    {
      id: 4,
      title: "Experiential Roadshow",
      category: "Experiential",
      image: "https://images.unsplash.com/photo-1478146896981-3e85b5775864?w=800&h=600&fit=crop&q=80",
      objective: "Launch new product through immersive brand experience",
      strategy:
        "Mobile activation units, sensory experiences, product sampling, and data collection",
      execution:
        "25-city roadshow with custom-designed vans, interactive zones, and real-time analytics",
      impact: [
        { metric: "Cities", value: "25+" },
        { metric: "Engagement", value: "92%" },
        { metric: "Samples Distributed", value: "50K+" },
      ],
      images: [
        "https://images.unsplash.com/photo-1478146896981-3e85b5775864?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
      ],
    },
    {
      id: 5,
      title: "Brand Activation Campaign",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
      objective: "Increase brand awareness and consumer engagement",
      strategy:
        "Multi-channel activation with digital integration and influencer partnerships",
      execution:
        "Shopping mall activations, pop-up experiences, and social media campaigns",
      impact: [
        { metric: "Footfall", value: "75K+" },
        { metric: "Social Reach", value: "2M+" },
        { metric: "Brand Recall", value: "78%" },
      ],
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&q=80",
      ],
    },
    {
      id: 6,
      title: "Government Scheme Launch",
      category: "Rural",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
      objective: "Launch and promote new government welfare scheme",
      strategy:
        "Comprehensive communication strategy with rural focus and local language content",
      execution:
        "State-wide campaign with van promotions, community meetings, and digital outreach",
      impact: [
        { metric: "Districts Covered", value: "50+" },
        { metric: "Beneficiaries Reached", value: "500K+" },
        { metric: "Application Rate", value: "45%" },
      ],
      images: [
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&q=80",
      ],
    },
  ];

  const filteredCases =
    selectedFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === selectedFilter);

  const openModal = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark via-gray-900 to-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Showcasing our best work and the impact we've created
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white dark:bg-gray-dark border-b border-gray-200 dark:border-gray-800 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                className="fade-in-up group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(caseStudy)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-primary rounded-full text-sm font-semibold text-white">
                      {caseStudy.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      {caseStudy.impact.slice(0, 2).map((imp, idx) => (
                        <div key={idx}>
                          <span className="font-bold">{imp.value}</span> {imp.metric}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                        <FiPlay className="text-4xl text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-dark rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <FiX className="text-2xl" />
            </button>

            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden">
              <Image
                src={selectedCase.image}
                alt={selectedCase.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block px-4 py-2 bg-primary rounded-full text-sm font-semibold mb-4">
                  {selectedCase.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{selectedCase.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4">Objective</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedCase.objective}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4">Strategy</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedCase.strategy}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Execution</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedCase.execution}
                </p>
              </div>

              {/* Impact Metrics */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Impact Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedCase.impact.map((imp, idx) => (
                    <div
                      key={idx}
                      className="p-6 bg-gray-100 dark:bg-gray-900 rounded-xl text-center"
                    >
                      <div className="text-3xl font-bold text-primary mb-2">{imp.value}</div>
                      <div className="text-gray-600 dark:text-gray-400">{imp.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Gallery */}
              {selectedCase.images && selectedCase.images.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Gallery</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedCase.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden">
                        <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105"
                >
                  Start Your Project
                  <FiArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

