'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition">
          GetFit Gym
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          </li>
          <li>
            <Link href="/trainers" className="hover:text-yellow-400 transition">Trainers</Link>
          </li>
          <li>
            <Link href="/supplements" className="hover:text-yellow-400 transition">Supplements</Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-yellow-400 transition">Pricing</Link>
          </li>
          <li>
            <Link href="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login</span>
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800">
          <ul className="flex flex-col space-y-2 px-6 py-4">
            <li>
              <Link href="/" onClick={() => setOpen(false)} className="block hover:text-yellow-400 py-2 transition">Home</Link>
            </li>
            <li>
              <Link href="/trainers" onClick={() => setOpen(false)} className="block hover:text-yellow-400 py-2 transition">Trainers</Link>
            </li>
            <li>
              <Link href="/supplements" onClick={() => setOpen(false)} className="block hover:text-yellow-400 py-2 transition">Supplements</Link>
            </li>
            <li>
              <Link href="/pricing" onClick={() => setOpen(false)} className="block hover:text-yellow-400 py-2 transition">Pricing</Link>
            </li>
            <li>
              <Link href="/admin" onClick={() => setOpen(false)} className="block bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-center mt-2 hover:bg-yellow-600 transition">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
