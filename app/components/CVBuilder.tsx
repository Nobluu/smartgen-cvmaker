'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  Save,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CVData {
  personalInfo: {
    name: string
    email: string
    phone: string
    address: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    duration: string
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    year: string
  }>
  skills: Array<{
    id: string
    name: string
    level: string
  }>
  languages: Array<{
    id: string
    name: string
    level: string
  }>
}

interface CVBuilderProps {
  cvData: any
  template: string
  onDataUpdate: (data: any) => void
}

export default function CVBuilder({ cvData, template, onDataUpdate }: CVBuilderProps) {
  const { data: session } = useSession()
  const [data, setData] = useState<CVData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: []
  })

  const [activeSection, setActiveSection] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (cvData) {
      // Load data but ensure all arrays/fields exist (prevent undefined.map errors)
      const defaultPersonal = {
        name: '',
        email: '',
        phone: '',
        address: '',
        summary: ''
      }

      const loadedData = {
        personalInfo: defaultPersonal,
        experience: [],
        education: [],
        skills: [],
        languages: [],
        ...cvData
      }

      // Ensure personalInfo exists
      loadedData.personalInfo = { ...defaultPersonal, ...(loadedData.personalInfo || {}) }

      // If email in CV matches login email, clear it (user probably doesn't want their login email in CV)
      if (session?.user?.email && loadedData.personalInfo?.email === session.user.email) {
        console.log('Clearing login email from CV data')
        loadedData.personalInfo.email = ''
      }

      setData(loadedData)
    }
  }, [cvData, session?.user?.email])

  const sections = [
    { id: 'personal', label: 'Informasi Pribadi', icon: User },
    { id: 'experience', label: 'Pengalaman Kerja', icon: Briefcase },
    { id: 'education', label: 'Pendidikan', icon: GraduationCap },
    { id: 'skills', label: 'Keahlian', icon: Award },
    { id: 'languages', label: 'Bahasa', icon: Languages },
  ]

  const handleSave = () => {
    onDataUpdate(data)
    toast.success('Data CV berhasil disimpan!')
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: ''
    }
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }))
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      year: ''
    }
    setData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner'
    }
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const updateSkill = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      name: '',
      level: 'Basic'
    }
    setData(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }))
  }

  const updateLanguage = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }))
  }

  const removeLanguage = (id: string) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="mt-6 pt-4 border-t">
              <button
                onClick={handleSave}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan CV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {sections.find(s => s.id === activeSection)?.label}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Lengkapi informasi {sections.find(s => s.id === activeSection)?.label.toLowerCase()}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Selesai Edit' : 'Edit'}</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeSection === 'personal' && (
                <PersonalInfoSection 
                  data={data.personalInfo} 
                  onChange={(field: string, value: string) => 
                    setData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, [field]: value }
                    }))
                  }
                />
              )}

              {activeSection === 'experience' && (
                <ExperienceSection 
                  experiences={data.experience}
                  onAdd={addExperience}
                  onUpdate={updateExperience}
                  onRemove={removeExperience}
                />
              )}

              {activeSection === 'education' && (
                <EducationSection 
                  education={data.education}
                  onAdd={addEducation}
                  onUpdate={updateEducation}
                  onRemove={removeEducation}
                />
              )}

              {activeSection === 'skills' && (
                <SkillsSection 
                  skills={data.skills}
                  onAdd={addSkill}
                  onUpdate={updateSkill}
                  onRemove={removeSkill}
                />
              )}

              {activeSection === 'languages' && (
                <LanguagesSection 
                  languages={data.languages}
                  onAdd={addLanguage}
                  onUpdate={updateLanguage}
                  onRemove={removeLanguage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component sections
function PersonalInfoSection({ data, onChange }: any) {
  const fileInputRef = React.createRef<HTMLInputElement>()
  const [previewUrl, setPreviewUrl] = useState<string>(data?.photo || '')
  const [isProcessing, setIsProcessing] = useState(false)
  const [bgRemovalModule, setBgRemovalModule] = useState<any>(null)

  useEffect(() => {
    // keep preview in sync when parent data changes
    setPreviewUrl(data?.photo || '')
  }, [data?.photo])

  useEffect(() => {
    // lazy-load bg removal library when component mounts
    if (typeof window !== 'undefined') {
      import('@imgly/background-removal')
        .then((module) => setBgRemovalModule(module))
        .catch((err) => console.error('Failed to load bg removal lib', err))
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      setPreviewUrl(url)
      onChange('photo', url)
    }
    reader.readAsDataURL(file)
  }

  const handleProcessWithAI = async () => {
    if (!previewUrl) {
      toast.error('Pilih foto terlebih dahulu')
      return
    }
    if (!bgRemovalModule) {
      toast.error('AI library belum siap, silakan coba lagi sebentar')
      return
    }
    setIsProcessing(true)
    try {
      toast.loading('Memproses foto...')
      const blob = await bgRemovalModule.removeBackground(previewUrl, { model: 'small', output: { format: 'image/png' } })
      const img = new Image()
      img.src = URL.createObjectURL(blob)
      await new Promise((r) => (img.onload = r))

      // draw on canvas with white background
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas context error')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL('image/png')
      setPreviewUrl(dataUrl)
      onChange('photo', dataUrl)
      toast.dismiss()
      toast.success('Foto berhasil diproses')
    } catch (err) {
      console.error('Process AI photo error', err)
      toast.error('Gagal memproses foto')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="email@example.com"
              autoComplete="off"
            />
            {data.email && (
              <button
                type="button"
                onClick={() => onChange('email', '')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                title="Clear email"
              >
                <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Telepon
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="+62 812 3456 7890"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alamat
          </label>
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Alamat lengkap"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ringkasan Profesional
        </label>
        <textarea
          value={data.summary || ''}
          onChange={(e) => onChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white resize-none"
          placeholder="Ceritakan tentang diri Anda secara singkat..."
        />
      </div>

      {/* Photo uploader */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Foto Profil</label>
        <div className="flex items-center gap-4">
          <div className="w-28 h-36 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
            {data.photo ? (
              <img src={data.photo} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <div className="text-sm text-gray-500 text-center">Belum ada foto</div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg"
              >
                Upload Foto
              </button>
              <button
                type="button"
                onClick={handleProcessWithAI}
                disabled={isProcessing}
                className="px-4 py-2 border rounded-lg"
              >
                {isProcessing ? 'Memproses...' : 'Gunakan AI (hapus background)'}
              </button>
            </div>
            <p className="text-sm text-gray-500">Anda bisa langsung upload foto atau gunakan fitur AI untuk membuat foto formal (background removal).</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExperienceSection({ experiences, onAdd, onUpdate, onRemove }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Pengalaman Kerja</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengalaman</span>
        </button>
      </div>

      {experiences.map((exp: any) => (
        <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Perusahaan
              </label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Nama perusahaan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posisi
              </label>
              <input
                type="text"
                value={exp.position || ''}
                onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Jabatan/posisi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durasi
              </label>
              <input
                type="text"
                value={exp.duration || ''}
                onChange={(e) => onUpdate(exp.id, 'duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Jan 2020 - Des 2022"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => onRemove(exp.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              value={exp.description || ''}
              onChange={(e) => onUpdate(exp.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white resize-none"
              placeholder="Deskripsikan tanggung jawab dan pencapaian Anda..."
            />
          </div>
        </div>
      ))}

      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Belum ada pengalaman kerja</p>
          <p className="text-sm">Klik "Tambah Pengalaman" untuk menambahkan</p>
        </div>
      )}
    </div>
  )
}

function EducationSection({ education, onAdd, onUpdate, onRemove }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Pendidikan</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pendidikan</span>
        </button>
      </div>

      {education.map((edu: any) => (
        <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institusi
              </label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => onUpdate(edu.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Nama universitas/sekolah"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gelar
              </label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="S1, S2, Diploma, dll"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jurusan
              </label>
              <input
                type="text"
                value={edu.field || ''}
                onChange={(e) => onUpdate(edu.id, 'field', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Teknik Informatika, Manajemen, dll"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => onRemove(edu.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tahun Lulus
            </label>
            <input
              type="text"
              value={edu.year || ''}
              onChange={(e) => onUpdate(edu.id, 'year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
              placeholder="2020"
            />
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Belum ada data pendidikan</p>
          <p className="text-sm">Klik "Tambah Pendidikan" untuk menambahkan</p>
        </div>
      )}
    </div>
  )
}

function SkillsSection({ skills, onAdd, onUpdate, onRemove }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Keahlian</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Keahlian</span>
        </button>
      </div>

      {skills.map((skill: any) => (
        <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Keahlian
              </label>
              <input
                type="text"
                value={skill.name || ''}
                onChange={(e) => onUpdate(skill.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="JavaScript, Python, dll"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                value={skill.level || 'Beginner'}
                onChange={(e) => onUpdate(skill.id, 'level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => onRemove(skill.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Belum ada keahlian</p>
          <p className="text-sm">Klik "Tambah Keahlian" untuk menambahkan</p>
        </div>
      )}
    </div>
  )
}

function LanguagesSection({ languages, onAdd, onUpdate, onRemove }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Bahasa</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Bahasa</span>
        </button>
      </div>

      {languages.map((lang: any) => (
        <div key={lang.id} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bahasa
              </label>
              <input
                type="text"
                value={lang.name || ''}
                onChange={(e) => onUpdate(lang.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Bahasa Inggris, Mandarin, dll"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                value={lang.level || 'Basic'}
                onChange={(e) => onUpdate(lang.id, 'level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => onRemove(lang.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {languages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Languages className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Belum ada bahasa</p>
          <p className="text-sm">Klik "Tambah Bahasa" untuk menambahkan</p>
        </div>
      )}
    </div>
  )
}
