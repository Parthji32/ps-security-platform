export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const metrics = {
    detection_rate: 99.8,
    attacks_blocked: 3847,
    honeypots_active: 342,
    mean_time_to_detect_ms: 1890,
    uptime_hours: 168,
    unique_attackers: 156,
    status: 'healthy',
    source: 'demo',
    timestamp: new Date().toISOString()
  };

  res.status(200).json(metrics);
}
