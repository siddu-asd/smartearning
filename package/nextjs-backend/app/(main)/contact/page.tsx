'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const contactMethods = [
    { icon: '📧', title: 'Email Us', value: 'support@studentcrazydeals.com', href: 'mailto:support@studentcrazydeals.com' },
    { icon: '📍', title: 'Location', value: 'Hyderabad, India', href: '#' },
    { icon: '⏰', title: 'Response Time', value: 'Within 24 hours', href: '#' },
  ];

  const faqs = [
    { q: 'How do you find deals?', a: 'Our team monitors hundreds of websites and uses automated tools to find the best deals.' },
    { q: 'Are deals verified?', a: 'Yes! Every deal is manually verified before publishing to ensure it works.' },
    { q: 'How do I report a broken deal?', a: 'Use the contact form above or email us directly. We\'ll fix it ASAP.' },
  ];

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          padding: '60px 20px 100px',
          textAlign: 'center',
        }}
      >
        <nav style={{ marginBottom: 20 }}>
          <ol style={{ display: 'flex', gap: 8, justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Home</Link></li>
            <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
            <li style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Contact</li>
          </ol>
        </nav>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'white', marginBottom: 12 }}>
          📬 Contact Us
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Have questions? We&apos;d love to hear from you!
        </p>
      </section>

      {/* Contact Methods */}
      <section style={{ padding: '0 20px', marginTop: -50, position: 'relative', zIndex: 10 }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
          }}
        >
          {contactMethods.map((method, i) => (
            <a
              key={i}
              href={method.href}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 24,
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>{method.icon}</span>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#6b7280', marginBottom: 4 }}>{method.title}</h3>
              <p style={{ fontSize: 15, color: '#111827', fontWeight: 600 }}>{method.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 32 }}>
            Send Us a Message
          </h2>

          {sent ? (
            <div
              style={{
                background: '#dcfce7',
                padding: 32,
                borderRadius: 16,
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>✅</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#166534', marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: '#166534' }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  padding: '16px 20px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  fontSize: 15,
                  outline: 'none',
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  padding: '16px 20px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  fontSize: 15,
                  outline: 'none',
                }}
              />
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{
                  padding: '16px 20px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  fontSize: 15,
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '16px 24px',
                  borderRadius: 12,
                  border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 20px 80px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
