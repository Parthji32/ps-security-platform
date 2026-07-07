# 🛡️ PS SECURITY PLATFORM — Complete Integration Guide

**Website + Kavach v1 + Kavach v2 = One Unified Deception Security Platform**

**Status:** Ready for Full Integration  
**Last Updated:** 2026-07-06  
**Version:** 1.0.0

---

## 🎯 What You're Building

A **complete cybersecurity deception platform** with:

1. **🌐 PS Website** — Marketing & control center
2. **🎫 Kavach v1** — Canary token generator + attacker fingerprinting (LIVE)
3. **🔒 Kavach v2** — ML-powered invisible reverse proxy (IN DEVELOPMENT)

All three working together in one unified system.

---

## 📊 System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    ps.io (Website)                           │
│  ├─ Homepage          → Marketing                            │
│  ├─ Kavach v1 Page    → Features & pricing                   │
│  ├─ Kavach v2 Page    → ML reverse proxy details             │
│  └─ Dashboard         → Central control panel                │
└────────────┬──────────────────────────────┬─────────────────┘
             │ API                          │ API
    ┌────────▼────────┐            ┌────────▼────────┐
    │   KAVACH v1     │            │   KAVACH v2     │
    │  (Production)   │            │  (Alpha)        │
    │                 │            │                 │
    │ • Token Mgmt    │            │ • Reverse Proxy │
    │ • Fingerprint   │            │ • 5D Classifier │
    │ • Alerts        │            │ • Honeypots     │
    │ • Real-time Ops │            │ • ML Scoring    │
    └─────────────────┘            └─────────────────┘
       Port 8080                       Port 3000
       (Go + Fiber)              (Go + Python + Docker)
```

---

## 🚀 Phase 1: Deploy Website (NOW)

### Files in `E:\demo`:

```
✅ index.html                          (PS Homepage)
✅ kavach-product-page-unified.html    (Kavach v1 Product Page)
✅ Kavach-Dashboard-Unified.html       (Control Center UI)
✅ api.js                              (Backend API)
✅ package.json                        (Node dependencies)
✅ server.js                           (Static server)
✅ RUN.bat                             (Local development)
✅ PUSH_TO_GITHUB.ps1                  (GitHub upload script)
```

### Step 1: Test Locally

```bash
cd E:\demo
.\RUN.bat
# Opens http://localhost:3001
```

### Step 2: Push to GitHub

```powershell
cd E:\demo
.\PUSH_TO_GITHUB.ps1
# Paste your GitHub repo URL when prompted
```

### Step 3: Deploy to Vercel (FREE)

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Select your GitHub repo (`ps-website`)
4. Click **"Deploy"**
5. **Live in 30 seconds!** ✓

**Website is now live at:** `https://ps.io`

---

## 🔌 Phase 2: Integrate Kavach v1

### What is Kavach v1?

A **production-ready canary token platform** with:
- ✅ Multi-format tokens (URL, PDF, API Key, DNS, Email)
- ✅ Real-time attacker fingerprinting
- ✅ Alert integration (Slack, Email, Webhooks)
- ✅ Live dashboard
- ✅ Can run without database (demo mode)

### Files Location:

```
E:\kavach\
├── cmd/server/main.go          (Main app)
├── internal/
├── templates/
├── go.mod
├── Dockerfile
└── README.md
```

### Deploy Kavach v1

**Option A: Standalone (Simplest)**
```bash
cd E:\kavach
go mod tidy
go run cmd/server/main.go
# http://localhost:8080
```

**Option B: Docker**
```bash
cd E:\kavach
docker build -t kavach-v1 .
docker run -p 8080:8080 kavach-v1
```

**Option C: Cloud (AWS/Heroku)**
```bash
# Push to GitHub, deploy to Heroku/AWS ECS
git push heroku main
```

### Integrate v1 with Website

Update website to show **real** v1 data:

```javascript
// In Kavach-Dashboard-Unified.html
setInterval(() => {
  fetch('https://kavach-v1.ps.io/api/stats')
    .then(r => r.json())
    .then(data => {
      document.getElementById('total-tokens').textContent = data.tokenCount;
      document.getElementById('attackers').textContent = data.uniqueAttackers;
      document.getElementById('alerts-today').textContent = data.alertsToday;
    });
}, 5000); // Refresh every 5 seconds
```

---

## ⚡ Phase 3: Integrate Kavach v2

### What is Kavach v2?

An **ML-powered invisible reverse proxy** that:
- ✅ Sits between internet and your app
- ✅ Scores all traffic with 5-dimensional ML classifier
- ✅ Routes suspicious requests to honeypots
- ✅ Generates fake website copies
- ✅ Tarpits bots (slow responses)
- ✅ Logs everything for analysis

### Architecture

```
Internet Traffic
    ↓
[Kavach v2 on Port 3000]
    ↓
┌───────────┬───────────┐
↓           ↓
Real App    Honeypot
(Score <30) (Score >70)
```

### Files Location:

```
E:\kavach-v2\
├── backend/                         (Go reverse proxy)
│   ├── cmd/server/main.go
│   ├── internal/
│   └── Dockerfile.server
├── agents/
│   ├── token_manager/              (Python FastAPI - port 5001)
│   │   ├── main.py
│   │   └── requirements.txt
│   └── website_generator/          (Python FastAPI - port 5002)
│       ├── main.py
│       └── requirements.txt
├── docker-compose.yml
└── README.md
```

### Deploy Kavach v2 (Local Development)

