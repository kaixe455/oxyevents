# 🎯 Test Suite Quick Reference Card

## Run Tests

```bash
npm run test:run        # ✓ All tests once (fastest)
npm run test            # 👁️ Watch mode (development)
npm run test:ui         # 🎨 Visual UI
npm run test:coverage   # 📊 Coverage report
npm run test:all        # 🔄 Unit + E2E
```

## By Category

```bash
npm run test:unit           # ⚙️ Unit tests only
npm run test:integration    # 🔗 Integration tests
npm run test:e2e            # 🌐 End-to-end tests
npm run test:e2e:ui         # 🖥️ E2E with UI
```

## Test Locations

| Area          | File                                     | Tests |
| ------------- | ---------------------------------------- | ----- |
| 📅 Dates      | src/utils/**tests**/dates.test.ts        | 15    |
| 🔄 Sorting    | src/utils/**tests**/sort.test.ts         | 13    |
| 🎨 Components | tests/unit/components.test.ts            | 12    |
| 📊 Data       | tests/unit/data-validation.test.ts       | 11    |
| 📝 Forms      | tests/unit/form-validation.test.ts       | 13    |
| 🖼️ Images     | tests/integration/data-integrity.test.ts | 15    |
| 🌐 E2E        | tests/e2e/main.spec.ts                   | Ready |

## Test Scenarios

### ✅ Date Utilities

```bash
✓ parseDate('19-02-2026')
✓ parseDate('01-01-2026 / 31-12-2026')
✓ isSameDay(date1, date2)
✓ sortedEventsRecentlyToOldest([...])
```

### ✅ Sort Utilities

```bash
✓ reverseArray([1,2,3])
✓ filterByCategory(items, 'gaming')
```

### ✅ Components

```bash
✓ EventCard props
✓ ClientCard props
✓ Image paths
✓ Link generation
```

### ✅ Form Validation

```bash
✓ Email format
✓ Message length
✓ Name required
✓ Input sanitization
```

### ✅ Data Integrity

```bash
✓ 71+ client logos
✓ All WebP format
✓ 16 new clients
✓ File optimization
```

## Current Status

```
Tests:   79 ✓
Pass:    100% ✓
Speed:   553ms ✓
Ready:   Production ✓
```

## Documentation

| Document                     | Use For            |
| ---------------------------- | ------------------ |
| **TESTING.md**               | Complete guide     |
| **TEST_SUMMARY.md**          | Quick overview     |
| **TESTS_SETUP.md**           | Setup instructions |
| **COMPLETE_TEST_SUMMARY.md** | Full summary       |

## First Time Setup

```bash
# Already done! Just run:
npm run test:run
```

## Debug a Test

```bash
# Watch single file
npm run test -- src/utils/__tests__/dates.test.ts

# Match pattern
npm run test -- --grep "parseDate"

# E2E debug mode
npx playwright test --headed
```

## Coverage Report

```bash
npm run test:coverage
open coverage/index.html
```

## Quick Stats

- **7 test files** with 79 tests
- **100% pass rate** ✓
- **553ms execution** ⚡
- **16 new clients verified** ✓

## Need Help?

1. Read **TESTING.md** for complete guide
2. Check **TEST_ARCHITECTURE.md** for diagrams
3. Review **TEST_CHECKLIST.md** for implementation details
4. Run `npm run test:ui` to see tests visually

---

**Version**: 1.0  
**Status**: ✅ Production Ready  
**Last Updated**: 2026-02-19
