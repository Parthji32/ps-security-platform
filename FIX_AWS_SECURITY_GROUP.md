# 🔓 Fix AWS Security Group - Open Port 3000

**Goal:** Allow your website (and local machine) to reach Kavach v2 at `3.80.122.16:3000`

**Current Problem:** Security group is blocking port 3000

---

## ✅ STEP 1: Go to AWS Console

1. Open **https://console.aws.amazon.com**
2. Log in (email: `jindalparth376@gmail.com`)
3. Make sure region is **us-east-1** (top right corner)

---

## ✅ STEP 2: Find Your EC2 Instance

1. Click **Services** (top left) → search "EC2"
2. Click **EC2**
3. In left sidebar: **Instances**
4. You should see: `ip-172-31-22-156` (hostname) with IP `3.80.122.16`
5. **Click on it** to select it

---

## ✅ STEP 3: Find the Security Group

1. Scroll down to the **Details** tab
2. Look for **Security groups** field
3. You'll see something like: `sg-0cb6e8a9d1195e3d0`
4. **Click on the security group name** (the sg-xxxxx link)

This opens the Security Group settings page.

---

## ✅ STEP 4: Edit Inbound Rules

1. You're now on the Security Group details page
2. Click the **Inbound rules** tab
3. Click **Edit inbound rules** button (orange button, top right)

---

## ✅ STEP 5: Add New Rule for Port 3000

Click **Add rule** button. Fill in:

| Field | Value |
|-------|-------|
| **Type** | Custom TCP |
| **Protocol** | TCP |
| **Port range** | 3000 |
| **Source** | 0.0.0.0/0 (anywhere) |
| **Description** | Kavach v2 API |

⚠️ **Security note:** `0.0.0.0/0` means anyone on the internet can reach port 3000. For production, restrict this to your IP or website domain. For MVP testing, this is fine.

---

## ✅ STEP 6: Save the Changes

1. Scroll to bottom
2. Click **Save rules** button (orange)

✅ **Done!** The rule is now active.

---

## ✅ STEP 7: Verify the Change

Go back to Instances:
1. Click **Instances** (left sidebar)
2. Click on your instance (`3.80.122.16`)
3. Scroll to **Security groups**
4. You should now see **2 inbound rules:**
   - HTTP (port 80)
   - Custom TCP (port 3000) ← NEW

---

## 🧪 STEP 8: Test the Connection

Open PowerShell and run:

```powershell
Test-NetConnection -ComputerName 3.80.122.16 -Port 3000
```

**Expected output:**
```
ComputerName     : 3.80.122.16
RemoteAddress    : 3.80.122.16
RemotePort       : 3000
SourceAddress    : YOUR_IP
TcpTestSucceeded : True
```

If `TcpTestSucceeded` is `True` ✅ — **the port is now open!**

---

## 🌐 STEP 9: Test from Browser

Try visiting:
```
http://3.80.122.16:3000/health
```

You should get a response (might show JSON or "ok").

If it works, you should see something like:
```json
{"status": "ok", "timestamp": "..."}
```

✅ **Success! Port 3000 is now reachable.**

---

## 📊 STEP 10: Query Kavach v2 API

Now that port 3000 is open, we can pull real metrics! Run this in PowerShell:

```powershell
# Test if the server is responding
Invoke-WebRequest -Uri "http://3.80.122.16:3000/health" -UseBasicParsing

# Try to get metrics (if endpoint exists)
Invoke-WebRequest -Uri "http://3.80.122.16:3000/api/stats" -UseBasicParsing
```

Or use Python:
```python
import requests

# Test health
r = requests.get('http://3.80.122.16:3000/health')
print(r.status_code, r.text)

# Test metrics
r = requests.get('http://3.80.122.16:3000/api/stats')
print(r.json())
```

---

## 🎉 SUCCESS CHECKLIST

- [ ] Logged into AWS Console
- [ ] Found your EC2 instance (3.80.122.16)
- [ ] Opened Security Group settings
- [ ] Added inbound rule for port 3000
- [ ] Saved the rule
- [ ] Verified rule appears in instance details
- [ ] Tested connection with Test-NetConnection ✅
- [ ] Tested from browser (http://3.80.122.16:3000/health)
- [ ] Got a response (status ok or similar)

---

## ❌ TROUBLESHOOTING

### "Connection timed out" after saving rule

- Wait 30-60 seconds (AWS needs time to apply the rule)
- Try again
- Check you're in the **right region** (us-east-1)
- Check the instance is **running** (green status)

### "Connection refused"

- The server might not be running inside the container
- SSH into the instance and check: `docker ps`
- Make sure the Kavach v2 container is running

### "Wrong security group"

- Verify you edited the security group **attached to your instance**
- An instance can have multiple security groups; make sure you're editing the right one

---

## 🔒 NEXT: What We'll Do With This Access

Once port 3000 is open and working:

1. **Query real metrics** from Kavach v2:
   - Detection rate
   - Incident count
   - Active honeypots
   - Uptime

2. **Update homepage** to show real data (replace placeholders)

3. **Connect dashboard** to pull live attack data

4. **Build real-time updates** for the dashboard

---

## 📞 NEED HELP?

Check these:
- Instance IP: `3.80.122.16` ✓
- Region: `us-east-1` ✓
- Port: `3000` ✓
- Security group: Has new inbound rule ✓

Let me know once port 3000 is open! 🚀
