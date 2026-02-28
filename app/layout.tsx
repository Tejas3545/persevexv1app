import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientOnlyComponents from "./components/ClientOnlyComponents";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://persevex.com"),

  title: {
    default: "Persevex | Empowering Careers with Real-World Skills",
    template: "%s | Persevex",
  },

  description:
    "Empowering the next generation with real-world skills. Experience hands-on learning with expert-curated courses, AI guidance, and career-ready outcomes.",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Persevex | Empowering Careers",
    description:
      "Experience hands-on learning with expert-curated courses, AI guidance, and career-ready outcomes.",
    url: "https://persevex.com",
    siteName: "Persevex",
    images: [
      {
        url: "/persevex.png",
        width: 1200,
        height: 630,
        alt: "Persevex Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Persevex | Empowering Careers",
    description:
      "Experience hands-on learning with expert-curated courses, AI guidance, and career-ready outcomes.",
    images: ["/persevex.png"],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Organization Structured Data for Google */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Persevex",
                url: "https://persevex.com",
                logo: "https://persevex.com/persevex.png",
              }),
            }}
          />

          {/* Facebook Pixel - Deferred for performance */}
          <Script id="fb-pixel" strategy="lazyOnload">
            {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;t.onerror=function(){console.log('Facebook Pixel blocked')};
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            try {
              fbq('init', '784980750633373');
              fbq('init', '202416294177654');
              fbq('track', 'PageView');
            } catch(err) {
              console.log('Facebook Pixel tracking unavailable');
            }
          `}
          </Script>

          {/* Noscript Pixels */}
          <noscript>
            <img
              height="1"
              width="1"
              className="hidden"
              src="https://www.facebook.com/tr?id=784980750633373&ev=PageView&noscript=1"
            />
          </noscript>

          <noscript>
            <img
              height="1"
              width="1"
              className="hidden"
              src="https://www.facebook.com/tr?id=202416294177654&ev=PageView&noscript=1"
            />
          </noscript>

          {children}
          <ClientOnlyComponents />
        </ThemeProvider>
      </body>
    </html>
  );
}
