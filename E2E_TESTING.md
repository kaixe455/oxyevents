# E2E Testing Guide

## Running E2E Tests

Due to Astro with Vercel adapter configuration, E2E tests need the dev server running separately.

### Important: Port Configuration

**Astro dev server runs on `http://localhost:4321` by default** (not 3000)

### Option 1: Manual Setup (Recommended for Development)

**Terminal 1** - Start the development server:

```bash
npm run dev
# Starts on http://localhost:4321/
```

**Terminal 2** - Run E2E tests:

```bash
npm run test:e2e
```

View results:

```bash
npx playwright show-report
```

### Option 2: Combined Command (All tests including E2E)

```bash
npm run test:all
```

This runs:

1. All unit and integration tests
2. Then triggers E2E tests (dev server must be running on port 4321)

### Option 3: E2E with UI

**Terminal 1**:

```bash
npm run dev
```

**Terminal 2**:

```bash
npm run test:e2e:ui
```

This opens an interactive Playwright inspector where you can see tests running and debug them visually.

## Troubleshooting E2E Tests

### Issue: Tests timeout or can't connect

**Solution**: Ensure dev server is running on `http://localhost:4321` before starting E2E tests

```bash
# Check if dev server is running
curl http://localhost:4321
```

### Issue: Port 4321 already in use

**Solution**: Kill the process using port 4321

```bash
# On PowerShell (Windows)
Stop-Process -Name node -Force

# Then restart
npm run dev
```

### Issue: Tests are slow

**Solution**: Reduce parallel workers or run single browser

```bash
# Run with 1 worker
npx playwright test --workers=1

# Run only chromium
npx playwright test --project=chromium
```

### Issue: Different port

If you want to use a different port, update in `astro.config.mjs` or run:

```bash
npm run dev -- --port 3000
```

Then update `playwright.config.ts` baseURL accordingly.

## CI/CD Integration

For CI/CD pipelines, use:

```bash
npm run build
npx serve dist -l 4321 &
npm run test:e2e
```

Or with npm concurrently package:

```bash
npm install --save-dev concurrently
```

Then add script:

```json
"test:e2e:ci": "concurrently -k -s first -n 'dev,test' 'npm run dev' 'npm run test:e2e'"
```

## Test Files

- [tests/e2e/main.spec.ts](../tests/e2e/main.spec.ts) - Main E2E tests

## Configuration

- [playwright.config.ts](../playwright.config.ts) - Playwright configuration
  - Base URL: http://localhost:4321 (Astro default)
  - Browsers: Chromium, Firefox, Safari
  - Reporter: HTML
