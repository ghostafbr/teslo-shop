import { inter } from '@/config/fonts';
import type { Metadata } from 'next';
import './globals.css';
import { Provider } from '@/components';

export const metadata: Metadata = {
  title: {
    template: '%s -  Teslo | Shop',
    default: 'Home -  Teslo | Shop',
  },
  description: 'a very cool shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
