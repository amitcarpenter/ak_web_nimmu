"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertCircle, FiHome, FiRefreshCw } from "react-icons/fi";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020D1A] px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                <FiAlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">
                Something went wrong!
          </h1>
              <p className="text-dark-5 dark:text-dark-6 mb-4">
                {error.message || "An unexpected error occurred"}
              </p>
              {error.digest && (
                <p className="text-sm text-dark-5 dark:text-dark-6 mb-4">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <FiRefreshCw />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                <FiHome />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

