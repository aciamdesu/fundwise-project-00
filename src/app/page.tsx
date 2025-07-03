'use client';
import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-slate-800 text-white h-[72px] px-4 flex items-center'>
      <div className='max-w-[1240px] w-full mx-auto px-3 md:px-4 flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Fundwise</h1>

        <div className='hidden md:flex items-center space-x-6'>
          <button className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm text-white flex items-center gap-2'>
            <span className='text-xl'>+</span>
            <span className='hidden md:inline'>Add Transaction</span>
          </button>
          <div className='w-8 h-8 rounded-full bg-blue-500 transition-shadow duration-200 hover:shadow-lg hover:ring-9 hover:ring-slate-700/100 flex items-center justify-center text-sm font-bold'>
            J
          </div>
        </div>

        <button className='md:hidden text-white text-2xl' onClick={() => setMenuOpen(true)} aria-label="Open menu">
          ☰
        </button>
      </div>

      {menuOpen && (
  <>
    <div className='fixed inset-0 z-50 bg-gray-800 bg-opacity-50'>
      <div className='absolute right-0 top-0 h-full w-72 bg-slate-700 p-6 space-y-6 shadow-lg overflow-y-auto'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-lg font-semibold'>Menu</h2>
          <button className='text-white text-xl' onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className='flex items-center space-x-4'>
          <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center'>
            J
          </div>
          <div>
            <div className='font-semibold'>John Doe</div>
            <div className='text-sm text-gray-400'>john.doe@gmail.com</div>
          </div>
        </div>

        <button className='w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm text-white flex items-center gap-2'>
          <span className='text-xl'>+</span>
          Add Transaction
        </button>

        <button className='w-full flex items-center gap-2 text-sm text-white hover:text-sky-400'>
          <span>👤</span> Profile & Settings
        </button>

        <div className='flex items-center justify-between text-sm text-white'>
          <div className='flex items-center gap-2'>
            <span>🌞</span> Light Mode
          </div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input type="checkbox" className='sr-only peer' />
            <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-sky-500 transition-all'></div>
            <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full'></div>
          </label>
        </div>
      </div>
    </div>

    <div className='fixed inset-0 z-40' onClick={() => setMenuOpen(false)} aria-hidden="true"></div>
  </>
      )}
    </header>
  );
}