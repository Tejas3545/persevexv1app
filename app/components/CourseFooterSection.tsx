import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterLinkColumn {
  title: string;
  links: (string | { title: string; slug: string })[];
}

const getLinkPath = (link: string | { title: string; slug: string }): string => {
  if (typeof link === 'object') {
    return `/courses/${link.slug}`;
  }
  
  const slug = link.toLowerCase().replace(/\s+/g, '-');
  switch (slug) {
    case 'home':
      return '/';
    case 'contact-us':
      return '/contact';
    case 'who-we-are':
    case 'founder-ethos':
    case 'work-life-balance':
      return `/about#${slug}`;
    default:
      return `/courses/${slug}`;
  }
};

const renderFooterLink = (link: string | { title: string; slug: string }) => {
  const commonClasses = "text-muted-foreground hover:text-foreground transition-all duration-300 ease-out text-sm inline-block";
  const linkText = typeof link === 'object' ? link.title : link;

  if (linkText.includes('@')) {
    return (
      <a href={`mailto:${linkText}`} className={`${commonClasses} hover:translate-x-1`}>
        {linkText}
      </a>
    );
  }

  const isStaticText = linkText.toLowerCase().includes('india');
  if (isStaticText) {
    return (
      <span className="text-muted-foreground text-sm">
        {linkText}
      </span>
    );
  }

  return (
    <Link href={getLinkPath(link)} className={`${commonClasses} hover:translate-x-1`}>
      {linkText}
    </Link>
  );
};

export default function CourseFooterSection({ links }: { links: FooterLinkColumn[] }) {
  return (
    <footer className="relative mt-24 text-foreground overflow-hidden flex items-center justify-center py-20 md:py-12">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          <div className="flex items-start gap-6 w-full">
            <div className="flex items-center">
              <Image
                src="/persevex.png"
                alt="Persevex"
                width={56}
                height={56}
                className="h-14 w-auto object-contain"
              />
            </div>

            <div className="flex flex-col justify-center min-h-[4rem] md:min-h-[5rem]">
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Empowering careers through practical education.
              </p>
            </div>
          </div>

          <div className="md:col-span-1 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-0 md:ml-auto text-center sm:text-left">
            {links.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-foreground mb-4 text-lg">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, index) => (
                    <li key={typeof link === 'object' ? link.slug : link}>
                      {renderFooterLink(link)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-16 flex-col">
          <div className="h-px bg-muted rounded"></div>
          <div className="flex flex-col sm:flex-row justify-between items-center mx-auto sm:mx-0 w-full gap-4 mt-8">
            <p className="text-sm text-muted-foreground">© 2025 Persevex. All rights reserved.</p>
            <div className="flex gap-6">
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=61574597387622#" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 ease-out inline-block">Facebook</a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/persevex/posts/?feedView=all" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 ease-out inline-block">LinkedIn</a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/persevex_llp/" className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-300 ease-out inline-block">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
