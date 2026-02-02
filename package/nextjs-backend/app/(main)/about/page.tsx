'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  accent: '#F59E0B',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ students: 0, deals: 0, brands: 0, saved: 0 });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const targets = { students: 50000, deals: 10000, brands: 100, saved: 5 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        students: Math.floor(targets.students * easeOut),
        deals: Math.floor(targets.deals * easeOut),
        brands: Math.floor(targets.brands * easeOut),
        saved: Math.floor(targets.saved * easeOut * 10) / 10,
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const stats = [
    { number: `${(counters.students / 1000).toFixed(0)}K+`, label: 'Happy Students', icon: '🎓', color: '#2563EB' },
    { number: `${(counters.deals / 1000).toFixed(0)}K+`, label: 'Active Deals', icon: '🔥', color: '#10B981' },
    { number: `${counters.brands}+`, label: 'Partner Brands', icon: '🤝', color: '#F59E0B' },
    { number: `₹${counters.saved}Cr+`, label: 'Saved by Users', icon: '💰', color: '#7C3AED' },
  ];

  const categories = [
    { icon: '💻', name: 'Laptops & Computers', desc: 'Best deals on laptops perfect for studying, coding, and entertainment', color: '#2563EB' },
    { icon: '📱', name: 'Smartphones', desc: 'Affordable mobile phones and accessories for staying connected', color: '#7C3AED' },
    { icon: '🎧', name: 'Audio & Headphones', desc: 'Quality headphones and speakers for music and online classes', color: '#10B981' },
    { icon: '🪑', name: 'Study Furniture', desc: 'Comfortable chairs and desks for long study sessions', color: '#F59E0B' },
    { icon: '🏠', name: 'Home Appliances', desc: 'Essential appliances for dorm rooms and apartments', color: '#EF4444' },
    { icon: '📺', name: 'Entertainment', desc: 'TVs, gaming consoles, and streaming devices for downtime', color: '#06B6D4' },
  ];

  const whyChooseUs = [
    { icon: '✨', title: 'Curated Deals', desc: 'Every deal is handpicked and verified by our team to ensure quality and savings' },
    { icon: '⚡', title: 'Real-Time Updates', desc: 'New deals added every hour, so you never miss out on amazing discounts' },
    { icon: '🛡️', title: '100% Free Service', desc: 'No hidden fees, no subscriptions - completely free for all students' },
    { icon: '🎯', title: 'Student Focused', desc: 'Products and deals specifically curated for student needs and budgets' },
  ];

  return (
    <div className="page-content" style={{ background: COLORS.white }}>
      {/* Hero Section */}
      <section
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
          background: COLORS.gradient,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="row align-items-center">
            <div
              className="col-lg-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '8px 16px',
                  borderRadius: '50px',
                  marginBottom: '24px',
                }}
              >
                <span>🎓</span>
                <span style={{ color: COLORS.white, fontSize: '14px', fontWeight: '500' }}>For Students, By Students</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: '800',
                  color: COLORS.white,
                  lineHeight: '1.2',
                  marginBottom: '24px',
                }}
              >
                We Help Students
                <br />
                <span style={{ color: '#FCD34D' }}>Save More</span>
              </h1>

              <p
                style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: '1.7',
                  marginBottom: '32px',
                  maxWidth: '600px',
                }}
              >
                StudentCrazyDeals is your trusted companion for finding the best deals on everything students need.
                From laptops to furniture, we curate the best offers so you can focus on what matters most - your education.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link
                  href="/deals"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    background: COLORS.white,
                    color: COLORS.primary,
                    fontSize: '15px',
                    fontWeight: '600',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  }}
                >
                  🛒 Browse Deals
                </Link>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    background: 'rgba(255,255,255,0.15)',
                    color: COLORS.white,
                    fontSize: '15px',
                    fontWeight: '600',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  📧 Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} style={{ padding: '60px 0', background: COLORS.lightBg }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: COLORS.white,
                  padding: '32px 24px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>{stat.icon}</span>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>{stat.number}</div>
                <div style={{ fontSize: '14px', color: COLORS.gray }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '80px 0', background: COLORS.white }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: COLORS.dark, marginBottom: '12px' }}>Why Choose Us?</h2>
            <p style={{ color: COLORS.gray, fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              We&apos;re dedicated to helping students save money on everything they need.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: COLORS.lightBg,
                  padding: '32px',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>{item.icon}</span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: COLORS.dark, marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: COLORS.gray, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 0', background: COLORS.lightBg }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: COLORS.dark, marginBottom: '12px' }}>What We Cover</h2>
            <p style={{ color: COLORS.gray, fontSize: '16px' }}>Deals across all categories you need</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {categories.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  background: COLORS.white,
                  padding: '28px',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <span style={{ fontSize: '36px' }}>{cat.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: COLORS.dark, marginBottom: '6px' }}>{cat.name}</h3>
                  <p style={{ color: COLORS.gray, fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: COLORS.gradient, textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: COLORS.white, marginBottom: '16px' }}>Ready to Start Saving?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Join thousands of students who save money every day with our curated deals.
          </p>
          <Link
            href="/deals"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: COLORS.white,
              color: COLORS.primary,
              fontSize: '16px',
              fontWeight: '700',
              borderRadius: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            }}
          >
            Browse All Deals →
          </Link>
        </div>
      </section>
    </div>
  );
}
