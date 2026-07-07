/**
 * Vercel API Route: /api/metrics
 * Fetches real metrics from Kavach v2 AWS instance
 * Falls back to demo data if unreachable
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // For now, return demo metrics (Approach 1)
  // In Phase 2, this will query real Kavach v2 instance
  const demoMetrics = {
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
    source: 'demo',
    timestamp: new Date().toISOString()
  };
  console.log('[DEMO MODE] Returning demo metrics');
  return res.status(200).json(demoMetrics);
}
