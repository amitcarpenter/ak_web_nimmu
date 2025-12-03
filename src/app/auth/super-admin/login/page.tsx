import { Metadata } from "next";
import Link from "next/link";
import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Super Admin Login",
  description: "Login to super admin panel",
};

export default function SuperAdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-2 dark:bg-gray-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-heading-5 font-bold text-primary mb-2">
            QRIO
          </Link>
          <h1 className="text-heading-4 font-bold text-dark dark:text-white">
            Super Admin Login
          </h1>
          <p className="text-body-sm text-dark-4 dark:text-dark-6 mt-2">
            Sign in to access the super admin panel
          </p>
        </div>

        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-8">
          <Signin />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/auth/admin/login"
            className="text-body-sm text-primary hover:underline"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

