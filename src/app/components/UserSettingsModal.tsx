"use client";
import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function UserSettingsModal({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-800 w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 z-50"
          aria-label="Close settings"
        >
          <X size={24} />
        </button>

        {/* Sidebar */}
        <aside className="md:w-1/3 w-full bg-slate-700 p-6 space-y-4">
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
          {activeTab === "profile" && (
            <>
              <div>
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

          {activeTab === "budget" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Budget Limits</h3>
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm text-white">
                  + Add Limit
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Food", used: 50, limit: 500 },
                  { name: "Entertainment", used: 30, limit: 200 },
                ].map((item) => {
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
                            ${item.used.toFixed(2)} of ${item.limit.toFixed(2)}{" "}
                            (monthly)
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
        </div>
      </div>
    </div>
  );
}
