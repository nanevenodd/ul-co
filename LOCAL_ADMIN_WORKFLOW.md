# Local Development Workflow for Admin Dashboard

## Overview

Since Vercel serverless environment has read-only filesystem limitations, the admin dashboard CRUD operations work perfectly in local development but fail in production. This document outlines the recommended workflow for managing content.

## ✅ What Works in Production (Vercel)

- **Public Website**: All portfolio pages, collections, and product displays
- **Image Assets**: All images stored in `/public` directory
- **Authentication**: NextAuth.js login/logout functionality
- **Data Reading**: All GET requests work perfectly

## ❌ What Doesn't Work in Production (Vercel)

- **Admin CRUD Operations**: Create, Update, Delete operations fail due to filesystem write restrictions
- **Content Management**: Adding new products/collections through admin interface

## 🏠 Recommended Workflow: Local Admin Management

### Step 1: Run Admin Dashboard Locally

```bash
# Navigate to project directory
cd c:\xampp\htdocs\ul-co

# Start development server
npm run dev

# Access admin dashboard
# Visit: http://localhost:3000/admin/dashboard
```

### Step 2: Manage Content Locally

1. **Login to Admin Dashboard**: Use credentials from `.env.local`

   - Email: `admin@ulco.com`
   - Password: `admin123`

2. **Manage Collections & Products**:

   - ✅ Create new collections
   - ✅ Add products to collections
   - ✅ Update product details (name, description, price, images)
   - ✅ Delete products/collections
   - ✅ Set featured products

3. **Upload Images**: Place product images in `/public/uploads/` directory
   - Use consistent naming: `product-id-1.jpg`, `product-id-2.jpg`
   - Images will be automatically available in production after push

### Step 3: Push Changes to Production

```bash
# Add all changes to git
git add .

# Commit with descriptive message
git commit -m "Update: Add new products and collections

- Added [collection name] with [X] products
- Updated product descriptions and pricing
- Added new product images"

# Push to GitHub (triggers Vercel deployment)
git push origin master
```

### Step 4: Verify Production Deployment

1. Wait for Vercel deployment to complete (~2-3 minutes)
2. Visit production site: `https://ul-co.vercel.app`
3. Verify new content appears correctly
4. Check that images load properly

## 📁 File Structure

```
ul-co/
├── src/
│   ├── data/
│   │   └── content.json          # All collections & products data
│   └── app/
│       ├── api/
│       │   └── collections/      # API routes (work locally only)
│       └── admin/                # Admin dashboard (local only)
└── public/
    └── uploads/                  # Product images (deployed to production)
```

## 🔧 Content Data Format

The `content.json` file stores all collections and products:

```json
{
  "collections": {
    "marparbuei": {
      "id": "marparbuei",
      "name": "Marparbuei",
      "description": "Traditional collection...",
      "image": "/collections/marparbuei.jpg",
      "products": [
        {
          "id": "mp001",
          "name": "Product Name",
          "description": "Product description",
          "price": "IDR 750,000",
          "images": ["/products/mp001-1.jpg", "/products/mp001-2.jpg"],
          "materials": ["Cotton", "Silk"],
          "sizes": ["S", "M", "L"],
          "colors": ["Red", "Blue"],
          "featured": true
        }
      ]
    }
  }
}
```

## 🚀 Quick Commands

### Start Local Development

```bash
npm run dev
```

### Access Admin Dashboard

```
http://localhost:3000/admin/dashboard
```

### Deploy to Production

```bash
git add . && git commit -m "Update content" && git push origin master
```

## 🔍 Troubleshooting

### Issue: Admin Dashboard Not Loading

- **Solution**: Ensure development server is running (`npm run dev`)
- **Check**: Verify you're accessing `http://localhost:3000/admin`

### Issue: Login Not Working

- **Solution**: Check credentials in `.env.local` file
- **Default**: Email: `admin@ulco.com`, Password: `admin123`

### Issue: Images Not Showing

- **Solution**: Place images in `/public/uploads/` directory
- **Important**: Commit and push images to Git for production availability

### Issue: Changes Not Reflecting in Production

- **Solution**: Ensure you've committed and pushed changes to GitHub
- **Check**: Verify Vercel deployment completed successfully

## 💡 Best Practices

1. **Regular Backups**: The `content.json` file contains all your data - keep it backed up
2. **Image Organization**: Use consistent naming for product images
3. **Testing**: Always test changes locally before pushing to production
4. **Git Commits**: Use descriptive commit messages for content updates
5. **Staging**: Consider creating a staging branch for major changes

## 🎯 Future Enhancements (Optional)

If you need production admin functionality in the future, consider:

- **Database Integration**: PostgreSQL with Prisma ORM
- **Headless CMS**: Sanity, Strapi, or Contentful
- **Vercel KV**: Redis-compatible key-value store
- **External API**: Custom backend with database

For now, the local development workflow provides full admin functionality while maintaining a fast, reliable production site.

## 📞 Support

If you encounter any issues with this workflow, refer to:

- `VERCEL_ISSUES.md` for technical details about Vercel limitations
- `README.md` for general setup instructions
- `DEPLOYMENT_GUIDE.md` for deployment troubleshooting
