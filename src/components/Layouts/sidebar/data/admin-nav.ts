import * as Icons from "../icons";

export const ADMIN_NAV_DATA = [
  {
    label: "DASHBOARD",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/admin/dashboard",
        items: [],
      },
    ],
  },
  {
    label: "ORDERS",
    items: [
      {
        title: "Orders Management",
        icon: Icons.User,
        url: "/admin/orders",
        items: [],
      },
      {
        title: "Order Fulfillment",
        icon: Icons.PieChart,
        url: "/admin/orders/fulfillment",
        items: [],
      },
    ],
  },
  {
    label: "PRODUCTS",
    items: [
      {
        title: "Products",
        icon: Icons.PieChart,
        url: "/admin/products",
        items: [],
      },
      {
        title: "Categories",
        icon: Icons.Alphabet,
        url: "/admin/categories",
        items: [],
      },
      {
        title: "Inventory",
        icon: Icons.User,
        url: "/admin/inventory",
        items: [],
      },
    ],
  },
  {
    label: "CUSTOMERS",
    items: [
      {
        title: "Customers",
        icon: Icons.User,
        url: "/admin/customers",
        items: [],
      },
      {
        title: "Subscriptions",
        icon: Icons.PieChart,
        url: "/admin/subscriptions",
        items: [],
      },
    ],
  },
  {
    label: "VENDORS",
    items: [
      {
        title: "Vendors",
        icon: Icons.User,
        url: "/admin/vendors",
        items: [],
      },
    ],
  },
  {
    label: "DELIVERY",
    items: [
      {
        title: "Fleet Management",
        icon: Icons.PieChart,
        url: "/admin/delivery",
        items: [],
      },
    ],
  },
  {
    label: "MARKETING",
    items: [
      {
        title: "Promotions",
        icon: Icons.PieChart,
        url: "/admin/promotions",
        items: [],
      },
      {
        title: "Coupons",
        icon: Icons.Alphabet,
        url: "/admin/coupons",
        items: [],
      },
    ],
  },
  {
    label: "FINANCE",
    items: [
      {
        title: "Payments",
        icon: Icons.PieChart,
        url: "/admin/payments",
        items: [],
      },
      {
        title: "Settlements",
        icon: Icons.User,
        url: "/admin/settlements",
        items: [],
      },
    ],
  },
  {
    label: "REPORTS",
    items: [
      {
        title: "Analytics",
        icon: Icons.PieChart,
        url: "/admin/analytics",
        items: [],
      },
      {
        title: "Reports",
        icon: Icons.Alphabet,
        url: "/admin/reports",
        items: [],
      },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      {
        title: "Settings",
        icon: Icons.User,
        url: "/admin/settings",
        items: [],
      },
      {
        title: "Admin Profile",
        icon: Icons.User,
        url: "/admin/profile",
        items: [],
      },
    ],
  },
];

