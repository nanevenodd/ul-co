# Auto-commit uploads PowerShell script
# This script will automatically add and commit any new uploads

Write-Host "🔍 Checking for new uploads..." -ForegroundColor Cyan

# Check if there are any new files in public/uploads/
$uploadStatus = git status --porcelain public/uploads/

if ($uploadStatus) {
    Write-Host "📁 New uploads found! Adding to git..." -ForegroundColor Green
    
    # Add all uploads
    git add public/uploads/
    
    # Get the count of new files
    $newFilesCount = ($uploadStatus | Measure-Object).Count
    $currentDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    # Commit with descriptive message
    $commitMessage = @"
feat: Add $newFilesCount new uploaded image(s)

- Auto-committed uploads via admin dashboard  
- Files uploaded: $currentDate
"@
    
    git commit -m $commitMessage
    
    Write-Host "✅ Successfully committed $newFilesCount upload(s)" -ForegroundColor Green
    
    # Ask if user wants to push
    $push = Read-Host "🚀 Push to GitHub now? (y/n)"
    if ($push -eq "y" -or $push -eq "Y") {
        git push origin master
        Write-Host "✅ Pushed to GitHub successfully!" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Files committed locally. Run 'git push' when ready." -ForegroundColor Yellow
    }
} else {
    Write-Host "ℹ️  No new uploads found." -ForegroundColor Yellow
}