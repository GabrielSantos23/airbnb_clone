import './globals.css';
import Head from './head';
import { Nunito } from 'next/font/google';
import Navbar from '@/app/components/navbar/Navbar';
const font = Nunito({
  subsets: ['latin'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head />

      <head />

      <body className={font.className}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
