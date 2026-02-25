import { useState, useMemo, useEffect } from 'react';
import { TemplateCard } from './TemplateCard';
import { TemplateFilters } from './TemplateFilters';
import { Template, SortOption } from '@/types/template';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTemplatePreviewConfig } from '@/lib/template-previews';

const PAGE_SIZE = 12;
const DAY_MS = 24 * 60 * 60 * 1000;
const VISUAL_KEYWORDS = [
  'beautiful',
  'aesthetic',
  'visual',
  'design',
  'dashboard',
  'gallery',
  'board',
  'layout',
  'style',
];
const HOMEPAGE_FEATURED_SLOTS: (string | null)[] = [
  'tarot learning vault',
  'ai engineering roadmap by data with baraa',
  null,
  'travel bucket list & wish list',
  '12 week year planner',
  'content planner for tiktok & instagram influencers',
];

interface TemplateGalleryProps {
  templates: Template[] | undefined;
  isLoading: boolean;
  showFilters?: boolean;
}

function getDaysAgo(dateIso: string): number {
  const ts = new Date(dateIso).getTime();
  if (Number.isNaN(ts)) return 9999;
  return Math.max(0, (Date.now() - ts) / DAY_MS);
}

function getVisualSignalScore(template: Template): number {
  const text = `${template.title} ${template.description} ${(template.whats_inside ?? []).join(' ')}`.toLowerCase();
  const keywordHits = VISUAL_KEYWORDS.reduce((sum, keyword) => sum + (text.includes(keyword) ? 1 : 0), 0);
  const mediaScore = (template.gallery_urls?.length ?? 0) * 1.8 + (template.thumbnail_url ? 3 : 0);
  return Math.min(18, keywordHits * 2.4 + mediaScore);
}

function getPrimaryTag(template: Template): string {
  return (template.tags?.[0] ?? 'other').toLowerCase();
}

function getSkeletonKey(template: Template): string {
  return getTemplatePreviewConfig(template).skeleton ?? 'none';
}

function getBaseRankScore(template: Template): number {
  const featuredBoost = template.featured ? 16 : 0;
  const visualScore = getVisualSignalScore(template);
  const freshnessScore = Math.max(0, 26 - getDaysAgo(template.created_at) * 0.6);
  const popularityScore = (template.popularity_score ?? 0) * 0.45;
  const ratingScore = (template.rating ?? 0) * 1.8;
  return featuredBoost + visualScore + freshnessScore + popularityScore + ratingScore;
}

function getHomepageFeaturedSix(allTemplates: Template[]): Template[] {
  const featured = allTemplates.filter((t) => t.featured);
  const pinned = HOMEPAGE_FEATURED_SLOTS.map((name) =>
    name ? featured.find((t) => t.title.toLowerCase().trim() === name) ?? null : null
  );
  const pinnedSet = new Set(HOMEPAGE_FEATURED_SLOTS.filter(Boolean));
  const fillers = featured.filter((t) => !pinnedSet.has(t.title.toLowerCase().trim()));
  let fillerIdx = 0;
  return pinned.map((t) => t ?? fillers[fillerIdx++]).filter((t): t is Template => Boolean(t)).slice(0, 6);
}

function prioritizeHomepageFeatured(
  sortedTemplates: Template[],
  homepageFeaturedSix: Template[],
  selectedTags: string[]
): Template[] {
  const homepageSet = new Set(homepageFeaturedSix.map((t) => t.slug));
  const shouldPin = (template: Template) =>
    selectedTags.length === 0 ||
    template.tags.some((tag) => selectedTags.includes(tag));
  const pinned = homepageFeaturedSix.filter(
    (homepageTemplate) =>
      homepageSet.has(homepageTemplate.slug) &&
      sortedTemplates.some((t) => t.slug === homepageTemplate.slug) &&
      shouldPin(homepageTemplate)
  );
  const pinnedSlugs = new Set(pinned.map((t) => t.slug));
  const rest = sortedTemplates.filter((t) => !pinnedSlugs.has(t.slug));
  return [...pinned, ...rest];
}

