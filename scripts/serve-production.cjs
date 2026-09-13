const http = require('node:http');
const { spawn } = require('node:child_process');

const port = Number(process.env.PORT || 4173);
const child = spawn(process.execPath, ['dist/server.cjs'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production', PORT: String(port) },
});

const timer = setInterval(() => {
  const request = http.get(`http://127.0.0.1:${port}/health`, (response) => {
    response.resume();
    if (response.statusCode === 200) {
      clearInterval(timer);
      console.log(`Production server ready on port ${port}`);
    }
  });
  request.on('error', () => {});
}, 250);

child.on('exit', (code, signal) => {
  clearInterval(timer);
  process.exit(code ?? (signal ? 1 : 0));
});

process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));
