# Destinations Refactoring - Implementation TODO

## Phase 1: Cleanup (Dead Code Removal) ✅ COMPLETED

### 1.1 Remove Unused Imports & Code
- [x] `DestinationTabbedContent.jsx` - Remove unused `parseGradientToStyle` import
- [ ] `useDestinationPage.js` - Clean up unused code (optional)
- [ ] All country pages - Remove unused props (tourTitle when not applicable) - NOW USING TEMPLATE

### 1.2 Clean Up Redundant State
- [ ] Remove duplicate modal state in country pages (use hook only) - NOW USING TEMPLATE

---

## Phase 2: Create Unified Components ✅ COMPLETED

### 2.1 Create BackgroundElements Component
- [x] Extract animated background from country pages
- [x] Make theme-configurable
- [x] Add to `/components/shared/`

### 2.2 Create DestinationTemplate Page
- [x] Create `/pages/DestinationTemplate.jsx`
- [x] Accept config object for all destination-specific data
- [x] Replace all 8 country page implementations

### 2.3 Refactor useDestination Hook
- [ ] Rename to `useDestination` (shorter, cleaner) - OPTIONAL
- [ ] Remove unused computed values - OPTIONAL

---

## Phase 3: Refactor Country Pages ✅ COMPLETED

### 3.1 Refactor Individual Pages to Use Template
- [x] Bali.jsx - Convert to use template
- [x] Japan.jsx - Convert to use template
- [x] Thailand.jsx - Convert to use template
- [x] Vietnam.jsx - Convert to use template
- [x] Dubai.jsx - Convert to use template
- [x] Australia.jsx - Convert to use template
- [x] Turkey.jsx - Convert to use template
- [x] China.jsx - Convert to use template

### 3.2 Consolidate Data Files
- [x] Create `/data/destinations/detail/` directory structure
- [ ] Move individual country configs to detail folder (already there)
- [ ] Create unified export from `/data/destinations/index.js`

---

## Phase 4: Dynamic Routing (Optional Enhancement)

### 4.1 Add Dynamic Route
- [ ] Update App.jsx with `/destinations/:countryId` route
- [ ] Create dynamic page loader
- [ ] Handle invalid country IDs

---

## Phase 5: Testing & Verification

### 5.1 Visual Testing
- [ ] Verify all destination pages render correctly
- [ ] Check modal functionality on all pages
- [ ] Test contact forms
- [ ] Verify animations work

### 5.2 Performance Testing
- [ ] Verify bundle size reduction
- [ ] Check lazy loading works
- [ ] Test route transitions

---

## Quick Wins (Start Here)

1. **Remove unused import in DestinationTabbedContent.jsx**
   - File: `src/components/destination/DestinationTabbedContent.jsx`
   - Line 4: Remove `import { parseGradientToStyle }`

2. **Clean up useDestinationPage.js**
   - Remove unused `hasPolicies` computed value
   - Or add usage somewhere

3. **Extract BackgroundElements component**
   - Create reusable background animation
   - Reduce code duplication

---

## File Reference

### Files to CREATE:
- `/src/components/shared/BackgroundElements.jsx`
- `/src/pages/DestinationTemplate.jsx`
- `/src/hooks/useDestination.js` (refactored)

### Files to MODIFY:
- `/src/components/destination/DestinationTabbedContent.jsx`
- `/src/hooks/useDestinationPage.js`
- All `/src/pages/*/[Country].jsx` files

### Files to DELETE (after verification):
- Legacy country page files (after migration)

---

## Estimated Time

| Phase | Effort |
|-------|--------|
| Phase 1: Cleanup | 30 minutes |
| Phase 2: Components | 3 hours |
| Phase 3: Refactor Pages | 2 hours |
| Phase 4: Dynamic Routing | 1 hour |
| Phase 5: Testing | 1 hour |
| **Total** | **~8 hours** |

---

## Success Criteria

- [ ] All 8 destination pages work identically
- [ ] Code duplication reduced by ~80%
- [ ] Adding new destination requires only data file
- [ ] Bundle size reduced by ~10%
- [ ] No TypeScript/lint errors introduced

