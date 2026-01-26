# Home & Destinations Refactoring TODO

## Phase 1: Remove Unused Code ✅
- [x] Remove Combo Countries button and handler from DestinationsSection
- [x] Remove unused `colors` import from HeroSection

## Phase 2: Create Reusable Components
- [ ] Create `SectionWrapper` - Standardized section container
- [ ] Create `SectionHeader` - Reusable title/subtitle with AnimatedText
- [ ] Create `DestinationCardWrapper` - Standardized animated card for home

## Phase 3: Update DestinationsSection
- [ ] Use reusable SectionWrapper
- [ ] Use SectionHeader for title
- [ ] Replace inline cards with DestinationCard + FloatingElement

## Phase 4: Improve Hero Coloring ✅
- [x] Update Home Hero (HeroSection) - better contrast
- [x] Update Destinations Hero (DestinationsHero) - better contrast

## Phase 5: Standardize Colors Across Sections
- [ ] WhyChooseUsSection - standardize title color
- [ ] ServicesSection - standardize text colors
- [ ] TestimonialsSection - standardize text colors
- [ ] FeaturedPackagesSection - fix text colors
- [ ] LeadershipSection - standardize text colors

## Phase 6: Build & Test ✅
- [x] Run build to verify no errors

---

## Changes Summary

### HeroSection.jsx
- Removed unused `colors` import
- Changed background from `[#f7fafc]` to `slate-50 via-blue-50 to-emerald-50`
- Changed text from gradient to solid `#0f4c5c` (teal)
- Updated primary button to use `#0f4c5c` color
- Updated secondary button to have proper contrast with dark text
- Changed WhatsApp button to use official `#25D366` color
- Added brand colors to social icons

### DestinationsHero.jsx
- Changed background from `[#f7fafc]` to `slate-100 via-blue-50 to-emerald-50`
- Changed title text from `#b85c38` to `#0f4c5c`
- Changed subtitle text from `#7c6f57` to `#334e68`
- Changed category buttons to use `#0f4c5c` as primary color
- Improved button hover states

### DestinationsSection.jsx
- Removed `useNavigate` import (no longer needed)
- Removed `onComboClick` handler function
- Removed "Combo Countries" button

