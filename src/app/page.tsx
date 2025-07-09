"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [darkMode, setDarkMode] = useState(true);
  const [currency, setCurrency] = useState("USD ($)");
  const [showBudgetAlert, setShowBudgetAlert] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-slate-800 text-white h-[72px] flex items-center">
        <div className="max-w-[1240px] w-full mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Fundwise</h1>

          <div className="hidden md:flex items-center space-x-6">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm text-white flex items-center gap-2">
              <span className="text-xl">+</span>
              <span className="hidden md:inline">Add Transaction</span>
            </button>
            <button
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold"
              onClick={() => setShowSettings(true)}
            >
              J
            </button>
          </div>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          ></div>

          <div className="fixed top-0 right-0 h-full w-72 bg-slate-800 p-6 space-y-6 z-50 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                className="text-white text-xl"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                J
              </div>
              <div>
                <div className="font-semibold">John Doe</div>
                <div className="text-sm text-gray-400">john.doe@gmail.com</div>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm text-white flex items-center gap-2">
              <span className="text-xl">+</span>
              Add Transaction
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center gap-2 text-sm text-white hover:text-sky-400"
            >
              <span>👤</span>
              Profile & Settings
            </button>

            <div className="flex items-center justify-between text-sm text-white">
              <div className="flex items-center gap-2">
                <span>🌞</span> Light Mode
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-sky-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
              </label>
            </div>
          </div>
        </>
      )}

      {/* Main Dashboard */}
      <main className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Dashboard
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-slate-800 text-white p-6 rounded-xl">
            <div className="text-lg md:text-xl font-semibold">Total Income</div>
            <div className="text-green-400 text-3xl md:text-4xl font-bold mt-2">
              $0.00
            </div>
          </div>
          <div className="bg-slate-800 text-white p-6 rounded-xl">
            <div className="text-lg md:text-xl font-semibold">
              Total Expenses
            </div>
            <div className="text-red-400 text-3xl md:text-4xl font-bold mt-2">
              $0.00
            </div>
          </div>
          <div className="bg-slate-800 text-white p-6 rounded-xl">
            <div className="text-lg md:text-xl font-semibold">
              Current Balance
            </div>
            <div className="text-blue-400 text-3xl md:text-4xl font-bold mt-2">
              $0.00
            </div>
          </div>
        </div>
      </main>

      {/* Financial Overview */}
      <section className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <div className="bg-slate-800 text-white p-6 rounded-xl">
          <div className="text-lg md:text-xl font-semibold">
            Financial Overview
          </div>
        </div>
      </section>

      {/* Budget Process */}
      <section className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <div className="bg-slate-800 text-white p-6 rounded-xl">
          <div className="text-lg md:text-xl font-semibold">Budget Process</div>
        </div>
      </section>

      {/* Savings Goals */}
      <section className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <div className="bg-slate-800 text-white p-6 rounded-xl">
          <div className="text-lg md:text-xl font-semibold">Savings Goals</div>
        </div>
      </section>

      {/* Transactions */}
      <section className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Transactions
        </h2>

        <div className="bg-slate-800 text-white p-6 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchTransaction}
                onChange={(e) => setSearchTransaction(e.target.value)}
                placeholder="Search Transaction"
                className="pl-10 pr-4 py-2 rounded-md w-full text-white focus:outline-none focus:ring-0 focus:border-transparent bg-slate-700"
              />
            </div>

            <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white text-sm">
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          <div className="mt-4">
            {searchTransaction === "" ? (
              <p className="text-white text-sm">No search input yet.</p>
            ) : (
              <div className="text-white text-sm">
                Showing results for: <strong>{searchTransaction}</strong>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-slate-800 w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar */}
            <aside className="md:w-1/3 w-full bg-slate-700 p-6 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-white">
                  User Profile & Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-white text-xl md:hidden"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-2">
                <li className="text-white font-medium bg-blue-600 p-2 rounded">
                  Profile
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  Budget Limits
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  Recurring
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  Accounts
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  Savings Goals
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  Export Data
                </li>
              </ul>

              <div className="mt-10 pt-4 border-t border-slate-600 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <div className="text-white font-medium">{fullName}</div>
                  <div className="text-sm text-gray-400">{email}</div>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="md:w-2/3 w-full p-6 text-white space-y-6">
              <div className="flex justify-end md:block">
                <button
                  onClick={() => setShowSettings(false)}
                  className="hidden md:inline text-white text-xl mb-4"
                >
                  ✕
                </button>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Personal Information & Preferences
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      className="accent-blue-500"
                    />
                    <label>Dark Mode</label>
                  </div>
                  <div>
                    <label className="text-sm mb-1">Preferred Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white"
                    >
                      <option>USD ($)</option>
                      <option>PHP (₱)</option>
                      <option>EUR (€)</option>
                    </select>
                    <span className="text-xs text-gray-400 mt-1">
                      This will be used for all monetary values.
                    </span>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showBudgetAlert}
                        onChange={() => setShowBudgetAlert(!showBudgetAlert)}
                        className="accent-blue-500"
                      />
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
