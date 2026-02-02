import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StudentCrazyDeals - Best Student Deals & Discounts',
  description: 'Discover the best deals, discounts, and offers curated for students. Save big on electronics, fashion, food, and more!',
  keywords: 'student deals, discounts, offers, coupons, student discounts, best deals',
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
