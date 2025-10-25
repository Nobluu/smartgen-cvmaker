'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import MockAuthPage from './components/MockAuthPage'
import Dashboard from './components/Dashboard'

export default function Home() {
  const { data: session, status } = useSession()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage or session)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn || !!session)
    setIsLoading(false)
  }, [session])

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!isLoggedIn && !session) {
    return <MockAuthPage onLogin={handleLogin} />
  }

  return <Dashboard />
}
