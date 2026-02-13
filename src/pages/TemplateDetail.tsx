import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, Zap, CreditCard, Crown, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useTemplate } from '@/hooks/useTemplates';
import { useAuth } from '@/lib/auth-context';
import { usePurchases, useSubscription, useCreatePurchase, useCreateSubscription } from '@/hooks/usePurchases';
import { toast } from 'sonner';
import { useState } from 'react';
import { TemplatePreview } from '@/components/templates/TemplatePreview';

const TemplateDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: template, isLoading } = useTemplate(slug || '');
  const { user } = useAuth();
  const { data: purchases } = usePurchases();
  const { data: subscription } = useSubscription();
  const createPurchase = useCreatePurchase();
  const createSubscription = useCreateSubscription();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const hasPurchased = purchases?.some(p => p.template_id === template?.id);
  const hasActiveSubscription = subscription?.status === 'active';
  const hasAccess = template?.is_free || hasPurchased || (hasActiveSubscription && template?.is_subscription_included);

  const formatPrice = (cents: number | null) => {
    if (cents === null) return 'Free';
    return `$${(cents / 100).toFixed(0)}`;
  };

  const handleApply = () => {
    toast.message('Coming soon', {
      description: 'Apply to Notion is not available yet. We’re putting the finishing touches on it.',
    });
  };

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Please sign in to purchase');
      return;
    }
    
    setIsCheckingOut(true);
    try {
      await createPurchase.mutateAsync({
        templateId: template!.id,
        amountCents: template!.price_cents || 0,
      });
      toast.success('Purchase complete!', {
        description: 'You now have lifetime access to this template.',
      });
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }
    
    setIsCheckingOut(true);
    try {
      await createSubscription.mutateAsync({ plan: 'monthly' });
      toast.success('Subscription activated!', {
        description: 'Welcome to Pro! You now have access to all premium templates.',
      });
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!template) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Template not found</h1>
          <Button variant="hero-outline" asChild>
            <Link to="/templates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative py-12">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back link */}
          <Link
            to="/templates"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden border-gradient">
                <TemplatePreview template={template} variant="detail" />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {template.title}
                </h1>
                <div className="flex items-center gap-4">
                  {template.is_free ? (
                    <span className="text-2xl font-bold text-primary">Free</span>
                  ) : (
                    <>
                      {template.allow_one_time_purchase && (
                        <span className="text-2xl font-bold text-foreground">
                          {formatPrice(template.price_cents)}
                        </span>
                      )}
                      {template.is_subscription_included && (
                        <span className="badge-subscription px-3 py-1 rounded-full text-sm font-medium">
                          Included in Pro
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(template.rating ?? 4.9) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                  ))}
                </div>
                <span className="text-muted-foreground">{(template.rating ?? 4.9).toFixed(1)} ({template.rating_count ?? 128} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg">
                {template.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {hasAccess ? (
                  <Button variant="hero" size="xl" className="w-full" onClick={handleApply}>
                    <Zap className="mr-2 h-5 w-5" />
                    Apply to Notion
                  </Button>
                ) : (
                  <>
                    {template.allow_one_time_purchase && (
                      <Button
                        variant="hero"
                        size="xl"
                        className="w-full"
                        onClick={handlePurchase}
                        disabled={isCheckingOut}
                      >
                        {isCheckingOut ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <CreditCard className="mr-2 h-5 w-5" />
                        )}
                        Buy Once — {formatPrice(template.price_cents)}
                      </Button>
                    )}
                    {template.is_subscription_included && (
                      <Button
                        variant="premium"
                        size="xl"
                        className="w-full"
                        onClick={handleSubscribe}
                        disabled={isCheckingOut}
                      >
                        {isCheckingOut ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <Crown className="mr-2 h-5 w-5" />
                        )}
                        Unlock with Pro — $9.99/mo
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* What's Inside */}
              {template.whats_inside && template.whats_inside.length > 0 && (
                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    What's Inside
                  </h3>
                  <ul className="space-y-3">
                    {template.whats_inside.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateDetail;
