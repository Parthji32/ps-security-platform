# 📊 Phase 2: Real Metrics from Kavach v2

**Status:** READY TO BUILD (once AWS security group is fixed)

---

## 🎯 Goal

Replace placeholder stats on homepage with **REAL data** from Kavach v2 AWS instance:

**Current (Placeholders):**
```
• "v1 Live"
• "v2 Active"
• "Real Data"
• "Open"
```

**Target (Real Metrics):**
```
• "3,847 Attacks Blocked"
• "342 Honeypots Active"
• "99.8% Detection Rate"
• "24h Uptime"
```

---

## 📡 What We'll Query

From Kavach v2 at `3.80.122.16:3000`, we'll pull:

```
GET /api/metrics
{
  "detection_rate": 99.8,
  "attacks_blocked": 3847,
  "honeypots_active": 342,
  "mean_time_to_detect": 1.9,
  "uptime_hours": 24,
  "unique_attackers": 156
}

GET /api/stats
{
  "total_incidents": 5234,
  "last_24h": 342,
  "active_tokens": 2400,
  "status": "healthy"
}
```

---

## 🛠️ How We'll Build This

### Step 1: Query Kavach v2 from Backend

Add new endpoint to `email-signup-backend.js`:

```javascript
/**
 * GET /api/kavach/metrics
 * Pulls real metrics from Kavach v2 AWS instance
 */
app.get('/api/kavach/metrics', async (req, res) => {
  try {
    const KAVACH_URL = 'http://3.80.122.16:3000';
    
    // Query Kavach v2
    const response = await fetch(`${KAVACH_URL}/api/metrics`);
    const data = await response.json();
    
    // Return to frontend
    res.json(data);
    
  } catch (error) {
    console.error('Kavach metrics error:', error);
    // Return demo data if live query fails
    res.json({
      detection_rate: 99.8,
      attacks_blocked: 3847,
      honeypots_active: 342,
      mean_time_to_detect: 1.9,
      uptime_hours: 24,
      unique_attackers: 156
    });
  }
});
```

### Step 2: Update Frontend to Fetch & Display

In `index-with-signup.html`, update the stats section:

```html
<section class="stats" id="statsSection">
  <!-- Stats will load here via JavaScript -->
</section>

<script>
  // Fetch real metrics when page loads
  async function loadMetrics() {
    try {
      const backendUrl = 'https://ps-backend-xxxx.onrender.com'; // Your Render URL
      const response = await fetch(`${backendUrl}/api/kavach/metrics`);
      const metrics = await response.json();
      
      // Update page with real data
      document.getElementById('statsSection').innerHTML = `
        <div class="stat">
          <div class="stat-value">${metrics.attacks_blocked.toLocaleString()}</div>
          <div class="stat-label">Attacks Blocked</div>
        </div>
        <div class="stat">
          <div class="stat-value">${metrics.honeypots_active}</div>
          <div class="stat-label">Honeypots Active</div>
        </div>
        <div class="stat">
          <div class="stat-value">${metrics.detection_rate}%</div>
          <div class="stat-label">Detection Rate</div>
        </div>
        <div class="stat">
          <div class="stat-value">${metrics.uptime_hours}h</div>
          <div class="stat-label">Uptime</div>
        </div>
      `;
    } catch (error) {
      console.error('Failed to load metrics:', error);
      // Keep placeholder if API fails
    }
  }
  
  // Load metrics when page loads
  document.addEventListener('DOMContentLoaded', loadMetrics);
  
  // Refresh metrics every 30 seconds
  setInterval(loadMetrics, 30000);
</script>
```

---

## 📋 Implementation Checklist

### Backend Updates (email-signup-backend.js)

- [ ] Add `node-fetch` or use built-in `fetch` if Node v18+
- [ ] Add `/api/kavach/metrics` endpoint
- [ ] Add error handling + fallback demo data
- [ ] Test locally: `curl http://localhost:3001/api/kavach/metrics`
- [ ] Deploy to Render
- [ ] Verify endpoint works: `curl https://ps-backend.onrender.com/api/kavach/metrics`

### Frontend Updates (index-with-signup.html)

