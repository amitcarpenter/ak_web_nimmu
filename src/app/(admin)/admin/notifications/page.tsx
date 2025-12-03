import { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Notifications | Dhol Matrimony Admin",
  description: "View all notifications",
};

const notifications = [
  {
    id: 1,
    image: "/images/user/user-15.png",
    title: "Piter Joined the Team!",
    subTitle: "Congratulate him",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    image: "/images/user/user-03.png",
    title: "New message",
    subTitle: "Devid sent a new message",
    time: "5 hours ago",
    isRead: false,
  },
  {
    id: 3,
    image: "/images/user/user-26.png",
    title: "New Payment received",
    subTitle: "Check your earnings",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 4,
    image: "/images/user/user-28.png",
    title: "Jolly completed tasks",
    subTitle: "Assign new task",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: 5,
    image: "/images/user/user-27.png",
    title: "Profile Updated",
    subTitle: "Your profile has been updated successfully",
    time: "3 days ago",
    isRead: true,
  },
  {
    id: 6,
    image: "/images/user/user-15.png",
    title: "New Subscription",
    subTitle: "You have a new subscriber",
    time: "4 days ago",
    isRead: true,
  },
  {
    id: 7,
    image: "/images/user/user-03.png",
    title: "Password Changed",
    subTitle: "Your password was changed successfully",
    time: "5 days ago",
    isRead: true,
  },
  {
    id: 8,
    image: "/images/user/user-26.png",
    title: "New Comment",
    subTitle: "Someone commented on your post",
    time: "1 week ago",
    isRead: true,
  },
];

export default function NotificationsPage() {
  return (
    <>
      <Breadcrumb pageName="🔔 Notifications" />

      <div className="mb-6 flex items-center justify-end">
        <div className="flex gap-2">
          <button className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-body-sm font-medium hover:bg-gray-2 dark:border-strokedark dark:bg-gray-dark">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        {/* Filter buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-opacity-90">
            All
          </button>
          <button className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark transition hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3">
            Unread
          </button>
          <button className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark transition hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3">
            Read
          </button>
        </div>

        {/* Notifications list */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 rounded-lg border p-4 transition hover:shadow-md ${
                notification.isRead
                  ? "border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark"
                  : "border-primary/20 bg-blue-light-6 dark:border-primary/20 dark:bg-primary/10"
              }`}
            >
              <div className="relative flex-shrink-0">
                <Image
                  src={notification.image}
                  width={48}
                  height={48}
                  alt="User"
                  className="rounded-full"
                />
                {!notification.isRead && (
                  <span className="absolute right-0 top-0 block h-3 w-3 rounded-full border-2 border-white bg-primary dark:border-gray-dark"></span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="mb-1 font-medium text-dark dark:text-white">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-5 dark:text-gray-4">
                      {notification.subTitle}
                    </p>
                  </div>
                  <button
                    className="text-gray-4 hover:text-primary dark:text-gray-5 dark:hover:text-primary"
                    aria-label="Delete notification"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-4 dark:text-gray-5">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state (optional - can show when no notifications) */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="mb-4 h-16 w-16 text-gray-4 dark:text-gray-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">
              No notifications
            </h3>
            <p className="text-sm text-gray-5 dark:text-gray-4">
              You're all caught up! Check back later for new notifications.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

