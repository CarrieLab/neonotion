import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Purchase, Subscription } from '@/types/template';
import { useAuth } from '@/lib/auth-context';

export function usePurchases() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['purchases', user?.id],
    queryFn: async (): Promise<Purchase[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as Purchase[];
    },
    enabled: !!user,
  });
}

export function useSubscription() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async (): Promise<Subscription | null> => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data as Subscription;
    },
    enabled: !!user,
  });
}

export function useCreatePurchase() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ templateId, amountCents }: { templateId: string; amountCents: number }) => {
      if (!user) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('purchases')
        .insert({
          user_id: user.id,
          template_id: templateId,
          amount_cents: amountCents,
          status: 'completed',
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    },
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ plan }: { plan: 'monthly' | 'yearly' }) => {
      if (!user) throw new Error('Must be logged in');
      
      const periodEnd = new Date();
      periodEnd.setMonth(periodEnd.getMonth() + (plan === 'yearly' ? 12 : 1));
      
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan: plan === 'yearly' ? 'pro-yearly' : 'pro-monthly',
          status: 'active',
          current_period_end: periodEnd.toISOString(),
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });
}

export function useHasAccess(templateId: string, isFree: boolean, isSubscriptionIncluded: boolean) {
  const { data: purchases } = usePurchases();
  const { data: subscription } = useSubscription();
  
  if (isFree) return true;
  
  const hasPurchased = purchases?.some(p => p.template_id === templateId);
  const hasActiveSubscription = subscription?.status === 'active' && isSubscriptionIncluded;
  
  return hasPurchased || hasActiveSubscription;
}
