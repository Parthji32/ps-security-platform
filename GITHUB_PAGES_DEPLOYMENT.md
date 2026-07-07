# 🚀 Deploy to GitHub Pages (.github.io) — FREE FOREVER

**Get your PS Security Platform live at: `https://YOUR_USERNAME.github.io/ps-security-platform`**

---

## ✅ What You Get

- ✅ **FREE** forever (no credit card ever)
- ✅ **HTTPS/SSL** included (automatic)
- ✅ **Global CDN** (fast worldwide)
- ✅ **Professional URL**: `https://parthji32.github.io/ps-security-platform`
- ✅ **Custom domain later** (if you want ps.io later, just add it)
- ✅ **No monthly costs**

---

## 📋 Three-Step Setup

### STEP 1: Create Unified Repository (If Not Done Yet)

**Go to GitHub:**
1. https://github.com/new
2. Create repo:
   - **Name:** `ps-security-platform`
   - **Description:** PS Security Platform - Deception Security
   - **Public** ✓
   - Click "Create"

### STEP 2: Push Unified Repository to GitHub

**In PowerShell (from E:\demo):**

```powershell
# Navigate to demo
cd E:\demo

# If not already a git repo:
git init
git config user.name "Parth Jindal"
git config user.email "jindalparth376@gmail.com"

# Add remote (use YOUR GitHub URL)
git remote add origin https://github.com/Parthji32/ps-security-platform.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: PS Security Platform
- Website (HTML + Express backend)
- Kavach v2 (Go + Python agents)
- Complete documentation
- Docker setup"

# Push to GitHub
git branch -M main
git push -u origin main
```

**Wait for upload to complete ✓**

---

### STEP 3: Enable GitHub Pages

**Go to GitHub Repository Settings:**

1. Open: https://github.com/Parthji32/ps-security-platform
2. Click **Settings** (top right)
3. Left sidebar → **Pages**
4. Under "Build and deployment":
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select "main" and folder "/root" or "/docs"
   - Click **Save**

**⚠️ IMPORTANT: Choose the Right Folder**

**Option A: If using `/website` folder (RECOMMENDED)**
```
Set source to: main / docs folder

Then create /docs folder in root:
mkdir docs
Copy website files into docs/
- docs/index.html
- docs/kavach-product-page-unified.html
- docs/Kavach-Dashboard-Unified.html
- docs/api.js
- docs/server.js
- docs/package.json
```

**Option B: If all files in root**
```
Set source to: main / (root)

Files at root level:
- index.html
- kavach-product-page-unified.html
- api.js
- etc.
```

---

## 🎯 Choose Your Setup

### SETUP 1: Simple (Files in Root)

**Best if:** You want everything in one place

```powershell
# In E:\demo, make sure these exist in root:
- index.html
- kavach-product-page-unified.html
- Kavach-Dashboard-Unified.html
- api.js
- server.js
- package.json

# GitHub Pages settings:
Source: main / (root)

# Result:
URL: https://parthji32.github.io/ps-security-platform
```

### SETUP 2: Organized (Website in /website, v2 in /kavach-v2)

**Best if:** You want clear folder structure

**File structure:**
```
ps-security-platform/
├── website/
│   ├── index.html
│   ├── kavach-product-page-unified.html
│   ├── Kavach-Dashboard-Unified.html
│   ├── api.js
│   └── server.js
├── kavach-v2/
│   ├── backend/
│   ├── agents/
│   └── README.md
├── docs/
│   └── USER_GUIDE_DETAILED.md
└── README.md
```

**Create /docs folder for GitHub Pages:**
```powershell
mkdir docs
Copy-Item website/* docs/ -Recurse

# GitHub Pages settings:
Source: main / docs folder

# Result:
URL: https://parthji32.github.io/ps-security-platform
```

---

## 📱 After Setup: Your Live Site

**Website will be live at:**
```
https://parthji32.github.io/ps-security-platform
```

**What people can access:**
- ✅ Homepage (index.html)
- ✅ Kavach v2 Product Page
- ✅ Dashboard UI
- ✅ All static assets

**What won't work:**
- ❌ Backend API (api.js) — GitHub Pages doesn't run Node.js servers
- ❌ Form submissions — No backend to process them
- ❌ Real Kavach v2 metrics — Need to point to AWS backend

---

## 🔌 Connect to Kavach v2 Backend (AWS)

**Your Kavach v2 is already running on AWS at: `3.80.122.16:3000`**

**Update Dashboard to Call Real Backend:**

**In `Kavach-Dashboard-Unified.html`, add:**

```javascript
// Fetch real v2 metrics from AWS
const API_BASE = "http://3.80.122.16:3000";

// Fetch classification metrics
async function updateMetrics() {
  try {
    const response = await fetch(`${API_BASE}/api/metrics`);
    const data = await response.json();
    
    // Update dashboard with real data
    document.getElementById('total-requests').textContent = data.totalRequests;
    document.getElementById('attacks-blocked').textContent = data.attacksBlocked;
    document.getElementById('honeypots-active').textContent = data.honeypotsActive;
  } catch (error) {
    console.log('Using demo data (AWS v2 not available)');
  }
}

// Call every 5 seconds
setInterval(updateMetrics, 5000);
```

