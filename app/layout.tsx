import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Awesome N8N - Beautiful N8N Workflow Templates',
  description: 'Discover, search, and explore beautiful N8N workflow templates. Find the perfect automation for your needs.',
  keywords: ['n8n', 'workflows', 'automation', 'templates', 'integration'],
  authors: [{ name: 'Community' }],
  openGraph: {
    title: 'Awesome N8N',
    description: 'Beautiful N8N Workflow Templates',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
