import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { useTemplates } from '@/hooks/useTemplates';

const Templates = () => {
  const { data: templates, isLoading } = useTemplates();

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
              Template Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our complete collection of Notion templates. Find the perfect system for your workflow.
            </p>
          </motion.div>

          <TemplateGallery templates={templates} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
