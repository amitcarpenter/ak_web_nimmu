"use client";
import Link from "next/link";
import { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import { EmailIcon } from "@/assets/icons";
import { Logo } from "@/components/logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // TODO: Replace with actual API call
      // Mock API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send reset link. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-2 dark:bg-gray-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center mb-4">
            <Logo />
          </Link>
          <h1 className="text-heading-4 font-bold text-dark dark:text-white">
            Forgot Password?
          </h1>
          <p className="text-body-sm text-dark-4 dark:text-dark-6 mt-2">
            {success 
              ? "Check your email for reset instructions"
              : "Enter your email to reset your password"
            }
          </p>
        </div>

        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card p-8">
          {success ? (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    className="h-8 w-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-body-md text-dark dark:text-white mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-body-sm text-dark-4 dark:text-dark-6 mb-6">
                Please check your email and click on the link to reset your password.
              </p>
              <Link
                href="/auth/admin/login"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-opacity-90"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}

              <InputGroup
                type="email"
                label="Email Address"
                className="mb-6 [&_input]:py-[15px]"
                placeholder="Enter your email"
                name="email"
                handleChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                value={email}
                icon={<EmailIcon />}
                required
              />

              <div className="mb-4">
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                  {loading && (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/auth/admin/login"
                  className="text-body-sm text-dark-4 dark:text-dark-6 hover:text-primary dark:hover:text-primary"
                >
                  ← Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

