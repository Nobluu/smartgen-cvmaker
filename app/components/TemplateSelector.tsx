'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Check, Star } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  isPopular?: boolean
  isNew?: boolean
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech professionals',
    category: 'Professional',
    preview: '/templates/modern-preview.png',
    isPopular: true
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Bold and colorful design for creative professionals',
    category: 'Creative',
    preview: '/templates/creative-preview.png',
    isNew: true
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and elegant design focusing on content',
    category: 'Professional',
    preview: '/templates/minimalist-preview.png'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Formal and sophisticated design for senior positions',
    category: 'Executive',
    preview: '/templates/executive-preview.png',
    isPopular: true
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Traditional design perfect for academic positions',
    category: 'Academic',
    preview: '/templates/academic-preview.png'
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Modern and dynamic design for startup professionals',
    category: 'Tech',
    preview: '/templates/startup-preview.png'
  }
]

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void
}

export default function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', 'Professional', 'Creative', 'Executive', 'Academic', 'Tech']
  const filteredTemplates = filter === 'all' 
    ? templates 
    : templates.filter(template => template.category === filter)

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    onTemplateSelect(templateId)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Pilih Template CV
        </h2>
        <p className="text-lg text-gray-600">
          Pilih template yang sesuai dengan profesi dan preferensi Anda
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'Semua' : category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`template-card relative bg-white rounded-lg shadow-sm border-2 cursor-pointer ${
              selectedTemplate === template.id
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            {/* Template Preview */}
            <div className="aspect-[3/4] bg-gray-100 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-600">Preview Template</p>
                </div>
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex space-x-2">
                {template.isPopular && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Popular</span>
                  </span>
                )}
                {template.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {template.category}
                </span>
                <button
                  className={`text-sm font-medium transition-colors ${
                    selectedTemplate === template.id
                      ? 'text-primary-600'
                      : 'text-gray-500 hover:text-primary-600'
                  }`}
                >
                  {selectedTemplate === template.id ? 'Dipilih' : 'Pilih'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Template Actions */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Template Dipilih: {templates.find(t => t.id === selectedTemplate)?.name}
            </h3>
            <p className="text-primary-700 mb-4">
              Template telah dipilih. Klik "CV Builder" untuk mulai mengisi data CV Anda.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => onTemplateSelect(selectedTemplate)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Mulai Buat CV
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
