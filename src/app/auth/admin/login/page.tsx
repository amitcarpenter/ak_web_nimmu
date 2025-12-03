'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SigninWithPassword from "@/components/Auth/SigninWithPassword";
import { Logo } from "@/components/logo";
import { adminAuthService } from "@/services/api/admin.service";

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is already logged in
    // Check both admin_token (from adminAuthService) and token (from generic auth)
    const adminToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isAuthenticated = adminAuthService.isAuthenticated() || !!token || !!adminToken;
    
    if (isAuthenticated) {
      // If already logged in, redirect to dashboard
      router.replace('/admin/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-2 dark:bg-gray-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center mb-4">
            <Logo />
          </Link>
          <h1 className="text-heading-4 font-bold text-dark dark:text-white">
            Admin Login
          </h1>
          <p className="text-body-sm text-dark-4 dark:text-dark-6 mt-2">
            Sign in to access the admin panel
          </p>
        </div>

        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-8">
          <SigninWithPassword />
        </div>
      </div>
    </div>
  );
}

