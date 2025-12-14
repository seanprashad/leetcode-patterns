# Running LeetCode Patterns Locally

## Prerequisites

- **Node.js**: Version >= 22.2.0 (check with `node --version`)
- **npm**: Comes with Node.js (check with `npm --version`)

If you don't have Node.js installed:
- Download from [nodejs.org](https://nodejs.org/)
- Or use [nvm](https://github.com/nvm-sh/nvm) to manage versions:
  ```bash
  nvm install 22.2.0
  nvm use 22.2.0
  ```

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't, manually navigate to that URL

## Available Scripts

- `npm start` - Starts the development server (runs on port 3000)
- `npm run build` - Creates a production build in the `build/` folder
- `npm run deploy` - Deploys the build to GitHub Pages (requires gh-pages setup)

## Troubleshooting

### Port 3000 already in use?
The app will prompt you to use a different port. Type `Y` to accept.

### Dependencies issues?
Try deleting `node_modules` and `package-lock.json`, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Pattern Guides not loading?
The Pattern Guides component fetches markdown files from GitHub. Make sure you have an internet connection. In production, these would be served from the `public/guides` directory.

## Development Notes

- The app uses React and is built with Create React App
- Hot reloading is enabled - changes will automatically refresh in the browser
- Check the browser console for any errors
- The main data file is `src/data/questions.json`

