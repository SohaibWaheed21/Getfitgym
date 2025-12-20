'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LoadingScreen from '@/components/LoadingScreen'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Initial load - show loading for minimum 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Show loading on route change for minimum 2 seconds
  useEffect(() => {
    setIsTransitioning(true)
    
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [pathname])

  if (isLoading || isTransitioning) {
    return <LoadingScreen />
  }

  return <main>{children}</main>
}
