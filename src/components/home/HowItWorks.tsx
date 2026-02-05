import { motion } from 'framer-motion';
import { MousePointer, CreditCard, Crown } from 'lucide-react';

const steps = [
  {
    icon: MousePointer,
    step: '01',
    title: 'Apply Instantly',
    description: 'Free templates can be applied to your Notion workspace with one click. No signup required.',
  },
  {
    icon: CreditCard,
    step: '02',
    title: 'Purchase Once',
    description: 'Buy individual premium templates with a one-time payment. Lifetime access included.',
  },
  {
    icon: Crown,
    step: '03',
    title: 'Subscribe for All',
    description: 'Get access to all subscription-eligible templates and future releases with our Pro plan.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started is simple. Choose your path to productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
