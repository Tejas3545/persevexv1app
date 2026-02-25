import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
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
        url: "/logo.png",
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
    images: ["/logo.png"],
  },
};

import { ThemeProvider } from "./components/ThemeProvider";
import ChatWidget from "./components/ChatWidget";

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
                logo: "https://persevex.com/logo.png",
              }),
            }}
          />

          {/* Facebook Pixel */}
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '784980750633373');
            fbq('init', '202416294177654');
            fbq('track', 'PageView');
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
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
