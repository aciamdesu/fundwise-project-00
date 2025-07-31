"use client";

import { useTransactions } from "../components/TransactionContext";

export default function TransactionList() {
  const { transactions } = useTransactions();

  if (transactions.length === 0) {
    return <p className="text-gray-400 text-sm mt-4">No transactions yet.</p>;
  }

  return (
    <div className="mt-6 space-y-3">
      {transactions.map((tx, index) => (
        <div
          key={index}
          className="bg-slate-700 rounded-lg p-4 flex justify-between items-center text-white"
        >
          <div>
            <p className="font-semibold">{tx.description}</p>
            <p className="text-sm text-gray-300">
              {tx.category} • {tx.date}
            </p>
          </div>
          <p
            className={`text-lg font-bold ${
              tx.type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {tx.type === "income" ? "+" : "-"}₱{tx.amount.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
