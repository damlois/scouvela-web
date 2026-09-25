import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const siteTitle = 'Scouvela — African SME Opportunity Intelligence';
const siteDescription =
  'Discover and structure grants, tenders, accelerators, training and empowerment opportunities for African SMEs with the Scouvela Apify Actor.';

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s · Scouvela',
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    images: [
      {
        url: '/images/scouvela-mark.png',
        width: 512,
        height: 512,
        alt: 'Scouvela',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/scouvela-mark.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/scouvela-mark.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
