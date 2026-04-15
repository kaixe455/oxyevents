import { describe, it, expect } from 'vitest';
import { reverseArray, filterByCategory } from '@utils/sort';

describe('Sort Utilities', () => {
  describe('reverseArray', () => {
    it('should reverse an array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(reverseArray(arr)).toEqual([5, 4, 3, 2, 1]);
    });

    it('should not mutate the original array', () => {
      const arr = [1, 2, 3];
      const reversed = reverseArray(arr);
      expect(arr).toEqual([1, 2, 3]);
      expect(reversed).toEqual([3, 2, 1]);
    });

    it('should handle single element array', () => {
      expect(reverseArray([1])).toEqual([1]);
    });

    it('should handle empty array', () => {
      expect(reverseArray([])).toEqual([]);
    });

    it('should return empty array for non-array input', () => {
      expect(reverseArray(null as any)).toEqual([]);
      expect(reverseArray(undefined as any)).toEqual([]);
      expect(reverseArray('not an array' as any)).toEqual([]);
      expect(reverseArray(123 as any)).toEqual([]);
    });

    it('should reverse array of objects', () => {
      const arr = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
      ];
      const reversed = reverseArray(arr);
      expect(reversed[0].id).toBe(3);
      expect(reversed[1].id).toBe(2);
      expect(reversed[2].id).toBe(1);
    });
  });

  describe('filterByCategory', () => {
    const mockItems = [
      { name: 'Gaming Event 1', categoria: 'gaming' },
      { name: 'Sports Event 1', categoria: 'sports' },
      { name: 'Gaming Event 2', categoria: 'gaming' },
      { name: 'Sports Event 2', categoria: 'sports' },
      { name: 'Gaming Event 3', categoria: 'gaming' },
    ];

    it('should filter items by category', () => {
      const result = filterByCategory(mockItems, 'gaming');
      expect(result.length).toBe(3);
      expect(result.every(item => item.categoria === 'gaming')).toBe(true);
    });

    it('should filter items by different category', () => {
      const result = filterByCategory(mockItems, 'sports');
      expect(result.length).toBe(2);
      expect(result.every(item => item.categoria === 'sports')).toBe(true);
    });

    it('should return empty array when no items match category', () => {
      const result = filterByCategory(mockItems, 'nonexistent');
      expect(result.length).toBe(0);
      expect(result).toEqual([]);
    });

    it('should return empty array for non-array input', () => {
      expect(filterByCategory(null as any, 'gaming')).toEqual([]);
      expect(filterByCategory(undefined as any, 'gaming')).toEqual([]);
      expect(filterByCategory('not an array' as any, 'gaming')).toEqual([]);
    });

    it('should not mutate the original array', () => {
      const original = [...mockItems];
      filterByCategory(mockItems, 'gaming');
      expect(mockItems).toEqual(original);
    });

    it('should be case-sensitive for category matching', () => {
      const result = filterByCategory(mockItems, 'Gaming');
      expect(result.length).toBe(0);
    });

    it('should handle empty array', () => {
      expect(filterByCategory([], 'gaming')).toEqual([]);
    });
  });
});
