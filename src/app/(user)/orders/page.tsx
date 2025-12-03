"use client";

import Link from "next/link";
import Image from "next/image";
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiEye } from "react-icons/fi";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-12345",
      date: "2024-01-15",
      status: "delivered",
      items: 3,
      total: 753,
      deliveryDate: "2024-01-15",
      productImages: [
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop",
      ],
    },
    {
      id: "ORD-12344",
      date: "2024-01-14",
      status: "out-for-delivery",
      items: 2,
      total: 449,
      deliveryDate: "2024-01-14",
      productImages: [
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop",
      ],
    },
    {
      id: "ORD-12343",
      date: "2024-01-13",
      status: "preparing",
      items: 1,
      total: 299,
      deliveryDate: "2024-01-13",
      productImages: [
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop",
      ],
    },
    {
      id: "ORD-12342",
      date: "2024-01-12",
      status: "delivered",
      items: 4,
      total: 1099,
      deliveryDate: "2024-01-12",
      productImages: [
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100&h=100&fit=crop",
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 text-white";
      case "out-for-delivery":
        return "bg-blue-500 text-white";
      case "preparing":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <FiCheckCircle />;
      case "out-for-delivery":
        return <FiTruck />;
      case "preparing":
        return <FiClock />;
      default:
        return <FiPackage />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <FiPackage className="mx-auto h-24 w-24 text-dark-5 dark:text-dark-6 mb-6" />
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">No orders yet</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-8">
            Start shopping to see your orders here
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-dark dark:text-white">
                      Order #{order.id}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-dark-5 dark:text-dark-6">
                    Placed on {new Date(order.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {order.status === "delivered" && (
                    <p className="text-sm text-dark-5 dark:text-dark-6">
                      Delivered on {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">₹{order.total}</p>
                  <p className="text-sm text-dark-5 dark:text-dark-6 mb-2">{order.items} items</p>
                  <div className="flex items-center justify-end gap-1">
                    {order.productImages.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-dark">
                        <Image
                          src={img}
                          alt={`Product ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                    ))}
                    {order.items > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-2 dark:bg-[#020D1A] border-2 border-white dark:border-gray-dark flex items-center justify-center text-xs font-semibold text-dark dark:text-white">
                        +{order.items - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-stroke dark:border-stroke-dark">
                <Link
                  href={`/orders/${order.id}`}
                  className="flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <FiEye />
                  View Details
                </Link>
                {order.status === "delivered" && (
                  <button className="text-primary hover:underline font-medium">
                    Reorder
                  </button>
                )}
                {order.status === "delivered" && (
                  <button className="text-primary hover:underline font-medium">
                    Download Invoice
                  </button>
                )}
                {order.status === "out-for-delivery" && (
                  <Link
                    href={`/orders/${order.id}/track`}
                    className="text-primary hover:underline font-medium"
                  >
                    Track Order
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

