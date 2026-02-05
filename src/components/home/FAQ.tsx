import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I apply a template to my Notion workspace?',
    answer: 'After purchasing or accessing a template, you\'ll receive a duplication link. Click it, and Notion will create a copy of the template in your workspace. It\'s instant and takes just seconds.',
  },
  {
    question: 'What\'s the difference between one-time purchase and subscription?',
    answer: 'One-time purchases give you lifetime access to a specific template. A subscription (Pro plan) gives you access to all subscription-eligible templates, plus any new ones we release during your subscription period.',
  },
  {
    question: 'Can I customize the templates?',
    answer: 'Absolutely! Once a template is in your Notion workspace, you have full control to customize it however you like. Change colors, add properties, modify layouts—make it yours.',
  },
  {
    question: 'Do templates work with Notion\'s free plan?',
    answer: 'Yes! All our templates work perfectly with Notion\'s free Personal plan. No paid Notion subscription required.',
  },
  {
    question: 'What happens after I cancel my subscription?',
    answer: 'You\'ll keep access until the end of your billing period. After that, you\'ll no longer be able to access new subscription templates, but any templates you\'ve already duplicated remain yours forever.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 7-day money-back guarantee on all purchases. If you\'re not satisfied, contact us for a full refund. See our Refund Policy for details.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-gradient overflow-hidden"
              >
                <div className="bg-card">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
