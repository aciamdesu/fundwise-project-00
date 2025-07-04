"use client";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          {/* DARK BACKGROUND (does NOT cover dashboard) */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          ></div>

          {/* SIDEBAR */}
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

      {/* MAIN */}
      <main className="max-w-[1240px] w-full mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-5 rounded-xl text-white">
            <div className="text-xl sm:text-2xl lg:text-3xl">Total Income</div>
            <div className="text-green-400 font-bold text-2xl sm:text-3xl lg:text-4xl">
              $0.0
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl text-white">
            <div className="text-xl sm:text-2xl lg:text-3xl">
              Total Expenses
            </div>
            <div className="text-red-400 font-bold text-2xl sm:text-3xl lg:text-4xl">
              $0.0
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl text-white">
            <div className="text-xl sm:text-2xl lg:text-3xl">
              Current Balance
            </div>
            <div className="text-blue-400 font-bold text-2xl sm:text-3xl lg:text-4xl">
              $0.0
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
