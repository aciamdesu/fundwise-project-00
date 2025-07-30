"use client";

import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function UserSettingsModal({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState("profile");
  const [editItem, setEditItem] = useState<BudgetItem | null>(null);

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState<number | "">("");
  const [period, setPeriod] = useState("monthly");

  const [showAddRecurringModal, setShowAddRecurringModal] = useState(false);
  const [showEditRecurringModal, setShowEditRecurringModal] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState("expense");
  const [frequency, setFrequency] = useState("monthly");
  const [active, setActive] = useState(true);
  const [newCategory, setNewCategory] = useState("income");
  const [startDate, setStartDate] = useState("");

  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showEditAccountModal, setShowEditAccountModal] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [accountBalance, setAccountBalance] = useState<number | "">("");

  const [showAddSavingsModal, setShowAddSavingsModal] = useState(false);
  const [showEditSavingsModal, setShowEditSavingsModal] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [currentAmountSaved, setCurrentAmountSaved] = useState<number | "">("");

  const [budgetLimits, setBudgetLimits] = useState([
    { name: "Food", used: 50, limit: 500 },
  ]);
  const handleDelete = (name: string) => {
    setBudgetLimits((prev) => prev.filter((item) => item.name !== name));
  };
  const handleEdit = (item: BudgetItem) => {
    setEditItem(item);
    setShowEditBudgetModal(true);
  };
  const handleUpdate = () => {
    setShowEditBudgetModal(false);
  };
  const handleEditAccount = (account: Account) => {
    setAccountName(account.name);
    setAccountType(account.type);
    setAccountBalance(account.balance);
    setShowEditAccountModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-slate-800 w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden relative max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 z-50"
          aria-label="Close settings"
        >
          <X size={24} />
        </button>

        {/* Sidebar */}
        <aside className="w-full md:w-1/3 w-full bg-slate-700 p-6 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">User Settings</h2>
          <ul className="space-y-2">
            {[
              { label: "Profile", key: "profile" },
              { label: "Budget Limits", key: "budget" },
              { label: "Recurring", key: "recurring" },
              { label: "Accounts", key: "accounts" },
              { label: "Savings Goals", key: "goals" },
              { label: "Export Data", key: "export" },
            ].map((tab) => (
              <li
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`cursor-pointer p-2 rounded ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-4 border-t border-slate-600 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              J
            </div>
            <div>
              <div className="text-white font-medium">John Doe</div>
              <div className="text-sm text-gray-400">john.doe@example.com</div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="md:w-2/3 w-full p-6 text-white space-y-6 overflow-y-auto max-h-[90vh]">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <>
              <h3 className="font-bold text-lg mb-2">
                Personal Information & Preferences
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-md mb-2">
                  Application Preferences
                </h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-blue-500"
                    />
                    <label>Dark Mode</label>
                  </div>
                  <label className="text-sm mb-1 block">
                    Preferred Currency
                  </label>
                  <select className="px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white">
                    <option>USD ($)</option>
                    <option>PHP (₱)</option>
                    <option>EUR (€)</option>
                  </select>
                  <span className="text-xs text-gray-400 mt-1 block">
                    This will be used for all monetary values.
                  </span>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-500" />
                    Show budget alerts when approaching limits
                  </label>
                </div>
              </div>

              <div className="text-right">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-medium">
                  Save Changes
                </button>
              </div>
            </>
          )}

          {/* Budget Limits Tab */}
          {activeTab === "budget" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Budget Limits</h3>
                <button
                  onClick={() => setShowAddBudgetModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm text-white"
                >
                  + Add Limit
                </button>
              </div>

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

              {/* Add Budget Modal */}
              {showAddBudgetModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                    <h3 className="text-lgfont-bold mb-4">Add Budget Limit</h3>

                    {/* Category */}
                    <input
                      type="text"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
                    />

                    {/* Limit */}
                    <input
                      type="number"
                      placeholder="Limit Amount"
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
                    />

                    {/* Period Dropdown */}
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowAddBudgetModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!category || limit === "") return;
                          console.log({
                            name: category,
                            limit: limit,
                            period: period,
                            used: 0,
                          });
                          setShowAddBudgetModal(false);
                          setCategory("");
                          setLimit("");
                          setPeriod("monthly");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Add Limit
                      </button>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => setShowAddBudgetModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Budget Modal */}
              {showEditBudgetModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                    <h3 className="text-lg font-bold mb-4">
                      Edit Budget Limit
                    </h3>

                    {/* Form fields */}
                    <input
                      type="text"
                      placeholder="Budget name"
                      className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
                    />
                    <input
                      type="number"
                      placeholder="Limit"
                      className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700 mb-4"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowEditBudgetModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Save
                      </button>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => setShowEditBudgetModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Recurring Tab */}
          {activeTab === "recurring" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Recurring Transactions</h3>
                <button
                  onClick={() => setShowAddRecurringModal(true)}
                  className="bg--blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm"
                >
                  + Add Recurring
                </button>
              </div>

              <div className="overflow-auto rounded-md border border-slate-700">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-700 text-white">
                    <tr>
                      <th className="text-left p-3">Description</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Category</th>
                      <th className="text-left p-3">Frequency</th>
                      <th className="text-left p-3">Next Date</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="p-3">Monthly Salary</td>
                      <td className="p-3 text-green-400">+ $3,000.00</td>
                      <td className="p-3">Income</td>
                      <td className="p-3">Monthly</td>
                      <td className="p-3">Aug 3, 2025</td>
                      <td className="p-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                          Active
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => setShowEditRecurringModal(true)}
                          className="text-blue-400 hover:underline"
                        >
                          ✏️
                        </button>
                        <button className="text-yellow-400 hover:underline">
                          ❌
                        </button>
                        <button className="text-red-400 hover:underline">
                          🗑
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add Recurring Modal */}
              {showAddRecurringModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-3xl shadow-lg relative">
                    <h3 className="text-lg font-bold mb-6">
                      Add Recurring Transaction
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        />

                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>

                        <select
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>

                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                          />
                          Active
                        </label>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        />

                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        >
                          <option value="income">Income</option>
                          <option value="housing">Housing</option>
                          <option value="food">Food</option>
                          <option value="transportation">Transportation</option>
                          <option value="entertainment">Entertainment</option>
                        </select>

                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => setShowAddRecurringModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!description || amount === "" || !startDate)
                            return;
                          console.log({
                            description,
                            type,
                            frequency,
                            active,
                            amount,
                            newCategory,
                            startDate,
                          });
                          setShowAddRecurringModal(false);
                          setDescription("");
                          setType("expense");
                          setFrequency("monthly");
                          setActive(true);
                          setAmount("");
                          setNewCategory("income");
                          setStartDate("");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Add Recurring
                      </button>
                    </div>

                    <button
                      onClick={() => setShowAddRecurringModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Recurring Modal */}
              {showEditRecurringModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-3xl shadow-lg relative">
                    <h3 className="text-lg font-bold mb-6">
                      Edit Recurring Transaction
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        />

                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>

                        <select
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>

                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={(e) => setActive(e.target.checked)}
                          />
                          Active
                        </label>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        />

                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        >
                          <option value="income">Income</option>
                          <option value="housing">Housing</option>
                          <option value="food">Food</option>
                          <option value="transportation">Transportation</option>
                          <option value="entertainment">Entertainment</option>
                        </select>

                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => setShowEditRecurringModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!description || amount === "" || !startDate)
                            return;
                          console.log({
                            description,
                            type,
                            frequency,
                            active,
                            amount,
                            newCategory,
                            startDate,
                          });
                          setShowEditRecurringModal(false);
                          setDescription("");
                          setType("expense");
                          setFrequency("monthly");
                          setActive(true);
                          setAmount("");
                          setNewCategory("income");
                          setStartDate("");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Update Recurring Modal
                      </button>
                    </div>

                    <button
                      onClick={() => setShowEditRecurringModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Account Tab */}
          {activeTab === "accounts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Accounts</h3>
                <button
                  onClick={() => setShowAddAccountModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm"
                >
                  + Add Account
                </button>
              </div>

              {/* Total Net Worth Summary */}
              <div className="bg-slate-700 p-4 rounded-xl shadow">
                <h4 className="text-sm text-gray-400 mb-1">Total Net Worth</h4>
                <div className="text-2xl font-semibold text-white">
                  $7,500.00
                </div>
              </div>

              {/* Account Cards - Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Main Checking */}
                <div className="bg-slate-700 p-4 rounded-xl shadow flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400">Main Checking</div>
                    <div className="text-xl font-semibold text-white">
                      $2,500.00
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEditAccount({
                          name: "Main Checking",
                          type: "checking",
                          balance: 2500,
                        })
                      }
                      className="text-blue-400 hover:underline text-sm"
                    >
                      ✏️
                    </button>
                    <button className="text-blue-400 hover:underline text-sm">
                      🗑
                    </button>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-slate-700 p-4 rounded-xl shadow flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400">Savings</div>
                    <div className="text-xl font-semibold text-green-400">
                      $5,000.00
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowEditAccountModal(true)}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      ✏️
                    </button>
                    <button className="text-blue-400 hover:underline text-sm">
                      🗑
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Account Modal */}
              {showAddAccountModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                    <h3 className="text-lg font-bold mb-4">Add Account</h3>

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Account Name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      >
                        <option value="checking">Checking</option>
                        <option value="savings">Savings</option>
                        <option value="credit">Credit</option>
                        <option value="investment">Investment</option>
                      </select>

                      <input
                        type="number"
                        placeholder="Current Balance"
                        value={accountBalance}
                        onChange={(e) =>
                          setAccountBalance(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => setShowAddAccountModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!accountName || accountBalance === "") return;
                          console.log({
                            accountName,
                            accountType,
                            accountBalance,
                          });
                          setShowAddAccountModal(false);
                          setAccountName("");
                          setAccountType("checking");
                          setAccountBalance("");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Add Account
                      </button>
                    </div>
                    <button
                      onClick={() => setShowAddAccountModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Account Modal */}
              {showEditAccountModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                    <h3 className="text-lg font-bold mb-4">Edit Account</h3>

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Account Name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      >
                        <option value="checking">Checking</option>
                        <option value="savings">Savings</option>
                        <option value="credit">Credit</option>
                        <option value="investment">Investment</option>
                      </select>

                      <input
                        type="number"
                        placeholder="Current Balance"
                        value={accountBalance}
                        onChange={(e) =>
                          setAccountBalance(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => setShowEditAccountModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!accountName || accountBalance === "") return;
                          console.log({
                            accountName,
                            accountType,
                            accountBalance,
                          });
                          setShowEditAccountModal(false);
                          setAccountName("");
                          setAccountType("checking");
                          setAccountBalance("");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Add Account
                      </button>
                    </div>
                    <button
                      onClick={() => setShowEditAccountModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Saving Goals Tab */}
          {activeTab === "goals" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Savings Goals</h3>
                <button
                  onClick={() => setShowAddSavingsModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm"
                >
                  + Add Goal
                </button>
              </div>

              <div className="bg-slate-700 rounded-lg p-4 space-y-4">
                <div className="bg-slate-800 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Emergency Fund</h4>
                    <div className="flex gap-3 text-gray-400 text-sm">
                      <button
                        onClick={() => setShowEditSavingsModal(true)}
                        className="hover:text-blue-400"
                      >
                        ✏️
                      </button>
                      <button className="hover:text-blue-400">🗑</button>
                    </div>
                  </div>

                  <div className="text-gray-300 text-sm">
                    $2,000.00 of $5,000.00{" "}
                    <span className="float-right">40%</span>
                  </div>

                  <div className="text-sm text-gray-400 mt-1">
                    Target: Jul 4, 2026 ·{" "}
                    <span className="text-blue-400">11 months left</span>
                  </div>
                </div>
              </div>

              {/* Add Savings Modal */}
              {showAddSavingsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                    <h3 className="text-lg font-bold mb-4">
                      Add Savings Goals
                    </h3>

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Goal Name"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <input
                        type="number"
                        placeholder="Target Amount"
                        value={targetAmount}
                        onChange={(e) =>
                          setTargetAmount(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <input
                        type="number"
                        placeholder="Current Amount Saved"
                        value={currentAmountSaved}
                        onChange={(e) =>
                          setCurrentAmountSaved(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => setShowAddSavingsModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (
                            !goalName ||
                            targetAmount === "" ||
                            currentAmountSaved === "" ||
                            !targetDate
                          )
                            return;
                          console.log({
                            goalName,
                            targetDate,
                            targetAmount,
                            currentAmountSaved,
                          });
                          setShowAddSavingsModal(false);
                          setGoalName("");
                          setTargetDate("");
                          setTargetAmount("");
                          setCurrentAmountSaved("");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Add Goal
                      </button>
                    </div>

                    <button
                      onClick={() => setShowAddSavingsModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Savings Modal */}
              {showEditSavingsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                    <h3 className="text-lg font-bold mb-4">
                      Edit Savings Goals
                    </h3>

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Goal Name"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <input
                        type="number"
                        placeholder="Target Amount"
                        value={targetAmount}
                        onChange={(e) =>
                          setTargetAmount(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />

                      <input
                        type="number"
                        placeholder="Current Amount Saved"
                        value={currentAmountSaved}
                        onChange={(e) =>
                          setCurrentAmountSaved(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 rounded bg-slate-200 dark:bg-slate-700"
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={() => setShowEditSavingsModal(false)}
                        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (
                            !goalName ||
                            targetAmount === "" ||
                            currentAmountSaved === "" ||
                            !targetDate
                          )
                            return;
                          console.log({
                            goalName,
                            targetDate,
                            targetAmount,
                            currentAmountSaved,
                          });
                          setShowEditSavingsModal(false);
                          setGoalName("");
                          setTargetDate("");
                          setTargetAmount("");
                          setCurrentAmountSaved("");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Add Goal
                      </button>
                    </div>

                    <button
                      onClick={() => setShowEditSavingsModal(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Export Tab */}
          {activeTab === "export" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Export Your Data</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-700 p-4 rounded-xl shadow space-y-3">
                  <h4 className="text-white font-semibold">Transactions</h4>
                  <p className="text-sm text-gray-300">
                    Export all your transactions to a CSV file that can be
                    opened in Excel or Google Sheets.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                    Export Transactions
                  </button>
                </div>

                <div className="bg-slate-700 p-4 rounded-xl shadow space-y-3">
                  <h4 className="text-white font-semibold">Accounts</h4>
                  <p className="text-sm text-gray-300">
                    Export all your account information to a CSV file.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                    Export Accounts
                  </button>
                </div>

                <div className="bg-slate-700 p-4 rounded-xl shadow space-y-3">
                  <h4 className="text-white font-semibold">Budget Limits</h4>
                  <p className="text-sm text-gray-300">
                    Export all your budget limits to a CSV file.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                    Export Budget Limits
                  </button>
                </div>

                <div className="bg-slate-700 p-4 rounded-xl shadow space-y-3">
                  <h4 className="text-white font-semibold">All Data (JSON)</h4>
                  <p className="text-sm text-gray-300">
                    Export all your data (transactions, accounts, budgets,
                    goals) in JSON format for backup.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                    Export All Data
                  </button>
                </div>
              </div>

              <div className="bg-slate-700 p-4 rounded-xl shadow space-y-2">
                <h4 className="text-white font-semibold">Privacy Note</h4>
                <p className="text-sm text-gray-300">
                  All your data is stored locally in your browser. Exporting
                  allows you to back up your data or transfer it to another
                  device. No data is sent to any server.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
