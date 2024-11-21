import http from 'http';
import { router } from './router.js';
import { errorHandler } from './middleware/errorHandler.js';

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});