import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Startup Founder',
    avatar: 'SC',
    content: 'The Startup OS template saved me weeks of setup. Everything I needed to run my business was already organized.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Content Creator',
    avatar: 'MJ',
    content: 'Best investment I made for my content workflow. The Content Creator Kit helps me stay consistent across all platforms.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Graduate Student',
    avatar: 'ER',
    content: 'The Student Planner is amazing and it\'s FREE! I use it every day to track assignments and stay organized.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our community has to say about NeoNotion templates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-gradient"
            >
              <div className="bg-card p-6 h-full flex flex-col">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                
                <p className="text-foreground/90 flex-1 mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
