import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'SaveTok - Download Video TikTok Without Watermark Free',
  description:
    'TikTok Video Downloader - SaveTok is a free tool to Download Video TikTok without watermark. Save TikTok videos easily on any device.',
  openGraph: {
    title: 'SaveTok - Download Video TikTok Without Watermark Free',
    description:
      'The fastest and easiest way to download TikTok content for personal use.',
    type: 'website',
    url: 'https://savetok.app',
    images: [
      {
        url: 'https://picsum.photos/1200/630?data-ai-hint=social+media+downloader',
        width: 1200,
        height: 630,
        alt: 'SaveTok App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaveTok - Download Video TikTok Without Watermark Free',
    description:
      'Quickly download TikTok videos, photos, and audio without watermarks.',
    images: ['https://picsum.photos/1200/630?data-ai-hint=social+media+downloader'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
