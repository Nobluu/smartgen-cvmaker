# Quick Deploy Commands (Ringkasan)

## 1️⃣ Install Git (jika belum)
```powershell
winget install --id Git.Git -e --source winget
```
Restart terminal setelah install.

## 2️⃣ Setup Git & Push ke GitHub
```powershell
# Di folder D:\SmartGenCVMaker
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## 3️⃣ Deploy di Vercel
1. Buka https://vercel.com
2. Login with GitHub
3. Import repository
4. Set environment variables (lihat DEPLOY_VERCEL.md)
5. Deploy!

**URL hasil:** `https://project-name.vercel.app`

---

Untuk panduan lengkap, buka file: **DEPLOY_VERCEL.md**
