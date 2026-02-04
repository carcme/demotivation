# Demot - Demotivational Quotes App

A modern web application built with TanStack Start that serves demotivational quotes through both a beautiful UI and RESTful API endpoints.

## Features

- 🎨 **Modern UI** with dark/light theme switcher
- 🔄 **Random Quote Generator** with smooth animations
- 🌐 **RESTful API** for programmatic access
- ⚡ **Fast & Responsive** built with React and TanStack Start
- 🎯 **29 Demotivational Quotes** to keep your expectations low

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start)
- **Server**: [Nitro](https://nitro.build/)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## API Endpoints

All endpoints return JSON responses with the following structure:

### Get All Quotes

```
GET /api/demots
```

**Response:**
```json
{
  "success": true,
  "count": 29,
  "data": [
    {
      "id": 1,
      "quote": "Trying is the first step toward failure.",
      "author": "Homer Simpson"
    },
    ...
  ]
}
```

### Get Quote by ID

```
GET /api/demots/:id
```

**Parameters:**
- `id` (number): Quote ID (1-29)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "quote": "It could be that your purpose in life is to serve as a warning to others.",
    "author": "Ashleigh Brilliant"
  }
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "statusMessage": "Quote with id 99 not found"
}
```

### Get Random Quote

```
GET /api/demots/random
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 11,
    "quote": "Everything happens for a reason. Sometimes the reason is you're stupid and make bad decisions.",
    "author": "Marion G. Harmon"
  }
}
```

## Usage Examples

### JavaScript/TypeScript

```typescript
// Fetch all quotes
const response = await fetch('/api/demots');
const { data, count } = await response.json();

// Fetch specific quote
const response = await fetch('/api/demots/5');
const { data } = await response.json();

// Fetch random quote
const response = await fetch('/api/demots/random');
const { data } = await response.json();
```

### cURL

```bash
# Get all quotes
curl http://localhost:3000/api/demots

# Get specific quote
curl http://localhost:3000/api/demots/5

# Get random quote
curl http://localhost:3000/api/demots/random
```

## Project Structure

```
demot/
├── server/
│   └── api/
│       └── demots/
│           ├── [id].ts       # Get quote by ID
│           └── random.ts     # Get random quote
│       └── demots.ts         # Get all quotes
├── src/
│   ├── components/
│   │   ├── header.tsx        # Header with theme switcher
│   │   └── shadcn/           # UI components
│   ├── data/
│   │   └── demots.ts         # Quote data
│   ├── lib/
│   │   └── theme-context.tsx # Theme provider
│   └── routes/
│       ├── __root.tsx        # Root layout
│       └── index.tsx         # Homepage
├── nitro.config.ts           # Nitro configuration
└── vite.config.ts            # Vite configuration
```

## Features in Detail

### Theme Switcher
Toggle between light and dark modes with a smooth transition. Theme preference is saved to localStorage and respects system preferences on first visit.

### API Integration
The homepage demonstrates API usage by fetching and displaying random quotes. Click "Get Another Quote" to see different quotes.

## License

MIT

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
