import { useState, useMemo, useEffect } from 'react';
import { TemplateCard } from './TemplateCard';
import { TemplateFilters } from './TemplateFilters';
import { Template, SortOption } from '@/types/template';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 12;

interface TemplateGalleryProps {
  templates: Template[] | undefined;
  isLoading: boolean;
  showFilters?: boolean;
}

export function TemplateGallery({ templates, isLoading, showFilters = true }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, sortOption]);

  // Scroll to top when changing page so the new set is visible
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const filteredTemplates = useMemo(() => {
    if (!templates) return [];

    let filtered = [...templates];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((t) =>
        selectedTags.some((tag) => t.tags.includes(tag))
      );
    }

    // Sort
    switch (sortOption) {
      case 'new':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.is_free ? 0 : (a.price_cents ?? 0);
          const priceB = b.is_free ? 0 : (b.price_cents ?? 0);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.is_free ? 0 : (a.price_cents ?? 0);
          const priceB = b.is_free ? 0 : (b.price_cents ?? 0);
          return priceB - priceA;
        });
        break;
      case 'popular':
      default: {
        // When no filters/sort applied, show featured templates first, then by popularity
        const noFilters = !searchQuery && selectedTags.length === 0;
        filtered.sort((a, b) => {
          if (noFilters && (a.featured !== b.featured)) return a.featured ? -1 : 1;
          return b.popularity_score - a.popularity_score;
        });
        if (noFilters) {
          const takeByTitle = (titles: string[]): Template | null => {
            const lowerTitles = new Set(titles.map((s) => s.toLowerCase()));
            const idx = filtered.findIndex((t) => lowerTitles.has(t.title.toLowerCase().trim()));
            if (idx < 0) return null;
            return filtered.splice(idx, 1)[0];
          };
          const insertAt = (item: Template, index: number) => {
            const clamped = Math.max(0, Math.min(index, filtered.length));
            filtered.splice(clamped, 0, item);
          };

          // 1) Pin this template at page 2 slot 1 (index 12) in default gallery view.
          const uxTemplate = takeByTitle(['ux research repository lite']);
          if (uxTemplate) insertAt(uxTemplate, PAGE_SIZE);

          // 2) Put Startup OS where Tax Prep currently is (replace its slot).
          const startupTemplate = takeByTitle(['startup operating system', 'startup os']);
          if (startupTemplate) {
            const taxIndex = filtered.findIndex((t) => t.title.toLowerCase().trim() === 'tax prep & document checklist');
            insertAt(startupTemplate, taxIndex >= 0 ? taxIndex : PAGE_SIZE);
          }

          // 3) Put Habit Tracker template at the very end.
          const habitTrackerTemplate = takeByTitle(['habit tracker']);
          if (habitTrackerTemplate) filtered.push(habitTrackerTemplate);

          // 4) Keep original slugs, but swap display positions for these two templates.
          const taxSlug = 'tax-prep-document-checklist-52';
          const dateSlug = 'date-night-ideas-bank-192';
          const taxIdx = filtered.findIndex((t) => t.slug === taxSlug);
          const dateIdx = filtered.findIndex((t) => t.slug === dateSlug);
          if (taxIdx >= 0 && dateIdx >= 0 && taxIdx !== dateIdx) {
            [filtered[taxIdx], filtered[dateIdx]] = [filtered[dateIdx], filtered[taxIdx]];
          }
        }
        break;
      }
    }

    return filtered;
  }, [templates, searchQuery, selectedTags, sortOption]);

  const totalPages = Math.ceil(filteredTemplates.length / PAGE_SIZE) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedTemplates = filteredTemplates.slice(start, start + PAGE_SIZE);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? [] : [tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showFilters && (
        <TemplateFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onClearFilters={handleClearFilters}
        />
      )}

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No templates found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-10 pb-4">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:pointer-events-none transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {(() => {
                  const pages: (number | 'ellipsis')[] = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    pages.push(1);
                    const lo = Math.max(2, currentPage - 1);
                    const hi = Math.min(totalPages - 1, currentPage + 1);
                    if (lo > 2) pages.push('ellipsis');
                    for (let i = lo; i <= hi; i++) pages.push(i);
                    if (hi < totalPages - 1) pages.push('ellipsis');
                    if (totalPages > 1) pages.push(totalPages);
                  }
                  return pages.map((p, i) =>
                    p === 'ellipsis' ? (
                      <span key={`e-${i}`} className="px-2 text-muted-foreground">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setCurrentPage(p)}
                        className={`min-w-[2.25rem] h-9 px-2 rounded-lg border text-sm font-medium transition-colors ${
                          currentPage === p
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background text-foreground hover:bg-muted'
                        }`}
                        aria-label={`Page ${p}`}
                        aria-current={currentPage === p ? 'page' : undefined}
                      >
                        {p}
                      </button>
                    )
                  );
                })()}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:pointer-events-none transition-colors"
                aria-label="Next page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
