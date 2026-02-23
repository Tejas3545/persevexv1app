import { useState, FormEvent, useRef } from 'react'; 
import { FAQType } from '../constants/faqsData';
import AccordionItem from './Framer/AccordianItem';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAYwB174Qk9X9nJYWIAiRC81NkYJOgLJOjJtu9txvHmeaVlz0HraJdPGfgEQwYRfaToQ/exec"; 

export default function FrequentlyAskedQuestionsSection({ faqs }: { faqs: FAQType[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });
      
      const result = await response.json();

      if (result.result === "success") {
        alert("Thank you for your question! We will get back to you soon.");
        formRef.current?.reset();
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again later.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <a href="#contact-form" className="text-primary hover:text-blue-600 cursor-pointer transition-colors font-medium">
            {" "}Reach out to our team.
          </a>
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} faq={faq} index={index} />
        ))}
      </div>

      <div id="contact-form" className="mt-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl backdrop-blur-xs border border-border ">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground">
              Our team is here to help you get started on your internship journey.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Your Message / Question *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Please describe your question or concern..."
              />
            </div>

            <div className="pt-4 flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-fit px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          <p className="text-xs text-muted text-center mt-6">
            We respect your privacy. Your information will only be used to respond to your inquiry.
          </p>
        </div>
      </div>
    </div>
  );
}
