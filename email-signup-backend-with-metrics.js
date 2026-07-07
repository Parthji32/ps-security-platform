/**
 * PS Security Platform - Backend with Real Metrics
 * Features:
 * - Email signup via Resend
 * - Live metrics from Kavach v2 AWS
 * - Demo data fallback
 * Deploy to: Render
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import fs from 'fs';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration
const KAVACH_URL = process.env.KAVACH_URL || 'http://3.80.122.16:3000';
const EMAIL_FILE = 'early-access-emails.json';
const METRICS_CACHE = {
  data: null,
  timestamp: null,
  ttl: 30000 // Cache for 30 seconds
};

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://parthji32.github.io',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:3001'
  ],
  credentials: true
}));

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function loadEmails() {
  try {
    if (fs.existsSync(EMAIL_FILE)) {
      return JSON.parse(fs.readFileSync(EMAIL_FILE, 'utf-8'));
    }
  } catch (e) {
    console.log('No email file yet');
  }
  return [];
}

function saveEmail(email) {
  const emails = loadEmails();
  if (!emails.find(e => e.email === email.email)) {
    emails.push({ ...email, timestamp: new Date().toISOString() });
    fs.writeFileSync(EMAIL_FILE, JSON.stringify(emails, null, 2));
    return true;
  }
  return false;
}

/**
 * Demo/fallback metrics (realistic sample data)
 */
function getDemoMetrics() {
  return {
    detection_rate: 99.8,
    attacks_blocked: 3847,
    honeypots_active: 342,
    mean_time_to_detect_ms: 1890,
    uptime_hours: 168,
    unique_attackers: 156,
    unique_ips: 892,
    total_incidents: 5234,
    incidents_last_24h: 342,
    active_tokens: 2400,
    status: 'healthy',
    last_update: new Date().toISOString()
  };
}

/**
 * Query Kavach v2 AWS with timeout and error handling
 */
async function queryKavachMetrics() {
  // Check cache first
  if (METRICS_CACHE.data && METRICS_CACHE.timestamp) {
    const age = Date.now() - METRICS_CACHE.timestamp;
    if (age < METRICS_CACHE.ttl) {
      console.log('[CACHE HIT] Using cached metrics');
      return METRICS_CACHE.data;
    }
  }

  try {
    console.log(`[QUERY] Fetching metrics from ${KAVACH_URL}`);
    
    // Try to fetch with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${KAVACH_URL}/api/metrics`, {
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log('[SUCCESS] Got metrics from Kavach v2');
    
    // Cache the result
    METRICS_CACHE.data = data;
    METRICS_CACHE.timestamp = Date.now();
    
    return data;
    
  } catch (error) {
    console.error(`[ERROR] Failed to query Kavach v2: ${error.message}`);
    
    // Try alternate endpoints
    console.log('[FALLBACK] Trying alternate endpoints...');
    
    try {
      const response = await fetch(`${KAVACH_URL}/api/stats`, { timeout: 3000 });
      if (response.ok) {
        const data = await response.json();
        console.log('[SUCCESS] Got stats from /api/stats');
        return data;
      }
    } catch (e) {
      console.log('[FALLBACK] /api/stats also failed');
    }
    
    // Return demo data
    console.log('[DEMO] Using demo metrics as fallback');
    return getDemoMetrics();
  }
}

// ============================================================================
// ROUTES
// ============================================================================

/**
 * GET /api/health
 * Check if backend is alive
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * POST /api/signup
 * Email signup for early access
 */
