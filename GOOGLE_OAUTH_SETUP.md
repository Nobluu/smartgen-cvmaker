# Setup Google OAuth untuk SmartGen CV Maker

## Langkah 1: Google Cloud Console Setup

1. **Buka Google Cloud Console**
   - Pergi ke https://console.cloud.google.com/
   - Login dengan akun Google Anda

2. **Buat atau Pilih Project**
   - Klik dropdown project di bagian atas
   - Pilih project yang sudah ada atau buat project baru
   - Nama project: `SmartGen CV Maker` (atau nama lain sesuai keinginan)

3. **Aktifkan Google+ API**
   - Di menu sebelah kiri, pilih "APIs & Services" > "Library"
   - Cari "Google+ API"
   - Klik dan enable API tersebut

4. **Buat OAuth Consent Screen**
   - Pergi ke "APIs & Services" > "OAuth consent screen"
   - Pilih "External" (untuk testing) atau "Internal" (jika punya Google Workspace)
   - Klik "Create"
   - Isi informasi yang diperlukan:
     - App name: `SmartGen CV Maker`
     - User support email: email Anda
     - Developer contact email: email Anda
   - Klik "Save and Continue"
   - Skip bagian "Scopes" (klik "Save and Continue")
   - Jika External, tambahkan test users (email Anda dan email lain yang ingin ditest)
   - Klik "Save and Continue"

5. **Buat OAuth Client ID**
   - Pergi ke "APIs & Services" > "Credentials"
   - Klik "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Name: `SmartGen CV Maker Web Client`
   - **Authorized JavaScript origins** - Tambahkan:
     ```
     http://localhost:3000
     https://smartgen-cvmaker-nobluu.vercel.app
     ```
   - **Authorized redirect URIs** - Tambahkan:
     ```
     http://localhost:3000/api/auth/callback/google
     https://smartgen-cvmaker-nobluu.vercel.app/api/auth/callback/google
     ```
   - Klik "Create"
   - **SIMPAN** Client ID dan Client Secret yang muncul

## Langkah 2: Update Environment Variables

### Untuk Development (Lokal)

Edit file `.env.local`:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=smartgen-cv-maker-secret-key-2024

# Ganti dengan credentials dari Google Cloud Console
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

### Untuk Production (Vercel)

1. Buka https://vercel.com/
2. Pilih project `smartgen-cvmaker`
3. Pergi ke "Settings" > "Environment Variables"
4. Tambahkan/Update variabel berikut:
   ```
   NEXTAUTH_URL=https://smartgen-cvmaker-nobluu.vercel.app
   NEXTAUTH_SECRET=088dcbabb335ac9bfc610fb0e91ba8a872becffd42f12192c1860686226485d6
   GOOGLE_CLIENT_ID=[Client ID dari Google Cloud Console]
   GOOGLE_CLIENT_SECRET=[Client Secret dari Google Cloud Console]
   ```
5. Klik "Save" untuk setiap variabel
6. Redeploy aplikasi (otomatis atau manual via Git push)

## Langkah 3: Testing

### Test Lokal
1. Jalankan development server:
   ```bash
   npm run dev
   ```
2. Buka http://localhost:3000
3. Klik tombol "Continue with Google"
4. Popup Google OAuth seharusnya muncul
5. Pilih akun Google Anda
6. Izinkan akses
7. Anda akan di-redirect kembali ke aplikasi

### Test Production
1. Buka https://smartgen-cvmaker-nobluu.vercel.app
2. Klik tombol "Continue with Google"
3. Popup/redirect Google OAuth seharusnya muncul
4. Login dengan akun Google

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Pastikan redirect URI di Google Cloud Console sudah benar:
  - `http://localhost:3000/api/auth/callback/google` (untuk lokal)
  - `https://smartgen-cvmaker-nobluu.vercel.app/api/auth/callback/google` (untuk production)

### "Error 401: invalid_client"
- Cek kembali GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET
- Pastikan tidak ada spasi atau karakter tambahan

### Popup tidak muncul
- Cek apakah browser memblokir popup
- Coba disable popup blocker untuk localhost dan domain Vercel
- Cek browser console untuk error messages

### "Access blocked: This app's request is invalid"
- Pastikan OAuth Consent Screen sudah disetup
- Tambahkan email Anda sebagai test user jika masih dalam mode External/Testing

## Credentials Saat Ini

**Client ID yang terdeteksi di .env.local:**
```
693210766579-fmjbca2efskp4rq4tr7hp13ufogii82f.apps.googleusercontent.com
```

**PENTING:** Pastikan redirect URIs berikut sudah ditambahkan di Google Cloud Console untuk Client ID di atas:
- `http://localhost:3000/api/auth/callback/google`
- `https://smartgen-cvmaker-nobluu.vercel.app/api/auth/callback/google`

## Catatan Keamanan

- Jangan commit file `.env.local` ke Git
- Jangan share Client Secret secara publik
- Gunakan environment variables yang berbeda untuk development dan production
- Rotate secrets secara berkala untuk keamanan
