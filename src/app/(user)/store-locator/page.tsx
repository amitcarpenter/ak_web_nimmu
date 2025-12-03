"use client";

import { FiMapPin, FiClock, FiPhone, FiSearch } from "react-icons/fi";

export default function StoreLocatorPage() {
  const stores = [
    {
      id: 1,
      name: "Spice Kitchen - Main Branch",
      address: "123, Main Street, Mumbai - 400001",
      phone: "+91 98765 43210",
      hours: "9:00 AM - 11:00 PM",
      distance: "2.5 km",
      rating: 4.6,
    },
    {
      id: 2,
      name: "Fresh Foods - Downtown",
      address: "456, Downtown Plaza, Mumbai - 400002",
      phone: "+91 98765 43211",
      hours: "8:00 AM - 10:00 PM",
      distance: "5.1 km",
      rating: 4.8,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Store Locator</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Search & Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 sticky top-24">
            <div className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
                <input
                  type="text"
                  placeholder="Search location..."
                  className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-6">
              Use My Location
            </button>

            <div>
              <h3 className="font-semibold text-dark dark:text-white mb-4">Nearby Stores</h3>
              <div className="space-y-4">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    className="border border-stroke dark:border-stroke-dark rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <h4 className="font-semibold text-dark dark:text-white mb-2">{store.name}</h4>
                    <div className="space-y-1 text-sm text-dark-5 dark:text-dark-6">
                      <div className="flex items-start gap-2">
                        <FiMapPin className="mt-0.5 flex-shrink-0" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiPhone />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock />
                        <span>{store.hours}</span>
                      </div>
                      <p className="text-primary font-medium">Distance: {store.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Map View</h2>
            <div className="aspect-video bg-gray-2 dark:bg-[#020D1A] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="mx-auto h-16 w-16 text-dark-5 dark:text-dark-6 mb-4" />
                <p className="text-dark-5 dark:text-dark-6">Map integration coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