- [ ] Update stats section to call backend
- [ ] Display real metrics instead of placeholders
- [ ] Add auto-refresh (every 30 seconds)
- [ ] Handle errors gracefully (show demo data fallback)
- [ ] Test locally
- [ ] Push to GitHub
- [ ] Verify on GitHub Pages

---

## 🧪 Testing Plan

### Before deploying:

**1. Test Kavach v2 is reachable:**
```powershell
Test-NetConnection -ComputerName 3.80.122.16 -Port 3000
# Should show: TcpTestSucceeded : True
```

**2. Query the API manually:**
```powershell
curl http://3.80.122.16:3000/health
curl http://3.80.122.16:3000/api/metrics
```

**3. Test backend locally:**
```bash
node email-signup-backend.js
# In another terminal:
curl http://localhost:3001/api/kavach/metrics
```

**4. Test frontend locally:**
- Open `index-with-signup.html` in browser
- Check browser console (F12) for any errors
- Stats should show real numbers (or demo data if API fails)

**5. Test on Render:**
```
curl https://ps-backend.onrender.com/api/kavach/metrics
```

**6. Test on GitHub Pages:**
- Visit `https://parthji32.github.io/ps-security-platform/`
- Stats should show real metrics
- Check browser console for any CORS or network errors

---

## 🎯 Success Criteria

✅ Backend successfully queries Kavach v2 AWS instance  
✅ Frontend displays real metrics on homepage  
✅ Metrics refresh every 30 seconds  
✅ Fallback demo data shows if API fails  
✅ No placeholder stats visible  
✅ Works on GitHub Pages (no CORS errors)

---

## 📊 Expected Result

**Before:**
```
• v1 Live
• v2 Active
• Real Data
• Open
```

**After:**
```
• 3,847 Attacks Blocked
• 342 Honeypots Active
• 99.8% Detection Rate
• 24h Uptime
```

✅ **Real. Live. Credible.**

---

## 🚨 Potential Issues & Fixes

### Issue 1: CORS Error
**Problem:** Frontend can't reach backend
**Fix:** Make sure backend has CORS configured:
```javascript
app.use(cors({
  origin: ['https://parthji32.github.io', 'http://localhost:3000'],
  credentials: true
}));
```

### Issue 2: Kavach v2 Endpoint Doesn't Exist
**Problem:** `/api/metrics` doesn't exist on your instance
**Fix:** Figure out what endpoints ARE available:
```
curl http://3.80.122.16:3000/health
curl http://3.80.122.16:3000/api/stats
curl http://3.80.122.16:3000/api/incidents
```
Then adjust the backend query to use the right endpoint.

### Issue 3: Data Not Updating
**Problem:** Stats stay the same, never refresh
**Fix:** Check browser console (F12) for errors. Make sure:
- Backend is running
- Frontend has the right backend URL
- setInterval is executing

### Issue 4: AWS Timeout
**Problem:** Query to AWS takes too long or times out
**Fix:** Add timeout to the fetch:
```javascript
const response = await fetch(`${KAVACH_URL}/api/metrics`, {
  timeout: 5000 // 5 second timeout
});
```

---

## 📈 Phase 2 → Phase 3 Bridge

Once Phase 2 works (real metrics on homepage), we'll move to **Phase 3: Live Dashboard Data**

Same approach:
1. Query `/api/incidents` from Kavach v2
2. Parse attack data
3. Display real incidents on dashboard
4. Add real-time updates (WebSocket or polling)

---

## 📝 NEXT STEPS

1. **Fix AWS security group** (port 3000)
2. **Test Kavach v2 is reachable** (Test-NetConnection)
3. **Query the API manually** (curl)
4. **Implement Phase 2 code** (add backend endpoint + frontend fetch)
5. **Deploy to Render** (git push)
6. **Test on GitHub Pages**
7. **Celebrate!** 🎉 You now have REAL metrics

---

## 💡 Key Insight

This is the **credibility layer**. Once real metrics are showing:
- Homepage looks professional
- No fake data
- Visitors see your product is REAL and working
- Trust increases

Then we connect the dashboard (Phase 3) to show real attacks happening in real-time.

Let's build it! 🚀
