# UL.CO Fashion Designer Portfolio

Portfolio website untuk Taruli Pasaribu (UL.CO) - Fashion designer yang menghadirkan fashion berbasis kain ulos dengan desain modern dan berkelanjutan.

## Tech Stack

- **Next.js 14** dengan TypeScript
- **Tailwind CSS** untuk styling
- **Prisma** dengan PostgreSQL untuk database
- **NextAuth.js** untuk authentication
- **React Hook Form + Zod** untuk form validation
- **Uploadthing** untuk file uploads (opsional)

## Fitur

### Website Publik

- **Home**: Hero section, design philosophy, featured collections, FAQ, CTA
- **Portfolio**: Collection gallery dengan filter dan detail view
- **About**: Profil designer, experience, awards, philosophy
- **FAQ**: Frequently Asked Questions
- **Contact**: Form kontak, informasi kontak, social media

### Admin Dashboard

- Login system yang aman
- Full CRUD untuk semua konten
- Management collections, FAQ, awards
- Upload dan management gambar
- Content editor untuk semua section

## Setup Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Buat database PostgreSQL dan update file `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ulco_portfolio"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@ulco.com"
ADMIN_PASSWORD="your-admin-password"
```

### 3. Generate NextAuth Secret

```bash
# Generate secure secret for production
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Generate Prisma Client dan Push Schema

```bash
npm run db:generate
npm run db:push
```

### 4. Seed Database dengan Data Awal

```bash
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment ke Vercel

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap deployment ke Vercel.

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔑 Admin Access

- **URL**: `/admin/login`
- **Email**: sesuai `ADMIN_EMAIL` di environment variables
- **Password**: sesuai `ADMIN_PASSWORD` di environment variables

## 📋 Features Completed

✅ **Homepage** - Hero, Philosophy, Featured Collections, FAQ, CTA
✅ **Portfolio** - Collection gallery dengan filter kategori
✅ **About** - Profile designer, awards, philosophy
✅ **FAQ** - Frequently Asked Questions dengan accordion
✅ **Contact** - Contact form dan informasi kontak
✅ **Admin Dashboard** - Protected admin area dengan authentication
✅ **Database Schema** - Prisma dengan PostgreSQL
✅ **API Endpoints** - RESTful API untuk content management
✅ **Responsive Design** - Mobile-first design dengan Tailwind CSS
✅ **Build System** - Optimized untuk production deployment
✅ **Environment Config** - Ready untuk deployment ke Vercel

## 🎨 Brand Guidelines

- **Brand Name**: UL.CO
- **Designer**: Taruli Pasaribu
- **Brand Color**: #921e27
- **Description**: Fashion berbasis kain ulos dengan desain modern dan berkelanjutan

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Optimized for Vercel
- **Forms**: React Hook Form with Zod validation

## 📱 Pages Structure

### Public Pages

- `/` - Homepage dengan hero dan featured collections
- `/portfolio` - Gallery koleksi dengan filter kategori
- `/about` - Profile designer dan filosofi desain
- `/faq` - Frequently Asked Questions
- `/contact` - Contact form dan informasi kontak

### Admin Pages

- `/admin/login` - Admin authentication
- `/admin/dashboard` - Admin dashboard overview
- `/admin/dashboard/collections` - Manage collections
- `/admin/dashboard/*` - Other content management pages

## 🔄 Development Workflow

1. Make changes to code
2. Test locally with `npm run dev`
3. Build and test: `npm run build`
4. Deploy to Vercel: `vercel --prod`

## 🆘 Support & Maintenance

Untuk update, maintenance, atau troubleshooting:

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) untuk deployment issues
2. Check logs di Vercel dashboard untuk production errors
3. Ensure environment variables are properly set
4. Verify database connection and schema

Website ini ready untuk production dan dapat langsung di-deploy ke Vercel! 🎉

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
