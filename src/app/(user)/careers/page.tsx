"use client";

import { useState } from "react";
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiArrowRight } from "react-icons/fi";

export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Positions" },
    { id: "engineering", label: "Engineering" },
    { id: "marketing", label: "Marketing" },
    { id: "operations", label: "Operations" },
    { id: "sales", label: "Sales" },
    { id: "support", label: "Support" },
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      category: "engineering",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹15L - ₹25L",
      description: "We're looking for an experienced full-stack developer to join our engineering team.",
      requirements: ["5+ years experience", "React, Node.js", "AWS knowledge"],
    },
    {
      id: 2,
      title: "Product Manager",
      category: "engineering",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹20L - ₹30L",
      description: "Lead product development and work with cross-functional teams.",
      requirements: ["3+ years PM experience", "Technical background", "Agile methodology"],
    },
    {
      id: 3,
      title: "Digital Marketing Manager",
      category: "marketing",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹12L - ₹18L",
      description: "Drive our digital marketing strategy and campaigns.",
      requirements: ["4+ years experience", "SEO/SEM expertise", "Analytics skills"],
    },
    {
      id: 4,
      title: "Operations Manager",
      category: "operations",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹18L - ₹25L",
      description: "Oversee daily operations and ensure smooth delivery processes.",
      requirements: ["5+ years experience", "Logistics background", "Team management"],
    },
    {
      id: 5,
      title: "Business Development Executive",
      category: "sales",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹8L - ₹12L",
      description: "Build relationships with restaurant partners and expand our network.",
      requirements: ["2+ years B2B sales", "Communication skills", "Target-driven"],
    },
    {
      id: 6,
      title: "Customer Support Specialist",
      category: "support",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹4L - ₹6L",
      description: "Help customers with their queries and ensure excellent service.",
      requirements: ["1+ years experience", "Customer service skills", "Problem-solving"],
    },
  ];

  const filteredJobs =
    selectedCategory === "all"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-dark-5 dark:text-dark-6 max-w-2xl mx-auto">
            We're building the future of food delivery. Join us and make an impact.
          </p>
        </div>

        {/* Why Join Us Section */}
        <div className="bg-primary/10 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6 text-center">
            Why Join FoodHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold text-dark dark:text-white mb-2">
                Growth Opportunities
              </h3>
              <p className="text-dark-5 dark:text-dark-6">
                Fast-growing company with ample opportunities for career advancement
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold text-dark dark:text-white mb-2">
                Great Benefits
              </h3>
              <p className="text-dark-5 dark:text-dark-6">
                Competitive salary, health insurance, and flexible work arrangements
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-semibold text-dark dark:text-white mb-2">
                Amazing Team
              </h3>
              <p className="text-dark-5 dark:text-dark-6">
                Work with talented, passionate people who care about what they do
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark text-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg">
              <FiBriefcase className="h-16 w-16 text-dark-5 dark:text-dark-6 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
                No positions available
              </h3>
              <p className="text-dark-5 dark:text-dark-6">
                Check back later for new opportunities
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark dark:text-white mb-3">
                      {job.title}
                    </h3>
                    <p className="text-dark-5 dark:text-dark-6 mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 text-dark-5 dark:text-dark-6">
                        <FiMapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-dark-5 dark:text-dark-6">
                        <FiClock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-dark-5 dark:text-dark-6">
                        <FiDollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      Apply Now
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">
            Don't see a role that fits?
          </h2>
          <p className="text-dark-5 dark:text-dark-6 mb-6">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            Get in Touch
            <FiArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

