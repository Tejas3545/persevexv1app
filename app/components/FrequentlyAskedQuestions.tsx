import { FAQType } from '../constants/faqsData';
import AccordionItem from './Framer/AccordianItem';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function FrequentlyAskedQuestionsSection({ faqs }: { faqs: FAQType[] }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 items-center justify-center text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent border border-border backdrop-blur-sm">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          Frequently Asked
          <br />
          <span className="text-primary">
            Questions
          </span>
        </h1>
        
        <p className="text-sm md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Everything you need to know about our internship program. 
          Can't find the answer you're looking for? 
          <Link href="/support" className="text-primary hover:text-blue-600 cursor-pointer transition-colors font-medium">
            {" "}Reach out to our team.
          </Link>
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} faq={faq} index={index} />
        ))}
      </div>

      <div id="contact-form" className="mt-20 scroll-mt-24">
        <div className="text-center p-8 bg-secondary/50 rounded-3xl">
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-6">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/support"
              className="btn-primary text-sm inline-flex items-center gap-2 px-6 py-3 rounded-full"
            >
              Get in touch
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
