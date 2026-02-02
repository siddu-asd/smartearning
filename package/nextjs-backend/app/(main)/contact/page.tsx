'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: 'How do you find these deals?',
      a: 'We have a dedicated team that scours the internet, partners with brands, and tracks flash sales to bring you the best prices.',
    },
    {
      q: 'Are the deals really verified?',
      a: 'Yes! Every deal is manually verified before being posted to ensure authenticity.',
    },
    {
      q: 'How can I submit a deal I found?',
      a: 'You can email us or use the contact form on this page! We love hearing from our community.',
    },
    {
      q: 'How quickly do you respond to inquiries?',
      a: 'We typically respond to all inquiries within 24 hours during business days.',
    },
  ];

  const contactMethods = [
    { icon: '📧', title: 'Email Us', value: 'help@studentcrazydeals.com', desc: 'We reply within 24 hours' },
    { icon: '💬', title: 'Live Chat', value: 'Available 9 AM - 6 PM', desc: 'Mon - Fri' },
    { icon: '📍', title: 'Location', value: 'India', desc: 'Remote team' },
  ];

  return (
    <div className="page-content" style={{ background: COLORS.white, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          background: COLORS.gradient,
          padding: '100px 0 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '10%', width: '150px', height: '150px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: COLORS.white }}>
                Contact Us
              </li>
            </ol>
          </nav>
          <div
            className="row align-items-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease',
            }}
          >
            <div className="col-lg-8">
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: COLORS.white, marginBottom: '16px' }}>Get in Touch</h1>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px' }}>
                Have a question, suggestion, or just want to say hi? We&apos;d love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section style={{ padding: '60px 0', background: COLORS.lightBg }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {contactMethods.map((method, idx) => (
              <div
                key={idx}
                style={{
                  background: COLORS.white,
                  padding: '32px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>{method.icon}</span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: COLORS.dark, marginBottom: '8px' }}>{method.title}</h3>
                <p style={{ fontSize: '16px', color: COLORS.primary, fontWeight: '600', marginBottom: '4px' }}>{method.value}</p>
                <p style={{ fontSize: '14px', color: COLORS.gray, margin: 0 }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="row" style={{ gap: '48px 0' }}>
            {/* Contact Form */}
            <div className="col-lg-6">
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: COLORS.dark, marginBottom: '24px' }}>Send us a Message</h2>

              {isSubmitted ? (
                <div
                  style={{
                    background: '#DCFCE7',
                    padding: '32px',
                    borderRadius: '16px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>✅</span>
                  <h3 style={{ color: '#166534', fontWeight: '700', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: '#15803D', margin: 0 }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.dark, marginBottom: '8px' }}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: `1px solid ${COLORS.border}`,
                        fontSize: '15px',
                        outline: 'none',
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.dark, marginBottom: '8px' }}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: `1px solid ${COLORS.border}`,
                        fontSize: '15px',
                        outline: 'none',
                      }}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.dark, marginBottom: '8px' }}>Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: `1px solid ${COLORS.border}`,
                        fontSize: '15px',
                        outline: 'none',
                        background: COLORS.white,
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="deal">Submit a Deal</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: COLORS.dark, marginBottom: '8px' }}>Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: `1px solid ${COLORS.border}`,
                        fontSize: '15px',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px 32px',
                      background: COLORS.gradient,
                      color: COLORS.white,
                      fontSize: '16px',
                      fontWeight: '700',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div className="col-lg-6">
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: COLORS.dark, marginBottom: '24px' }}>Frequently Asked Questions</h2>

              <div>
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: COLORS.lightBg,
                      borderRadius: '12px',
                      marginBottom: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '20px',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontWeight: '600', color: COLORS.dark, fontSize: '15px' }}>{faq.q}</span>
                      <span style={{ color: COLORS.primary, fontSize: '20px' }}>{openFaq === idx ? '−' : '+'}</span>
                    </button>
                    {openFaq === idx && (
                      <div style={{ padding: '0 20px 20px' }}>
                        <p style={{ color: COLORS.gray, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
