"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiUser, FiArrowRight, FiSearch } from "react-icons/fi";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Recipes",
    "Nutrition",
    "Tips & Tricks",
    "Restaurant Reviews",
    "Food Trends",
  ];

  const featuredPost = {
    id: 1,
    title: "10 Healthy Breakfast Ideas to Start Your Day Right",
    excerpt:
      "Discover delicious and nutritious breakfast recipes that will keep you energized throughout the day.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Recipes",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=400&fit=crop&q=90",
    readTime: "5 min read",
  };

  const posts = [
    {
      id: 2,
      title: "The Ultimate Guide to Meal Prep",
      excerpt:
        "Learn how to meal prep like a pro and save time while eating healthy all week long.",
      author: "Mike Chen",
      date: "March 12, 2024",
      category: "Tips & Tricks",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&q=90",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Top 5 Restaurants in Mumbai You Must Try",
      excerpt:
        "Our curated list of the best restaurants in Mumbai for authentic flavors and great ambiance.",
      author: "Priya Sharma",
      date: "March 10, 2024",
      category: "Restaurant Reviews",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=90",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Understanding Food Labels: A Complete Guide",
      excerpt:
        "Decode nutrition labels and make informed choices about the food you buy and consume.",
      author: "Dr. Anjali Patel",
      date: "March 8, 2024",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&q=90",
      readTime: "8 min read",
    },
    {
      id: 5,
      title: "Plant-Based Diet: Getting Started",
      excerpt:
        "Everything you need to know about transitioning to a plant-based lifestyle.",
      author: "Emma Wilson",
      date: "March 5, 2024",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=90",
      readTime: "10 min read",
    },
    {
      id: 6,
      title: "Food Trends to Watch in 2024",
      excerpt:
        "Discover the latest food trends that are shaping the culinary world this year.",
      author: "David Lee",
      date: "March 3, 2024",
      category: "Food Trends",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=90",
      readTime: "6 min read",
    },
    {
      id: 7,
      title: "Quick and Easy Dinner Recipes for Busy Weeknights",
      excerpt:
        "Simple yet delicious dinner recipes that you can whip up in 30 minutes or less.",
      author: "Lisa Anderson",
      date: "March 1, 2024",
      category: "Recipes",
      image: "https://images.unsplash.com/photo-1556910103-2c027eb7f466?w=600&h=400&fit=crop&q=90",
      readTime: "5 min read",
    },
  ];

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4">
            FoodHub Blog
          </h1>
          <p className="text-xl text-dark-5 dark:text-dark-6 max-w-2xl mx-auto">
            Discover recipes, nutrition tips, restaurant reviews, and food trends
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg text-dark dark:text-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-dark-5 dark:text-dark-6 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-dark-5 dark:text-dark-6 mb-6">
                  <div className="flex items-center gap-2">
                    <FiUser className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                >
                  Read More
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-dark-5 dark:text-dark-6">
                No articles found matching your search.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-dark dark:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-dark-5 dark:text-dark-6 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-dark-5 dark:text-dark-6 mb-4">
                    <div className="flex items-center gap-2">
                      <FiUser className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                  >
                    Read More
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