---

## ⏱️ Timeline

```
Step 1 (Push to GitHub):    5 minutes
Step 2 (Enable Pages):      2 minutes
Step 3 (DNS propagation):   2-3 minutes
─────────────────────────────────
Total:                      10 minutes

🎉 LIVE! Your site is on the internet!
```

---

## ✅ Success Checklist

After deployment:

- [ ] Repository visible at GitHub
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] Website loads at `https://parthji32.github.io/ps-security-platform`
- [ ] All pages work (Homepage, Product, Dashboard)
- [ ] Mobile responsive (test with F12)
- [ ] Animations smooth
- [ ] Links internal navigation work
- [ ] No 404 errors

---

## 🔄 How to Update Your Site

**Every time you make changes:**

```powershell
cd E:\demo

# Edit files as needed
# ... make changes to index.html, etc ...

# Commit and push
git add .
git commit -m "Update: [describe changes]"
git push origin main

# GitHub Pages auto-deploys (30 seconds)
# Check your site at: https://parthji32.github.io/ps-security-platform
```

---

## ⚠️ Limitations (GitHub Pages)

**What works:**
- ✅ Static HTML/CSS/JS
- ✅ Images, videos, fonts
- ✅ Client-side JavaScript
- ✅ Fetch external APIs (like your AWS Kavach v2)

**What doesn't work:**
- ❌ Node.js/Express backend (no server-side code)
- ❌ Form submissions (no backend)
- ❌ Server-side rendering
- ❌ Database operations

**Solution:** Your backend API calls go to AWS (Kavach v2 at 3.80.122.16:3000)

---

## 🎯 Complete Architecture

```
GITHUB PAGES (Static Website)
https://parthji32.github.io/ps-security-platform
├─ index.html (Homepage)
├─ kavach-product-page-unified.html
├─ Kavach-Dashboard-Unified.html
└─ CSS + Client-side JS

         ↓ (API calls via fetch)

AWS EC2 (Kavach v2 Backend)
http://3.80.122.16:3000
├─ Go Reverse Proxy (Port 3000)
├─ Token Manager (Port 5001)
├─ Website Generator (Port 5002)
└─ ML Classifier + Honeypots

RESULT:
Frontend on GitHub (FREE)
Backend on AWS (already running)
One unified product!
```

---

## 📱 Share Your Live Site

Once deployed:

```
🎉 PS Security Platform is LIVE!

Website: https://parthji32.github.io/ps-security-platform

Check it out:
- Homepage (hero, products, stats)
- Kavach v2 product page
- Interactive dashboard (connects to AWS backend)

GitHub: https://github.com/Parthji32/ps-security-platform
```

---

## 🚀 Next Steps

1. ✅ Push to GitHub (5 min)
2. ✅ Enable GitHub Pages (2 min)
3. ✅ Test website (5 min)
4. ✅ Share link (1 min)
5. ⏰ (Optional) Add custom domain later ($12/year)

---

## 💡 Optional: Add Custom Domain Later

If you want `ps.io` instead of `github.io`:

1. Buy domain at Namecheap ($12/year)
2. GitHub Pages Settings → Custom Domain → Enter `ps.io`
3. Update DNS at registrar (GitHub shows instructions)
4. Done! Site lives at `https://ps.io`

**But for now, `github.io` is perfect and FREE!**

---

## 📞 Troubleshooting

### "Build failed" on GitHub Pages
```
Solution: Check GitHub Pages settings
- Settings → Pages
- Source should be "Deploy from a branch"
- Branch: main
- Folder: root (or docs)
```

### "404 - Page not found"
```
Solution: 
- Make sure index.html exists in root (or /docs)
- Check capitalization of filenames
- Verify GitHub Pages is enabled
```

### "Page looks broken"
```
Solution:
- Hard refresh: Ctrl+Shift+R
- Check browser console (F12)
- Verify all CSS/JS files are linked correctly
```

### "Changes not showing"
```
Solution:
- GitHub Pages takes 30 seconds to deploy
- Force refresh: Ctrl+Shift+R
- Check git push was successful: git status
```

---

## 🎉 You're All Set!

**Your PS Security Platform is now:**
- ✅ On GitHub (free version control)
- ✅ Live on the internet (GitHub Pages)
- ✅ Connected to AWS backend (Kavach v2)
- ✅ Completely free forever
- ✅ Professional looking

**No monthly costs. No credit cards. Pure internet power.**

---

**Ready to deploy?**

1. Run the git commands above
2. Enable GitHub Pages
3. Visit your live site!

Let me know if you need any help! 🚀

---

Created: 2026-07-06
Status: 🟢 Ready to Deploy
Cost: $0 forever
