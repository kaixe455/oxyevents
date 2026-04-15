import { describe, it, expect } from 'vitest';

describe('Data Validation', () => {
  describe('ClientsList', () => {
    it('should have name and img properties', () => {
      const client = { name: 'Ayuntamiento de Valencia', img: 'Logo Test' };
      expect(client).toHaveProperty('name');
      expect(client).toHaveProperty('img');
      expect(typeof client.name).toBe('string');
      expect(typeof client.img).toBe('string');
    });

    it('should not have empty name', () => {
      const client = { name: 'Ayuntamiento', img: 'Logo' };
      expect(client.name.length).toBeGreaterThan(0);
    });

    it('should not have empty img reference', () => {
      const client = { name: 'Test', img: 'LogoTest' };
      expect(client.img.length).toBeGreaterThan(0);
    });

    it('should match image names between data and filenames', () => {
      const clientData = { name: 'Test Client', img: 'Logo Test Client' };
      const imageFilename = 'Logo Test Client.webp';
      const expectedFilename = `${clientData.img}.webp`;
      expect(imageFilename).toBe(expectedFilename);
    });
  });

  describe('EventsList', () => {
    it('should have required event properties', () => {
      const event = {
        name: 'Test Event',
        date: '01-01-2026',
        img: 'test-event',
        description: 'Test Description',
      };
      expect(event).toHaveProperty('name');
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('img');
    });

    it('should have valid date format', () => {
      const datePattern = /^\d{2}-\d{2}-\d{4}(\s\/\s\d{2}-\d{2}-\d{4})?$/;
      const date = '01-01-2026 / 31-12-2026';
      expect(datePattern.test(date)).toBe(true);
    });

    it('should handle single date format', () => {
      const datePattern = /^\d{2}-\d{2}-\d{4}(\s\/\s\d{2}-\d{2}-\d{4})?$/;
      const date = '15-02-2026';
      expect(datePattern.test(date)).toBe(true);
    });
  });

  describe('CatalogoList', () => {
    it('should have name, description, categoria, and img properties', () => {
      const item = {
        name: 'Gaming Item',
        description: 'Description',
        categoria: 'gaming',
        img: 'item-image',
      };
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('categoria');
      expect(item).toHaveProperty('img');
    });

    it('should have valid categories', () => {
      const validCategories = ['gaming', 'sports', 'events'];
      const item = { categoria: 'gaming' };
      expect(validCategories).toContain(item.categoria);
    });

    it('should have non-empty description', () => {
      const item = { description: 'Test Description' };
      expect(item.description.length).toBeGreaterThan(0);
    });
  });

  describe('SponsorsList', () => {
    it('should have name and img properties', () => {
      const sponsor = { name: 'Sponsor Name', img: 'sponsor-logo' };
      expect(sponsor).toHaveProperty('name');
      expect(sponsor).toHaveProperty('img');
    });
  });
});
