import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mime from 'mime-types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = path.join(__dirname, '../../public');

export async function serveStatic(req, res, pathname) {
  try {
    const filePath = path.join(STATIC_DIR, pathname);
    const content = await fs.readFile(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      err.statusCode = 404;
    }
    throw err;
  }
}