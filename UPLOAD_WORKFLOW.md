# Git Push with Uploads Workflow

## How It Works

When you work with UL.CO admin dashboard and upload images, this setup ensures all your uploaded images are automatically included when you push to GitHub.

## Workflow

### 1. Normal Development

```bash
# Work normally in admin dashboard
# Upload images via admin interface
# Edit content, collections, etc.
```

### 2. When Ready to Push

```bash
# Option A: Use npm script (recommended)
npm run push

# Option B: Manual git commands
git add .
git commit -m "feat: Update content and uploads"
git push origin master
```

## What Happens Automatically

1. **During Upload**: Images are automatically staged (`git add`) but NOT pushed
2. **During Push**: All changes including images are committed together
3. **Vercel Deployment**: Triggers automatically after push

## Available Commands

```bash
# Push everything (content + uploads)
npm run push

# Push only new uploads
npm run push-uploads

# Check upload status
npm run check-uploads

# Manual commit just uploads
npm run commit-uploads
```

## Benefits

✅ **No Heavy Auto-Push**: Images aren't pushed immediately after upload
✅ **Clean History**: All related changes (content + images) in one commit  
✅ **Vercel Friendly**: Single deployment trigger instead of multiple
✅ **Manual Control**: You decide when to push to production

## File Structure

```
public/uploads/
├── hero-1234567890.jpg     # Auto-staged when uploaded
├── hero-1234567891.png     # Auto-staged when uploaded
└── hero-1234567892.jpg     # Auto-staged when uploaded
```

## Troubleshooting

If uploads aren't being included:

```bash
# Check what's staged
git status

# Manually add uploads
git add public/uploads/

# Then push normally
git push origin master
```
