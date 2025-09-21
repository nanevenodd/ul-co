#!/bin/bash
# Auto-commit uploads script
# This script will automatically add and commit any new uploads

echo "🔍 Checking for new uploads..."

# Check if there are any new files in public/uploads/
if [ -n "$(git status --porcelain public/uploads/)" ]; then
    echo "📁 New uploads found! Adding to git..."
    
    # Add all uploads
    git add public/uploads/
    
    # Get the count of new files
    NEW_FILES=$(git status --porcelain public/uploads/ | wc -l)
    
    # Commit with descriptive message
    git commit -m "feat: Add $NEW_FILES new uploaded image(s)

- Auto-committed uploads via admin dashboard
- Files uploaded: $(date)"
    
    echo "✅ Successfully committed $NEW_FILES upload(s)"
    
    # Ask if user wants to push
    read -p "🚀 Push to GitHub now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push origin master
        echo "✅ Pushed to GitHub successfully!"
    else
        echo "ℹ️  Files committed locally. Run 'git push' when ready."
    fi
else
    echo "ℹ️  No new uploads found."
fi