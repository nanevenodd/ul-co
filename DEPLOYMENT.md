# UL.CO Deployment Guide

## 🚀 Deploy ke Vercel (Recommended)

### Prerequisites

1. Akun [Vercel](https://vercel.com)
2. Akun [GitHub](https://github.com) (opsional tapi recommended)
3. Database PostgreSQL (Vercel Postgres recommended)

### Step 1: Setup Database di Vercel

1. Login ke Vercel Dashboard
2. Klik "Storage" → "Create Database"
3. Pilih "Postgres"
4. Berikan nama database: `ulco-portfolio`
5. Pilih region terdekat
6. Copy `DATABASE_URL` yang diberikan

### Step 2: Setup Environment Variables

Di Vercel Dashboard, masuk ke project settings dan tambahkan environment variables berikut:

```env
DATABASE_URL=your_vercel_postgres_connection_string
NEXTAUTH_SECRET=your_random_secret_key_32_characters
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@ulco.com
ADMIN_PASSWORD=your_secure_admin_password
NEXT_PUBLIC_BRAND_NAME=UL.CO
NEXT_PUBLIC_BRAND_COLOR=#921e27
NEXT_PUBLIC_DESIGNER_NAME=Taruli Pasaribu
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### Step 3: Deploy via GitHub (Recommended)

1. Push code ke GitHub repository
2. Connect repository ke Vercel
3. Vercel akan auto-deploy ketika ada push ke main branch

### Step 4: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 5: Setup Database

Setelah deployment pertama berhasil:

```bash
# Pull environment variables
vercel env pull .env.production.local

# Push database schema
npx prisma db push

# Seed initial data
npx prisma db seed
```

### Step 6: Verifikasi Deployment

1. Kunjungi URL production
2. Test admin login: `https://your-domain.vercel.app/admin/login`
3. Pastikan semua halaman berfungsi dengan baik

## 🔧 Environment Variables Explanation

| Variable          | Description                  | Example                   |
| ----------------- | ---------------------------- | ------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string | `postgresql://...`        |
| `NEXTAUTH_SECRET` | Secret key for JWT tokens    | `random32characterstring` |
| `NEXTAUTH_URL`    | Base URL of your app         | `https://ulco.vercel.app` |
| `ADMIN_EMAIL`     | Admin login email            | `admin@ulco.com`          |
| `ADMIN_PASSWORD`  | Admin login password         | `SecurePassword123!`      |

## 📦 Alternative Deployment Options

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### Railway

1. Connect GitHub repository
2. Set environment variables
3. Railway will auto-deploy

### Self-hosted (VPS/Docker)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Build Errors

- Pastikan semua environment variables sudah diset
- Check Prisma schema validation
- Verify database connection

### Database Issues

- Pastikan DATABASE_URL format benar
- Check database permissions
- Verify Prisma schema is pushed

### Authentication Issues

- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Ensure admin credentials are correct

## 📈 Post-Deployment

### Performance Monitoring

- Setup Vercel Analytics
- Monitor Core Web Vitals
- Check database performance

### Security

- Rotate NEXTAUTH_SECRET periodically
- Use strong admin passwords
- Enable 2FA if available

### Backups

- Setup regular database backups
- Export environment variables
- Keep deployment scripts updated

## 🔄 Update Process

1. Make changes locally
2. Test thoroughly
3. Push to GitHub
4. Vercel auto-deploys
5. Verify changes in production

For urgent fixes:

```bash
vercel --prod
```
