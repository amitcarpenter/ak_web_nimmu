"use client";

import { FiBell, FiCheck, FiX } from "react-icons/fi";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "Order Delivered",
      message: "Your order ORD-12345 has been delivered successfully.",
      time: "2 hours ago",
      read: false,
      type: "order",
    },
    {
      id: 2,
      title: "New Offer Available",
      message: "Get 50% OFF on your first order. Use code FIRST50",
      time: "1 day ago",
      read: false,
      type: "promotion",
    },
    {
      id: 3,
      title: "Order Confirmed",
      message: "Your order ORD-12344 has been confirmed and is being prepared.",
      time: "2 days ago",
      read: true,
      type: "order",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-dark dark:text-white">Notifications</h1>
        <button className="text-primary hover:underline text-sm font-medium">
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <FiBell className="mx-auto h-24 w-24 text-dark-5 dark:text-dark-6 mb-6" />
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">No notifications</h2>
          <p className="text-dark-5 dark:text-dark-6">
            You're all caught up! New notifications will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 ${
                !notification.read ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-dark dark:text-white">{notification.title}</h3>
                    {!notification.read && (
                      <span className="h-2 w-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                  <p className="text-dark-5 dark:text-dark-6 mb-2">{notification.message}</p>
                  <p className="text-sm text-dark-5 dark:text-dark-6">{notification.time}</p>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                      <FiCheck className="h-4 w-4 text-primary" />
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A] rounded">
                    <FiX className="h-4 w-4 text-dark-5 dark:text-dark-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

