"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { GlobalSearch } from "./global-search";

export function Header() {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebarContext();

  const getPageTitle = () => {
    if (pathname.startsWith('/super-admin')) {
      if (pathname === '/super-admin/dashboard') return 'Super Admin Dashboard';
      if (pathname.includes('/admins')) return 'Admin Management';
      if (pathname.includes('/roles')) return 'Role Management';
      if (pathname.includes('/activity-logs')) return 'Activity Logs';
      if (pathname.includes('/system')) return 'System Settings';
      return 'Super Admin';
    } else if (pathname.startsWith('/admin')) {
      if (pathname === '/admin/dashboard') return 'Admin Dashboard';
      if (pathname.includes('/orders')) return 'Orders Management';
      if (pathname.includes('/products')) return 'Products Management';
      if (pathname.includes('/categories')) return 'Categories';
      if (pathname.includes('/inventory')) return 'Inventory Management';
      if (pathname.includes('/customers')) return 'Customers';
      if (pathname.includes('/vendors')) return 'Vendors';
      if (pathname.includes('/delivery')) return 'Delivery & Fleet';
      if (pathname.includes('/promotions')) return 'Promotions';
      if (pathname.includes('/coupons')) return 'Coupons';
      if (pathname.includes('/payments')) return 'Payments';
      if (pathname.includes('/settlements')) return 'Settlements';
      if (pathname.includes('/analytics')) return 'Analytics';
      if (pathname.includes('/reports')) return 'Reports';
      if (pathname.includes('/notifications')) return 'Notifications';
      if (pathname.includes('/settings')) return 'Settings';
      if (pathname.includes('/profile')) return 'Admin Profile';
      return 'ATLA KNOTS Admin';
    }
    return 'ATLA KNOTS EVENTIVE';
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/new_ak_logo.png"}
            width={48}
            height={48}
            alt="ATLA KNOTS EVENTIVE"
            role="presentation"
            className="h-12 w-auto"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          {getPageTitle()}
        </h1>
        <p className="font-medium text-primary">ATLA KNOTS EVENTIVE Admin</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <GlobalSearch />

        <ThemeToggleSwitch />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
