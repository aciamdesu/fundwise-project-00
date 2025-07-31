"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Transaction = {
  id: number;
  name: string;
  amount: number;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  fetchTransactions: () => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
}

type Props = {
  children: ReactNode;
};

export function TransactionProvider({ children }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");

      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
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
