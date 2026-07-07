# 🔗 UNIFIED REPOSITORY STRATEGY

**Combine PS Website + Kavach v2 into One GitHub Repository**

---

## 📊 New Structure

```
ps-security-platform/                    (Main Repo)
├── website/                             (PS Marketing Website)
│   ├── index.html                       (Homepage)
│   ├── kavach-product-page-unified.html (Kavach v2 Product)
│   ├── Kavach-Dashboard-Unified.html    (Dashboard UI)
│   ├── api.js                           (Express backend)
│   ├── server.js                        (Static server)
│   ├── package.json
│   ├── vercel.json
│   └── README.md
│
├── kavach-v2/                           (ML Reverse Proxy - KEEP AS IS)
│   ├── backend/
│   │   ├── cmd/
│   │   ├── internal/
│   │   ├── Dockerfile.server
│   │   └── go.mod
│   ├── agents/
│   │   ├── token_manager/
│   │   ├── website_generator/
│   │   └── requirements.txt
│   ├── docker-compose.yml
│   ├── Dockerfile.token-manager
│   ├── Dockerfile.website-generator
│   ├── AWS_DEPLOYMENT_GUIDE.md
│   ├── README.md
│   └── Kavach.pem
│
├── docs/                                (Documentation - ALL GUIDES)
│   ├── USER_GUIDE_DETAILED.md
│   ├── FULL_INTEGRATION_README.md
│   ├── KAVACH_INTEGRATION.md
│   ├── ACTION_PLAN.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── QUICK_START.md
│   ├── ARCHITECTURE.md
│   └── README.md
│
├── docker-compose-full.yml              (Master - run all services)
├── .env.example                         (Environment template)
├── .gitignore
├── README.md                            (Main project README)
└── LICENSE
```

---

## ✅ Step 1: Create New Unified GitHub Repo

**Go to GitHub:**

1. https://github.com/new
2. Create repository:
   - **Name:** `ps-security-platform`
   - **Description:** `PS Security Platform - Deception Security (Website + Kavach v2)`
   - **Public** ✓
   - Click "Create repository"
3. **Copy the HTTPS URL**
   ```
   https://github.com/YOUR_USERNAME/ps-security-platform.git
   ```

---

## ✅ Step 2: Prepare Local Structure

**On your Windows machine:**

```powershell
# Create a temporary working folder
mkdir C:\temp\ps-unified
cd C:\temp\ps-unified

# Initialize git
git init
git config user.name "Your Name"
git config user.email "jindalparth376@gmail.com"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ps-security-platform.git
```

---

## ✅ Step 3: Copy Website Files

```powershell
# Create website folder
mkdir website
cd website

# Copy from E:\demo
Copy-Item E:\demo\index.html .
Copy-Item E:\demo\kavach-product-page-unified.html .
Copy-Item E:\demo\Kavach-Dashboard-Unified.html .
Copy-Item E:\demo\api.js .
Copy-Item E:\demo\server.js .
Copy-Item E:\demo\package.json .
Copy-Item E:\demo\vercel.json .

# Create website README
@"
# PS Security Platform - Website

Frontend marketing website and dashboard for PS Security Platform.

## Quick Start

\`\`\`bash
npm install
npm start
# Opens http://localhost:3001
\`\`\`

## Files

- **index.html** - PS Homepage
- **kavach-product-page-unified.html** - Kavach v2 Product Page
- **Kavach-Dashboard-Unified.html** - Control Center Dashboard
- **api.js** - Express backend API
- **server.js** - Static file server

## Deploy to Vercel

1. Push to GitHub
2. Go to Vercel.com
3. Import this repository
4. Deploy

See ../README.md for full integration guide.
"@ | Out-File README.md -Encoding UTF8

cd ..
```

---

## ✅ Step 4: Copy Kavach v2 Files

```powershell
# Copy entire kavach-v2 folder
Copy-Item E:\kavach-v2 . -Recurse

# This brings everything:
# - backend/
# - agents/
# - docker-compose.yml
# - Dockerfiles
# - All docs
```

