import { motion } from 'framer-motion';
import { Palette, Layers, Zap, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Beautiful Designs',
    description: 'Every template is meticulously crafted with attention to aesthetics and usability.',
  },
  {
    icon: Layers,
    title: 'Diverse Collection',
    description: 'From productivity to lifestyle, find templates for every aspect of your life.',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Apply templates to your Notion workspace in seconds. No complex configuration needed.',
  },
  {
    icon: RefreshCw,
    title: 'Regular Updates',
    description: 'New templates added weekly. Subscribers get access to all future releases.',
  },
];

export function WhyUs() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 gradient-radial-primary opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why NeoNotion?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're obsessed with creating the best Notion templates on the market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-gradient"
            >
              <div className="bg-card p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
