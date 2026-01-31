import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Studentcrazydeals Admin',
  description: 'Admin panel for managing products and blogs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
