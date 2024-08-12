import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoreNotes'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-slate-200'>
        {children}
      </body>
    </html>
  );
}
