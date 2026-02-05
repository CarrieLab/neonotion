import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Package, Zap, ExternalLink, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { usePurchases, useSubscription } from '@/hooks/usePurchases';
import { useTemplates } from '@/hooks/useTemplates';

const Account = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: purchases, isLoading: purchasesLoading } = usePurchases();
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();
  const { data: templates } = useTemplates();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <Layout showAnnouncement={false}>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const purchasedTemplates = templates?.filter(t => 
    purchases?.some(p => p.template_id === t.id)
  ) || [];

  const subscriptionTemplates = subscription?.status === 'active'
    ? templates?.filter(t => t.is_subscription_included) || []
    : [];

  const freeTemplates = templates?.filter(t => t.is_free) || [];

  const accessibleTemplates = [
    ...purchasedTemplates,
    ...subscriptionTemplates.filter(t => !purchasedTemplates.some(p => p.id === t.id)),
    ...freeTemplates.filter(t => !purchasedTemplates.some(p => p.id === t.id) && !subscriptionTemplates.some(s => s.id === t.id)),
  ];

  return (
    <Layout showAnnouncement={false}>
      <div className="relative py-12">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
            <p className="text-muted-foreground mb-8">
              Welcome back, {user.email}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subscription Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border-gradient"
            >
              <div className="bg-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Subscription</h2>
                </div>

                {subscriptionLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : subscription?.status === 'active' ? (
                  <div>
                    <p className="text-2xl font-bold text-primary mb-2">Pro Active</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Renews on {new Date(subscription.current_period_end || '').toLocaleDateString()}
                    </p>
                    <Button variant="outline" size="sm">
                      Manage Subscription
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground mb-4">
                      You're on the free plan
                    </p>
                    <Button variant="hero" size="sm" asChild>
                      <Link to="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Purchases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-gradient"
            >
              <div className="bg-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Purchases</h2>
                </div>

                {purchasesLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : purchases && purchases.length > 0 ? (
                  <div>
                    <p className="text-2xl font-bold text-foreground mb-2">
                      {purchases.length} template{purchases.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lifetime access included
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No purchases yet
                  </p>
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-gradient"
            >
              <div className="bg-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Templates Access</h2>
                </div>
                <p className="text-2xl font-bold text-foreground mb-2">
                  {accessibleTemplates.length} templates
                </p>
                <p className="text-sm text-muted-foreground">
                  Available to apply
                </p>
              </div>
            </motion.div>
          </div>

          {/* My Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">My Templates</h2>
            
            {accessibleTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessibleTemplates.slice(0, 6).map((template) => (
                  <div key={template.id} className="border border-border rounded-lg p-4 bg-card hover:bg-card/80 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{template.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.is_free ? 'Free' : purchasedTemplates.some(p => p.id === template.id) ? 'Purchased' : 'Pro'}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/templates/${template.slug}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-border rounded-lg bg-card">
                <p className="text-muted-foreground mb-4">No templates yet</p>
                <Button variant="hero-outline" asChild>
                  <Link to="/templates">Browse Templates</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
