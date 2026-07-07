# 🛡️ PS WEBSITE + KAVACH v1 + KAVACH v2 — Complete Integration

**Status:** Ready for Full Integration  
**Last Updated:** 2026-07-06

---

## 📊 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      PS.io Website (Frontend)                   │
│  ├─ Homepage (PS platform overview)                             │
│  ├─ Kavach v1 Product Page (features, pricing)                  │
│  ├─ Kavach v2 Product Page (ML reverse proxy)                   │
│  └─ Dashboard (live Kavach v1 + v2 control center)              │
└────────────┬────────────────────────────────────────┬───────────┘
             │                                        │
    ┌────────▼────────┐                    ┌─────────▼────────┐
    │                 │                    │                  │
    │  KAVACH v1      │                    │   KAVACH v2      │
    │ (Live/Demo)     │                    │  (In Development)│
    │                 │                    │                  │
    │ • Tokens        │                    │ • Reverse Proxy  │
    │ • Fingerprint   │                    │ • 5D Classifier  │
    │ • Alerts        │                    │ • ML Scoring     │
    │ • Dashboard     │                    │ • Website Mirror │
    └─────────────────┘                    └──────────────────┘
         Port 8080                              Port 3000
         (Fiber + Go)                        (Go + Python)
```

---

## 🎯 Integration Strategy

### Phase 1: Website Only (NOW) ✅
- PS homepage with product overview
- Kavach v1 & v2 product pages
- Static dashboard UI
- Deploy to Vercel/Netlify

### Phase 2: Kavach v1 Integration (NEXT)
- Link website to live Kavach v1 instance
- Show real token data on dashboard
- Live alerts section
- Deploy Kavach v1 backend

### Phase 3: Kavach v2 Integration (THEN)
- Integrate v2 reverse proxy
- Show v2 metrics on dashboard
- Live classification scoring
- Deploy v2 stack (Go + Python agents)

---

## 📁 Folder Structure (Unified Repo)

After integration, your GitHub repo will look like:

```
ps-website/
├── website/                    ← Frontend (Next.js or static)
│   ├── index.html              (PS Homepage)
│   ├── kavach-v1.html          (Kavach v1 product page)
│   ├── kavach-v2.html          (Kavach v2 product page)
│   ├── dashboard.html          (Control center)
│   ├── server.js               (Static server)
│   └── package.json
│
├── kavach-v1/                  ← Kavach v1 (Go + Fiber + HTMX)
│   ├── cmd/
│   ├── internal/
│   ├── templates/
│   ├── go.mod
│   ├── Dockerfile
│   └── README.md
│
├── kavach-v2/                  ← Kavach v2 (Go reverse proxy + Python agents)
│   ├── backend/                (Go server on port 3000)
│   │   ├── cmd/
│   │   ├── internal/
│   │   └── go.mod
│   ├── agents/                 (Python FastAPI agents)
│   │   ├── token_manager/      (Port 5001)
│   │   └── website_generator/  (Port 5002)
│   ├── docker-compose.yml
│   ├── Dockerfile.server
│   ├── Dockerfile.token-manager
│   ├── Dockerfile.website-generator
│   └── README.md
│
├── .github/
│   └── workflows/              (CI/CD for all services)
│
├── docker-compose.yml          (Master: website + v1 + v2)
├── .env.example
├── README.md                   (Main project README)
└── DEPLOYMENT.md               (Complete deployment guide)
```

---

## 🚀 Phase 1: Website Deployment (NOW)

### Step 1: Push Website to GitHub
```bash
cd E:\demo
git init
git add .
git commit -m "Initial: PS website with 3 pages"
git remote add origin https://github.com/YOUR_USERNAME/ps-website.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub → Select `ps-website`
3. Deploy
4. **Live in 2 minutes!**

### URLs After Phase 1:
```
https://ps.io/                    ← PS Homepage
https://ps.io/kavach-v1.html      ← Kavach v1 Product
https://ps.io/kavach-v2.html      ← Kavach v2 Product
https://ps.io/dashboard.html      ← Control Center (static UI)
```

---

## 🔌 Phase 2: Integrate Kavach v1 (BACKEND API)

### Add API Endpoints to Website Backend

Update `E:\demo\api.js` to include:

```javascript
// GET /api/v1/tokens - List all tokens
// GET /api/v1/attackers - List attacker profiles
// GET /api/v1/alerts - List recent alerts
// POST /api/v1/alerts/acknowledge - Mark alerts as read
// GET /api/v1/stats - Dashboard stats
```

### Connect Dashboard to Real Data

Update `Kavach-Dashboard-Unified.html`:

```javascript
// On page load, fetch from API
fetch('/api/v1/stats').then(r => r.json()).then(data => {
  // Update KPI cards with real numbers
  document.getElementById('total-tokens').textContent = data.tokenCount;
  document.getElementById('active-attackers').textContent = data.attackerCount;
  // ... etc
});
```

---

## ⚡ Phase 3: Integrate Kavach v2 (REVERSE PROXY)

### Architecture

```
Internet Traffic (port 443/80)
         ↓
    [Nginx] (reverse proxy)
         ↓
    ┌────┴────┐
    ↓         ↓
PS Website  Kavach v2 Server
(port 8000) (port 3000)
    
When user visits ps.io:
  → Nginx route *.deception.ps.io → Kavach v2
  → Nginx route ps.io → Website

When attacker tries to access ps.io:
  → Kavach v2 classifier scores the request
  → If score > 70: Honeypot trap
  → If score < 30: Forward to real app
```

