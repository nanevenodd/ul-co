# 🚀 UL.CO Deployment Guide

## Vercel Environment Variables Setup

Untuk men-deploy ke Vercel, Anda harus mengatur environment variables berikut di Vercel Dashboard:

### 📋 Required Environment Variables

1. **NEXTAUTH_SECRET** (CRITICAL!)
   ```
   xzEYWaikcfhmK8bn+yUifBU5MFV8NG7uXI9oEG7egaE=
   ```
   
2. **NEXTAUTH_URL** (akan otomatis di-set Vercel, tapi bisa manual juga)
   ```
   https://ul-co.vercel.app
   ```

3. **ADMIN_EMAIL**
   ```
   admin@ulco.com
   ```

4. **ADMIN_PASSWORD**
   ```
   admin123
   ```

5. **DATABASE_URL** (jika menggunakan database eksternal)
   ```
   postgresql://user:password@host:5432/database
   ```

## 🔧 Cara Setting di Vercel

### Method 1: Via Vercel Dashboard
1. Buka https://vercel.com/dashboard
2. Pilih project `ul-co`
3. Go to **Settings** → **Environment Variables**
4. Add variables satu per satu:
   - Name: `NEXTAUTH_SECRET`
   - Value: `xzEYWaikcfhmK8bn+yUifBU5MFV8NG7uXI9oEG7egaE=`
   - Environment: **Production, Preview, Development**

### Method 2: Via Vercel CLI
```bash
npx vercel env add NEXTAUTH_SECRET
# Paste: xzEYWaikcfhmK8bn+yUifBU5MFV8NG7egaE=

npx vercel env add ADMIN_EMAIL  
# Paste: admin@ulco.com

npx vercel env add ADMIN_PASSWORD
# Paste: admin123
```

### Method 3: Auto Import dari .env.local
```bash
npx vercel env pull .env.vercel
npx vercel env add < .env.local
```

## 🚨 Critical Fix Needed

**Error yang Anda alami**: `[NO_SECRET] Please define a secret in production`

**Root Cause**: NEXTAUTH_SECRET tidak ter-set di Vercel environment

**Quick Fix**: 
1. Login ke Vercel Dashboard
2. Project Settings → Environment Variables  
3. Add `NEXTAUTH_SECRET` = `xzEYWaikcfhmK8bn+yUifBU5MFV8NG7uXI9oEG7egaE=`
4. Redeploy project

## 🔄 Redeploy After Setting Variables

Setelah menambah environment variables:

```bash
# Method 1: Git push (trigger auto deploy)
git add .
git commit -m "Add deployment guide"
git push origin master

# Method 2: Manual redeploy
npx vercel --prod
```

## 🧪 Testing

Setelah deploy:
1. Buka https://ul-co.vercel.app
2. Coba akses `/admin/login`
3. Login dengan credentials di atas
4. Pastikan tidak ada error NO_SECRET

## 📝 Production Checklist

- [ ] NEXTAUTH_SECRET set di Vercel
- [ ] ADMIN_EMAIL set di Vercel  
- [ ] ADMIN_PASSWORD set di Vercel
- [ ] NEXTAUTH_URL otomatis ter-set oleh Vercel
- [ ] Project dapat di-build tanpa error
- [ ] Admin login berfungsi
- [ ] Public pages accessible

## 🆘 Troubleshooting

### Jika masih error setelah set environment variables:
1. **Check Vercel Logs**: Functions → View Function Logs
2. **Verify Variables**: Settings → Environment Variables
3. **Force Redeploy**: Deployments → Redeploy latest
4. **Check Build Logs**: Deployments → Click latest deployment

### Common Issues:
- **Secret not found**: Variable name salah atau typo
- **Still NO_SECRET**: Belum redeploy setelah add variables
- **Auth not working**: NEXTAUTH_URL tidak sesuai domain

## 🔒 Security Notes

- Ganti ADMIN_PASSWORD setelah first login
- NEXTAUTH_SECRET harus minimum 32 characters
- Jangan commit secrets ke Git
- Use environment-specific secrets untuk dev/prod