---

## ✅ Step 5: Create Docs Folder

```powershell
mkdir docs
cd docs

# Copy all documentation
Copy-Item E:\demo\USER_GUIDE_DETAILED.md .
Copy-Item E:\demo\FULL_INTEGRATION_README.md .
Copy-Item E:\demo\KAVACH_INTEGRATION.md .
Copy-Item E:\demo\ACTION_PLAN.md .
Copy-Item E:\demo\DEPLOYMENT_GUIDE.md .
Copy-Item E:\demo\QUICK_START.md .
Copy-Item E:\demo\READY_TO_DEPLOY.txt .
Copy-Item E:\demo\PRODUCTION_READY.md .

# Create docs README
@"
# Documentation

Complete guides for PS Security Platform.

## Start Here

1. **README.md** (../README.md) - Main project overview
2. **USER_GUIDE_DETAILED.md** - How users interact with platform
3. **ACTION_PLAN.md** - 3-phase deployment roadmap

## Deep Dives

- **FULL_INTEGRATION_README.md** - Complete architecture (10 min read)
- **KAVACH_INTEGRATION.md** - Technical details
- **DEPLOYMENT_GUIDE.md** - Production deployment steps

## Quick References

- **QUICK_START.md** - 2-minute setup guide
- **READY_TO_DEPLOY.txt** - Status summary
- **PRODUCTION_READY.md** - Launch checklist
"@ | Out-File README.md -Encoding UTF8

cd ..
```

---

## ✅ Step 6: Create Main README

```powershell
@"
# 🛡️ PS Security Platform

**Website + Kavach v2 ML Reverse Proxy**

Deception-based cybersecurity platform that turns attackers into data.

## 📊 Components

### Website (Marketing + Dashboard)
- **Location:** \`/website\`
- **Tech:** Node.js, Express, Vanilla JS
- **Deploy:** Vercel
- **Status:** Ready to deploy

### Kavach v2 (ML Reverse Proxy)
- **Location:** \`/kavach-v2\`
- **Tech:** Go (backend), Python (agents)
- **Deploy:** AWS EC2
- **Status:** Running on AWS (3.80.122.16:3000)

### Documentation
- **Location:** \`/docs\`
- **Start with:** USER_GUIDE_DETAILED.md

## 🚀 Quick Start

### Deploy Website to Vercel
\`\`\`bash
cd website
npm install
npm start  # Test locally first
\`\`\`

Then push to GitHub and deploy to Vercel.

### Run Kavach v2 Locally
\`\`\`bash
# Terminal 1: Go Reverse Proxy
cd kavach-v2/backend
go run ./cmd/server/main.go

# Terminal 2: Token Manager Agent
cd kavach-v2/agents/token_manager
python main.py

# Terminal 3: Website Generator Agent
cd kavach-v2/agents/website_generator
python main.py
\`\`\`

### Run Full Stack with Docker
\`\`\`bash
docker-compose -f docker-compose-full.yml up -d
\`\`\`

## 📋 Deployment Status

| Component | Status | Location |
|-----------|--------|----------|
| Website | 🟡 Ready to deploy | Vercel |
| Kavach v2 | 🟢 Running | AWS EC2 3.80.122.16:3000 |
| Docs | ✅ Complete | /docs |

## 📖 Documentation

- **User Guide:** \`docs/USER_GUIDE_DETAILED.md\` - How to use the platform
- **Integration:** \`docs/FULL_INTEGRATION_README.md\` - Complete architecture
- **Action Plan:** \`docs/ACTION_PLAN.md\` - 3-phase deployment
- **Deployment:** \`docs/DEPLOYMENT_GUIDE.md\` - Production steps
- **Quick Start:** \`docs/QUICK_START.md\` - 2-minute setup

## 🎯 Next Steps

1. **Deploy Website:** Push to GitHub → Deploy to Vercel (5 min)
2. **Connect v2 API:** Website calls v2 backend (30 min)
3. **Update Dashboard:** Show live v2 metrics (1 hour)
4. **Production:** Full stack hardening and monitoring (6 hours)

## 🔗 Links

- **Repo:** https://github.com/YOUR_USERNAME/ps-security-platform
- **Website:** https://ps.io (after domain setup)
- **Kavach v2:** http://3.80.122.16:3000 (current AWS)
- **Docs:** See \`/docs\` folder

## 📞 Support

See documentation in \`/docs\` folder for:
- Troubleshooting
- API integration
- Deployment strategies
- Real-world workflows

---

**Built with ❤️ for PS Security**

Created: 2026-07-06
Status: 🟢 Production Ready
"@ | Out-File README.md -Encoding UTF8
```

