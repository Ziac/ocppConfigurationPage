export function apiRoutes(req, res) {
  const data = {
    message: 'Node.js server is running',
    timestamp: new Date().toISOString(),
    endpoints: [
      { path: '/', method: 'GET', description: 'Static HTML page' },
      { path: '/api', method: 'GET', description: 'API information' }
    ]
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}