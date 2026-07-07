# PS Website — Quick Start Guide

**Get running in 2 minutes. Deploy in 5 minutes.**

---

## 🏃 Quick Start (2 Minutes)

### Step 1: Open Command Prompt
- Press `Win + R`
- Type `cmd`
- Press Enter

### Step 2: Navigate to Demo Folder
```bash
cd E:\demo
```

### Step 3: Run the Server
```bash
START.bat
```

**That's it!** 🎉

The server will start on **http://localhost:3001**

Your browser will open automatically. If not, go to:
```
http://localhost:3001
```

### To Stop the Server
- Press `Ctrl + C` in the command window
- Type `Y` and press Enter

---

## 🌐 What's Running?

- **http://localhost:3001** — PS Homepage
- **http://localhost:3001/kavach-product-page-unified.html** — Kavach Product Page
- **http://localhost:3001/Kavach-Dashboard-Unified.html** — Dashboard
- **http://localhost:3001/api/health** — API Health Check

---

## 📋 Test the Pages

### 1. Homepage
- Click "Get Started" (email signup feature)
- Click "Products" in nav
- Scroll to see animations

### 2. Kavach Product Page
- Click "Kavach" link in nav
- Browse features
- View pricing

### 3. Dashboard
- Click "Intelligence Dashboard" on homepage
- Or directly: http://localhost:3001/Kavach-Dashboard-Unified.html
- Explore sidebar navigation

---

## 🧪 Test Email Features (Optional)

To test email signup/contact forms, you need to setup an email service:

### 1. Sign up at Resend (Free)
- Go to [resend.com](https://resend.com)
- Create free account
- Get API key

### 2. Edit `.env` File
```bash
# Open .env in notepad
notepad .env
```

Add these lines:
```
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=onboarding@resend.dev
SMTP_PASS=<your-api-key-here>
FROM_EMAIL=noreply@ps.io
CONTACT_EMAIL=your-email@company.com
```

### 3. Restart Server
- Stop the server (Ctrl + C)
- Run `START.bat` again
- Test email form at http://localhost:3001/#contact

---

## 📦 File Structure

```
E:\demo\
├── index.html                          ← Homepage
├── kavach-product-page-unified.html    ← Product page
├── Kavach-Dashboard-Unified.html       ← Dashboard
├── api.js                              ← Backend API
├── package.json                        ← Dependencies
├── .env.example                        ← Template
├── START.bat                           ← Easy start button
├── README.md                           ← Full documentation
├── DEPLOYMENT_GUIDE.md                 ← Deploy to production
└── QUICK_START.md                      ← This file
```

---

## 🚀 Deploy to Production (5 Minutes)

Once you're happy with the website, deploy it for free:

### Option A: Vercel (Recommended, Free)

1. **Create GitHub repo:**
   - Push all files to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Click Deploy

**That's it!** Your site is live! 🎉

2. **Add Custom Domain:**
   - In Vercel dashboard → Domains
   - Add your domain (ps.io, ps.security, etc.)
   - Follow DNS instructions
   - SSL certificate added automatically

### Option B: Netlify (Free, Static Only)

1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the `E:\demo` folder
3. Your site is live instantly!

---

## 🎯 Common Tasks

### View Logs
```bash
# While server is running, check console output
# All requests and errors show here
```

### Change Port
If port 3001 is taken:
```bash
# Edit START.bat and change:
set PORT=3002
# Then run START.bat
```

### Test on Mobile
```bash
# Find your computer's IP:
ipconfig
# Then on mobile phone connect to same WiFi
# Visit http://<your-ip>:3001
```

### Full Server Restart
```bash
# Stop server (Ctrl + C)
# Run START.bat again
```

---

## ✅ Troubleshooting

### "Node.js not found"
- Install from [nodejs.org](https://nodejs.org)
- Restart command prompt
- Try again

### "Port 3001 already in use"
- Another process is using it
- Try a different port (edit START.bat, change 3001 to 3002)
- Or kill the process: `taskkill /PID <pid> /F`

### "Cannot find module"
```bash
npm install
```

### "Email not sending"
- Make sure `.env` file is filled correctly
- Check API key is valid
- Check `CONTACT_EMAIL` is correct

---

## 📖 Full Documentation

- **[README.md](./README.md)** — Complete project overview
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** — Deploy to production
- **[WEBSITE_STRUCTURE.md](./WEBSITE_STRUCTURE.md)** — Design system & pages

---

## 🎯 Next Steps

1. ✅ Run locally with `START.bat`
2. ✅ Browse all 3 pages
3. ✅ Test animations & interactions
4. ✅ Give feedback on design/content
5. ⬜ Deploy to Vercel (5 min setup)
6. ⬜ Configure domain & email
7. ⬜ Monitor site

---

## 💡 Tips

- **Refresh page:** Press F5 or Ctrl+R
- **Open DevTools:** Press F12 (to see any errors)
- **Mobile view:** Press F12 → Ctrl+Shift+M (toggle device toolbar)
- **Full screen:** Press F11

---

**Questions?** Check the [README.md](./README.md) or [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Happy testing!** 🚀

Created: 2026-07-06