'use client'

import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-center">
        {/* Animated dumbbell icon */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-2">
            {/* Left weight */}
            <div className="w-8 h-12 bg-yellow-500 rounded-lg animate-pulse shadow-lg shadow-yellow-500/50"></div>
            {/* Bar */}
            <div className="w-24 h-3 bg-gray-700 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 animate-[loading_1.5s_ease-in-out_infinite]" 
                   style={{ 
                     animation: 'loading 1.5s ease-in-out infinite',
                     backgroundSize: '200% 100%'
                   }}></div>
            </div>
            {/* Right weight */}
            <div className="w-8 h-12 bg-yellow-500 rounded-lg animate-pulse shadow-lg shadow-yellow-500/50" 
                 style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>

        {/* Gym name with animated text */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-wide animate-pulse">
          Get<span className="text-yellow-500">Fit</span> Gym
        </h1>

        {/* Loading dots */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" 
               style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-500/50" 
               style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-sm tracking-wider uppercase animate-pulse">
          Loading Your Fitness Journey...
        </p>

        {/* Progress bar */}
        <div className="mt-6 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-[shimmer_2s_ease-in-out_infinite]"
            style={{
              animation: 'shimmer 2s ease-in-out infinite',
              backgroundSize: '200% 100%'
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}
