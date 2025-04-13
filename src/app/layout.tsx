import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog - Chia sẻ kiến thức lập trình'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi' suppressHydrationWarning>
      <body className={`${interSans.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
            <Toaster richColors closeButton position='top-right' />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
