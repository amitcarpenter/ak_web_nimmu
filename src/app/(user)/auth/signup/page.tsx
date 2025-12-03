"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiPhone, FiLock, FiArrowRight, FiUser } from "react-icons/fi";

export default function SignupPage() {
  const [signupMethod, setSignupMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleSendOtp = () => {
    setShowOtp(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-2 dark:bg-[#020D1A] py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Image
              src="/images/logo/food_hub_logo.png"
              alt="FoodHub"
              width={200}
              height={70}
              className="h-16 w-auto"
              priority
            />
          </Link>
          <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">Create Account</h1>
          <p className="text-dark-5 dark:text-dark-6">Sign up to get started</p>
        </div>

        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
          {/* Signup Method Toggle */}
          <div className="flex gap-2 mb-6 bg-gray-2 dark:bg-[#020D1A] p-1 rounded-lg">
            <button
              onClick={() => setSignupMethod("phone")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                signupMethod === "phone"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6"
              }`}
            >
              Phone
            </button>
            <button
              onClick={() => setSignupMethod("email")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                signupMethod === "email"
                  ? "bg-primary text-white"
                  : "text-dark-5 dark:text-dark-6"
              }`}
            >
              Email
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            {signupMethod === "phone" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
                {showOtp ? (
                  <div>
                    <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="mt-2 text-sm text-primary hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Send OTP
                  </button>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center">
              <input type="checkbox" className="rounded border-stroke text-primary focus:ring-primary" />
              <span className="ml-2 text-sm text-dark-5 dark:text-dark-6">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Sign Up
              <FiArrowRight />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stroke dark:border-stroke-dark"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-dark text-dark-5 dark:text-dark-6">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-dark-5 dark:text-dark-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

