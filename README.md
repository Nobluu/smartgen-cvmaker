# SmartGen CV Maker

Aplikasi web untuk membuat CV profesional dengan bantuan AI. Dibangun dengan Next.js, TypeScript, dan Tailwind CSS.

## Fitur Utama

- 🔐 **Autentikasi Google OAuth** - Login/signup dengan akun Google
- 🤖 **AI Assistant** - Interaksi dengan AI untuk membantu membuat CV
- 📝 **CV Builder** - Form lengkap untuk mengisi data CV
- 🎨 **Multiple Templates** - Berbagai template CV yang menarik
- 👁️ **Live Preview** - Preview CV secara real-time
- 📄 **Export PDF/Image** - Download CV dalam format PDF atau gambar
- 📱 **Responsive Design** - Tampilan optimal di desktop dan mobile

## Template CV yang Tersedia

1. **Modern Professional** - Desain bersih dan kontemporer untuk profesional teknologi
2. **Creative Portfolio** - Desain berani dan berwarna untuk profesional kreatif
3. **Minimalist** - Desain sederhana dan elegan yang fokus pada konten
4. **Executive** - Desain formal dan canggih untuk posisi senior
5. **Academic** - Desain tradisional yang sempurna untuk posisi akademik
6. **Startup** - Desain modern dan dinamis untuk profesional startup

## Teknologi yang Digunakan

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js dengan Google OAuth
- **Database**: PostgreSQL dengan Prisma ORM
- **AI**: OpenAI GPT-3.5-turbo
- **Export**: html2canvas, jsPDF
- **UI Components**: Lucide React Icons

## Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd SmartGenCVMaker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Isi file `.env.local` dengan konfigurasi berikut:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/smartgen_cv_maker"

   # OpenAI API
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Buka aplikasi**
   ```
   http://localhost:3000
   ```

## Konfigurasi Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang ada
3. Aktifkan Google+ API
4. Buat OAuth 2.0 credentials
5. Tambahkan authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID dan Client Secret ke file `.env.local`

## Konfigurasi OpenAI

1. Daftar di [OpenAI Platform](https://platform.openai.com/)
2. Buat API key baru
3. Copy API key ke file `.env.local`

## Struktur Project

```
SmartGenCVMaker/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── ai/
│   ├── components/
│   │   ├── AuthPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AIChat.tsx
│   │   ├── CVBuilder.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── CVPreview.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Fitur AI Assistant

AI Assistant dapat membantu:
- Mengekstrak informasi CV dari percakapan
- Memberikan saran untuk meningkatkan CV
- Membantu menyusun konten CV
- Memberikan tips untuk CV yang menarik

## Cara Menggunakan

1. **Login** - Gunakan akun Google untuk masuk
2. **Chat dengan AI** - Ceritakan tentang diri Anda di tab "AI Assistant"
3. **Pilih Template** - Pilih template CV yang sesuai di tab "Templates"
4. **Buat CV** - Lengkapi data CV di tab "CV Builder"
5. **Preview & Download** - Lihat hasil dan download CV di tab "Preview"

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Manual Deployment

1. Build aplikasi:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Jika mengalami masalah atau memiliki pertanyaan, silakan buat issue di repository ini.

---

**SmartGen CV Maker** - Buat CV profesional dengan bantuan AI! 🚀
