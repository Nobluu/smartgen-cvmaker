# Deploy SmartGen CV Maker ke Vercel

## 📋 Persiapan Sebelum Deploy

### 1. Install Git (jika belum ada)
Download dan install Git dari: https://git-scm.com/download/win

Atau via winget:
```powershell
winget install --id Git.Git -e --source winget
```

Setelah install, restart terminal/VS Code.

---

## 🚀 Langkah Deploy ke Vercel

### Langkah 1: Buat Akun GitHub (jika belum punya)
1. Buka https://github.com
2. Sign up dengan email Anda
3. Verify email

### Langkah 2: Buat Repository Baru di GitHub
1. Login ke GitHub
2. Klik tombol **"+"** di kanan atas → **"New repository"**
3. Isi:
   - Repository name: `smartgen-cvmaker` (atau nama lain)
   - Description: "AI-powered CV Maker Application"
   - Public atau Private (pilih sesuai keinginan)
   - **JANGAN** centang "Initialize with README"
4. Klik **"Create repository"**
5. Copy URL repository (contoh: `https://github.com/username/smartgen-cvmaker.git`)

### Langkah 3: Push Code ke GitHub
Buka terminal di folder project (`D:\SmartGenCVMaker`) dan jalankan:

```powershell
# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SmartGen CV Maker"

# Add remote (ganti URL dengan URL repository Anda)
git remote add origin https://github.com/username/smartgen-cvmaker.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Note:** Saat pertama kali push, GitHub akan minta login. Gunakan Personal Access Token (bukan password).

#### Cara membuat GitHub Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → pilih "repo" scope → Generate
3. Copy token (hanya muncul sekali!)
4. Paste saat diminta password

### Langkah 4: Deploy ke Vercel
1. Buka https://vercel.com
2. Klik **"Sign Up"** → pilih **"Continue with GitHub"**
3. Authorize Vercel untuk akses GitHub
4. Setelah login, klik **"Add New..."** → **"Project"**
5. Import repository `smartgen-cvmaker`
6. Configure project:
   - Framework Preset: **Next.js** (otomatis terdeteksi)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
7. **Environment Variables** (PENTING!):
   Klik **"Environment Variables"** dan tambahkan:
   
   ```
   DATABASE_URL=your_database_url_here
   NEXTAUTH_SECRET=generate_random_string_here
   NEXTAUTH_URL=https://your-project-name.vercel.app
   OPENAI_API_KEY=your_openai_key_here (optional)
   ```

   **Cara generate NEXTAUTH_SECRET:**
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

8. Klik **"Deploy"**
9. Tunggu 2-3 menit (proses build)
10. ✅ **Selesai!** Anda akan dapat URL seperti: `https://smartgen-cvmaker.vercel.app`

---

## 🔄 Update Aplikasi (Setelah Deploy Pertama)

Setiap kali Anda ubah code:

```powershell
# Add changes
git add .

# Commit
git commit -m "Deskripsi perubahan"

# Push ke GitHub
git push
```

Vercel akan **otomatis re-deploy** setiap kali ada push baru ke GitHub! 🎉

---

## ⚙️ Environment Variables yang Diperlukan

| Variable | Deskripsi | Required |
|----------|-----------|----------|
| `DATABASE_URL` | URL koneksi database PostgreSQL | ✅ Yes |
| `NEXTAUTH_SECRET` | Secret key untuk authentication | ✅ Yes |
| `NEXTAUTH_URL` | URL production aplikasi | ✅ Yes |
| `OPENAI_API_KEY` | API key untuk AI chat features | ❌ No (fallback mode tersedia) |

### Setup Database (Supabase - Gratis)
1. Buka https://supabase.com
2. Sign up & create new project
3. Tunggu database ready (~2 menit)
4. Settings → Database → Connection string → copy URI
5. Paste sebagai `DATABASE_URL` di Vercel

---

## 🐛 Troubleshooting

### Build Failed
- Check error message di Vercel dashboard
- Pastikan semua dependencies ada di `package.json`
- Coba build lokal dulu: `npm run build`

### Database Error
- Pastikan `DATABASE_URL` sudah di-set
- Jalankan migration: di Vercel → Settings → Functions → Run command
  ```
  npx prisma migrate deploy
  ```

### AI Chat Tidak Berfungsi
- Normal jika tidak set `OPENAI_API_KEY`
- Aplikasi akan gunakan fallback mode (template responses)

---

## 📞 Butuh Bantuan?
Jika ada error saat deploy, copy error message dan share ke saya untuk troubleshooting! 😊
