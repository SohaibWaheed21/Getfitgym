'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F5C211] to-[#FF6B1A] flex items-center justify-center">
              {/* Dumbbell Icon */}
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
              </svg>
            </div>
            <span className="font-['Bebas_Neue'] text-2xl text-white group-hover:text-[#F5C211] transition-colors tracking-wider">
              GetFit Gym
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-1 justify-end">
            <ul className="flex items-center gap-4 lg:gap-6">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#F5C211] transition-colors duration-200 font-medium relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F5C211] after:transition-all hover:after:w-full">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-300 hover:text-[#F5C211] transition-colors duration-200 font-medium relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F5C211] after:transition-all hover:after:w-full">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/supplements" className="text-gray-300 hover:text-[#F5C211] transition-colors duration-200 font-medium relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F5C211] after:transition-all hover:after:w-full">
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-[#F5C211] transition-colors duration-200 font-medium relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F5C211] after:transition-all hover:after:w-full">
                  Pricing
                </Link>
              </li>
            </ul>

            <div className="flex items-center">
              <Link 
                href="/admin"
                className="bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] hover:from-[#FFD700] hover:to-[#FF8533] text-black px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(245,194,17,0.3)] flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-gray-300 hover:text-[#F5C211] transition-colors"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-[#141414]/95 backdrop-blur-xl border-b border-white/10">
            <ul className="flex flex-col p-4 gap-2">
              <li>
                <Link href="/" onClick={() => setOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-[#F5C211] hover:bg-white/5 rounded-lg transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trainers" onClick={() => setOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-[#F5C211] hover:bg-white/5 rounded-lg transition-all">
                  Trainers
                </Link>
              </li>
              <li>
                <Link href="/supplements" onClick={() => setOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-[#F5C211] hover:bg-white/5 rounded-lg transition-all">
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/pricing" onClick={() => setOpen(false)} className="block py-3 px-4 text-gray-300 hover:text-[#F5C211] hover:bg-white/5 rounded-lg transition-all">
                  Pricing
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/admin" onClick={() => setOpen(false)} className="w-full bg-gradient-to-r from-[#F5C211] to-[#FF6B1A] hover:from-[#FFD700] hover:to-[#FF8533] text-black px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
