/**
 * Centralized Search Utilities
 * DRY solution for search/filter functionality across the application
 */

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { SEARCH_FIELDS } from '../constants';

// Debounce utility
const debounce = (func, wait) => {
  let timeout = null;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Query normalization
export const normalizeSearchQuery = (query) => {
  if (!query || typeof query !== 'string') return '';
  return query.toLowerCase().trim();
};

// Check if text matches query
const textMatches = (text, normalizedQuery) => {
  if (!text || typeof text !== 'string' || !normalizedQuery) return false;
  return text.toLowerCase().includes(normalizedQuery);
};

// Check if array item matches
const arrayItemMatches = (values, normalizedQuery) => {
  if (!Array.isArray(values) || !normalizedQuery) return false;
  return values.some(v => typeof v === 'string' && v.toLowerCase().includes(normalizedQuery));
};

// Check if item matches in specified fields
const matchesInFields = (item, normalizedQuery, fields) => {
  if (!item || !normalizedQuery || !fields?.length) return false;
  return fields.some(field => {
    const value = item[field];
    if (!value) return false;
    if (typeof value === 'string') return textMatches(value, normalizedQuery);
    if (Array.isArray(value)) return arrayItemMatches(value, normalizedQuery);
    return false;
  });
};

// Core filter function
export const filterBySearch = (items, query, searchFields) => {
  const normalizedQuery = normalizeSearchQuery(query);
  if (!normalizedQuery) return items;
  if (!Array.isArray(items)) return [];
  return items.filter(item => matchesInFields(item, normalizedQuery, searchFields));
};

// HighlightedText component
export const HighlightedText = ({ text, query, highlightClass = 'bg-yellow-200 px-1 rounded', className = '' }) => {
  if (!text) return null;
  const normalizedQuery = normalizeSearchQuery(query);
  if (!normalizedQuery) return <span className={className}>{text}</span>;

  const regex = new RegExp(`(${normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? <span key={i} className={highlightClass}>{part}</span> : <span key={i}>{part}</span>
      )}
    </span>
  );
};

/**
 * Simple search hook with state management
 * Replaces: useState + useMemo pattern in each page
 */
export const useSearch = (items, searchFields) => {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);

  // Debounced setQuery to prevent excessive filtering on rapid keystrokes
  const handleSetQuery = useCallback((value) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setQuery(value);
    }, 300);
  }, []);

  const clearSearch = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setQuery('');
  }, []);

  const filteredItems = useMemo(() => {
    return filterBySearch(items, query, searchFields);
  }, [items, query, searchFields]);

  return {
    query,
    setQuery: handleSetQuery,
    clearSearch,
    filteredItems,
    normalizedQuery: normalizeSearchQuery(query),
    hasResults: filteredItems.length > 0,
    totalCount: items.length,
    filteredCount: filteredItems.length
  };
};

/**
 * Search filtering hook (for when state is managed externally)
 */
export const useSearchFiltering = (items, query, searchFields) => {
  const filteredItems = useMemo(() => {
    return filterBySearch(items, query, searchFields);
  }, [items, query, searchFields]);

  return { filteredItems, normalizedQuery: normalizeSearchQuery(query) };
};

export default {
  normalizeSearchQuery,
  filterBySearch,
  HighlightedText,
  useSearch,
  useSearchFiltering,
  SEARCH_FIELDS
};

