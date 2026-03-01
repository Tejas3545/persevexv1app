"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

const sections = [
  {
    id: "acceptance",
    number: 1,
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          These Terms and Conditions, along with our{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
          <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>{" "}
          (&quot;Terms&quot;) constitute a binding agreement by and between <strong>PERSEVEX EDUCATION CONSULTANCY LLP</strong> (&quot;Website Owner,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) and you (&quot;you&quot; or &quot;your&quot;) and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, &quot;Services&quot;).
        </p>
        <p className="mt-3">
          By using our website and availing the Services, you agree that you have read and accepted these Terms. We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.
        </p>
      </>
    ),
  },
  {
    id: "account",
    number: 2,
    title: "Account & Registration",
    content: (
      <p>
        To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.
      </p>
    ),
  },
  {
    id: "disclaimer",
    number: 3,
    title: "Disclaimer of Warranties",
    content: (
      <p>
        Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
      </p>
    ),
  },
  {
    id: "use-at-own-risk",
    number: 4,
    title: "Use at Your Own Risk",
    content: (
      <p>
        Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    number: 5,
    title: "Intellectual Property",
    content: (
      <p>
        The contents of the Website and the Services are proprietary to us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents. Unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.
      </p>
    ),
  },
  {
    id: "payments",
    number: 6,
    title: "Payments & Charges",
    content: (
      <p>
        You agree to pay us the charges associated with availing the Services as per the pricing schedule indicated on our website. Upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services.
      </p>
    ),
  },
  {
    id: "refund-policy",
    number: 7,
    title: "Refund Policy",
    content: (
      <>
        <p>
          All payments made towards course enrollment, registration, or reservation of seats are <strong>final and non-refundable</strong> once successfully processed, unless explicitly stated on the checkout page for a specific program.
        </p>
        <p className="mt-3">
          For complete details, please refer to our{" "}
          <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link> page.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-use",
    number: 8,
    title: "Prohibited Uses",
    content: (
      <>
        <p>You agree not to:</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Post, upload, or transmit any content that is harmful, harassing, defamatory, obscene, invasive of privacy, hateful, or otherwise objectionable or unlawful</span></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Violate or attempt to violate the security of our platform, including accessing data not intended for you, probing or testing vulnerabilities, interfering with services, or engaging in any unauthorized activities</span></li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    number: 9,
    title: "Third Party Links & Resources",
    content: (
      <p>
        The website and Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites. We are not responsible for the availability, accuracy, or content of third-party websites or resources linked from our platform. You access such links at your own risk.
      </p>
    ),
  },
  {
    id: "suspension",
    number: 10,
    title: "Suspension & Termination",
    content: (
      <p>
        We reserve the right to suspend or terminate your access to our Services if you violate these Terms, provide inaccurate information, or engage in activities that may cause harm to other users or our platform.
      </p>
    ),
  },
  {
    id: "indemnity",
    number: 11,
    title: "Indemnification",
    content: (
      <p>
        You agree to defend, indemnify and hold harmless PERSEVEX EDUCATION CONSULTANCY LLP, its employees, directors, officers, and agents against any claims, liabilities, damages, or costs arising from your use of our Services or violation of these Terms.
      </p>
    ),
  },
  {
    id: "liability",
    number: 12,
    title: "Limitation of Liability",
    content: (
      <p>
        We shall not be liable for any special, incidental, indirect, consequential or punitive damages arising from your use of our Services, even if we have been advised of the possibility of such damages.
      </p>
    ),
  },
  {
    id: "modifications",
    number: 13,
    title: "Modifications",
    content: (
      <p>
        We may change, modify, or remove the contents of our website at any time without notice. We reserve the right to modify or discontinue our Services without liability to you or any third party.
      </p>
    ),
  },
  {
    id: "communications",
    number: 14,
    title: "Electronic Communications",
    content: (
      <p>
        You consent to receive electronic communications from us, including notifications, agreements, and other important messages via our website, mobile applications, and email.
      </p>
    ),
  },
  {
    id: "minors",
    number: 15,
    title: "Minors",
    content: (
      <p>
        All users who are minors must have permission from and be supervised by their parent or guardian to use our Services. Parents or guardians agree to be responsible for any violations of these Terms by minors.
      </p>
    ),
  },
  {
    id: "force-majeure",
    number: 16,
    title: "Force Majeure",
    content: (
      <p>
        Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event including but not limited to acts of God, war, terrorism, floods, fire, strikes, epidemics, civil unrest, power outages, or severe weather.
      </p>
    ),
  },
  {
    id: "governing-law",
    number: 17,
    title: "Governing Law & Jurisdiction",
    content: (
      <>
        <p>
          These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India. All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
        </p>
        <p className="mt-3">
          If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law. These Terms constitute the entire agreement between you and us regarding your use of our Services.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    number: 18,
    title: "Contact",
    content: (
      <p>
        All concerns or communications relating to these Terms must be communicated to us at{" "}
        <a href="mailto:support@persevex.com" className="text-primary hover:underline">support@persevex.com</a>.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 bg-slate-50 dark:bg-card overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-highlight/15 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-primary/20"
          >
            <FiFileText className="w-3.5 h-3.5" />
            Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            Terms &amp; Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base"
          >
            Last updated: February 2026
          </motion.p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Quick navigation</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-xs font-medium text-primary hover:underline px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 transition-colors hover:bg-primary/10">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="scroll-mt-24"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-blue-600 dark:text-primary/50">{section.number}</span>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
