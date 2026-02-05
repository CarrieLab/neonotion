import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedTemplates } from '@/components/home/FeaturedTemplates';
import { WhyUs } from '@/components/home/WhyUs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedTemplates />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </Layout>
  );
};

export default Index;
