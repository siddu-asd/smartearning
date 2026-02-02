'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';

/**
 * Main Layout - Wraps all public pages with Header and Footer
 * This replaces the MainLayout from react-router-dom
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-wraper">
      <Header />
      {children}
      <Footer />
      <ScrollTop />
    </div>
  );
}
