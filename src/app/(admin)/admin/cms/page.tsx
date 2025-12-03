"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FiPlus, FiEdit, FiTrash2, FiImage, FiFileText } from "react-icons/fi";
import Image from "next/image";

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<"banners" | "pages">("banners");

  const banners = [
    {
      id: 1,
      title: "50% OFF First Order",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
      status: "Active",
      position: "Home Hero",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: 2,
      title: "Free Delivery Offer",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
      status: "Inactive",
      position: "Home Banner",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
    },
  ];

  const pages = [
    { id: 1, title: "About Us", slug: "about", status: "Published", lastUpdated: "2024-01-10" },
    { id: 2, title: "Contact", slug: "contact", status: "Draft", lastUpdated: "2024-01-12" },
    { id: 3, title: "Careers", slug: "careers", status: "Published", lastUpdated: "2024-01-08" },
  ];

  return (
    <>
      <Breadcrumb pageName="Content Management" />
      <div className="rounded-sm border border-stroke bg-white shadow-1 dark:border-stroke-dark dark:bg-gray-dark p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark dark:text-white">CMS</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <FiPlus />
            Add New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-stroke dark:border-stroke-dark">
          <button
            onClick={() => setActiveTab("banners")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "banners"
                ? "text-primary border-b-2 border-primary"
                : "text-dark-5 dark:text-dark-6 hover:text-primary"
            }`}
          >
            <FiImage className="inline mr-2" />
            Banners
          </button>
          <button
            onClick={() => setActiveTab("pages")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "pages"
                ? "text-primary border-b-2 border-primary"
                : "text-dark-5 dark:text-dark-6 hover:text-primary"
            }`}
          >
            <FiFileText className="inline mr-2" />
            Pages
          </button>
        </div>

        {/* Banners Tab */}
        {activeTab === "banners" && (
          <div className="space-y-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex gap-4">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark dark:text-white mb-1">{banner.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-dark-5 dark:text-dark-6 mb-2">
                      <span>Position: {banner.position}</span>
                      <span>Start: {banner.startDate}</span>
                      <span>End: {banner.endDate}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        banner.status === "Active"
                          ? "bg-green-light-7 text-green"
                          : "bg-gray-2 dark:bg-[#020D1A] text-dark-5 dark:text-dark-6"
                      }`}
                    >
                      {banner.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                      <FiEdit className="h-4 w-4 text-primary" />
                    </button>
                    <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                      <FiTrash2 className="h-4 w-4 text-red" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === "pages" && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-stroke-dark">
                  <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Title</th>
                  <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Slug</th>
                  <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Last Updated</th>
                  <th className="text-left p-4 text-sm font-semibold text-dark dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                  >
                    <td className="p-4 text-sm text-dark dark:text-white">{page.title}</td>
                    <td className="p-4 text-sm text-dark-5 dark:text-dark-6">/{page.slug}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          page.status === "Published"
                            ? "bg-green-light-7 text-green"
                            : "bg-yellow-light-7 text-yellow-dark"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-dark-5 dark:text-dark-6">{page.lastUpdated}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                          <FiEdit className="h-4 w-4 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                          <FiTrash2 className="h-4 w-4 text-red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

