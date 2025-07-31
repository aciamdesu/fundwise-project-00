"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { UserSettingsProvider } from "./components/UserSettingsContext";
import UserSettingsModal from "./components/UserSettingsModal";
import AddTransactionModal from "./components/AddTransactionModal";
import FinancialOverview from "./components/FinancialOverviewChart";
import BudgetProgress from "./components/BudgetProgress";
import SavingsGoals from "./components/SavingsGoals";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [AddTransactionOpen, setAddTransactionOpen] = useState(false);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <UserSettingsProvider>
      {/* Header */}
      <header className="bg-slate-800 text-white h-[72px] flex items-center">
        <div className="max-w-[1240px] w-full mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Fundwise</h1>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setAddTransactionOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm text-white flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              <span className="hidden md:inline">Add Transaction</span>
            </button>

            <button
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-medium"
              onClick={() => setSettingsOpen(true)}
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

            <button
              onClick={() => setAddTransactionOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm text-white flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add Transaction
            </button>

            <button
              className="w-full flex items-center gap-2 text-sm text-white hover:text-sky-400"
              onClick={() => setSettingsOpen(true)}
            >
              <span>👤</span>
              Profile & Settings
            </button>

            <div className="flex items-center justify-between text-sm text-white">
              <div className="flex items-center gap-2">
                <span>{isDarkMode ? "🌞" : "🌙"}</span>{" "}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-sky-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
              </label>
            </div>
          </div>
        </>
      )}

      {/* Settings Modal */}
      {settingsOpen && (
        <UserSettingsModal onClose={() => setSettingsOpen(false)} />
      )}

      {/* Add Transaction Modal */}
      {AddTransactionOpen && (
        <AddTransactionModal onClose={() => setAddTransactionOpen(false)} />
      )}

      {/* Main Dashboard */}
      <main className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Dashboard
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-slate-800 text-gray-400 p-6 rounded-xl">
            <div className="text-lg md:text-xl font-medium">Total Income</div>
            <div className="text-green-400 text-2xl md:text-2xl sm:text-2xl font-bold mt-2">
              $0.00
            </div>
          </div>
          <div className="bg-slate-800 text-gray-400 p-6 rounded-xl">
            <div className="text-lg md:text-xl font-medium">Total Expenses</div>
            <div className="text-red-400 text-2xl md:text-2xl sm:text-2xl font-bold mt-2">
              $0.00
            </div>
          </div>
          <div className="bg-slate-800 text-gray-400 p-6 rounded-xl">
            <div className="text-lg md:text-xl font-medium">
              Current Balance
            </div>
            <div className="text-blue-400 text-2xl md:text-2xl sm:text-2xl font-bold mt-2">
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
            <FinancialOverview />
          </div>
        </div>
      </section>

      {/* Budget Progress */}
      <section className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <div className="bg-slate-800 text-white p-6 rounded-xl">
          <div className="text-lg md:text-xl font-semibold">
            Budget Progress
            <BudgetProgress />
          </div>
        </div>
      </section>

      {/* Savings Goals */}
      <section className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <div className="bg-slate-800 text-white p-6 rounded-xl">
          <div className="text-lg md:text-xl font-semibold">
            Savings Goals
            <SavingsGoals />
          </div>
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
                className="pl-10 pr-4 py-2 rounded-md w-full text-white bg-slate-700 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white text-sm"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <select className="w-full bg-slate-700 text-white px-3 py-2 rounded-md text-sm">
                <option>All Types</option>
                <option>Income</option>
                <option>Expenses</option>
              </select>
              <select className="w-full bg-slate-700 text-white px-3 py-2 rounded-md text-sm">
                <option>All Categories</option>
                <option>Food</option>
                <option>Rent</option>
                <option>Subscription</option>
              </select>
              <select className="w-full bg-slate-700 text-white px-3 py-2 rounded-md text-sm">
                <option>Date (Newest First)</option>
                <option>Date (Oldest First)</option>
                <option>Amount (Highest First)</option>
                <option>Amount (Lowest First)</option>
              </select>
            </div>
          )}

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
    </UserSettingsProvider>
  );
}
