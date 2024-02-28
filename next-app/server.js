const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : 'parokistmarkusmelak.org';
const port = 3000;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      nextApp.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      nextApp.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
