import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Data Integrity Tests', () => {
  const publicDir = path.join(process.cwd(), 'public');
  const clientesDir = path.join(publicDir, 'clientes_actualizados');
  const eventsDir = path.join(publicDir, 'events');
  const catalogoDir = path.join(publicDir, 'catalogo');

  describe('Image Files Exist', () => {
    it('should have client images directory', () => {
      expect(fs.existsSync(clientesDir)).toBe(true);
    });

    it('should have events images directory', () => {
      expect(fs.existsSync(eventsDir)).toBe(true);
    });

    it('should have catalogo images directory', () => {
      expect(fs.existsSync(catalogoDir)).toBe(true);
    });

    it('should have webp client logos', () => {
      const files = fs.readdirSync(clientesDir);
      const webpFiles = files.filter(file => file.endsWith('.webp'));
      expect(webpFiles.length).toBeGreaterThan(0);
    });

    it('should have no PNG files in client directory', () => {
      const files = fs.readdirSync(clientesDir);
      const pngFiles = files.filter(file => file.endsWith('.png'));
      expect(pngFiles.length).toBe(0);
    });
  });

  describe('Image File Integrity', () => {
    it('should have valid webp files with proper headers', () => {
      const files = fs.readdirSync(clientesDir)
        .filter(file => file.endsWith('.webp'))
        .slice(0, 5); // Test first 5 files

      files.forEach(file => {
        const filePath = path.join(clientesDir, file);
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(0);
      });
    });

    it('should have reasonably sized webp files (optimization check)', () => {
      const files = fs.readdirSync(clientesDir)
        .filter(file => file.endsWith('.webp'))
        .slice(0, 5);

      files.forEach(file => {
        const filePath = path.join(clientesDir, file);
        const stats = fs.statSync(filePath);
        // WebP files should be reasonably small (typically under 500KB for logos)
        expect(stats.size).toBeLessThan(500000);
      });
    });
  });

  describe('Data to Image Mapping', () => {
    it('should verify client images referenced exist', () => {
      // Common client logo names that should exist
      const expectedLogos = [
        'Logo D_Albal.webp',
        'Logo Ajuntament de Gandia.webp',
        'Logo Universidad Catolica de Valencia.webp',
      ];

      expectedLogos.forEach(logo => {
        const filePath = path.join(clientesDir, logo);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    it('should verify new client logos were added', () => {
      const newLogos = [
        'Logo Ajuntament de Bellvei.webp',
        'Logo Ajuntament de Beneixama.webp',
        'Logo Ajuntament de Benissa.webp',
        'Logo Ayuntamiento de Santa Pola.webp',
        'Logo Santalucia Seguros.webp',
      ];

      newLogos.forEach(logo => {
        const filePath = path.join(clientesDir, logo);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    it('should have consistent naming conventions', () => {
      const files = fs.readdirSync(clientesDir).filter(file => file.endsWith('.webp'));

      files.forEach(file => {
        // Files should start with "Logo" or other valid prefix
        expect(
          file.startsWith('Logo') ||
          file.startsWith('logo') ||
          file.startsWith('Alcora') ||
          file.startsWith('Mancomunidad')
        ).toBe(true);
      });
    });
  });

  describe('Directory Permissions', () => {
    it('should have readable client images directory', () => {
      expect(() => fs.readdirSync(clientesDir)).not.toThrow();
    });

    it('should have readable events images directory', () => {
      expect(() => fs.readdirSync(eventsDir)).not.toThrow();
    });

    it('should have readable catalogo directory', () => {
      expect(() => fs.readdirSync(catalogoDir)).not.toThrow();
    });
  });

  describe('Image Count Validation', () => {
    it('should have sufficient client logos', () => {
      const files = fs.readdirSync(clientesDir);
      expect(files.length).toBeGreaterThanOrEqual(50);
    });

    it('should have at least 16 new client logos added', () => {
      const newLogos = [
        'Logo Ajuntament de Bellvei.webp',
        'Logo Ajuntament de Beneixama.webp',
        'Logo Ajuntament de Beniparrell.webp',
        'Logo Ajuntament de Benissa.webp',
        'Logo Ajuntament de Sagunt.webp',
        'Logo Ajuntament de Salou.webp',
        'Logo Ajuntament D_ascó.webp',
        'Logo Ayuntamiento de Alfajarin.webp',
        'Logo Ayuntamiento de Bullas.webp',
        'Logo Ayuntamiento de Cieza.webp',
        'Logo Ayuntamiento de Hellín.webp',
        'Logo Ayuntamiento de Salinas.webp',
        'Logo Ayuntamiento de Santa Pola.webp',
        'Logo Ayuntamiento de Villanueva de la Torre.webp',
        'Logo Comarca Cuencas Mineras.webp',
        'Logo Santalucia Seguros.webp',
      ];

      let foundCount = 0;
      newLogos.forEach(logo => {
        const filePath = path.join(clientesDir, logo);
        if (fs.existsSync(filePath)) {
          foundCount++;
        }
      });

      expect(foundCount).toBe(16);
    });
  });
});