function reorderProjectManagementTemplates(input: Template[], selectedTags: string[]): Template[] {
  const isProjectManagementOnly =
    selectedTags.length === 1 && selectedTags[0].toLowerCase() === 'project management';
  if (!isProjectManagementOnly) return input;

  const reordered = [...input];
  const roadmapSlug = 'project-roadmap-timeline-103';
  const kanbanSlug = 'kanban-board-task-flow-104';

  const roadmapIndex = reordered.findIndex((t) => t.slug === roadmapSlug);
  if (roadmapIndex !== -1) {
    const [roadmap] = reordered.splice(roadmapIndex, 1);
    const targetIndex = Math.min(2, reordered.length);
    reordered.splice(targetIndex, 0, roadmap);
  }

  const kanbanIndex = reordered.findIndex((t) => t.slug === kanbanSlug);
  if (kanbanIndex !== -1) {
    const [kanban] = reordered.splice(kanbanIndex, 1);
    reordered.push(kanban);
  }

  return reordered;
}

function swapPersonalTemplatePositions(input: Template[], selectedTags: string[]): Template[] {
  const isPersonalOnly = selectedTags.length === 1 && selectedTags[0].toLowerCase() === 'personal';
  if (!isPersonalOnly) return input;

  const reordered = [...input];
  const weddingSlug = 'wedding-planning-hub-83';
  const newYearSlug = 'new-year-resolutions-review-194';
  const weddingIndex = reordered.findIndex((t) => t.slug === weddingSlug);
  const newYearIndex = reordered.findIndex((t) => t.slug === newYearSlug);

  if (weddingIndex === -1 || newYearIndex === -1 || weddingIndex === newYearIndex) {
    return reordered;
  }

  [reordered[weddingIndex], reordered[newYearIndex]] = [reordered[newYearIndex], reordered[weddingIndex]];
  return reordered;
}

function smartPopularSort(input: Template[]): Template[] {
  const remaining = input.map((template) => ({
    template,
    base: getBaseRankScore(template),
    skeleton: getSkeletonKey(template),
    tag: getPrimaryTag(template),
  }));
  const result: Template[] = [];
  const resultMeta: { skeleton: string; tag: string; featured: boolean }[] = [];
  let featuredCount = 0;

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      let score = candidate.base;
      const prev = resultMeta[resultMeta.length - 1];
      const prev2 = resultMeta[resultMeta.length - 2];

      if (prev) {
        if (candidate.skeleton === prev.skeleton) score -= 10;
        if (candidate.tag === prev.tag) score -= 4;
        if (candidate.template.featured && prev.featured) score -= 12;
      }

      if (prev && prev2 && prev.featured && prev2.featured && candidate.template.featured) {
        score -= 30;
      }

      if (candidate.template.featured) {
        const projectedFeaturedRatio = (featuredCount + 1) / (result.length + 1);
        if (projectedFeaturedRatio > 0.58) {
          score -= (projectedFeaturedRatio - 0.58) * 140;
        } else {
          score += 3;
        }
      } else {
        const currentRatio = result.length > 0 ? featuredCount / result.length : 0;
        if (currentRatio > 0.45) score += 6;
      }

      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    const [picked] = remaining.splice(bestIndex, 1);
    result.push(picked.template);
    resultMeta.push({
      skeleton: picked.skeleton,
      tag: picked.tag,
      featured: picked.template.featured,
    });
    if (picked.template.featured) featuredCount += 1;
  }

  return result;
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
        filtered = smartPopularSort(filtered);
        filtered = prioritizeHomepageFeatured(filtered, getHomepageFeaturedSix(templates), selectedTags);
        filtered = reorderProjectManagementTemplates(filtered, selectedTags);
        filtered = swapPersonalTemplatePositions(filtered, selectedTags);
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
