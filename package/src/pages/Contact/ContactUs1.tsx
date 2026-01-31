import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ContactUs1 = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
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
            a: 'We have a dedicated team that scours the internet, partners with brands, and tracks flash sales to bring you the best prices. Our team works around the clock to ensure you never miss a great deal.' 
        },
        { 
            q: 'Are the deals really verified?', 
            a: 'Yes! Every deal is manually verified before being posted to ensure authenticity. We test each coupon code and check product availability before sharing with our community.' 
        },
        { 
            q: 'How can I submit a deal I found?', 
            a: 'You can email us at help@siddudeals.online or use the contact form on this page! We love hearing from our community and will review your submission within 24 hours.' 
        },
        { 
            q: 'How quickly do you respond to inquiries?', 
            a: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please mention "URGENT" in your subject line and we\'ll prioritize your request.' 
        },
    ];

    // Color scheme
    const colors = {
        primary: '#2563EB',
        secondary: '#10B981',
        accent: '#F59E0B',
        dark: '#111827',
        gray: '#6B7280',
        lightBg: '#F9FAFB',
        border: '#E5E7EB',
        white: '#FFFFFF'
    };

    return (
        <div className="page-content" style={{ background: colors.white, minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                padding: '100px 0 80px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
                <div style={{ 
                    position: 'absolute', 
                    top: '-50px', 
                    right: '-50px', 
                    width: '200px', 
                    height: '200px', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '50%' 
                }} />
                <div style={{ 
                    position: 'absolute', 
                    bottom: '-30px', 
                    left: '10%', 
                    width: '150px', 
                    height: '150px', 
                    background: 'rgba(255,255,255,0.08)', 
                    borderRadius: '50%' 
                }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
                            <li className="breadcrumb-item">
                                <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Home</Link>
                            </li>
                            <li className="breadcrumb-item active" style={{ color: colors.white }}>Contact Us</li>
                        </ol>
                    </nav>
                    <div className="row align-items-center">
                        <div className="col-lg-8" style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s ease'
                        }}>
                            <h1 style={{ 
                                color: colors.white, 
                                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                                fontWeight: '700',
                                lineHeight: '1.2',
                                marginBottom: '16px'
                            }}>
                                Get In Touch
                            </h1>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '18px',
                                maxWidth: '500px',
                                lineHeight: '1.6',
                                marginBottom: 0
                            }}>
                                Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section style={{ marginTop: '-40px', position: 'relative', zIndex: 20, padding: '0 15px' }}>
                <div className="container">
                    <div className="row g-4">
                        {/* Email Card */}
                        <div className="col-lg-4 col-md-6">
                            <div style={{
                                background: colors.white,
                                borderRadius: '16px',
                                padding: '32px 24px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                border: `1px solid ${colors.border}`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(37,99,235,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                            }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: `${colors.primary}15`,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <h4 style={{ fontWeight: '600', color: colors.dark, marginBottom: '8px', fontSize: '18px' }}>Email Us</h4>
                                <p style={{ color: colors.gray, fontSize: '14px', marginBottom: '12px' }}>
                                    We'll respond within 24 hours
                                </p>
                                <a href="mailto:help@siddudeals.online" style={{ 
                                    color: colors.primary, 
                                    fontWeight: '600', 
                                    textDecoration: 'none',
                                    fontSize: '15px'
                                }}>
                                    help@siddudeals.online
                                </a>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="col-lg-4 col-md-6">
                            <div style={{
                                background: colors.white,
                                borderRadius: '16px',
                                padding: '32px 24px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                border: `1px solid ${colors.border}`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(16,185,129,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                            }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: `${colors.secondary}15`,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <h4 style={{ fontWeight: '600', color: colors.dark, marginBottom: '8px', fontSize: '18px' }}>Call Us</h4>
                                <p style={{ color: colors.gray, fontSize: '14px', marginBottom: '12px' }}>
                                    Mon-Fri from 9am to 6pm
                                </p>
                                <span style={{ 
                                    color: colors.secondary, 
                                    fontWeight: '600',
                                    fontSize: '15px'
                                }}>
                                    Available via Email
                                </span>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="col-lg-4 col-md-12">
                            <div style={{
                                background: colors.white,
                                borderRadius: '16px',
                                padding: '32px 24px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                border: `1px solid ${colors.border}`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(245,158,11,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                            }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: `${colors.accent}15`,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </div>
                                <h4 style={{ fontWeight: '600', color: colors.dark, marginBottom: '8px', fontSize: '18px' }}>Location</h4>
                                <p style={{ color: colors.gray, fontSize: '14px', marginBottom: '12px' }}>
                                    We operate online
                                </p>
                                <span style={{ 
                                    color: colors.accent, 
                                    fontWeight: '600',
                                    fontSize: '15px'
                                }}>
                                    Worldwide Service
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section style={{ padding: '80px 0', background: colors.white }}>
                <div className="container">
                    <div className="row g-5">
                        {/* Contact Form */}
                        <div className="col-lg-7">
                            <div style={{
                                background: colors.white,
                                borderRadius: '20px',
                                padding: '40px',
                                border: `1px solid ${colors.border}`,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                            }}>
                                {isSubmitted ? (
                                    /* Success State */
                                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: `${colors.secondary}15`,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 24px'
                                        }}>
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.secondary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"/>
                                            </svg>
                                        </div>
                                        <h2 style={{ color: colors.dark, fontWeight: '700', marginBottom: '12px', fontSize: '1.75rem' }}>
                                            Message Sent Successfully!
                                        </h2>
                                        <p style={{ color: colors.gray, fontSize: '16px', maxWidth: '400px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                                            Thank you for reaching out. We'll get back to you at <span style={{ color: colors.primary, fontWeight: '600' }}>help@siddudeals.online</span> within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            style={{
                                                background: colors.primary,
                                                color: colors.white,
                                                padding: '14px 32px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                fontWeight: '600',
                                                fontSize: '15px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#1d4ed8';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = colors.primary;
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    /* Form */
                                    <>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', color: colors.dark }}>
                                            Send Us a Message
                                        </h2>
                                        <p style={{ color: colors.gray, marginBottom: '32px', fontSize: '15px' }}>
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label style={{ fontWeight: '500', marginBottom: '8px', display: 'block', color: colors.dark, fontSize: '14px' }}>
                                                        Your Name <span style={{ color: '#EF4444' }}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="John Doe"
                                                        style={{
                                                            width: '100%',
                                                            padding: '14px 16px',
                                                            borderRadius: '10px',
                                                            border: `1px solid ${colors.border}`,
                                                            fontSize: '15px',
                                                            transition: 'all 0.2s ease',
                                                            outline: 'none',
                                                            background: colors.white,
                                                            color: colors.dark
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = colors.primary;
                                                            e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = colors.border;
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label style={{ fontWeight: '500', marginBottom: '8px', display: 'block', color: colors.dark, fontSize: '14px' }}>
                                                        Your Email <span style={{ color: '#EF4444' }}>*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="john@example.com"
                                                        style={{
                                                            width: '100%',
                                                            padding: '14px 16px',
                                                            borderRadius: '10px',
                                                            border: `1px solid ${colors.border}`,
                                                            fontSize: '15px',
                                                            transition: 'all 0.2s ease',
                                                            outline: 'none',
                                                            background: colors.white,
                                                            color: colors.dark
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = colors.primary;
                                                            e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = colors.border;
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label style={{ fontWeight: '500', marginBottom: '8px', display: 'block', color: colors.dark, fontSize: '14px' }}>
                                                        Subject <span style={{ color: '#EF4444' }}>*</span>
                                                    </label>
                                                    <select
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '14px 16px',
                                                            borderRadius: '10px',
                                                            border: `1px solid ${colors.border}`,
                                                            fontSize: '15px',
                                                            background: colors.white,
                                                            color: formData.subject ? colors.dark : colors.gray,
                                                            outline: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = colors.primary;
                                                            e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = colors.border;
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    >
                                                        <option value="">Select a topic...</option>
                                                        <option value="deal-tip">Submit a Deal Tip</option>
                                                        <option value="partnership">Partnership Inquiry</option>
                                                        <option value="feedback">Feedback</option>
                                                        <option value="support">Support / Issue</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <label style={{ fontWeight: '500', marginBottom: '8px', display: 'block', color: colors.dark, fontSize: '14px' }}>
                                                        Your Message <span style={{ color: '#EF4444' }}>*</span>
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                        rows={5}
                                                        placeholder="Tell us what's on your mind..."
                                                        style={{
                                                            width: '100%',
                                                            padding: '14px 16px',
                                                            borderRadius: '10px',
                                                            border: `1px solid ${colors.border}`,
                                                            fontSize: '15px',
                                                            resize: 'vertical',
                                                            outline: 'none',
                                                            background: colors.white,
                                                            color: colors.dark,
                                                            fontFamily: 'inherit',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = colors.primary;
                                                            e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = colors.border;
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button
                                                        type="submit"
                                                        style={{
                                                            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                                                            color: colors.white,
                                                            padding: '16px 40px',
                                                            borderRadius: '10px',
                                                            border: 'none',
                                                            fontWeight: '600',
                                                            fontSize: '16px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(37,99,235,0.4)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(37,99,235,0.3)';
                                                        }}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="22" y1="2" x2="11" y2="13"/>
                                                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                                        </svg>
                                                        Send Message
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="col-lg-5">
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', color: colors.dark }}>
                                Frequently Asked Questions
                            </h3>
                            <p style={{ color: colors.gray, marginBottom: '24px', fontSize: '15px' }}>
                                Find answers to common questions below.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {faqs.map((faq, index) => (
                                    <div 
                                        key={index}
                                        style={{
                                            background: colors.white,
                                            borderRadius: '12px',
                                            border: `1px solid ${openFaq === index ? colors.primary : colors.border}`,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <button
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                            style={{
                                                width: '100%',
                                                padding: '18px 20px',
                                                background: 'transparent',
                                                border: 'none',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                textAlign: 'left'
                                            }}
                                        >
                                            <span style={{ fontWeight: '600', color: colors.dark, fontSize: '15px', paddingRight: '16px' }}>
                                                {faq.q}
                                            </span>
                                            <svg 
                                                width="20" 
                                                height="20" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke={colors.primary}
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                                style={{
                                                    transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                                                    transition: 'transform 0.3s ease',
                                                    flexShrink: 0
                                                }}
                                            >
                                                <polyline points="6 9 12 15 18 9"/>
                                            </svg>
                                        </button>
                                        <div style={{
                                            maxHeight: openFaq === index ? '200px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease'
                                        }}>
                                            <p style={{ 
                                                color: colors.gray, 
                                                margin: 0, 
                                                padding: '0 20px 18px',
                                                fontSize: '14px', 
                                                lineHeight: '1.7' 
                                            }}>
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Contact Box */}
                            <div style={{
                                background: colors.lightBg,
                                borderRadius: '16px',
                                padding: '28px',
                                marginTop: '24px',
                                border: `1px solid ${colors.border}`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: `${colors.accent}15`,
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="12" y1="16" x2="12" y2="12"/>
                                            <line x1="12" y1="8" x2="12.01" y2="8"/>
                                        </svg>
                                    </div>
                                    <h6 style={{ fontWeight: '600', margin: 0, color: colors.dark, fontSize: '16px' }}>Need Quick Help?</h6>
                                </div>
                                <p style={{ color: colors.gray, margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                    For the fastest response, email us directly at{' '}
                                    <a href="mailto:help@siddudeals.online" style={{ color: colors.primary, fontWeight: '600', textDecoration: 'none' }}>
                                        help@siddudeals.online
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ 
                background: colors.lightBg,
                padding: '60px 0',
                borderTop: `1px solid ${colors.border}`
            }}>
                <div className="container text-center">
                    <h3 style={{ color: colors.dark, fontWeight: '700', marginBottom: '12px', fontSize: '1.5rem' }}>
                        Want to Partner With Us?
                    </h3>
                    <p style={{ color: colors.gray, marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px', fontSize: '15px' }}>
                        Brands and retailers — let's bring exclusive deals to our community together!
                    </p>
                    <a href="mailto:help@siddudeals.online" style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                        color: colors.white,
                        padding: '14px 32px',
                        borderRadius: '10px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                        transition: 'all 0.3s ease',
                        fontSize: '15px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(37,99,235,0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(37,99,235,0.3)';
                    }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Contact Us for Partnerships
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ContactUs1;