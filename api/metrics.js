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

  try {
    const KAVACH_URL = 'http://3.80.122.16:3000';
    
    console.log(`[QUERY] Fetching metrics from ${KAVACH_URL}`);
    
    // Query Kavach v2 with timeout
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
    
    return res.status(200).json({
      ...data,
      source: 'live',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error(`[ERROR] Failed to query Kavach v2: ${error.message}`);
    
    // Try alternate endpoint
    try {
      const response = await fetch('http://3.80.122.16:3000/api/stats', { timeout: 3000 });
      if (response.ok) {
        const data = await response.json();
        console.log('[SUCCESS] Got stats from /api/stats');
        return res.status(200).json({
          ...data,
          source: 'live',
          timestamp: new Date().toISOString()
        });
      }
    } catch (e) {
      console.log('[FALLBACK] /api/stats also failed');
    }
    
    // Return demo data
    console.log('[DEMO] Using demo metrics as fallback');
    return res.status(200).json({
      detection_rate: 99.8,
      attacks_blocked: 3847,
      honeypots_active: 342,
      mean_time_to_detect_ms: 1890,
      uptime_hours: 168,
      unique_attackers: 156,
      source: 'demo',
      timestamp: new Date().toISOString()
    });
  }
}
