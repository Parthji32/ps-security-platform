#!/usr/bin/env pwsh

Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Push to GitHub - PS Website                   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "  Download from: https://git-scm.com/download/win`n"
    exit 1
}

Write-Host "✓ Git found`n"

# Ask for GitHub URL
Write-Host "First, create a repository on GitHub:" -ForegroundColor Yellow
Write-Host "  1. Go to https://github.com/new"
Write-Host "  2. Name it: ps-website"
Write-Host "  3. Click 'Create repository'"
Write-Host "  4. Copy the HTTPS URL`n"

$repoUrl = Read-Host "Paste your GitHub repository URL"

if (-not $repoUrl -or -not $repoUrl.Contains("github.com")) {
    Write-Host "`n✗ Invalid GitHub URL!" -ForegroundColor Red
    exit 1
}

Write-Host "`n⏳ Initializing git repository...`n"

# Initialize git
git init | Out-Null
git config user.email "dev@ps.io"
git config user.name "PS Developer"

# Add all files
Write-Host "📦 Staging files..."
git add .

# Check if there are changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "✗ No files to commit!" -ForegroundColor Red
    exit 1
}

# First commit
Write-Host "💾 Creating first commit..."
git commit -m "Initial commit: PS website with 3 pages, API, docs, deployment configs" | Out-Null

# Add remote
Write-Host "🔗 Adding remote repository..."
git remote add origin $repoUrl 2>$null

# Push to GitHub
Write-Host "`n⬆️  Pushing to GitHub..."
Write-Host "   (You may be prompted to login on GitHub...)`n"

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✓ Successfully pushed to GitHub!              ║" -ForegroundColor Green
    Write-Host "╠════════════════════════════════════════════════╣" -ForegroundColor Green
    Write-Host "║  📍 Repository: $repoUrl" -ForegroundColor Green
    Write-Host "║                                                ║" -ForegroundColor Green
    Write-Host "║  Next steps:                                   ║" -ForegroundColor Green
    Write-Host "║  1. Go to your repo on GitHub                 ║" -ForegroundColor Green
    Write-Host "║  2. Deploy to Vercel or Netlify               ║" -ForegroundColor Green
    Write-Host "║  3. Your site will be live in minutes!        ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════╝`n" -ForegroundColor Green
} else {
    Write-Host "`n✗ Failed to push to GitHub!" -ForegroundColor Red
    Write-Host "  Make sure you created the repo on GitHub first`n"
    exit 1
}
