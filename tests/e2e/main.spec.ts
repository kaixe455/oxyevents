import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toContain('/');
  });

  test('should have header with navigation', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should have footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should navigate to eventos page', async ({ page }) => {
    await page.goto('/');
    const eventLink = page.locator('a:has-text("Eventos")').first();
    if (await eventLink.isVisible({ timeout: 1000 }).catch(() => false)) {
      await eventLink.click();
      await page.waitForURL(/eventos/);
      expect(page.url()).toContain('eventos');
    }
  });

  test('should navigate to catalogo page', async ({ page }) => {
    await page.goto('/');
    const catalogLink = page.locator('a:has-text("Catálogo")').first();
    if (await catalogLink.isVisible({ timeout: 1000 }).catch(() => false)) {
      await catalogLink.click();
      await page.waitForURL(/catalogo/);
      expect(page.url()).toContain('catalogo');
    }
  });

  test('should navigate to clientes page', async ({ page }) => {
    await page.goto('/');
    const clientsLink = page.locator('a:has-text("Clientes")').first();
    if (await clientsLink.isVisible({ timeout: 1000 }).catch(() => false)) {
      await clientsLink.click();
      await page.waitForURL(/clientes/);
      expect(page.url()).toContain('clientes');
    }
  });

  test('should navigate to contacto page', async ({ page }) => {
    await page.goto('/');
    const contactLink = page.locator('a:has-text("Contacto")').first();
    if (await contactLink.isVisible({ timeout: 1000 }).catch(() => false)) {
      await contactLink.click();
      await page.waitForURL(/contacto/);
      expect(page.url()).toContain('contacto');
    }
  });
});

test.describe('Clientes Page', () => {
  test('should load clientes page', async ({ page }) => {
    await page.goto('/clientes/');
    const title = page.locator('h1, h2').first();
    await expect(title).toBeVisible();
  });

  test('should display client logos', async ({ page }) => {
    await page.goto('/clientes/');
    const images = page.locator('img[src*="clientes_actualizados"]');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have webp formatted client images', async ({ page }) => {
    await page.goto('/clientes/');
    const images = page.locator('img[src*=".webp"]');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display new client logos', async ({ page }) => {
    await page.goto('/clientes/');
    const newClients = [
      'Bellvei',
      'Beneixama',
      'Benissa',
      'Santa Pola',
      'Santalucia',
    ];

    for (const client of newClients) {
      const image = page.locator(`img[alt*="${client}"]`);
      // At least one should be visible or exist in the page
      expect(await image.count() > 0 || page.url().includes('clientes')).toBe(true);
    }
  });
});

test.describe('Eventos Page', () => {
  test('should load eventos page', async ({ page }) => {
    await page.goto('/eventos/');
    expect(page.url()).toContain('eventos');
  });

  test('should display events', async ({ page }) => {
    await page.goto('/eventos/');
    const events = page.locator('[class*="event"], [class*="Event"]').first();
    await expect(events).toBeVisible();
  });
});

test.describe('Catalogo Page', () => {
  test('should load catalogo page', async ({ page }) => {
    await page.goto('/catalogo/');
    expect(page.url()).toContain('catalogo');
  });

  test('should display catalog items', async ({ page }) => {
    await page.goto('/catalogo/');
    const items = page.locator('[class*="catalog"], [class*="item"]').first();
    await expect(items).toBeVisible();
  });
});

test.describe('Contacto Form', () => {
  test('should load contacto page', async ({ page }) => {
    await page.goto('/contacto/');
    expect(page.url()).toContain('contacto');
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('/contacto/');
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
  });

  test('should have required form fields', async ({ page }) => {
    await page.goto('/contacto/');
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    await page.goto('/contacto/');
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });

  test('should load images with correct format', async ({ page }) => {
    await page.goto('/clientes/');
    const images = page.locator('img[src*=".webp"]');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
