const http = require('node:http');
const { promises: fs } = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(__dirname, '..');
const FRONTEND_DIR = path.join(ROOT, 'frontend', 'dist');
const FALLBACK_FRONTEND_DIR = path.join(ROOT, 'frontend');
const DATA_DIR = path.join(__dirname, 'data');
const GUESTBOOK_FILE = path.join(DATA_DIR, 'guestbook.json');
const BOOK_FEEDBACK_FILE = path.join(DATA_DIR, 'book-feedback.json');

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
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.epub': 'application/epub+zip',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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

async function readJsonFile(filePath, fallback = []) {
  try {
    const file = await fs.readFile(filePath, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

async function writeJsonFile(filePath, data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function readGuestbook() {
  return readJsonFile(GUESTBOOK_FILE);
}

async function writeGuestbook(entries) {
  await writeJsonFile(GUESTBOOK_FILE, entries);
}

async function readBookFeedback() {
  return readJsonFile(BOOK_FEEDBACK_FILE);
}

async function writeBookFeedback(entries) {
  await writeJsonFile(BOOK_FEEDBACK_FILE, entries);
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
    sendJson(res, 200, entries.filter((entry) => entry.status !== 'hidden').slice(0, 50));
    return;
  }

  if (url.pathname === '/api/book-feedback' && req.method === 'GET') {
    const entries = await readBookFeedback();
    sendJson(res, 200, entries.filter((entry) => entry.status !== 'hidden').slice(0, 20));
    return;
  }

  const likeMatch = url.pathname.match(/^\/api\/guestbook\/([^/]+)\/like$/);
  if (likeMatch && req.method === 'POST') {
    const entries = await readGuestbook();
    const entry = entries.find((item) => item.id === likeMatch[1]);

    if (!entry) {
      sendError(res, 404, 'Tribute not found.');
      return;
    }

    entry.likes = Number(entry.likes || 0) + 1;
    await writeGuestbook(entries);
    sendJson(res, 200, entry);
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
    const city = sanitizeText(body.city, 50);
    const state = sanitizeText(body.state, 50);
    const message = sanitizeText(body.message, 240);

    if (!name || !message) {
      sendError(res, 400, 'Name and message are required.');
      return;
    }

    const entries = await readGuestbook();
    const entry = {
      id: randomUUID(),
      name,
      city,
      state,
      message,
      likes: 0,
      status: 'visible',
      createdAt: new Date().toISOString()
    };

    entries.unshift(entry);
    await writeGuestbook(entries.slice(0, 100));
    sendJson(res, 201, entry);
    return;
  }

  if (url.pathname === '/api/book-feedback' && req.method === 'POST') {
    let body;
    try {
      body = await readBody(req);
    } catch {
      sendError(res, 400, 'Please send valid JSON.');
      return;
    }

    const name = sanitizeText(body.name, 60);
    const email = sanitizeText(body.email, 90);
    const feedbackType = sanitizeText(body.feedbackType, 40) || 'General feedback';
    const chapter = sanitizeText(body.chapter, 80);
    const message = sanitizeText(body.message, 700);
    const rating = Math.min(5, Math.max(1, Number(body.rating || 5)));

    if (!name || !message) {
      sendError(res, 400, 'Name and feedback message are required.');
      return;
    }

    const entries = await readBookFeedback();
    const entry = {
      id: randomUUID(),
      name,
      email,
      feedbackType,
      chapter,
      message,
      rating,
      status: 'visible',
      createdAt: new Date().toISOString()
    };

    entries.unshift(entry);
    await writeBookFeedback(entries.slice(0, 200));
    sendJson(res, 201, entry);
    return;
  }

  sendError(res, 404, 'API route not found.');
}

async function serveStatic(req, res, url) {
  const staticDir = await fs.access(FRONTEND_DIR).then(() => FRONTEND_DIR).catch(() => FALLBACK_FRONTEND_DIR);
  const requestedPath = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(staticDir, requestedPath));

  if (!filePath.startsWith(staticDir)) {
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
      const fallback = await fs.readFile(path.join(staticDir, 'index.html'));
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
