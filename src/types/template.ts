export interface Template {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  price_cents: number | null;
  is_free: boolean;
  is_subscription_included: boolean;
  allow_one_time_purchase: boolean;
  thumbnail_url: string | null;
  gallery_urls: string[];
  featured: boolean;
  popularity_score: number;
  whats_inside: string[];
  created_at: string;
  updated_at: string;
  rating?: number;
  rating_count?: number;
}

export interface Purchase {
  id: string;
  user_id: string;
  template_id: string;
  amount_cents: number;
  status: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  current_period_start: string;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export type SortOption = 'popular' | 'new' | 'price-low' | 'price-high';

export const ALL_TAGS = [
  'Productivity',
  'Student',
  'Business',
  'Creator',
  'Personal Finance',
  'Project Management',
  'CRM',
  'Content Calendar',
  'Habit Tracker',
  'Wedding',
  'Travel',
  'Personal',
  'Lifestyle',
  'Freelance',
  'Knowledge',
  'Health',
  'Fitness',
  'Event Planning',
] as const;