### Deployment Setup

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl  # SSL certs
    networks:
      - ps-network

  website:
    build: ./website
    ports:
      - "8000"
    networks:
      - ps-network

  kavach-v2:
    build: ./kavach-v2/backend
    ports:
      - "3000"
    environment:
      - REAL_APP_URL=http://netflix:8080
    networks:
      - ps-network
    depends_on:
      - token-manager
      - website-generator

  token-manager:
    build: ./kavach-v2/agents/token_manager
    ports:
      - "5001"
    networks:
      - ps-network

  website-generator:
    build: ./kavach-v2/agents/website_generator
    ports:
      - "5002"
    networks:
      - ps-network

networks:
  ps-network:
    driver: bridge
```

---

## 📝 Development Workflow

### Local Development (All 3 Projects)

**Terminal 1: Website**
```bash
cd website
node server.js
# http://localhost:3001
```

**Terminal 2: Kavach v1**
```bash
cd kavach
go run cmd/server/main.go
# http://localhost:8080
```

**Terminal 3-5: Kavach v2 (Backend)**
```bash
cd kavach-v2/backend
go run ./cmd/server/main.go
# http://localhost:3000
```

**Terminal 4: Kavach v2 (Token Manager)**
```bash
cd kavach-v2/agents/token_manager
python main.py
# http://localhost:5001
```

**Terminal 5: Kavach v2 (Website Generator)**
```bash
cd kavach-v2/agents/website_generator
python main.py
# http://localhost:5002
```

---

## 🐳 Docker Deployment (All Services)

### Build Everything
```bash
cd ps-website
docker-compose build
```

### Run Everything
```bash
docker-compose up -d
```

### Check Status
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f website
docker-compose logs -f kavach-v2
```

---

## ☁️ Cloud Deployment (AWS / Vercel)

### Option 1: Vercel (Website Only) + EC2 (Backend)
- Website → Vercel ($0)
- Kavach v1 → EC2 ($5-10/mo)
- Kavach v2 → EC2 ($10-20/mo)
- **Total: ~$15-30/mo**

### Option 2: Full Docker Swarm
- Deploy all services to AWS ECS Fargate
- Auto-scaling included
- **Total: ~$50-100/mo**

### Option 3: Kubernetes (Kops/EKS)
- Production-grade setup
- Full control
- **Total: ~$100-200/mo**

---

## 📊 Dashboard Integration Points

The unified dashboard will show:

```
TOP BAR:
├─ Overall Status (Green/Yellow/Red)
├─ Active Threats (count)
└─ Last Updated (timestamp)

SECTION 1: Kavach v1 Stats
├─ Total Tokens Deployed
├─ Tokens Triggered (today)
├─ Unique Attackers
├─ Recent Alerts
└─ Top Attack Types

SECTION 2: Kavach v2 Stats
├─ Requests Classified
├─ Risk Score Distribution (chart)
├─ Honeypots Active
├─ Attacks Blocked (today)
└─ ML Model Accuracy

SECTION 3: Live Activity Feed
├─ Real-time request log
├─ Attacker profiles
├─ Threat timeline
└─ Export to SIEM
```

---

## 🔐 Security Considerations

1. **Separation of Concerns**
   - Website (frontend) = public
   - Kavach v1 (token mgmt) = internal
   - Kavach v2 (reverse proxy) = upstream

2. **Network Isolation**
   - Each service on separate Docker network
   - Only Nginx exposed to internet
   - Internal APIs require auth

3. **Secret Management**
   - Use `.env` files (NOT committed)
   - Use AWS Secrets Manager in prod
   - Rotate API keys monthly

4. **Monitoring & Alerting**
   - All services log to CloudWatch
   - Alerts on errors/anomalies
   - Uptime monitoring via Pingdom

---

## 📋 Migration Checklist

- [ ] Phase 1: Website live on Vercel
- [ ] Phase 2: Kavach v1 backend deployed
- [ ] Phase 2: Dashboard shows real v1 data
- [ ] Phase 3: Kavach v2 backend deployed
- [ ] Phase 3: Dashboard shows v2 classifier scores
- [ ] Phase 3: Full stack tested end-to-end
- [ ] Security audit completed
- [ ] SSL certificates installed
- [ ] Monitoring & alerting active
- [ ] Runbooks written
- [ ] Team trained

---

## 🎯 Success Metrics

Track these after full integration:

| Metric | Target | Tool |
|--------|--------|------|
| Website Uptime | 99.9% | UptimeRobot |
| Kavach v1 Response Time | <100ms | Application Insights |
| Kavach v2 Classification Accuracy | >95% | CloudWatch |
| False Positive Rate | <5% | Dashboard |
| Attacker Detection Rate | >90% | Dashboard |

---

## 📚 Next Steps

1. **Complete Phase 1** (Website deployment)
2. **Decide on Phase 2 timeline** (v1 integration)
3. **Prepare Kavach v1 for production** (cleanup, testing, docs)
4. **Plan v2 deployment** (EC2/ECS sizing, cost estimates)
5. **Set up CI/CD pipeline** (automated tests, deployments)

---

**Ready to integrate Kavach v1 & v2?** Let's build the complete deception security platform! 🚀

---

**Created:** 2026-07-06  
**Version:** 1.0.0  
**Status:** Strategy Document