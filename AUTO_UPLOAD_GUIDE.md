# Auto-Upload to GitHub Guide

This project is configured to automatically track and commit uploaded images to GitHub.

## How It Works

### 1. Automatic Git Tracking

- All uploads in `public/uploads/` are now tracked by git (modified `.gitignore`)
- When you upload images via admin dashboard, they're automatically added to git staging

### 2. Available Commands

#### Quick Commit Uploads Only

```bash
npm run commit-uploads
```

This will:

- Check for new uploads
- Add them to git
- Commit with descriptive message
- Ask if you want to push to GitHub

#### Commit Everything (Content + Uploads)

```bash
npm run push-all
```

This will:

- Add all changes (content.json + uploads)
- Commit everything
- Push to GitHub automatically

#### Manual Scripts

```bash
# Windows PowerShell
.\scripts\auto-commit-uploads.ps1

# Linux/Mac Bash
./scripts/auto-commit-uploads.sh
```

### 3. Automatic Git Add on Upload

- Upload API automatically runs `git add` for new uploaded files
- Files are staged immediately after successful upload
- You just need to commit and push when ready

## Workflow Examples

### Scenario 1: Upload New Images

1. Upload images via admin dashboard ✅ (auto git-added)
2. Add products with those images ✅ (content.json changes)
3. Run: `npm run push-all` ✅ (commits and pushes everything)

### Scenario 2: Just Upload Images (No Content Changes)

1. Upload images via admin dashboard ✅ (auto git-added)
2. Run: `npm run commit-uploads` ✅ (commits just uploads)

### Scenario 3: Regular Development

1. Make code changes
2. Upload new images via admin
3. Update content via admin
4. Run: `git add . && git commit -m "Update content and uploads" && git push`

## Benefits

✅ **Never lose uploads** - All images tracked in git
✅ **Vercel compatibility** - Images available in production
✅ **Automatic staging** - Upload API adds files to git
✅ **Convenient commands** - Easy npm scripts
✅ **Descriptive commits** - Auto-generated commit messages

## Files Changed

- `.gitignore` - Now allows uploads to be tracked
- `src/app/api/upload/route.ts` - Auto git-add on upload
- `scripts/auto-commit-uploads.ps1` - PowerShell script
- `scripts/auto-commit-uploads.sh` - Bash script
- `package.json` - Added npm scripts

## Production Deployment

After uploading images and updating content:

```bash
# Option 1: Quick push everything
npm run push-all

# Option 2: Manual control
npm run commit-uploads  # First commit uploads
git add src/data/content.json  # Then add content changes
git commit -m "Update collections and add new products"
git push origin master

# Option 3: Deploy to Vercel
npm run deploy  # Builds and deploys to Vercel
```

Your images will now be available in production at `https://your-app.vercel.app/uploads/filename.jpg`!
