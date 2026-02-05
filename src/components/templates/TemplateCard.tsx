import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Zap } from 'lucide-react';
import { Template } from '@/types/template';
import { Badge } from '@/components/ui/badge';

interface TemplateCardProps {
  template: Template;
  index?: number;
}

export function TemplateCard({ template, index = 0 }: TemplateCardProps) {
  const formatPrice = (cents: number | null) => {
    if (cents === null) return 'Free';
    return `$${(cents / 100).toFixed(0)}`;
  };

  const getPriceBadge = () => {
    if (template.is_free) {
      return <span className="badge-free px-2 py-1 rounded-md text-xs font-medium">Free</span>;
    }
    if (template.is_subscription_included && template.allow_one_time_purchase) {
      return (
        <div className="flex items-center gap-1">
          <span className="badge-price px-2 py-1 rounded-md text-xs font-medium">
            {formatPrice(template.price_cents)}
          </span>
          <span className="badge-subscription px-2 py-1 rounded-md text-xs font-medium">Pro</span>
        </div>
      );
    }
    if (template.is_subscription_included) {
      return <span className="badge-subscription px-2 py-1 rounded-md text-xs font-medium">Pro</span>;
    }
    return (
      <span className="badge-price px-2 py-1 rounded-md text-xs font-medium">
        {formatPrice(template.price_cents)}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        to={`/templates/${template.slug}`}
        className="group block"
      >
        <div className="border-gradient overflow-hidden transition-glow hover-glow">
          <div className="bg-card p-1">
            {/* Thumbnail */}
            <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </div>
              {template.featured && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-primary/90 text-primary-foreground text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {template.title}
                </h3>
                {getPriceBadge()}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {template.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {template.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {template.tags.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    +{template.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Rating placeholder */}
              <div className="flex items-center gap-1 mt-3 text-muted-foreground">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm">4.9</span>
                <span className="text-xs">(128)</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
