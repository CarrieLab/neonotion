import { useState, useMemo } from 'react';
import { TemplateCard } from './TemplateCard';
import { TemplateFilters } from './TemplateFilters';
import { Template, SortOption } from '@/types/template';
import { Loader2 } from 'lucide-react';

interface TemplateGalleryProps {
  templates: Template[] | undefined;
  isLoading: boolean;
  showFilters?: boolean;
}

export function TemplateGallery({ templates, isLoading, showFilters = true }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('popular');

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
      default:
        filtered.sort((a, b) => b.popularity_score - a.popularity_score);
        break;
    }

    return filtered;
  }, [templates, searchQuery, selectedTags, sortOption]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
