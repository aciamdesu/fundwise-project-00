"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Transaction = {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  date: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  fetchTransactions: () => Promise<void>;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  return context;
};

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  // Add transaction
  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      const newTransaction = await res.json();
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (err) {
      console.error("Failed to add transaction", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, fetchTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