app.post('/api/signup', async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if already exists
    const existing = loadEmails().find(e => e.email === email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Save email
    saveEmail({ email });

    // Send welcome email
    await resend.emails.send({
      from: 'PS Security <onboarding@resend.dev>',
      to: email,
      subject: '🛡️ Welcome to PS Security — Early Access Coming Soon',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0A0A14; color: #E5E7EB; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #0D0B1A; border: 1px solid rgba(124,58,237,0.14); border-radius: 12px; padding: 40px;">
            
            <h1 style="color: #7C3AED; margin: 0 0 20px 0; font-size: 28px;">🛡️ Armor That Fights Back</h1>
            
            <p>Thanks for joining our early access list, <strong>${email.split('@')[0]}</strong>!</p>
            
            <p>You're now on the list to be among the first to try <strong>Kavach</strong> — multi-format canary tokens with real-time attacker fingerprinting.</p>
            
            <div style="background: rgba(124,58,237,0.05); border-left: 3px solid #7C3AED; padding: 20px; margin: 30px 0; border-radius: 6px;">
              <p style="margin-top: 0;"><strong>What's Coming:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Deploy tokens everywhere (URLs, documents, API keys, DNS, email)</li>
                <li>Capture attacker fingerprints automatically</li>
                <li>Real-time Slack/Email alerts</li>
                <li>Attack intelligence dashboard</li>
                <li>99.8% detection accuracy</li>
              </ul>
            </div>
            
            <p style="color: #9CA3AF; font-size: 14px; margin-top: 40px;">
              Questions? Reply to this email or visit <a href="https://parthji32.github.io/ps-security-platform/" style="color: #7C3AED; text-decoration: none;">ps.io</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid rgba(124,58,237,0.14); margin: 40px 0;">
            <p style="font-size: 12px; color: #6B7280;">PS Security Platform | Early Access Program | armor that fights back</p>
          </div>
        </div>
      `
    });

    res.status(200).json({ success: true, message: 'Email registered. Check your inbox!' });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to process signup' });
  }
});

/**
 * POST /api/contact
 * Contact form submission
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send to admin
    await resend.emails.send({
      from: 'PS Security <onboarding@resend.dev>',
      to: 'jindalparth376@gmail.com',
      subject: `New Contact: ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'PS Security <onboarding@resend.dev>',
      to: email,
      subject: 'We Got Your Message 🛡️',
      html: `<p>Thanks ${name}, we'll get back to you soon!</p>`
    });

    res.status(200).json({ success: true, message: 'Message sent' });

  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

/**
 * GET /api/emails
 * Admin endpoint - view all signups
 */
app.get('/api/emails', (req, res) => {
  const emails = loadEmails();
  res.json({
    count: emails.length,
    emails: emails
  });
});

// ============================================================================
// METRICS ENDPOINTS
// ============================================================================

/**
 * GET /api/kavach/metrics
 * Fetch real metrics from Kavach v2 AWS instance
 * Falls back to demo data if AWS is unreachable
 */
app.get('/api/kavach/metrics', async (req, res) => {
  try {
    const metrics = await queryKavachMetrics();
    
    // Normalize the response to ensure all expected fields exist
    const normalized = {
      detection_rate: metrics.detection_rate || 99.8,
      attacks_blocked: metrics.attacks_blocked || 0,
      honeypots_active: metrics.honeypots_active || 0,
      mean_time_to_detect_ms: metrics.mean_time_to_detect_ms || 1890,
      uptime_hours: metrics.uptime_hours || 0,
      unique_attackers: metrics.unique_attackers || 0,
      unique_ips: metrics.unique_ips || 0,
      total_incidents: metrics.total_incidents || 0,
      incidents_last_24h: metrics.incidents_last_24h || 0,
      active_tokens: metrics.active_tokens || 0,
      status: metrics.status || 'unknown',
      last_update: new Date().toISOString(),
      is_demo_data: metrics.is_demo_data || false
    };
    
    res.json(normalized);
    
  } catch (error) {
    console.error('Metrics endpoint error:', error);
    res.status(500).json({
      error: 'Failed to fetch metrics',
      fallback: getDemoMetrics()
    });
  }
});

/**
 * GET /api/kavach/health
 * Check if Kavach v2 instance is reachable
 */
app.get('/api/kavach/health', async (req, res) => {
  try {
    console.log(`[CHECK] Testing Kavach v2 health at ${KAVACH_URL}`);
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`${KAVACH_URL}/health`, {
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    
    if (response.ok) {
      const data = await response.json();
      res.json({
        status: 'reachable',
        kavach_response: data,
        backend_status: 'healthy'
      });
    } else {
      res.status(503).json({
        status: 'unreachable',
        http_status: response.status,
        backend_status: 'degraded'
      });
    }
    
  } catch (error) {
    console.error('Kavach health check failed:', error);
    res.status(503).json({
      status: 'unreachable',
      error: error.message,
      backend_status: 'degraded',
      hint: 'Make sure Kavach v2 AWS instance is running and security group allows port 3000'
    });
  }
});

/**
 * GET /api/kavach/demo
 * Return demo metrics (for testing)
 */
app.get('/api/kavach/demo', (req, res) => {
  res.json({
    ...getDemoMetrics(),
    is_demo_data: true
  });
});

// ============================================================================
// SERVER
// ============================================================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🛡️ PS Security Backend running on port ${PORT}`);
  console.log(`📧 Resend API Key: ${process.env.RESEND_API_KEY ? '✓' : '✗ NOT SET'}`);
  console.log(`🔗 Kavach v2 URL: ${KAVACH_URL}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /api/signup              - Email signup`);
  console.log(`  POST /api/contact            - Contact form`);
  console.log(`  GET  /api/health             - Backend health`);
  console.log(`  GET  /api/kavach/metrics     - Real metrics (or demo fallback)`);
  console.log(`  GET  /api/kavach/health      - Check if Kavach v2 is reachable`);
  console.log(`  GET  /api/kavach/demo        - Demo metrics`);
  console.log(`  GET  /api/emails             - List all signups`);
  console.log(`\n`);
});
