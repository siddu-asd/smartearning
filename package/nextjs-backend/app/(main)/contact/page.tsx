'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    { icon: '📧', title: 'Email', value: 'hello@studentscrazydeals.in', href: 'mailto:hello@studentscrazydeals.in' },
    { icon: '📍', title: 'Location', value: 'Bangalore, India', href: '#' },
    { icon: '⏰', title: 'Response', value: 'Within 24 hours', href: '#' },
  ];

  const faqs = [
    { q: 'How do you find deals?', a: 'Our team monitors hundreds of websites 24/7 to discover the best deals.' },
    { q: 'Are all deals verified?', a: 'Yes! Every deal is manually verified before publishing.' },
    { q: 'How can I report a broken deal?', a: 'Use the contact form or email us directly. We\'ll fix it ASAP!' },
    { q: 'Can I suggest a deal?', a: 'Absolutely! Send us the details and we\'ll verify and share it.' },
  ];

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '15px',
    outline: 'none',
    background: '#f9fafb',
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '60px 24px 120px', textAlign: 'center' }}>
        <nav style={{ marginBottom: '24px' }}>
          <ol style={{ display: 'flex', gap: '8px', justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
            <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
            <li style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Contact</li>
          </ol>
        </nav>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Get in Touch</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', maxWidth: '480px', margin: '0 auto' }}>Have a question? We&apos;d love to hear from you.</p>
      </section>

      {/* Contact Methods */}
      <section style={{ padding: '0 24px', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {contactMethods.map((method, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{method.icon}</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{method.title}</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>{method.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Contact Form */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Send us a Message</h2>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>We&apos;ll get back to you soon.</p>
                <button onClick={() => setSent(false)} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={inputStyle} />
                <textarea placeholder="Your Message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                <button type="submit" style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Send Message →</button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
