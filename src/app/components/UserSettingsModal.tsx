"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function UserSettingsModal({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-slate-800 w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden relative max-h-[90vh]">
        {/* Close Button */}
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
                  <div>
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
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm text-white">
                  + Add Limit
                </button>
              </div>

              <div className="space-y-4">
                {[{ name: "Food", used: 50, limit: 500 }].map((item) => {
                  const percent = Math.round((item.used / item.limit) * 100);
                  return (
                    <div
                      key={item.name}
                      className="bg-slate-700 p-4 rounded-xl shadow flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{item.name}</h4>
                        <div className="flex gap-2 text-sm text-gray-300 items-center">
                          <span>
                            ${item.used.toFixed(2)} of ${item.limit.toFixed(2)}
                          </span>
                          <span>{percent}%</span>
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
            </>
          )}

          {activeTab === "accounts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Accounts</h3>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
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
                    <button className="text-blue-400 hover:underline text-sm">
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
                    <button className="text-blue-400 hover:underline text-sm">
                      ✏️
                    </button>
                    <button className="text-blue-400 hover:underline text-sm">
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recurring Tab */}
          {activeTab === "recurring" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Recurring Transactions</h3>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
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
                        <button className="text-blue-400 hover:underline">
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
            </>
          )}

          {/* Saving Goals Tab */}
          {activeTab === "goals" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Savings Goals</h3>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                  + Add Goal
                </button>
              </div>

              <div className="bg-slate-700 rounded-lg p-4 space-y-4">
                <div className="bg-slate-800 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Emergency Fund</h4>
                    <div className="flex gap-3 text-gray-400 text-sm">
                      <button className="hover:text-blue-400">✏️</button>
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
            </>
          )}

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
