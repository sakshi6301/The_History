# Chhatrapati Shivaji Maharaj Fullstack Site

This project has been converted from a single HTML file into a small fullstack Node app.

## Run Locally

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Project Structure

```text
frontend/index.html      Frontend page
frontend/assets/         Frontend images and assets
backend/index.js         Node HTTP server and API routes
backend/data/            File-backed guestbook storage
```

## API Routes

- `GET /api/site` returns site metadata.
- `GET /api/guestbook` returns guestbook entries.
- `POST /api/guestbook` saves a guestbook entry.
