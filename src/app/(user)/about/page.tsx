"use client";

import Image from "next/image";
import { FiUsers, FiTarget, FiAward, FiHeart, FiTruck, FiShield } from "react-icons/fi";

export default function AboutPage() {
  const stats = [
    { icon: FiUsers, value: "50K+", label: "Happy Customers" },
    { icon: FiTruck, value: "100+", label: "Delivery Partners" },
    { icon: FiAward, value: "500+", label: "Restaurants" },
    { icon: FiHeart, value: "1M+", label: "Orders Delivered" },
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Customer First",
      description: "We prioritize our customers' satisfaction above everything else.",
    },
    {
      icon: FiShield,
      title: "Quality Assurance",
      description: "Every product is carefully selected and quality-checked before delivery.",
    },
    {
      icon: FiTruck,
      title: "Fast Delivery",
      description: "We ensure timely delivery of fresh food to your doorstep.",
    },
    {
      icon: FiTarget,
      title: "Innovation",
      description: "Constantly improving our platform to serve you better.",
    },
  ];

  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    },
    {
      name: "Mike Johnson",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
    {
      name: "Sarah Williams",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-6">
              About FoodHub
            </h1>
            <p className="text-xl text-dark-5 dark:text-dark-6 mb-8">
              Your trusted partner for fresh food delivery. We connect you with the best restaurants and grocery stores in your city.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <span className="text-2xl">🍽️</span>
              <span className="font-semibold">Delivering Happiness, One Meal at a Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-dark dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-dark-5 dark:text-dark-6">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark dark:text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-dark-5 dark:text-dark-6 mb-6">
                FoodHub was founded in 2020 with a simple mission: to make fresh, quality food accessible to everyone. 
                What started as a small local delivery service has grown into a trusted platform connecting thousands of 
                customers with hundreds of restaurants and grocery stores.
              </p>
              <p className="text-dark-5 dark:text-dark-6 mb-6">
                We believe that everyone deserves access to fresh, healthy, and delicious food. Our platform makes it 
                easy to discover new restaurants, order your favorite meals, and get everything delivered right to your 
                doorstep. Whether you're looking for a quick lunch, a family dinner, or weekly groceries, FoodHub has you covered.
              </p>
              <p className="text-dark-5 dark:text-dark-6">
                Today, we're proud to serve customers across multiple cities, working with the best restaurants and 
                maintaining the highest standards of quality and service. Our commitment to excellence drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white dark:bg-gray-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark dark:text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 border border-stroke dark:border-stroke-dark rounded-lg hover:shadow-lg transition-shadow"
                >
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-dark dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-dark-5 dark:text-dark-6">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark dark:text-white mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">
            Join Us on Our Journey
          </h2>
          <p className="text-xl text-dark-5 dark:text-dark-6 mb-8 max-w-2xl mx-auto">
            Whether you're a customer, restaurant partner, or potential team member, we'd love to have you with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="/careers"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              View Careers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

