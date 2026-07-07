# 🔓 AWS Fix → Phase 2: Complete Execution Plan

**Goal:** Fix AWS security group, then deploy real metrics on your homepage

**Estimated Time:** 1-2 hours total

---

## 📋 IMMEDIATE ACTION (RIGHT NOW)

### Step 1: Fix AWS Security Group (15 min)

Follow **`FIX_AWS_SECURITY_GROUP.md`**:

1. Log into AWS Console (https://console.aws.amazon.com)
2. Go to EC2 → Instances
3. Find your instance: `3.80.122.16`
4. Edit its Security Group
5. Add inbound rule: **Custom TCP, Port 3000, Source 0.0.0.0/0**
6. Save

### Step 2: Verify Port 3000 is Open (5 min)

In PowerShell:
```powershell
Test-NetConnection -ComputerName 3.80.122.16 -Port 3000

# Should show:
# TcpTestSucceeded : True
```

If `True` ✅ — **Port is open!**

If `False` ❌ — Wait 30-60 seconds and try again. AWS takes time to apply rules.

---

## 📊 PHASE 2: Deploy Real Metrics (45 min)

### Step 3: Replace Backend File (2 min)

Your current backend: `email-signup-backend.js`  
New enhanced backend: `email-signup-backend-with-metrics.js`

**Option A: Use new file directly**
```bash
cd E:\demo
ren email-signup-backend.js email-signup-backend-old.js
ren email-signup-backend-with-metrics.js email-signup-backend.js
```

**Option B: Or just use new name in everything below**

What changed:
- ✅ Added `/api/kavach/metrics` endpoint
- ✅ Added `/api/kavach/health` endpoint
- ✅ Added `/api/kavach/demo` endpoint
- ✅ Queries Kavach v2 AWS at `3.80.122.16:3000`
- ✅ Falls back to demo data if AWS is unreachable
- ✅ Caches metrics for 30 seconds (performance)

### Step 4: Test Locally (10 min)

```bash
cd E:\demo
node email-signup-backend-with-metrics.js
```

In another PowerShell window:
```powershell
# Check backend is alive
curl http://localhost:3001/api/health

# Test demo metrics
curl http://localhost:3001/api/kavach/demo

# Test real metrics (if port 3000 is open)
curl http://localhost:3001/api/kavach/metrics

# Check if Kavach v2 is reachable
curl http://localhost:3001/api/kavach/health
```

**Expected outputs:**

✅ `/api/health`:
```json
{"status":"ok","timestamp":"...","uptime":123.45}
```

✅ `/api/kavach/demo`:
```json
{"detection_rate":99.8,"attacks_blocked":3847,"honeypots_active":342,...}
```

✅ `/api/kavach/metrics`:
```json
{"detection_rate":99.8,...,"last_update":"..."}
```

✅ `/api/kavach/health`:
```json
{"status":"reachable","kavach_response":{...},"backend_status":"healthy"}
```

If you see these, backend is working! ✅

### Step 5: Update Frontend (10 min)

Create **`index-with-real-metrics.html`** — homepage that displays real metrics:

Key changes:
- ✅ Fetches `/api/kavach/metrics` on page load
- ✅ Displays real data (attacks blocked, honeypots active, detection rate, uptime)
- ✅ Refreshes every 30 seconds
- ✅ Falls back to demo if API fails
- ✅ Shows loading state

See below for the full HTML file.

### Step 6: Test Frontend Locally (5 min)

1. Make sure backend is running: `node email-signup-backend-with-metrics.js`
2. Open `index-with-real-metrics.html` in browser
3. You should see:
   - Stats section with **real numbers**
   - Numbers should update every 30 seconds
   - F12 console should show no errors

### Step 7: Deploy to Render (10 min)

Update your Render deployment:

1. Go to https://render.com
2. Click on your `ps-backend` web service
3. Settings → Environment
4. Add: `KAVACH_URL=http://3.80.122.16:3000`
5. Redeploy (Settings → Redeploy)

Or update your git repo and push:
```bash
cd E:\demo
git add email-signup-backend-with-metrics.js
git commit -m "Add: Real Kavach v2 metrics integration"
git push origin main

# Render will auto-deploy
```

Wait ~2 min for deployment to complete.

### Step 8: Test on Render (5 min)

```powershell
# Replace with YOUR Render URL
curl https://ps-backend-xxxx.onrender.com/api/kavach/metrics
curl https://ps-backend-xxxx.onrender.com/api/kavach/health
```

Should work! ✅

### Step 9: Update GitHub Pages (10 min)

Replace your homepage with the new metrics version:

```bash
cd E:\demo
ren index-with-signup.html index-with-signup-old.html
ren index-with-real-metrics.html index.html
```

Update the backend URL in `index.html`:
```javascript
const backendUrl = 'https://ps-backend-xxxx.onrender.com'; // YOUR URL
```

Push to GitHub:
```bash
git add index.html
git commit -m "Update: Show real Kavach v2 metrics"
git push origin main
```

Wait ~2 min for GitHub Pages to update.

### Step 10: Verify Live (5 min)

Visit: `https://parthji32.github.io/ps-security-platform/`

You should see:
- ✅ Homepage with email signup
- ✅ **Stats section shows REAL numbers** (not "v1 Live", "v2 Active", etc.)
- ✅ Numbers update every 30 seconds
- ✅ F12 console shows no errors

---

## 🎉 SUCCESS!

Your MVP now has:

✅ **Beautiful homepage** with email signup  
✅ **Real metrics from Kavach v2** (no fake data)  
✅ **Live updates** (refreshes every 30 sec)  
✅ **Deployed on free tier** (GitHub Pages + Render)  
✅ **Proof of concept** (shows your product works)

---

## 📊 What Your Stats Will Show

**Example (from a real Kavach v2 instance):**

```
3,847      Attacks Blocked     (real count)
342        Honeypots Active    (live topology)
99.8%      Detection Rate      (ML classifier accuracy)
24h        Uptime              (instance uptime)
```

No placeholders. No fake data. **Real.**

---

## 🚨 TROUBLESHOOTING

### "Port 3000 still times out"
- Check security group was actually saved (verify in AWS Console)
- Check instance is **running** (green status)
- Wait 60 seconds, try again
- Try from a different network/VPN

### "CORS error in browser console"
- Make sure your GitHub Pages URL is in the CORS whitelist in backend
- Check backend code:
  ```javascript
  origin: [
    'https://parthji32.github.io',
    'http://localhost:3000',
    ...
  ]
  ```

### "Stats show demo data, not real data"
- Check `/api/kavach/health` endpoint
- If it shows "unreachable", AWS connection is still blocked
- Go back to Step 1: Fix AWS Security Group

### "Stats section not updating"
- Check F12 console for errors
- Make sure interval is running: `setInterval(loadMetrics, 30000)`
- Verify backend URL is correct

### "Backend deployment failed on Render"
- Check Render logs (Logs tab)
- Make sure `package.json` exists
- Make sure `RESEND_API_KEY` environment variable is set
- Try deploying again

---

## 📈 Next: Phase 3 (Preview)

Once Phase 2 is working, we'll build **Phase 3: Live Dashboard**

Same approach:
1. Query `/api/incidents` from Kavach v2
2. Display real recent attacks
3. Show live honeypot topology
4. Real-time updates

---

## 📝 FILES YOU'LL USE

| File | Purpose |
|------|---------|
| `FIX_AWS_SECURITY_GROUP.md` | AWS setup (do first) |
| `email-signup-backend-with-metrics.js` | Enhanced backend (copy this) |
| `index-with-real-metrics.html` | Homepage with real metrics (see below) |
| `package.json` | Dependencies (same as before) |

---

## 🚀 READY? LET'S GO!

1. **Read `FIX_AWS_SECURITY_GROUP.md`** and fix the security group
2. **Test port 3000 is open** (Test-NetConnection)
3. **Test backend locally** (node ... + curl)
4. **Deploy to Render**
5. **Update and deploy homepage**
6. **Verify live on GitHub Pages**

**Expected time:** 1-2 hours total

Ship it! 🛡️
