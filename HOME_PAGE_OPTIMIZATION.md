# Home Page Cleanup & Optimization Plan

## Summary
Audit and optimize the Home page by removing unused code, fixing bugs, and improving code quality without removing any sections.

## Issues Found & Fixes Required

### Completed Fixes

#### 1. HeroSection.jsx - DONE
- **Issue**: Imported `useCallback` but didn't use it
- **Fix**: Removed unused `useCallback` import
- **Changed**: `import React, { memo, useCallback } from 'react'` → `import { memo } from 'react'`

#### 2. VideoShowcaseSection.jsx - DONE
- **Issue**: Referenced `SOCIAL_LINKS.FACEBOOK_STORIES` without importing it - would cause runtime error
- **Fix**: Added missing import: `import { SOCIAL_LINKS } from '../../../constants'`
- **Changed**: Cleaned up imports to use named imports pattern

#### 3. TestimonialsSection.jsx - DONE
- **Issue**: Imported `React` default export but only used named exports
- **Fix**: Changed to named imports: `import { memo, useState, useEffect, useCallback } from 'react'`

#### 4. InteractiveWorldMapSection.jsx - DONE
- **Issue**: Used `useMemo` unnecessarily for simple array mapping - added complexity without benefit
- **Fix**: Simplified by removing `useMemo` hook, moved `regionGradients` to module level constant
- **Result**: Cleaner code, reduced unnecessary re-computation logic

#### 5. DestinationsSection.jsx - DONE
- **Issue**: Mixed React default import with named imports inconsistently
- **Fix**: Used clean named imports pattern: `import { memo, useState, useMemo } from 'react'`
- **Changed**: `React.useState('nepal')` → `useState('nepal')`

### Files Modified
1. ✅ `src/pages/home/sections/HeroSection.jsx`
2. ✅ `src/pages/home/sections/VideoShowcaseSection.jsx`
3. ✅ `src/pages/home/sections/TestimonialsSection.jsx`
4. ✅ `src/pages/home/sections/InteractiveWorldMapSection.jsx`
5. ✅ `src/pages/home/sections/DestinationsSection.jsx`

### Optimization Summary

**Removed Unused Code:**
- Unused `useCallback` import in HeroSection
- Unnecessary `useMemo` hook in InteractiveWorldMapSection
- Redundant default `React` imports across multiple files

**Code Quality Improvements:**
- Consistent named import patterns across all section files
- Cleaner component logic with reduced complexity
- Fixed potential runtime error (missing SOCIAL_LINKS import)

**Production Benefits:**
- Reduced bundle size (removed unused imports)
- Improved code maintainability
- Fixed bug that would cause crash in VideoShowcaseSection

