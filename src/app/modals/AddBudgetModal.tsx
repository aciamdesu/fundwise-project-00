"use client";

import { useUserSettings } from "../components/UserSettingsContext";

type BudgetItem = {
  name: string;
  used: number;
  limit: number;
};

export default function AddBudgetModal() {
  const {
    showAddBudgetModal,
    setShowAddBudgetModal,
    budgetLimits,
    setBudgetLimits,
    showEditBudgetModal,
    setShowEditBudgetModal,
    category,
    setCategory,
    limit,
    setLimit,
    period,
    setPeriod,
  } = useUserSettings();

  const handleEdit = (item: BudgetItem) => {
    setCategory(item.name);
    setLimit(item.limit);
    setPeriod("monthly");
    setShowEditBudgetModal(true);
  };

  const handleDelete = (name: string) => {
    setBudgetLimits((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Budget Limits</h3>
        <button
          onClick={() => setShowAddBudgetModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm text-white"
        >
          + Add Limit
        </button>
      </div>

      {/* Budget List */}
      <div className="space-y-4">
        {budgetLimits.map((item) => {
          const percent = Math.round((item.used / item.limit) * 100);
          return (
            <div
              key={item.name}
              className="bg-slate-700 p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{item.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>
                    ${item.used.toFixed(2)} of ${item.limit.toFixed(2)}
                  </span>
                  <span>{percent}%</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)}>
                      <Pencil
                        size={16}
                        className="text-blue-400 hover:text-blue-500"
                      />
                    </button>
                    <button onClick={() => handleDelete(item.name)}>
                      <Trash2
                        size={16}
                        className="text-red-400 hover:text-red-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-600 rounded">
                <div
                  className="h-2 bg-green-500 rounded"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Add Budget Limit</h3>

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
            />

            <input
              type="number"
              placeholder="Limit Amount"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddBudgetModal(false);
                  setCategory("");
                  setLimit(0);
                  setPeriod("monthly");
                }}
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!category || isNaN(limit) || limit <= 0) return;
                  const newLimit: BudgetItem = {
                    name: category,
                    used: 0,
                    limit: Number(limit),
                  };
                  setBudgetLimits((prev) => [...prev, newLimit]);
                  setShowAddBudgetModal(false);
                  setCategory("");
                  setLimit(0);
                  setPeriod("monthly");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Add Limit
              </button>
            </div>

            <button
              onClick={() => setShowAddBudgetModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Edit Budget Limit</h3>

            <input
              type="text"
              placeholder="Budget name"
              className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="number"
              placeholder="Limit"
              className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditBudgetModal(false)}
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setBudgetLimits((prev) =>
                    prev.map((item) =>
                      item.name === category
                        ? { ...item, limit: Number(limit) }
                        : item
                    )
                  );
                  setShowEditBudgetModal(false);
                  setCategory("");
                  setLimit(0);
                  setPeriod("monthly");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>

            <button
              onClick={() => setShowEditBudgetModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
