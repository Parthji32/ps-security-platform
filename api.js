// PS Website Backend API
// Deploy to Vercel or any Node.js hosting

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Email transporter (using a service like Resend, SendGrid, or your own SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Send welcome email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Welcome to PS — Start Your Free Trial',
      html: `
        <h2>Welcome to PS</h2>
        <p>Thanks for signing up! Your free Kavach trial is ready.</p>
        <p><a href="${process.env.APP_URL}/onboard">Start your trial →</a></p>
      `
    });

    // Log to database or analytics
    console.log(`New signup: ${email}`);

    res.json({ success: true, message: 'Check your email to get started!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to process signup' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!email || !message || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send to team
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact: ${name} from ${company || 'N/A'}`,
      html: `
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <h4>Message:</h4>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'We got your message',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
        <p>— The PS Team</p>
      `
    });

    res.json({ success: true, message: "Message sent! We'll be in touch." });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Analytics endpoint
app.post('/api/track', async (req, res) => {
  try {
    const { event, properties } = req.body;
    
    // Send to analytics service (Plausible, Mixpanel, etc.)
    console.log(`Event: ${event}`, properties);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files
app.use(express.static('public'));

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ PS API running on port ${PORT}`);
});

module.exports = app;