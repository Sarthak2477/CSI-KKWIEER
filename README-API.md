# API Setup Guide

## Two Backend Options Available

### Option 1: Next.js API Routes (Recommended)
The project now includes Next.js API routes that handle authentication and questions.

**To use Next.js API routes:**
```bash
npm run dev
```

API endpoints will be available at:
- `http://localhost:3000/api/auth` (POST)
- `http://localhost:3000/api/questions` (GET)

### Option 2: Express Server
A standalone Express server is also available for more traditional backend setup.

**To use Express server:**
```bash
npm run server
```

Server will run on `http://localhost:3001` with endpoints:
- `http://localhost:3001/api/auth` (POST)
- `http://localhost:3001/api/questions` (GET)

## API Endpoints

### Authentication - POST /api/auth
```json
{
  "username": "string",
  "password": "string", 
  "secretCode": "CSI2025"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "username": "string"
  }
}
```

### Questions - GET /api/questions
**Response:**
```json
{
  "questions": [
    {
      "id": 0,
      "question": "string",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "string",
      "image": "string (optional)"
    }
  ]
}
```

## Frontend Integration
The authentication and questions services in `src/api/` have been updated to use these new API routes automatically.

## Development
- Use `npm run dev` for Next.js development (includes API routes)
- Use `npm run server` for standalone Express server
- Use `npm run vite-dev` to run the original Vite setup