# Push to GitHub — Quick Setup

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) (login/signup if needed)
2. Click **"New"** (top left) → Create new repository
3. Name it: `ps-website`
4. Description: `PS Security - Deception Platform Website`
5. Click **"Create repository"**
6. Copy the URL (will be like `https://github.com/YOUR_USERNAME/ps-website.git`)

---

## Step 2: Initialize Git Locally

Open PowerShell in `E:\demo`:

```powershell
# Navigate to demo folder
cd E:\demo

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: PS website with 3 pages, API, docs"

# Add remote (replace URL with your repo URL from Step 1)
git remote add origin https://github.com/YOUR_USERNAME/ps-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Verify on GitHub

1. Refresh [github.com/YOUR_USERNAME/ps-website](https://github.com/YOUR_USERNAME/ps-website)
2. All files should be visible
3. Done! ✓

---

## Next: Deploy from GitHub

Once files are on GitHub, you can:

### Option A: Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect GitHub → Select `ps-website` repo
4. Click Deploy
5. Live in 30 seconds! ✓

### Option B: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub → Select `ps-website`
4. Click Deploy
5. Live instantly! ✓

---

**Questions?** Let me know your GitHub username and I'll guide you through the rest!
