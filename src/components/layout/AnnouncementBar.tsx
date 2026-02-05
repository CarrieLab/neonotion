import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-b border-primary/20"
    >
      <div className="absolute inset-0 bg-shimmer animate-shimmer" />
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-sm">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-foreground/90">
          <span className="text-primary font-medium">New drops every week</span>
          {' '}— Fresh templates added regularly
        </span>
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
    </motion.div>
  );
}
