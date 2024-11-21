export function errorHandler(err, req, res) {
  console.error(err);
  
  const statusCode = err.statusCode || 500;
  const message = statusCode === 404 ? 'Not Found' : 'Internal Server Error';
  
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}