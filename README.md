# AI PWA Architect

An AI-powered tool to design, build, and troubleshoot Progressive Web Apps (PWA). This application helps developers generate manifests, icons, and deployment guides for Netlify and Google Play Store.

## Features

- **AI Code Generation**: Generates `manifest.json`, `index.html`, and `sw.js` using Google Gemini AI.
- **Icon Generator**: Creates custom SVG app icons programmatically.
- **Troubleshooting**: AI assistant to analyze error logs from Netlify or Play Console.
- **PWA Ready**: Fully compliant with PWA standards (Service Worker, Manifest, Offline support).

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Google Gemini API (`@google/genai`)

## Setup

1. Clone the repository.
2. Create a `.env` file with your API key:
   ```
   API_KEY=your_gemini_api_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Netlify.
3. Use [PWABuilder](https://www.pwabuilder.com) to generate your Android APK.
