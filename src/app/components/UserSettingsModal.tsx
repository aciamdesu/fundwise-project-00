"use client";

import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useUserSettings } from "./UserSettingsContext";
import AddBudgetModal from "../modals/AddBudgetModal";
import AddRecurringModal from "../modals/AddRecurringModal";
import BudgetLimitsTab from "../settings/BudgetLimitsTab";
import { act } from "react";

type Props = {
  onClose: () => void;
};

type BudgetItem = {
  name: string;
  limit: number;
  used: number;
};

type Account = {
  id: string;
  name: string;
  balance: number;
  type: string;
};

export default function UserSettingsModal({ onClose }: Props) {
  const {
    showAddBudgetModal,
    setShowAddBudgetModal,
    showEditBudgetModal,
    setShowEditBudgetModal,
    showAddRecurringModal,
    setShowAddRecurringModal,
    showEditRecurringModal,
    setShowEditRecurringModal,
    showAddAccountModal,
    setShowAddAccountModal,
    showEditAccountModal,
    setShowEditAccountModal,
    showAddSavingsModal,
    setShowAddSavingsModal,
    showEditSavingsModal,
    setShowEditSavingsModal,
  } = useUserSettings();

  const { activeTab, setActiveTab } = useUserSettings();
  const [editItem, setEditItem] = useState<BudgetItem | null>(null);

  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState<number | "">("");
  const [period, setPeriod] = useState("monthly");

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState("expense");
  const [frequency, setFrequency] = useState("monthly");
  const [active, setActive] = useState(true);
  const [newCategory, setNewCategory] = useState("income");
  const [startDate, setStartDate] = useState("");

  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [accountBalance, setAccountBalance] = useState<number | "">("");

  const [goalName, setGoalName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [currentAmountSaved, setCurrentAmountSaved] = useState<number | "">("");

  const { budgetLimits, setBudgetLimits } = useUserSettings();

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
  const recurringItems = [
    {
      id: 1,
      description: "Spotify",
      type: "expense",
      frequency: "monthly",
      active: true,
      amount: 149,
      category: "entertainment",
      startDate: "2025-07-01",
    },
    {
      id: 2,
      description: "Salary",
      type: "income",
      frequency: "monthly",
      active: true,
      amount: 50000,
      category: "income",
      startDate: "2025-07-01",
    },
  ];

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
              <div className="text-sm text-gray-400">john.doe@gmail.com</div>
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
                    defaultValue="john.doe@gmail.com"
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
                    <label>Dakr Mode</label>
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

          {activeTab === "budget" && <BudgetLimitsTab />}
          {activeTab === "recurring" && <RecurringTab />}

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
