/**
 * PS Security Platform - Email Signup Backend
 * Uses Resend for email delivery
 * Deploy to: Render, Railway, or Vercel
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://parthji32.github.io', 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));

// Email list file (simple storage)
const EMAIL_FILE = 'early-access-emails.json';

function loadEmails() {
  try {
    if (fs.existsSync(EMAIL_FILE)) {
      return JSON.parse(fs.readFileSync(EMAIL_FILE, 'utf-8'));
    }
  } catch (e) {
    console.log('No email file yet, starting fresh');
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

// Routes

/**
 * POST /api/signup
 * Body: { email: "user@example.com" }
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
        <div style="font-family: Inter, sans-serif; background: #0A0A14; color: #E5E7EB; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #0D0B1A; border: 1px solid rgba(124,58,237,0.14); border-radius: 12px; padding: 40px;">
            
            <h1 style="color: #7C3AED; margin: 0 0 20px 0; font-size: 28px;">🛡️ Armor That Fights Back</h1>
            
            <p>Thanks for joining our early access list!</p>
            
            <p>You're now on the list to be among the first to try <strong>Kavach</strong> — multi-format canary tokens with real-time attacker fingerprinting.</p>
            
            <div style="background: rgba(124,58,237,0.05); border-left: 3px solid #7C3AED; padding: 20px; margin: 30px 0; border-radius: 6px;">
              <p><strong>What's Coming:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Deploy tokens everywhere (URLs, documents, API keys, DNS, email)</li>
                <li>Capture attacker fingerprints automatically</li>
                <li>Real-time Slack/Email alerts</li>
                <li>Attack intelligence dashboard</li>
              </ul>
            </div>
            
            <p style="color: #9CA3AF; font-size: 14px; margin-top: 40px;">
              Questions? Reply to this email or visit <a href="https://parthji32.github.io/ps-security-platform/" style="color: #7C3AED;">ps.io</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid rgba(124,58,237,0.14); margin: 40px 0;">
            <p style="font-size: 12px; color: #6B7280;">PS Security Platform | Early Access Program</p>
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
 * GET /api/emails (admin only - no auth yet, just for testing)
 */
app.get('/api/emails', (req, res) => {
  const emails = loadEmails();
  res.json({
    count: emails.length,
    emails: emails
  });
});

/**
 * POST /api/contact
 * Body: { email: "...", name: "...", message: "..." }
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send to admin (you)
    await resend.emails.send({
      from: 'PS Security <onboarding@resend.dev>',
      to: 'jindalparth376@gmail.com', // YOUR EMAIL
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
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🛡️ PS Security Backend running on port ${PORT}`);
  console.log(`📧 Using Resend API Key: ${process.env.RESEND_API_KEY ? '✓' : '✗'}`);
});
