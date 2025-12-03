"use client";

import { FiCopy, FiCheckCircle, FiGift, FiUsers } from "react-icons/fi";
import { useState } from "react";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "FRIEND50";
  const referralLink = `https://foodhub.com/ref/${referralCode}`;

  const stats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarnings: 400,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Refer & Earn</h1>

      {/* Referral Code Card */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white mb-8">
        <div className="text-center mb-6">
          <FiGift className="mx-auto h-16 w-16 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Invite Friends & Earn Rewards</h2>
          <p className="text-white/90">
            Share your referral code and earn ₹50 for each successful referral
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="text-sm text-white/80 mb-2">Your Referral Code</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono font-bold">{referralCode}</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
            >
              {copied ? (
                <>
                  <FiCheckCircle />
                  Copied!
                </>
              ) : (
                <>
                  <FiCopy />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-white/80 mb-2">Referral Link</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/50"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
            >
              <FiCopy />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 text-center">
          <FiUsers className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-dark dark:text-white">{stats.totalReferrals}</p>
          <p className="text-sm text-dark-5 dark:text-dark-6">Total Referrals</p>
        </div>
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 text-center">
          <FiCheckCircle className="mx-auto h-8 w-8 text-green mb-2" />
          <p className="text-2xl font-bold text-dark dark:text-white">{stats.successfulReferrals}</p>
          <p className="text-sm text-dark-5 dark:text-dark-6">Successful</p>
        </div>
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 text-center">
          <FiGift className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-dark dark:text-white">₹{stats.totalEarnings}</p>
          <p className="text-sm text-dark-5 dark:text-dark-6">Total Earnings</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
        <h2 className="text-xl font-bold text-dark dark:text-white mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: 1, title: "Share Your Code", desc: "Share your referral code with friends" },
            { step: 2, title: "They Sign Up", desc: "Your friends sign up using your code" },
            { step: 3, title: "You Both Earn", desc: "You get ₹50, they get ₹50 off on first order" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">{item.step}</span>
              </div>
              <h3 className="font-semibold text-dark dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-dark-5 dark:text-dark-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

