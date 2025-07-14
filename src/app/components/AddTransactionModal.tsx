"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function AddTransactionModal({ onClose }: Props) {
  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction = {
      type,
      description,
      amount,
      category,
      date,
    };

    console.log("Transaction submitted:", newTransaction);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-slate-800 w-full max-w-md rounded-xl shadow-lg relative p-6 text-white">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-red-400"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === "income"}
                onChange={() => setType("income")}
                className="accent-blue-500"
              />
              Income
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={() => setType("expense")}
                className="accent-blue-500"
              />
              Expense
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Grocery shopping"
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="e.g., 100.00"
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
            >
              <option value="Other">Other</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Salary">Salary</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
