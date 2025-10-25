# Vercel Environment Variables - Checklist

## ✅ Yang Harus Diset di Vercel Dashboard

Buka: https://vercel.com/ → Project `smartgen-cvmaker` → Settings → Environment Variables

### Required Variables:

1. **NEXTAUTH_URL**
   ```
   https://smartgen-cvmaker-nobluu.vercel.app
   ```
   ⚠️ PENTING: Tanpa trailing slash `/` di akhir

2. **NEXTAUTH_SECRET**
   ```
   088dcbabb335ac9bfc610fb0e91ba8a872becffd42f12192c1860686226485d6
   ```

3. **GOOGLE_CLIENT_ID**
   ```
   [Your Google Client ID from Google Cloud Console]
   ```
   ⚠️ Dapatkan dari Google Cloud Console > APIs & Services > Credentials

4. **GOOGLE_CLIENT_SECRET**
   ```
   [Your Google Client Secret from Google Cloud Console]
   ```
   ⚠️ Dapatkan dari Google Cloud Console > APIs & Services > Credentials

### Cara Set Environment Variables di Vercel:

1. Login ke https://vercel.com/
2. Pilih project: `smartgen-cvmaker`
3. Klik **"Settings"** di menu atas
4. Klik **"Environment Variables"** di sidebar kiri
5. Untuk setiap variable:
   - Klik **"Add New"**
   - Isi **Key** (nama variable, contoh: `NEXTAUTH_URL`)
   - Isi **Value** (nilai variable)
   - Pilih **Environment**: `Production`, `Preview`, dan `Development` (centang semua)
   - Klik **"Save"**
6. Setelah semua variable ditambahkan, **Redeploy** aplikasi

### Cara Redeploy Setelah Update Environment Variables:

**Opsi 1: Via Git Push (Otomatis)**
```bash
git add .
git commit -m "Update config"
git push
```

**Opsi 2: Via Vercel Dashboard (Manual)**
1. Pergi ke tab **"Deployments"**
2. Klik titik tiga (⋯) di deployment terakhir
3. Klik **"Redeploy"**
4. Centang **"Use existing Build Cache"** (JANGAN dicentang)
5. Klik **"Redeploy"**

## 🔍 Cara Verifikasi Setup Google OAuth

### 1. Cek di Google Cloud Console

URL: https://console.cloud.google.com/

1. Pilih project yang benar
2. Pergi ke **"APIs & Services" > "Credentials"**
3. Klik pada Client ID yang Anda gunakan
4. Pastikan **"Authorized redirect URIs"** berisi:
   ```
   https://smartgen-cvmaker-nobluu.vercel.app/api/auth/callback/google
   ```
5. Pastikan **"Authorized JavaScript origins"** berisi:
   ```
   https://smartgen-cvmaker-nobluu.vercel.app
   ```

### 2. Test Login Flow

1. Buka: https://smartgen-cvmaker-nobluu.vercel.app
2. Klik **"Continue with Google"**
3. **SEHARUSNYA** redirect ke halaman Google OAuth (accounts.google.com)
4. Pilih akun Google
5. **SEHARUSNYA** redirect kembali ke aplikasi dan masuk ke Dashboard

## 🐛 Troubleshooting

### Masalah: Redirect Loop (kembali ke halaman login terus)

**Penyebab:**
- `NEXTAUTH_URL` tidak sesuai dengan domain aktual
- Environment variables di Vercel belum di-save atau belum redeploy

**Solusi:**
1. Cek `NEXTAUTH_URL` di Vercel = `https://smartgen-cvmaker-nobluu.vercel.app` (tanpa `/` di akhir)
2. Redeploy aplikasi setelah update env vars

### Masalah: Error 400 - redirect_uri_mismatch

**Penyebab:**
- Redirect URI di Google Cloud Console tidak match

**Solusi:**
1. Buka Google Cloud Console
2. Tambahkan: `https://smartgen-cvmaker-nobluu.vercel.app/api/auth/callback/google`
3. Tunggu 5-10 menit untuk propagasi
4. Test lagi

### Masalah: Error 401 - invalid_client

**Penyebab:**
- GOOGLE_CLIENT_ID atau GOOGLE_CLIENT_SECRET salah

**Solusi:**
1. Copy ulang Client ID dan Client Secret dari Google Cloud Console
2. Update di Vercel Environment Variables
3. Redeploy

### Masalah: Popup Google tidak muncul

**Penyebab:**
- Browser memblokir popup
- JavaScript origins tidak diset

**Solusi:**
1. Disable popup blocker untuk domain Vercel
2. Pastikan `https://smartgen-cvmaker-nobluu.vercel.app` ada di "Authorized JavaScript origins"
3. Clear browser cache dan cookies

## 📝 Catatan Penting

- **JANGAN** commit file `.env.local` ke Git
- **JANGAN** share Client Secret secara publik
- Setelah update environment variables di Vercel, **WAJIB redeploy**
- Perubahan di Google Cloud Console bisa butuh 5-10 menit untuk aktif
- Test di incognito/private window untuk menghindari cache issue
