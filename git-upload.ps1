# Git Workflow Script for Uploading to Branch
# Run this script in PowerShell after stopping the dev server (Ctrl+C)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Git Upload Workflow Guide" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
Set-Location "d:\asad un\semester 5\Website\website"

# Step 1: Check current branch
Write-Host "Step 1: Checking current branch..." -ForegroundColor Yellow
git branch
Write-Host ""

# Step 2: Add all changes
Write-Host "Step 2: Adding all changes to staging..." -ForegroundColor Yellow
git add .
Write-Host "Files added to staging!" -ForegroundColor Green
Write-Host ""

# Step 3: Show status
Write-Host "Step 3: Showing git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 4: Commit with message
Write-Host "Step 4: Committing changes..." -ForegroundColor Yellow
$commitMessage = "✨ Enhanced UI: Professional design for supplements and trainers pages with animations"
git commit -m $commitMessage
Write-Host "Changes committed!" -ForegroundColor Green
Write-Host ""

# Step 5: Push to branch
Write-Host "Step 5: Pushing to remote branch..." -ForegroundColor Yellow
Write-Host "Getting current branch name..." -ForegroundColor Gray
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Pushing to branch: $currentBranch" -ForegroundColor Cyan
git push origin $currentBranch
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Upload Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to your GitHub repository" -ForegroundColor White
Write-Host "2. You should see a prompt to create a Pull Request" -ForegroundColor White
Write-Host "3. Review the changes and merge if everything looks good" -ForegroundColor White
