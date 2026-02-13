import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/template';
import { STATIC_TEMPLATES } from '@/lib/static-templates';

/** Never show Featured badge for Student Planner / Startup OS (by title). */
function forceNoFeaturedTemplate(t: Template): Template {
  const lower = t.title.toLowerCase().trim();
  const noFeatured =
    lower === 'habit tracker' ||
    lower.includes('student planner') ||
    lower.includes('startup operating system') ||
    lower.includes('startup os');
  return noFeatured ? { ...t, featured: false } : t;
}

function mergeWithStaticTemplates(liveTemplates: Template[] | null | undefined): Template[] {
  const bySlug = new Map<string, Template>();

  (liveTemplates ?? []).forEach((t) => {
    bySlug.set(t.slug, t);
  });

  STATIC_TEMPLATES.forEach((t) => {
    if (!bySlug.has(t.slug)) {
      bySlug.set(t.slug, t);
    }
  });

  const merged = Array.from(bySlug.values());
  merged.sort(
    (a, b) => (b.popularity_score ?? 0) - (a.popularity_score ?? 0),
  );
  return merged.map(forceNoFeaturedTemplate);
}

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async (): Promise<Template[]> => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('popularity_score', { ascending: false });
      
      if (error) throw error;
      return mergeWithStaticTemplates(data as Template[] | null | undefined);
    },
  });
}

export function useTemplate(slug: string) {
  return useQuery({
    queryKey: ['template', slug],
    queryFn: async (): Promise<Template | null> => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          const staticT = STATIC_TEMPLATES.find((t) => t.slug === slug) ?? null;
          return staticT ? forceNoFeaturedTemplate(staticT) : null;
        }
        throw error;
      }
      return forceNoFeaturedTemplate(data as Template);
    },
    enabled: !!slug,
  });
}

export function useFeaturedTemplates() {
  return useQuery({
    queryKey: ['templates', 'featured'],
    queryFn: async (): Promise<Template[]> => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('popularity_score', { ascending: false });
      
      if (error) throw error;
      const merged = mergeWithStaticTemplates(data as Template[] | null | undefined);
      const featured = merged.filter((t) => t.featured);

      // Explicit 6-slot layout for Featured grid (3 cols × 2 rows)
      const slots: (string | null)[] = [
        'tarot learning vault',                              // [0] Row 1 left
        'ai engineering roadmap by data with baraa',         // [1] Row 1 center
        null,                                                // [2] Row 1 right — auto-fill
        'travel bucket list & wish list',                    // [3] Row 2 left
        '12 week year planner',                              // [4] Row 2 center
        'content planner for tiktok & instagram influencers',// [5] Row 2 right
      ];

      const pinned = slots.map((name) =>
        name ? featured.find((t) => t.title.toLowerCase() === name) ?? null : null,
      );
      const pinnedSet = new Set(slots.filter(Boolean));
      const fillers = featured.filter((t) => !pinnedSet.has(t.title.toLowerCase()));
      let fillerIdx = 0;
      const result = pinned.map((t) => t ?? fillers[fillerIdx++]).filter(Boolean);

      return result.slice(0, 6);
    },
  });
}
