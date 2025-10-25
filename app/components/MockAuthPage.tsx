'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Sparkles, Users, Shield } from 'lucide-react'

interface MockAuthPageProps {
  onLogin: () => void
}

export default function MockAuthPage({ onLogin }: MockAuthPageProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleMockLogin = async () => {
    setIsLoading(true)
    // Simulate login delay
    setTimeout(() => {
      onLogin()
    }, 1000)
  }

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary-600" />,
      title: "AI-Powered",
      description: "Get intelligent suggestions and content optimization"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary-600" />,
      title: "Multiple Templates",
      description: "Choose from various professional CV templates"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Easy Sharing",
      description: "Export and share your CV in multiple formats"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    }
  ]

  return (
    <div className="min-h-screen gradient-bg flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            SmartGen CV Maker
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Create professional CVs with AI assistance. 
            Stand out from the crowd with our intelligent resume builder.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-lg p-6"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-blue-100 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="glass-effect rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome to SmartGen
              </h2>
              <p className="text-blue-100">
                Demo Mode - Click to continue without authentication
              </p>
            </div>

            <button
              onClick={handleMockLogin}
              disabled={isLoading}
              className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Continue to Demo</span>
                </>
              )}
            </button>

            <div className="mt-6 text-center">
              <p className="text-blue-100 text-sm">
                This is a demo version. Google OAuth will be configured later.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
