import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <Layout showAnnouncement={false}>
      <div className="relative py-16">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Last updated: {lastUpdated}
            </p>

            <div className="prose prose-invert prose-sm max-w-none">
              <div className="space-y-8 text-muted-foreground">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
