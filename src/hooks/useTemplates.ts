import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/template';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async (): Promise<Template[]> => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('popularity_score', { ascending: false });
      
      if (error) throw error;
      return data as Template[];
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
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data as Template;
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
        .eq('featured', true)
        .order('popularity_score', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Template[];
    },
  });
}
