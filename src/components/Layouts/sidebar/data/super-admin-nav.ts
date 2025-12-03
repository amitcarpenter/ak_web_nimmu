import * as Icons from "../icons";

export const SUPER_ADMIN_NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/super-admin/dashboard",
        items: [],
      },
      {
        title: "Admin Management",
        icon: Icons.User,
        items: [
          {
            title: "All Admins",
            url: "/super-admin/admins",
          },
          {
            title: "Create Admin",
            url: "/super-admin/admins/create",
          },
        ],
      },
      {
        title: "Role Management",
        icon: Icons.Table,
        items: [
          {
            title: "All Roles",
            url: "/super-admin/roles",
          },
          {
            title: "Create Role",
            url: "/super-admin/roles/create",
          },
        ],
      },
      {
        title: "Activity Logs",
        icon: Icons.Calendar,
        url: "/super-admin/activity-logs",
        items: [],
      },
      {
        title: "System",
        icon: Icons.Alphabet,
        items: [
          {
            title: "System Settings",
            url: "/super-admin/system/settings",
          },
          {
            title: "System Health",
            url: "/super-admin/system/health",
          },
        ],
      },
    ],
  },
];

