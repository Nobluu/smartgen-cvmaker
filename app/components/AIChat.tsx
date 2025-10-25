'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatProps {
  onCVDataUpdate: (data: any) => void
}

export default function AIChat({ onCVDataUpdate }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Halo! Saya AI Assistant untuk SmartGen CV Maker. Saya akan membantu Anda membuat CV yang profesional. Silakan ceritakan tentang diri Anda - nama, pengalaman kerja, pendidikan, skill, dan informasi lainnya yang ingin Anda sertakan dalam CV.",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages
        }),
      })

      const data = await response.json()
      
      // Check if there's a warning (fallback mode)
      if (data.warning) {
        toast(data.warning, { 
          duration: 5000,
          icon: 'ℹ️'
        })
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Maaf, saya tidak dapat memproses pesan Anda.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // If AI extracted CV data, update the parent component
      if (data.cvData) {
        onCVDataUpdate(data.cvData)
        toast.success('CV data telah diekstrak dan disimpan!')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Add fallback message even on error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi atau lanjutkan dengan mengisi form CV secara manual.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      
      toast.error('Terjadi kesalahan koneksi. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "Saya adalah seorang software developer dengan 3 tahun pengalaman...",
    "Saya lulusan Teknik Informatika dengan skill Python dan JavaScript...",
    "Saya memiliki pengalaman di bidang marketing dan sales...",
    "Saya fresh graduate dari jurusan Manajemen..."
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-600">
                Ceritakan tentang diri Anda dan saya akan membantu membuat CV
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-primary-600' 
                    : 'bg-gray-100'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="p-6 border-t bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-3">Contoh yang bisa Anda coba:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-left p-3 bg-white rounded-lg border hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm text-gray-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ceritakan tentang diri Anda..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-gray-900 bg-white placeholder:text-gray-400"
                rows={3}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirim</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
