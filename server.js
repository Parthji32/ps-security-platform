// Minimal static server - NO dependencies required
// Just Node.js built-ins

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const ROOT = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);

  // Security: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Try to serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try adding .html if it's a directory request
      const htmlPath = filePath + '.html';
      fs.readFile(htmlPath, (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end('404 Not Found');
          console.log(`✗ 404: ${req.url}`);
          return;
        }
        res.writeHead(200, { 'Content-Type': mimeTypes['.html'] });
        res.end(data2);
        console.log(`✓ 200: ${req.url}`);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
    console.log(`✓ 200: ${req.url}`);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║  ✓ PS Website Server Running              ║');
  console.log('╠═══════════════════════════════════════════╣');
  console.log(`║  📍 URL: http://localhost:${PORT}             ║`);
  console.log('║  📄 Pages:                                ║');
  console.log('║    • Homepage: http://localhost:3001      ║');
  console.log('║    • Kavach:   /kavach-product-page...    ║');
  console.log('║    • Dashboard: /Kavach-Dashboard...      ║');
  console.log('║                                           ║');
  console.log('║  Press Ctrl+C to stop                     ║');
  console.log('╚═══════════════════════════════════════════╝\n');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`✗ Port ${PORT} is already in use!`);
    console.error('  Kill the process or use a different port.');
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
