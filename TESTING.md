# Testing Guide for OxyEvents

## Overview

This project includes comprehensive test coverage across unit tests, integration tests, and end-to-end tests using Vitest and Playwright.

## Test Structure

```
tests/
├── unit/                    # Unit tests for utilities and components
│   ├── components.test.ts   # Component props and validation
│   ├── data-validation.test.ts # Data structure validation
│   └── form-validation.test.ts # Form input validation
├── integration/             # Integration tests
│   └── data-integrity.test.ts  # Image files and data mapping
└── e2e/                    # End-to-end tests
    └── main.spec.ts        # User workflow and UI tests

src/utils/__tests__/        # Utility function tests
├── dates.test.ts           # Date parsing and sorting
└── sort.test.ts            # Array filtering and sorting
```

## Running Tests

### Unit Tests

```bash
# Run all unit tests in watch mode
npm run test

# Run unit tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run only utility tests
npm run test:unit

# Run with coverage report
npm run test:coverage
```

### Integration Tests

```bash
# Run data integrity tests
npm run test:integration
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in specific browser
npx playwright test --project=chromium
```

### All Tests

```bash
# Run all tests (unit + E2E)
npm run test:all
```

## Test Coverage

### Unit Tests

#### Date Utilities (`src/utils/__tests__/dates.test.ts`)

- ✅ Parse date strings in DD-MM-YYYY format
- ✅ Handle date ranges (DD-MM-YYYY / DD-MM-YYYY)
- ✅ Compare same day functionality
- ✅ Sort events from recent to oldest

#### Sort Utilities (`src/utils/__tests__/sort.test.ts`)

- ✅ Reverse arrays without mutation
- ✅ Filter items by category
- ✅ Handle edge cases (null, undefined, empty arrays)
- ✅ Case-sensitive category matching

#### Component Validation (`tests/unit/components.test.ts`)

- ✅ EventCard props (name, img, alt)
- ✅ ClientCard props (name, img)
- ✅ Image path construction
- ✅ Link generation

#### Data Validation (`tests/unit/data-validation.test.ts`)

- ✅ Required properties in data lists
- ✅ Date format validation
- ✅ Category validation
- ✅ Non-empty descriptions

#### Form Validation (`tests/unit/form-validation.test.ts`)

- ✅ Name field validation
- ✅ Email format validation
- ✅ Message field validation
- ✅ Minimum message length
- ✅ Form submission validation
- ✅ Input sanitization (trim whitespace)
- ✅ Email content construction

### Integration Tests

#### Data Integrity (`tests/integration/data-integrity.test.ts`)

- ✅ Image directories exist
- ✅ WebP format compliance
- ✅ No PNG files in production directory
- ✅ File size optimization check
- ✅ Data to image mapping verification
- ✅ 16 new client logos added
- ✅ Naming convention consistency
- ✅ Directory permissions

### E2E Tests (`tests/e2e/main.spec.ts`)

#### Navigation

- ✅ Homepage loads successfully
- ✅ Header and footer visible
- ✅ Navigation to eventos, catalogo, clientes, contacto

#### Clientes Page

- ✅ Page loads correctly
- ✅ Client logos display
- ✅ WebP format verification
- ✅ New clients visible

#### Events & Catalog

- ✅ Eventos page loads
- ✅ Catalogo page loads
- ✅ Items display correctly

#### Contact Form

- ✅ Form loads
- ✅ Required fields present (name, email, message)
- ✅ Submit button visible

#### Performance

- ✅ Page load time < 5 seconds
- ✅ Images load with correct format

#### Responsive Design

- ✅ Mobile (375x667)
- ✅ Tablet (768x1024)
- ✅ Desktop (1920x1080)

## Writing New Tests

### Unit Test Template

```typescript
import { describe, it, expect } from "vitest";

describe("Feature Name", () => {
	it("should do something", () => {
		const result = functionToTest();
		expect(result).toBe(expectedValue);
	});
});
```

### E2E Test Template

```typescript
import { test, expect } from "@playwright/test";

test("should navigate to page", async ({ page }) => {
	await page.goto("/path/");
	await expect(page.locator("selector")).toBeVisible();
});
```

## Test Reports

### Vitest Coverage

After running `npm run test:coverage`, open the HTML report:

```
coverage/index.html
```

### Playwright Report

After running E2E tests, open the report:

```bash
npx playwright show-report
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:e2e
```

## Best Practices

1. **Test Naming**: Use clear, descriptive test names that explain what is being tested
2. **Isolation**: Each test should be independent and not rely on other tests
3. **Coverage**: Aim for at least 80% code coverage
4. **Maintainability**: Keep tests simple and focused on one aspect
5. **Performance**: E2E tests should complete within reasonable time
6. **Data**: Use fixture data for consistent test results

## Troubleshooting

### Vitest Issues

```bash
# Clear cache
rm -rf node_modules/.vitest

# Reinstall
npm install
```

### Playwright Issues

```bash
# Install browsers
npx playwright install

# Run in headed mode for debugging
npx playwright test --headed
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/)

## Next Steps

1. Add tests to CI/CD pipeline
2. Increase coverage targets to 85%
3. Add visual regression tests
4. Set up performance benchmarks
5. Create test data fixtures for E2E tests
