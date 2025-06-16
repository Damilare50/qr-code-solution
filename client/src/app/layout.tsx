import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QR Movie Generator',
  description: 'Scan QR codes to discover amazing movies',
  keywords: ['movies', 'QR code', 'entertainment', 'film'],
  authors: [{ name: 'Damilare Okubanjo' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
          {children}
        </div>
      </body>
    </html>
  );
}
