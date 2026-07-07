# PS Website — Production Deployment Guide

**Status:** Ready to Deploy  
**Version:** 1.0.0  
**Created:** 2026-07-06

---

## Quick Start (5 Minutes)

### Option 1: Deploy to Vercel (Recommended)
Vercel is free, fast, and perfect for this site.

1. **Connect your GitHub repo:**
   - Push all files to GitHub (create a new repo or use existing)
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → Connect GitHub → Select repo

2. **Set Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     SMTP_HOST=smtp.resend.com
     SMTP_PORT=465
     SMTP_USER=your-email@resend.dev
     SMTP_PASS=your-resend-api-key
     FROM_EMAIL=noreply@ps.io
     CONTACT_EMAIL=team@ps.io
     APP_URL=https://ps.io
     ```

3. **Deploy:**
   - Vercel will auto-detect Node.js + Express
   - Deploy runs automatically on every push to main
   - Your site is live in 30 seconds

4. **Custom Domain:**
   - Vercel dashboard → Project → Domains
   - Add custom domain (ps.io, ps.security, etc.)
   - Update DNS records (CNAME or A record)
   - SSL certificate auto-provisioned ✓

---

### Option 2: Deploy to Netlify (Static Site)
If you don't need the backend, just deploy the 3 HTML files:

1. **Build a folder structure:**
   ```
   public/
   ├── index.html
   ├── kavach-product-page-unified.html
   ├── kavach-dashboard-unified.html
   └── assets/
       └── (any images if added later)
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `public/` folder
   - Live in 10 seconds

3. **Enable Functions (optional backend):**
   - Create `netlify/functions/` folder
   - Add Node.js function for email signup
   - Netlify auto-deploys functions alongside static files

---

### Option 3: Self-Hosted (AWS EC2 / DigitalOcean)

1. **SSH into server:**
   ```bash
   ssh -i your-key.pem ubuntu@your-server-ip
   ```

2. **Install Node.js:**
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install nodejs
   ```

3. **Clone repo & install dependencies:**
   ```bash
   git clone https://github.com/your-org/ps-website.git
   cd ps-website
   npm install
   ```

4. **Create `.env` file:**
   ```bash
   cp .env.example .env
   nano .env  # Add your values
   ```

5. **Run with PM2 (keep process alive):**
   ```bash
   sudo npm install -g pm2
   pm2 start api.js --name "ps-website"
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx reverse proxy:**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name ps.io www.ps.io;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d ps.io -d www.ps.io
   ```

8. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

---

## Email Service Setup

### Using Resend (Recommended for Startups)
1. Go to [resend.com](https://resend.com) → Sign up free
2. Verify your domain
3. Create API key in dashboard
4. Add to `.env`:
   ```
   SMTP_USER=onboarding@resend.dev
   SMTP_PASS=your-api-key-here
   ```

### Using SendGrid
1. Create free account at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Use credentials:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=465
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxx...
   ```

### Using Gmail SMTP (not recommended for production, but works for testing)
1. Enable 2FA on Gmail account
2. Generate app password
3. Use:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=generated-app-password
   ```

---

## File Structure

```
ps-website/
├── index.html                           (PS Homepage)
├── kavach-product-page-unified.html     (Kavach Product Page)
├── kavach-dashboard-unified.html        (Dashboard)
├── api.js                               (Backend API)
├── package.json                         (Dependencies)
├── .env.example                         (Environment template)
├── vercel.json                          (Vercel config)
├── .gitignore                           (Git ignore rules)
├── DEPLOYMENT_GUIDE.md                  (This file)
└── README.md                            (Project readme)
```

---

## Project Repository Setup

### 1. Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: PS website with 3 pages"
git branch -M main
git remote add origin https://github.com/your-org/ps-website.git
git push -u origin main
```

### 2. Create `.env` Locally (NOT committed)
```bash
cp .env.example .env
# Edit .env with your real values
```

### 3. Add to `.gitignore` (already done)
- `.env` is already ignored
- `node_modules/` is already ignored

---

## Domain Setup

### Register Domain
- **Recommended registrars:** Namecheap, GoDaddy, Domain.com
- **Registrar:** Pick any you like
- **Price:** $10-15/year

### DNS Configuration

**If using Vercel:**
1. Buy domain (or use existing)
2. In Vercel dashboard → Domains
3. Add domain name
4. Vercel shows you the nameservers to use in your registrar
5. Update nameservers at your registrar
6. Wait 24-48 hours for DNS to propagate
7. SSL certificate auto-issued ✓

**If using self-hosted:**
1. Point A record to your server IP
   ```
   A  ps.io  → 123.45.67.89
   A  www.ps.io  → 123.45.67.89
   ```
2. Install SSL with Let's Encrypt (see self-hosted section)

---

## Testing Before Deploy

### Local Testing
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# (Fill in test email credentials)

# Run locally
npm run dev
# Visit http://localhost:3001
```

### Test Email Signup
1. Go to homepage (index.html)
2. Click "Get Started" button
3. Enter email → should get confirmation email

### Test Contact Form
1. Go to footer → "Contact" link
2. Fill form → should send to CONTACT_EMAIL
3. Should also send confirmation to user

### Test Dashboard
1. Go to Products section → Click "Intelligence Dashboard"
2. Dashboard should load with sidebar navigation
3. All metrics should render correctly

---

## Performance Optimization

### Static Site Caching
```bash
# vercel.json already configured with:
# - 60s cache for API endpoints
# - 1 year cache for HTML/CSS/JS
```

### Image Optimization (if you add images later)
- Use WebP format
- Compress with TinyPNG or similar
- Store in CDN (Vercel CDN included)

### Analytics Integration
- Add Plausible, Fathom, or Google Analytics to footer
- No privacy concerns with Plausible (GDPR compliant)

---

## Monitoring & Maintenance

### Uptime Monitoring
Use UptimeRobot (free tier):
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add monitor for ps.io
3. Get alerts if site goes down

### Error Tracking
Add Sentry (free tier):
1. Go to [sentry.io](https://sentry.io)
2. Create new project
3. Add to api.js:
   ```javascript
   const Sentry = require("@sentry/node");
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   ```

### Log Aggregation
- Vercel includes free logs
- View in dashboard → Deployments → Logs

---

## Budget Breakdown (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| **Vercel** | Free | SSL, CDN, auto-scaling included |
| **Domain** | ~$1 | ($12/year ÷ 12 months) |
| **Email Service** | Free-$20 | Resend free tier or SendGrid free 100/day |
| **Analytics** | Free-$4 | Plausible $4/mo, Fathom free or $14 |
| **Monitoring** | Free | UptimeRobot free tier |
| **Total** | **~$5-25/mo** | Extremely affordable |

---

## Next Steps

1. ✅ Files are ready
2. ⬜ Set up email service (Resend recommended)
3. ⬜ Push to GitHub
4. ⬜ Deploy to Vercel
5. ⬜ Configure DNS + domain
6. ⬜ Test all forms work
7. ⬜ Add Google Analytics / Plausible
8. ⬜ Monitor uptime

---

## Quick Links

- **Vercel:** https://vercel.com
- **Resend:** https://resend.com
- **Netlify:** https://netlify.com
- **GitHub:** https://github.com
- **UptimeRobot:** https://uptimerobot.com
- **Sentry:** https://sentry.io

---

**Questions?** Check the README.md or feel free to reach out!

Created: 2026-07-06  
Last Updated: 2026-07-06