import { serveStatic } from './middleware/staticHandler.js';
import { apiRoutes } from './routes/api.js';

export async function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // API routes
  if (url.pathname.startsWith('/api')) {
    return apiRoutes(req, res);
  }
  
  // Serve static files
  if (url.pathname === '/') {
    url.pathname = '/index.html';
  }
  
  await serveStatic(req, res, url.pathname);
}