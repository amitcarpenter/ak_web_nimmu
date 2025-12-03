"use client";

import { FiWallet, FiArrowUp, FiArrowDown, FiPlus } from "react-icons/fi";

export default function WalletPage() {
  const balance = 1250;
  const transactions = [
    { id: 1, type: "credit", amount: 500, description: "Top-up via UPI", date: "2024-01-15", status: "Success" },
    { id: 2, type: "debit", amount: 299, description: "Order ORD-12345", date: "2024-01-14", status: "Success" },
    { id: 3, type: "credit", amount: 50, description: "Cashback", date: "2024-01-13", status: "Success" },
    { id: 4, type: "credit", amount: 200, description: "Refund for ORD-12340", date: "2024-01-12", status: "Pending" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">My Wallet</h1>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 mb-2">Available Balance</p>
            <h2 className="text-4xl font-bold">₹{balance.toLocaleString()}</h2>
          </div>
          <FiWallet className="h-12 w-12 text-white/80" />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors">
          <FiPlus />
          Add Money
        </button>
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6">
        <h2 className="text-xl font-bold text-dark dark:text-white mb-6">Transaction History</h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-stroke dark:border-stroke-dark rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    transaction.type === "credit"
                      ? "bg-green-light-7 text-green"
                      : "bg-red-light-5 text-red"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <FiArrowDown className="h-5 w-5" />
                  ) : (
                    <FiArrowUp className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-dark dark:text-white">{transaction.description}</p>
                  <p className="text-sm text-dark-5 dark:text-dark-6">
                    {new Date(transaction.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    transaction.type === "credit" ? "text-green" : "text-red"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                </p>
                <span
                  className={`text-xs ${
                    transaction.status === "Success"
                      ? "text-green"
                      : transaction.status === "Pending"
                      ? "text-yellow-dark"
                      : "text-red"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

