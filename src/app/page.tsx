"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTransaction, setSearchTransaction] = useState("");

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
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              J
            </div>
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

      {/* Mobile size - Menu */}
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

            <button className="w-full flex items-center gap-2 text-sm text-white hover:text-sky-400">
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

      {/* Saving Goals */}
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

        {/* Search bar and Filter */}
        <div className="bg-slate-800 text-white p-6 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
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

            {/* Filter Button - text hidden on small screens */}
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white text-sm">
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>

          {/* Search Result */}
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
    </>
  );
}
