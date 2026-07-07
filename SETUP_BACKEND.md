# 🛡️ PS Security Platform - Backend Setup Guide

## Phase 1: Local Development

### 1. Install Dependencies
```bash
cd E:\demo
npm install express cors dotenv resend
```

### 2. Get Resend API Key
1. Go to **[resend.io](https://resend.io)** (free tier available)
2. Sign up with your email
3. Create a project → copy your **API Key**
4. Create `.env` file in `E:\demo`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
PORT=3001
```

### 3. Run Locally
```bash
node email-signup-backend.js
```

You should see:
```
🛡️ PS Security Backend running on port 3001
📧 Using Resend API Key: ✓
```

### 4. Test the Signup
Open `index-with-signup.html` in your browser and try signing up with any email. You should receive a welcome email from PS Security.

---

## Phase 2: Deploy Backend to Render (Free Tier)

### Why Render?
- ✅ Free tier with 750 hours/month (more than enough)
- ✅ Auto-deploys from GitHub
- ✅ Custom domain support
- ✅ Environment variables support
- ✅ No credit card required

### Steps:

#### 1. Create GitHub Repo for Backend (Optional but Recommended)
If you want to keep backend separate:
```bash
cd E:\demo
git init
git add email-signup-backend.js package.json .env.example
git commit -m "Init: PS Backend with Resend"
git remote add origin https://github.com/Parthji32/ps-backend
git push -u origin main
```

Or just use your existing `ps-security-platform` repo and add the backend files.

#### 2. Go to [render.com](https://render.com)
- Sign up with GitHub
- Click "New +" → "Web Service"
- Connect your GitHub repo
- Select the repo with `email-signup-backend.js`

#### 3. Configure Render
- **Name:** `ps-backend` (or similar)
- **Runtime:** Node.js
- **Build Command:** `npm install`
- **Start Command:** `node email-signup-backend.js`
- **Environment Variables:** Add `RESEND_API_KEY` (paste your key from resend.io)

#### 4. Deploy
Click "Create Web Service" → Render deploys automatically

Your backend will be live at something like:
```
https://ps-backend.onrender.com
```

---

## Phase 3: Update Frontend to Use Live Backend

In `index.html` (or `index-with-signup.html`), update the signup script:

```javascript
const backendUrl = 'https://ps-backend.onrender.com'; // Change this!

const response = await fetch(`${backendUrl}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
});
```

Push to GitHub:
```bash
cd E:\demo
git add index.html
git commit -m "Update: Point to live backend on Render"
git push origin main
```

GitHub Pages will auto-deploy ~2 min later.

---

## Phase 4: Add More Endpoints (Next Steps)

After this works, we'll add:

1. **Dashboard Data Endpoint** — pulls live Kavach v2 metrics
```
GET /api/kavach/metrics
```

2. **Demo Data Endpoint** — returns sample attack data
```
GET /api/kavach/demo-attacks
```

3. **Payment Endpoint** — Stripe integration
```
POST /api/stripe/checkout
```

4. **Contact Form Endpoint** — we partially built this
```
POST /api/contact
```

---

## 🔒 Security Notes

- ✅ CORS is configured for GitHub Pages domain
- ✅ Resend API key is hidden in `.env` (never in git)
- ⚠️ No authentication yet (anyone can signup) — that's fine for MVP
- ⚠️ Email list stored in JSON file (fine for <1000 users)

For production, move to a database (PostgreSQL recommended).

---

## Troubleshooting

**"Cannot find module 'express'"**
```bash
npm install express cors dotenv resend
```

**"RESEND_API_KEY is undefined"**
- Check `.env` exists and has the right key
- Restart the server after adding `.env`

**"CORS error when testing"**
- Make sure the frontend URL is in the CORS whitelist
- Check browser console (F12) for the exact error

**"Render deployment fails"**
- Check "Logs" tab on Render dashboard
- Make sure `package.json` exists
- Verify `node email-signup-backend.js` works locally first

---

## Next: Real Dashboard Data

Once this is working, we'll connect to your Kavach v2 AWS instance at `3.80.122.16:3000` and pull:
- Live attack count
- Detection rate
- Active honeypots
- Recent incidents

Then display it on the dashboard in real-time. 🎯
