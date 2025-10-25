'use client'

import { useRouter } from 'next/navigation'
import MockAuthPage from '../components/MockAuthPage'

export default function Auth() {
  const router = useRouter()
  
  const handleLogin = () => {
    router.push('/')
  }
  
  return <MockAuthPage onLogin={handleLogin} />
}
