"use client";

import { useUserSettings } from "../components/UserSettingsContext";
import { Switch } from "@headlessui/react";
import { Plus } from "lucide-react";

export default function RecurringTab() {
  const { showAddRecurringModal, setShowAddRecurringModal } = useUserSettings();
  const recurringItems = [
    {
      id: 1,
      description: "Spotify",
      amount: 149,
      category: "Entertainment",
      type: "expense",
      frequency: "monthly",
      startDate: "2025-07-01",
      active: true,
    },
    {
      id: 2,
      description: "Salary",
      amount: 50000,
      category: "Income",
      type: "income",
      frequency: "monthly",
      startDate: "2025-07-01",
      active: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recurring Items</h2>
        <button
          onClick={() => setShowAddRecurringModal(true)}
          className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Recurring
        </button>
      </div>

      {recurringItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
        >
          <div>
            <p className="font-medium">{item.description}</p>
            <p className="text-sm text-muted-foreground">
              {item.category} • {item.type} • ₱{item.amount.toLocaleString()} •{" "}
              {item.frequency}
            </p>
          </div>
          <Switch
            checked={item.active}
            onChange={() => {}}
            className={`${
              item.active ? "bg-green-500" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span
              className={`${
                item.active ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      ))}
    </div>
  );
}
