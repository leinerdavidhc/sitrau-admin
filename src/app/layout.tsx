'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const oswald = Oswald({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <title>Sitrau Admin</title>
      </head>
      <body className={oswald.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryClientProvider client={queryClient}>
            {children}
            <ToastContainer />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
