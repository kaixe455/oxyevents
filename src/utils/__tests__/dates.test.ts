import { describe, it, expect } from 'vitest';
import { parseDate, isSameDay, sortedEventsRecentlyToOldest } from '@utils/dates';

describe('Date Utilities', () => {
  describe('parseDate', () => {
    it('should parse a valid date string in DD-MM-YYYY format', () => {
      const result = parseDate('19-02-2026');
      expect(result).toEqual(new Date(2026, 1, 19));
    });

    it('should handle date ranges by parsing the first date', () => {
      const result = parseDate('01-01-2026 / 31-12-2026');
      expect(result).toEqual(new Date(2026, 0, 1));
    });

    it('should return null for empty or falsy values', () => {
      expect(parseDate('')).toBeNull();
      expect(parseDate(null)).toBeNull();
      expect(parseDate(undefined)).toBeNull();
    });

    it('should parse leap year dates correctly', () => {
      const result = parseDate('29-02-2024');
      expect(result).toEqual(new Date(2024, 1, 29));
    });

    it('should parse dates with leading zeros', () => {
      const result = parseDate('05-03-2026');
      expect(result).toEqual(new Date(2026, 2, 5));
    });
  });

  describe('isSameDay', () => {
    it('should return true for the same day', () => {
      const date1 = new Date(2026, 1, 19);
      const date2 = new Date(2026, 1, 19);
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different days', () => {
      const date1 = new Date(2026, 1, 19);
      const date2 = new Date(2026, 1, 20);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false for different months', () => {
      const date1 = new Date(2026, 1, 19);
      const date2 = new Date(2026, 2, 19);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false for different years', () => {
      const date1 = new Date(2025, 1, 19);
      const date2 = new Date(2026, 1, 19);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should ignore time differences and compare only date parts', () => {
      const date1 = new Date(2026, 1, 19, 10, 30, 0);
      const date2 = new Date(2026, 1, 19, 20, 45, 30);
      expect(isSameDay(date1, date2)).toBe(true);
    });
  });

  describe('sortedEventsRecentlyToOldest', () => {
    it('should sort events from most recent to oldest', () => {
      const events = [
        { name: 'Event 1', date: '01-01-2026' },
        { name: 'Event 2', date: '15-02-2026' },
        { name: 'Event 3', date: '05-01-2026' },
      ];
      const sorted = sortedEventsRecentlyToOldest([...events]);
      expect(sorted[0].date).toBe('15-02-2026');
      expect(sorted[1].date).toBe('05-01-2026');
      expect(sorted[2].date).toBe('01-01-2026');
    });

    it('should handle events with date ranges', () => {
      const events = [
        { name: 'Event 1', date: '01-01-2026 / 05-01-2026' },
        { name: 'Event 2', date: '10-02-2026 / 15-02-2026' },
      ];
      const sorted = sortedEventsRecentlyToOldest([...events]);
      expect(sorted[0].name).toBe('Event 2');
      expect(sorted[1].name).toBe('Event 1');
    });

    it('should return the same array after sorting (mutates in place)', () => {
      const events = [
        { name: 'Event 1', date: '01-01-2026' },
        { name: 'Event 2', date: '15-02-2026' },
      ];
      const result = sortedEventsRecentlyToOldest(events);
      expect(result).toBe(events);
    });

    it('should handle single event', () => {
      const events = [{ name: 'Event 1', date: '01-01-2026' }];
      const sorted = sortedEventsRecentlyToOldest([...events]);
      expect(sorted.length).toBe(1);
      expect(sorted[0].name).toBe('Event 1');
    });

    it('should handle empty array', () => {
      const events = [];
      const sorted = sortedEventsRecentlyToOldest(events);
      expect(sorted.length).toBe(0);
    });
  });
});
