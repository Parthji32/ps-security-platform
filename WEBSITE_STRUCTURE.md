# PS Website Structure

## Complete Website Files

All files are now ready in `E:\demo\` and use a unified design system.

### File Structure:
```
E:\demo\
├── index.html                              (PS Homepage - Parent)
├── kavach-product-page-unified.html        (Kavach Product Page - Child)
├── Kavach-Dashboard-Unified.html           (Intelligence Dashboard - Internal App)
├── PS-Homepage-Variation2-WithRealData.html (Original version - can delete)
└── WEBSITE_STRUCTURE.md                    (This file)
```

### Pages Overview:

#### 1. **index.html** (PS Homepage - Parent)
- **URL:** `ps.io/` (main entry point)
- **Description:** Company homepage with product grid, vision, and CTAs
- **Design:** Floating pill nav, animated orbs, hero section
- **Content:**
  - Hero: "Armor that fights back"
  - 3 Product cards (Kavach, Kavach v2, Intelligence Dashboard)
  - Stats (99.98% accuracy, 1.9s detection, 5 dimensions, 0 DB required)
  - Vision section
  - CTA section
  - Footer with links to child pages

#### 2. **kavach-product-page-unified.html** (Kavach Product Page - Child)
- **URL:** `ps.io/kavach` (or link from index.html)
- **Description:** Detailed Kavach product page with features and pricing
- **Design:** Matches PS Homepage (same colors, nav, orbs)
- **Content:**
  - Hero: "Multi-format Canary Tokens"
  - Features grid (tokens, fingerprinting, alerts)
  - Pricing cards (Free starter, $299 Team plan)
  - CTA section

#### 3. **Kavach-Dashboard-Unified.html** (Intelligence Dashboard - Internal App)
- **URL:** `ps.io/dashboard` (internal app)
- **Description:** Real-time threat intelligence interface
- **Design:** Sidebar nav, same color system as parent
- **Content:**
  - Sidebar navigation (Dashboard, Intelligence, Honeypots, Tokens, Settings)
  - KPI cards (Active attackers, fingerprints, threat level)
  - Attacker profiles table
  - Activity heatmap (30 days)
  - Behavioral timeline
  - Threat trends chart
  - TTP analysis (MITRE ATT&CK)

---

## Design System (All Pages)

### Colors:
- **Primary:** `#7C3AED` (Purple)
- **Primary Hover:** `#8B5CF6` (Lighter purple)
- **Secondary:** `#06B6D4` (Cyan)
- **Accent:** `#EC4899` (Pink)
- **Dark Background:** `#0A0A14`
- **Dark Surface:** `#0D0B1A`
- **Panel:** `#120E24`

### Typography:
- **Font:** Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Headings:** 900 weight, tight letter-spacing (-0.04em to -0.05em)
- **Body:** 600-700 weight, 1.55 line-height

### Components:
- **Navigation:** Floating pill style (fixed top-20px, centered)
- **Buttons:** 
  - Primary: Full gradient background, hover effect
  - Ghost: Transparent with border, hover effect
- **Cards:** Panel background with border, hover lift effect
- **Gradients:** 
  - `--grad`: Purple → Cyan (120deg)
  - `--grad-tri`: Pink → Purple → Cyan (120deg)

---

## Navigation Links

**PS Homepage (index.html):**
- Products → #products
- Vision → #vision
- Kavach → kavach-product-page-unified.html
- Get Started (CTA button)

**Kavach Product Page:**
- Features → #features
- Pricing → #pricing
- Start Free Trial (CTA button)
- PS Logo → index.html (back to parent)

**Dashboard:**
- Sidebar navigation between sections
- All internal (no external links)

---

## Deployment Checklist

- [ ] All 3 HTML files copied to hosting
- [ ] Links between pages tested (index.html → product page, → dashboard)
- [ ] Responsive design tested on mobile (use @media queries)
- [ ] Navigation pills render correctly
- [ ] Animated orbs visible (check performance)
- [ ] Hover effects working on cards, buttons
- [ ] Intersection observer scroll effects working
- [ ] Dashboard sidebar responsive on mobile
- [ ] Colors match across all pages

---

## Quick Customization Points

### To change company name:
- Search for `PS` in all files
- Replace with your company name
- Update nav links and logos

### To add more products:
- In `index.html`, duplicate `.prod` card
- Update h3, .p-tag, description, and links

### To add team members:
- In current design: No team section (vision-focused as requested)
- To add: Create new section with team grid after vision section

### To update pricing:
- In `kavach-product-page-unified.html`, update `.price-card` details
- Modify pricing amounts, features lists, button text

---

## File Sizes

- `index.html`: ~15.7 KB
- `kavach-product-page-unified.html`: ~14.4 KB
- `Kavach-Dashboard-Unified.html`: ~14.8 KB

**Total:** ~45 KB (very lightweight, no external dependencies except Tailwind CDN if needed)

---

## Testing URLs

Once deployed, test:
1. `ps.io/` - Homepage loads with orbs, nav, hero
2. `ps.io/kavach` - Product page with features & pricing
3. `ps.io/dashboard` - Dashboard with sidebar and KPIs
4. All internal links work
5. Responsive on mobile (320px to 1920px)

---

## Next Steps

1. Review all 3 pages
2. Provide feedback on:
   - Copy/messaging
   - Colors/styling
   - Missing sections
   - Navigation structure
   - Responsiveness

3. Once approved:
   - Deploy to domain (ps.io or your choice)
   - Configure DNS + SSL
   - Set up analytics
   - Add email signup integration

---

**Created:** 2026-07-06  
**Version:** 1.0  
**Status:** Ready for Review
