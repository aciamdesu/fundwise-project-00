"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Switch } from "@headlessui/react";

type RecurringItem = {
  id: number;
  name: string;
  amount: number;
  enabled: boolean;
};

const mockRecurringItems: RecurringItem[] = [
  { id: 1, name: "Netflix", amount: 549, enabled: true },
  { id: 2, name: "Spotify", amount: 129, enabled: false },
];

export default function RecurringTab() {
  const [items, setItems] = useState(mockRecurringItems);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recurring Payments</h2>
        <button
          className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md text-sm"
          // TODO: Add modal opening logic later
          onClick={() => alert("Add Recurring Modal Coming Soon")}
        >
          <Plus className="w-4 h-4" />
          Add Recurring
        </button>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-muted p-3 rounded-md"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">₱{item.amount}</p>
          </div>
          <Switch
            checked={item.enabled}
            onChange={() => toggleItem(item.id)}
            className={`${
              item.enabled ? "bg-green-500" : "bg-gray-300"
            } relative inline-flex h-[22px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${
                item.enabled ? "translate-x-5" : "translate-x-0"
              } pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      ))}
    </div>
  );
}
