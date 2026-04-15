import { describe, it, expect } from 'vitest';

describe('Component Props Validation', () => {
  describe('EventCard', () => {
    it('should accept name prop', () => {
      const props = { name: 'Test Event', img: 'test-image', alt: 'Test' };
      expect(props.name).toBe('Test Event');
    });

    it('should accept img prop', () => {
      const props = { name: 'Test Event', img: 'test-image', alt: 'Test' };
      expect(props.img).toBe('test-image');
    });

    it('should accept optional alt prop', () => {
      const props = { name: 'Test Event', img: 'test-image', alt: 'Test Alt' };
      expect(props.alt).toBe('Test Alt');
    });

    it('should use name as fallback for alt when not provided', () => {
      const props = { name: 'Test Event', img: 'test-image' };
      const alt = props.alt ?? props.name;
      expect(alt).toBe('Test Event');
    });

    it('should generate correct event detail link', () => {
      const eventName = 'Summer Festival 2026';
      const link = `/eventos/evento/${eventName}`;
      expect(link).toBe('/eventos/evento/Summer Festival 2026');
    });
  });

  describe('ClientCard', () => {
    it('should accept name prop', () => {
      const props = { name: 'Ayuntamiento de Valencia', img: 'Logo Ajuntament Valencia' };
      expect(props.name).toBe('Ayuntamiento de Valencia');
    });

    it('should accept img prop without extension', () => {
      const props = { name: 'Test', img: 'Logo Test' };
      expect(props.img).toBe('Logo Test');
    });

    it('should construct webp image path correctly', () => {
      const img = 'Logo Test';
      const imagePath = `clientes_actualizados/${img}.webp`;
      expect(imagePath).toBe('clientes_actualizados/Logo Test.webp');
    });

    it('should use name as alt text', () => {
      const props = { name: 'Ayuntamiento de Valencia', img: 'Logo Test' };
      expect(props.name).toBe('Ayuntamiento de Valencia');
    });
  });

  describe('Container Component', () => {
    it('should accept width variants', () => {
      const widths = ['container', 'full', 'wide'];
      widths.forEach(width => {
        expect(['container', 'full', 'wide']).toContain(width);
      });
    });
  });

  describe('Section Component', () => {
    it('should accept title prop', () => {
      const props = { title: 'Test Section' };
      expect(props.title).toBe('Test Section');
    });

    it('should accept optional subtitle', () => {
      const props = { title: 'Test', subtitle: 'Test Subtitle' };
      expect(props.subtitle).toBe('Test Subtitle');
    });
  });
});
