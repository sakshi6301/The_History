const http = require('node:http');
const { promises: fs } = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(__dirname, '..');
const FRONTEND_DIR = path.join(ROOT, 'frontend');
const DATA_DIR = path.join(__dirname, 'data');
const GUESTBOOK_FILE = path.join(DATA_DIR, 'guestbook.json');

const siteInfo = {
  title: 'Chhatrapati Shivaji Maharaj',
  subtitle: 'The Lion of Maharashtra',
  years: '1630 - 1680',
  chapters: [
    'Birth and Childhood',
    'Oath of Swarajya',
    'Rise of the Maratha Power',
    'Battles and Strategy',
    'Forts of Swarajya',
    'Coronation',
    'Administration',
    'Naval Vision',
    'Legacy'
  ]
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message });
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
    if (Buffer.concat(chunks).length > 1024 * 32) {
      throw new Error('Request body is too large');
    }
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

async function readGuestbook() {
  try {
    const file = await fs.readFile(GUESTBOOK_FILE, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeGuestbook(entries) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(GUESTBOOK_FILE, JSON.stringify(entries, null, 2));
}

function sanitizeText(value, maxLength) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

async function handleApi(req, res, url) {
  if (url.pathname === '/api/site' && req.method === 'GET') {
    sendJson(res, 200, siteInfo);
    return;
  }

  if (url.pathname === '/api/guestbook' && req.method === 'GET') {
    const entries = await readGuestbook();
    sendJson(res, 200, entries.slice(0, 20));
    return;
  }

  if (url.pathname === '/api/guestbook' && req.method === 'POST') {
    let body;
    try {
      body = await readBody(req);
    } catch {
      sendError(res, 400, 'Please send valid JSON.');
      return;
    }

    const name = sanitizeText(body.name, 60);
    const message = sanitizeText(body.message, 240);

    if (!name || !message) {
      sendError(res, 400, 'Name and message are required.');
      return;
    }

    const entries = await readGuestbook();
    const entry = {
      id: randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString()
    };

    entries.unshift(entry);
    await writeGuestbook(entries.slice(0, 100));
    sendJson(res, 201, entry);
    return;
  }

  sendError(res, 404, 'API route not found.');
}

async function serveStatic(req, res, url) {
  const requestedPath = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(FRONTEND_DIR, requestedPath));

  if (!filePath.startsWith(FRONTEND_DIR)) {
    sendError(res, 403, 'Forbidden');
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[extension] || 'application/octet-stream'
    });
    res.end(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const fallback = await fs.readFile(path.join(FRONTEND_DIR, 'index.html'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fallback);
      return;
    }
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url);
      return;
    }

    await serveStatic(req, res, url);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Something went wrong on the server.');
  }
});

server.listen(PORT, () => {
  console.log(`Fullstack app running at http://localhost:${PORT}`);
});
