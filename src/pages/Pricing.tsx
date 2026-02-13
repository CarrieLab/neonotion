import { motion } from 'framer-motion';
import { Check, Crown, Zap, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useCreateSubscription } from '@/hooks/usePurchases';
import { toast } from 'sonner';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Access to all free templates',
      'Instant apply to Notion',
      'Community support',
    ],
    cta: 'Browse Free Templates',
    href: '/templates',
    variant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$9.99',
    yearlyPrice: '$99.99',
    period: '/month',
    yearlyPeriod: '/year',
    description: 'Best value for power users',
    features: [
      'All free templates',
      'All Pro-eligible premium templates',
      'New template drops included',
      'Priority support',
      'Early access to new releases',
      'Save 20% with yearly billing',
    ],
    cta: 'Start Pro Subscription',
    variant: 'hero' as const,
    popular: true,
  },
  {
    name: 'One-Time',
    price: 'Varies',
    period: 'per template',
    description: 'Pay as you go',
    features: [
      'Purchase individual templates',
      'Lifetime access per purchase',
      'No subscription required',
      'Community support',
    ],
    cta: 'Browse All Templates',
    href: '/templates',
    variant: 'outline' as const,
  },
];

const Pricing = () => {
  const { user } = useAuth();
  const createSubscription = useCreateSubscription();
  const [isYearly, setIsYearly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please sign in first', {
        action: {
          label: 'Sign In',
          onClick: () => window.location.href = '/login',
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      await createSubscription.mutateAsync({ plan: isYearly ? 'yearly' : 'monthly' });
      toast.success('Welcome to Pro!', {
        description: 'You now have access to all premium templates.',
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative py-20">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that works for you. No hidden fees, no surprises.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-secondary rounded-full p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isYearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Yearly
                <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'border-gradient' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`bg-card rounded-xl p-6 h-full flex flex-col ${
                  plan.popular ? '' : 'border border-border'
                }`}>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                      {plan.name === 'Pro' && <Crown className="h-5 w-5 text-primary" />}
                      {plan.name === 'Free' && <Zap className="h-5 w-5 text-primary" />}
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.name === 'Pro' 
                        ? (isYearly ? plan.yearlyPrice : plan.price)
                        : plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.name === 'Pro'
                        ? (isYearly ? plan.yearlyPeriod : plan.period)
                        : plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.href ? (
                    <Button variant={plan.variant} size="lg" className="w-full" asChild>
                      <Link to={plan.href}>{plan.cta}</Link>
                    </Button>
                  ) : (
                    <Button
                      variant={plan.variant}
                      size="lg"
                      className="w-full"
                      onClick={handleSubscribe}
                      disabled={isLoading}
                    >
                      {plan.cta}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Compare Plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4 text-foreground font-medium">Free</th>
                    <th className="text-center py-4 px-4 text-primary font-medium">Pro</th>
                    <th className="text-center py-4 px-4 text-foreground font-medium">One-Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Free templates', true, true, true],
                    ['Premium templates', false, true, 'Per purchase'],
                    ['New template drops', false, true, false],
                    ['Priority support', false, true, false],
                    ['Lifetime access', true, 'Subscription', true],
                    ['Early access', false, true, false],
                  ].map(([feature, ...values], i) => (
                    <tr key={i}>
                      <td className="py-4 px-4 text-muted-foreground">{feature}</td>
                      {values.map((value, j) => (
                        <td key={j} className="py-4 px-4 text-center">
                          {value === true ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : value === false ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
