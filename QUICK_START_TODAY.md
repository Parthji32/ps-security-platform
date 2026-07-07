# ⚡ Quick Start - TODAY (Next 30 Minutes)

## 🎯 Goal
Get the email signup working **locally**, then deploy to Render.

---

## ✅ Step 1: Install Dependencies (2 min)

Open PowerShell in `E:\demo`:
```powershell
cd E:\demo
npm install
```

You should see packages installing... Done when you see `added XX packages`.

---

## ✅ Step 2: Get Resend API Key (5 min)

1. Go to **https://resend.io**
2. Sign up (free tier, no credit card needed)
3. Verify email
4. You'll see your API Key in the dashboard
5. Copy it (looks like: `re_xxxxxxxxxxxxx`)

---

## ✅ Step 3: Create .env File (1 min)

In `E:\demo`, create a file named `.env`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
PORT=3001
```

⚠️ Replace `re_xxxxxxxxxxxxx` with your **actual Resend API key**

---

## ✅ Step 4: Run the Backend Locally (1 min)

```powershell
node email-signup-backend.js
```

You should see:
```
🛡️ PS Security Backend running on port 3001
📧 Using Resend API Key: ✓
```

✅ **Backend is running!** Leave this terminal open.

---

## ✅ Step 5: Test the Signup (5 min)

1. Open a **new PowerShell** window (keep the backend running)
2. In `E:\demo`, open `index-with-signup.html` in your browser:
   ```powershell
   Invoke-Item index-with-signup.html
   ```
   Or just double-click the file in Windows Explorer.

3. You should see the homepage with:
   - Hero section "Armor that fights back"
   - **Email signup form** with "Join Early Access" button
   - Product cards below

4. **Test the signup:**
   - Enter your email: `test@example.com`
   - Click "Join Early Access"
   - You should see: ✓ "Check your email! You're on the early access list."
   - Check your email inbox (might be spam folder) — you should have a welcome email from "PS Security"

✅ **Signup is working!**

---

## ✅ Step 6: Deploy to Render (10 min)

1. Go to **https://render.com**
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo (`ps-security-platform`)
5. Settings:
   - **Name:** `ps-backend`
   - **Runtime:** Node.js
   - **Build Command:** `npm install`
   - **Start Command:** `node email-signup-backend.js`
   - **Add Env Var:** `RESEND_API_KEY` = (paste your Resend key)
6. Click "Create Web Service"

Wait ~2-3 minutes for deployment. When done, you'll see a URL like:
```
https://ps-backend-xxxx.onrender.com
```

---

## ✅ Step 7: Update Frontend (3 min)

Edit `E:\demo\index-with-signup.html`:

Find this line (around line 378):
```javascript
const backendUrl = 'http://localhost:3001'; // Local dev
```

Replace with:
```javascript
const backendUrl = 'https://ps-backend-xxxx.onrender.com'; // Use YOUR Render URL
```

Save the file.

---

## ✅ Step 8: Push to GitHub (3 min)

```powershell
cd E:\demo
git add index-with-signup.html
git commit -m "Update: Point to live Render backend"
git push origin main
```

Wait ~2 min for GitHub Pages to deploy.

---

## ✅ Step 9: Test Live on GitHub Pages (2 min)

1. Visit: `https://parthji32.github.io/ps-security-platform/`
2. Try the signup form again
3. You should get the success message
4. Check your email for the welcome email from Render backend ✅

---

## 🎉 DONE!

Your MVP now has:
- ✅ Beautiful homepage with signup
- ✅ Live backend on Render (free tier)
- ✅ Email collection system
- ✅ Real-time email sending

**Next phase:** Pull real metrics from Kavach v2 AWS (after security group fix).

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot find module 'express'` | Run `npm install` again |
| `RESEND_API_KEY is undefined` | Check `.env` file exists and has correct key |
| Signup form doesn't work locally | Make sure backend is running (`node email-signup-backend.js`) in another terminal |
| "Backend not available" error | Check Render deployment status, make sure URL is correct in frontend code |
| Welcome email not arriving | Check spam folder, verify Resend key is correct |
| GitHub Pages not updating | Wait 5 min, hard refresh (Ctrl+Shift+R) browser |

---

## 📞 Need Help?

Check `SETUP_BACKEND.md` for more detailed instructions.

Ship it! 🚀