**Terminal 1: Reverse Proxy**
```bash
cd E:\kavach-v2\backend
go mod tidy
go run ./cmd/server/main.go
# Port 3000
```

**Terminal 2: Token Manager Agent**
```bash
cd E:\kavach-v2\agents\token_manager
pip install -r requirements.txt
python main.py
# Port 5001
```

**Terminal 3: Website Generator Agent**
```bash
cd E:\kavach-v2\agents\website_generator
pip install -r requirements.txt
python main.py
# Port 5002
```

### Deploy Kavach v2 (Docker)

```bash
cd E:\kavach-v2
docker-compose up -d
```

### Deploy Kavach v2 (Production)

The master `docker-compose-full.yml` runs everything:

```bash
# Copy all three projects into one repo
cd ps-website/
docker-compose -f docker-compose-full.yml up -d
```

---

## 📋 Complete Deployment Checklist

### Phase 1: Website ✅
- [x] Pages built
- [ ] Test locally
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure domain

### Phase 2: Kavach v1 Integration
- [ ] Deploy v1 standalone
- [ ] Test canary tokens
- [ ] Integrate API with website
- [ ] Show real dashboard data
- [ ] Setup alerts

### Phase 3: Kavach v2 Integration
- [ ] Deploy v2 backend
- [ ] Deploy Python agents
- [ ] Test reverse proxy
- [ ] Verify classification scoring
- [ ] Load test

### Operations
- [ ] Setup monitoring (CloudWatch/Datadog)
- [ ] Setup logging (ELK/Splunk)
- [ ] Configure alerting (Slack/PagerDuty)
- [ ] Setup CI/CD (GitHub Actions)
- [ ] Write runbooks

---

## 🌐 Final Architecture (All Integrated)

```
ps.io
├─ /                       → Website (Homepage)
├─ /kavach-v1              → Product page + dashboard
├─ /kavach-v2              → Reverse proxy details
├─ /dashboard              → Live control center
└─ /api/v1/...            → Kavach v1 API endpoints

kavach-v1.ps.io
├─ /                       → v1 Dashboard
├─ /api/tokens            → List tokens
├─ /api/attackers         → List attacker profiles
└─ /api/alerts            → Real-time alerts

deception.ps.io
├─ /                       → v2 Status page
├─ /metrics               → Classification metrics
└─ /api/...              → v2 API endpoints
```

---

## 📦 Docker Compose Full Stack

The `docker-compose-full.yml` runs:

```yaml
Services:
├─ website          (Node.js)      - Port 3001
├─ kavach-v1        (Go/Fiber)     - Port 8080
├─ kavach-v2-server (Go)           - Port 3000
├─ token-manager    (Python)       - Port 5001
├─ website-gen      (Python)       - Port 5002
├─ netflix-test     (Go)           - Port 8081 (real app)
├─ postgres         (Database)     - Port 5432
├─ redis            (Cache)        - Port 6379
└─ nginx            (Reverse Proxy) - Port 80/443
```

Start everything:
```bash
docker-compose -f docker-compose-full.yml up -d
```

Check status:
```bash
docker-compose -f docker-compose-full.yml ps
```

---

## 🛠️ Development Workflow

### Local: All 3 Services Running

```bash
# Terminal 1: Website
cd website && npm start

# Terminal 2: Kavach v1
cd kavach && go run cmd/server/main.go

# Terminal 3: Kavach v2 (Reverse Proxy)
cd kavach-v2/backend && go run ./cmd/server/main.go

# Terminal 4: Python Token Manager
cd kavach-v2/agents/token_manager && python main.py

# Terminal 5: Python Website Generator
cd kavach-v2/agents/website_generator && python main.py
```

Access:
- Website: http://localhost:3001
- Kavach v1: http://localhost:8080
- Kavach v2: http://localhost:3000
- Token Manager API: http://localhost:5001/docs
- Website Gen API: http://localhost:5002/docs

---

## 🚀 Next: GitHub Organization

Recommended structure for GitHub:

```
ps-security/                    (Organization)
├─ ps-website                   (Frontend + static)
├─ kavach                        (v1 - Fiber + Go)
├─ kavach-v2                     (v2 - Go + Python)
├─ ps-deployment                (DevOps, Docker, IaC)
├─ ps-docs                       (Documentation)
└─ ps-monitoring                 (Observability configs)
```

---

## ✅ Success Metrics

After full integration, monitor:

| Metric | Target | How to Check |
|--------|--------|---|
| Website Uptime | 99.9% | UptimeRobot |
| v1 API Response | <100ms | CloudWatch |
| v2 Classification | <50ms | Dashboard |
| False Positives | <5% | v2 Metrics |
| Detection Rate | >90% | Dashboard |

---

## 📞 Support & Documentation

- **Website Docs:** `DEPLOYMENT_GUIDE.md`
- **Kavach v1 Docs:** `E:\kavach\README.md`
- **Kavach v2 Docs:** `E:\kavach-v2\README.md`
- **Integration Guide:** `KAVACH_INTEGRATION.md`
- **Docker Setup:** `docker-compose-full.yml`

---

## 🎉 You're Ready!

You have:
- ✅ Production-ready website
- ✅ Live Kavach v1 platform
- ✅ Kavach v2 in development
- ✅ Complete integration guide
- ✅ Docker setup for all services
- ✅ Deployment configs for cloud

**Time to build the deception security platform!** 🚀

---

**Questions?** Check the specific READMEs or integration guide above.

---

Created: 2026-07-06  
Version: 1.0.0  
Status: 🟢 Ready for Integration
