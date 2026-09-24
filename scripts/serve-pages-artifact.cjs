const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(process.env.PLAYWRIGHT_ARTIFACT_DIR || 'dist-pages');
const basePath = '/sawariyadiagnostic/';
const port = Number(process.env.PORT || 4173);
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
};

if (!fs.existsSync(path.join(root, 'index.html'))) {
  throw new Error(`Artifact not staged: ${root}; run npm run stage:pages first`);
}

http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const relative = url.pathname.startsWith(basePath)
    ? decodeURIComponent(url.pathname.slice(basePath.length))
    : decodeURIComponent(url.pathname.slice(1));
  const file = path.resolve(root, relative || 'index.html');
  if (!file.startsWith(`${root}${path.sep}`) && file !== path.join(root, 'index.html')) {
    response.writeHead(404).end('Not found');
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(response);
    return;
  }
  response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(path.join(root, '404.html')).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Static Pages preview on http://127.0.0.1:${port}${basePath}`));
