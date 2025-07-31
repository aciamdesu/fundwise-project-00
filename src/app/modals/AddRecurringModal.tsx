"use client";

import { useDebugValue, useState } from "react";
import { X } from "lucide-react";
import { useUserSettings } from "../components/UserSettingsContext";

export default function AddRecurringModal() {
  const { setShowAddRecurringModal, recurringItems, setRecurringItems } =
    useUserSettings();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");
  const [active, setActive] = useState(true);

  const handleClose = () => {
    setShowAddRecurringModal(false);
    setName("");
    setAmount("");
    setFrequency("monthly");
    setActive(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || amount === "") return;

    const newItem = {
      name,
      amount: Number(amount),
      frequency,
      active,
    };

    setRecurringItems([...recurringItems, newItem]);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Recurring Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as "monthly" | "yearly")
              }
              className="w-full px-3 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <label className="text-sm">Active</label>
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-md hover:opacity-90"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