---

## ✅ Step 7: Copy Config Files

```powershell
# Copy from demo
Copy-Item E:\demo\.env.example .
Copy-Item E:\demo\.gitignore .
Copy-Item E:\demo\docker-compose-full.yml .

# Create LICENSE (MIT)
@"
MIT License

Copyright (c) 2026 Parth Jindal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
"@ | Out-File LICENSE -Encoding UTF8
```

---

## ✅ Step 8: Commit and Push

```powershell
# From C:\temp\ps-unified

git add .

git commit -m "Initial commit: PS Security Platform
- Website (marketing + dashboard)
- Kavach v2 (ML reverse proxy)
- Complete documentation
- Docker setup for full stack"

git branch -M main

git push -u origin main
```

**Wait for upload to complete...**

---

## ✅ Step 9: Verify on GitHub

1. Open: https://github.com/YOUR_USERNAME/ps-security-platform
2. Verify folders:
   - ✓ website/
   - ✓ kavach-v2/
   - ✓ docs/
3. Verify files:
   - ✓ README.md
   - ✓ docker-compose-full.yml
   - ✓ .env.example

---

## 🚀 Next: Deploy Website to Vercel

Once unified repo is on GitHub:

1. Go to https://vercel.com
2. Click "New Project"
3. Import GitHub repo: `ps-security-platform`
4. **IMPORTANT:** Set root directory to `./website`
   - Framework: Node.js
   - Root Directory: **./website** ← KEY!
   - Build Command: npm install
5. Deploy!

---

## 📋 Result After Unified Setup

```
✅ Single GitHub Repository
   ├─ Website code
   ├─ Kavach v2 code
   └─ All documentation

✅ Deployment Strategy
   ├─ Website: Vercel (website/)
   ├─ v2 Backend: AWS EC2 (kavach-v2/backend)
   ├─ Python Agents: AWS EC2 (kavach-v2/agents)
   └─ Docs: GitHub (/docs)

✅ One Source of Truth
   └─ Everything connected, documented, deployable
```

---

## 💡 Benefits of Unified Repo

✅ **Single source of truth** - One repo, one story  
✅ **Easy collaboration** - Share PR across both projects  
✅ **Unified documentation** - Everything in one place  
✅ **Atomic changes** - Website + v2 updates together  
✅ **Professional** - Looks like a real product company  
✅ **CI/CD ready** - One pipeline for all  

---

## ⚠️ Important Notes

**Do NOT delete existing repos:**
- Keep `kavach-v2` on GitHub (already have deployments)
- The unified repo is a NEW repository for presentation/deployment

**If you need to sync later:**
```powershell
# In ps-security-platform repo
git remote add kavach-v2-source https://github.com/YOUR_USERNAME/kavach-v2.git
git subtree pull --prefix kavach-v2 kavach-v2-source main --squash
```

---

## 🎯 Summary

**What to do:**

1. Create new GitHub repo: `ps-security-platform`
2. Copy website/ + kavach-v2/ + docs/ into it
3. Push to GitHub
4. Deploy website/ to Vercel
5. Keep Kavach v2 running on AWS

**Result:** One unified product showing everything together!

---

**Ready to execute?** Run the PowerShell commands above, or I can help step-by-step!

Created: 2026-07-06
Version: 1.0.0
Status: 🟢 Ready to Execute
