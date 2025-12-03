'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/assets/icons';
import { searchService, SearchResult } from '@/services/api/search.service';
import Link from 'next/link';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      console.log('Global Search - Searching for:', query);
      try {
        const searchResults = await searchService.searchAll(query);
        console.log('Global Search - Results:', searchResults);
        setResults(searchResults);
        setShowResults(true); // Always show dropdown if query is long enough, even if no results
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setShowResults(true); // Show "no results" message
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          setShowResults(false);
          setQuery('');
        }
        break;
      case 'Escape':
        setShowResults(false);
        setQuery('');
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setShowResults(false);
    setQuery('');
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      user: 'User',
      report: 'Report',
      plan: 'Plan',
      document: 'Document',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      user: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      report: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      plan: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      document: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-[300px]">
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search users, reports, plans..."
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            console.log('Search Input Changed:', value);
            setQuery(value);
            if (value.trim().length >= 2) {
              setShowResults(true);
            }
          }}
          onFocus={() => {
            if (results.length > 0) {
              setShowResults(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
        />
        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        
        {loading && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full z-[9999] mt-2 w-full max-h-[400px] overflow-y-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark">
          <div className="p-2">
            {results.map((result, index) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.url}
                onClick={() => handleResultClick(result)}
                className={`block rounded-lg p-3 transition-colors ${
                  selectedIndex === index
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'hover:bg-gray-2 dark:hover:bg-dark-2'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 rounded px-2 py-0.5 text-xs font-medium ${getTypeColor(result.type)}`}>
                    {getTypeLabel(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-dark dark:text-white truncate">
                      {result.title}
                    </div>
                    {result.subtitle && (
                      <div className="mt-0.5 text-sm text-dark-4 dark:text-dark-6 truncate">
                        {result.subtitle}
                      </div>
                    )}
                    {result.description && (
                      <div className="mt-1 text-xs text-dark-4 dark:text-dark-6 line-clamp-2">
                        {result.description}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {results.length >= 10 && (
            <div className="border-t border-stroke dark:border-dark-3 p-2 text-center">
              <p className="text-xs text-dark-4 dark:text-dark-6">
                Showing top 10 results
              </p>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {showResults && !loading && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full z-[9999] mt-2 w-full rounded-lg border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark p-4">
          <p className="text-center text-sm text-dark-4 dark:text-dark-6">
            No results found for "{query}"
          </p>
          <p className="text-center text-xs text-dark-4 dark:text-dark-6 mt-2">
            Check browser console (F12) for debugging info
          </p>
        </div>
      )}
    </div>
  );
}

