'use client'

import { useState } from 'react'
import MockAuthPage from './components/MockAuthPage'
import Dashboard from './components/Dashboard'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <MockAuthPage onLogin={handleLogin} />
  }

  return <Dashboard />
}
