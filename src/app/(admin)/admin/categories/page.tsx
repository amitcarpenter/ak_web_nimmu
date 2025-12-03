"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { FiSearch, FiEdit, FiTrash2, FiPlus, FiChevronRight, FiChevronDown, FiImage, FiMoreVertical } from "react-icons/fi";
import Image from "next/image";

export default function CategoriesPage() {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: 1,
      name: "Prepared Meals",
      slug: "prepared-meals",
      parentId: null,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop&q=90",
      description: "Ready-to-eat meals and combos",
      productCount: 45,
      status: "active",
      order: 1,
      children: [
        {
          id: 11,
          name: "Biryani",
          slug: "biryani",
          parentId: 1,
          image: null,
          description: "Various biryani options",
          productCount: 12,
          status: "active",
          order: 1,
        },
        {
          id: 12,
          name: "Curries",
          slug: "curries",
          parentId: 1,
          image: null,
          description: "Indian curries",
          productCount: 18,
          status: "active",
          order: 2,
        },
      ],
    },
    {
      id: 2,
      name: "Groceries",
      slug: "groceries",
      parentId: null,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop&q=90",
      description: "Fresh groceries and daily essentials",
      productCount: 120,
      status: "active",
      order: 2,
      children: [
        {
          id: 21,
          name: "Fruits & Vegetables",
          slug: "fruits-vegetables",
          parentId: 2,
          image: null,
          description: "Fresh produce",
          productCount: 45,
          status: "active",
          order: 1,
        },
        {
          id: 22,
          name: "Dairy & Eggs",
          slug: "dairy-eggs",
          parentId: 2,
          image: null,
          description: "Dairy products",
          productCount: 30,
          status: "active",
          order: 2,
        },
      ],
    },
    {
      id: 3,
      name: "Snacks",
      slug: "snacks",
      parentId: null,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop&q=90",
      description: "Snacks and munchies",
      productCount: 89,
      status: "active",
      order: 3,
      children: [],
    },
    {
      id: 4,
      name: "Beverages",
      slug: "beverages",
      parentId: null,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop&q=90",
      description: "Drinks and beverages",
      productCount: 67,
      status: "active",
      order: 4,
      children: [],
    },
  ];

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategory = (category: any, level: number = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category.id} className="border-b border-stroke dark:border-stroke-dark">
        <div
          className={`flex items-center gap-4 p-4 hover:bg-gray-2 dark:hover:bg-[#020D1A] ${
            level > 0 ? "bg-gray-1 dark:bg-gray-800" : ""
          }`}
        >
          <div className="flex items-center gap-2 flex-1" style={{ paddingLeft: `${level * 24}px` }}>
            {hasChildren && (
              <button
                onClick={() => toggleCategory(category.id)}
                className="p-1 hover:bg-gray-3 dark:hover:bg-gray-700 rounded"
              >
                {isExpanded ? (
                  <FiChevronDown className="h-4 w-4 text-dark-5 dark:text-dark-6" />
                ) : (
                  <FiChevronRight className="h-4 w-4 text-dark-5 dark:text-dark-6" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-6" />}
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-2 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <FiImage className="h-6 w-6 text-dark-5 dark:text-dark-6" />
              </div>
            )}
            <div className="flex-1">
              <div className="font-semibold text-dark dark:text-white">{category.name}</div>
              <div className="text-sm text-dark-5 dark:text-dark-6">{category.description}</div>
              <div className="text-xs text-dark-5 dark:text-dark-6 mt-1">
                {category.productCount} products • Slug: {category.slug}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  category.status === "active"
                    ? "bg-green-light-7 text-green"
                    : "bg-gray-3 text-dark-5"
                }`}
              >
                {category.status}
              </span>
              <Link
                href={`/admin/categories/${category.id}/edit`}
                className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                title="Edit"
              >
                <FiEdit className="h-4 w-4 text-blue" />
              </Link>
              <button
                className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded"
                title="Delete"
              >
                <FiTrash2 className="h-4 w-4 text-red" />
              </button>
            </div>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {category.children.map((child: any) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="Categories Management" />
        <Link
          href="/admin/categories/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <FiPlus className="h-4 w-4" />
          Create Category
        </Link>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-5 dark:text-dark-6" />
            <input
              type="search"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-stroke dark:border-stroke-dark font-semibold text-sm text-dark dark:text-white">
              <div className="col-span-3">Category</div>
              <div>Products</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {filteredCategories.length === 0 ? (
              <div className="p-8 text-center text-dark-5 dark:text-dark-6">
                No categories found. Create your first category to get started.
              </div>
            ) : (
              filteredCategories.map((category) => renderCategory(category))
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-1 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Categories</div>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">
              {categories.length}
            </div>
          </div>
          <div className="p-4 bg-gray-1 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Total Products</div>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">
              {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
            </div>
          </div>
          <div className="p-4 bg-gray-1 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Active Categories</div>
            <div className="text-2xl font-bold text-green mt-1">
              {categories.filter((cat) => cat.status === "active").length}
            </div>
          </div>
          <div className="p-4 bg-gray-1 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-dark-5 dark:text-dark-6">Subcategories</div>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">
              {categories.reduce((sum, cat) => sum + (cat.children?.length || 0), 0)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
