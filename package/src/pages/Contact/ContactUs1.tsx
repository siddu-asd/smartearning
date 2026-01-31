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

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Just show success - no storage
        setIsSubmitted(true);
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const faqs = [
        { q: 'How do you find these deals?', a: 'We have a dedicated team that scours the internet, partners with brands, and tracks flash sales to bring you the best prices.' },
        { q: 'Are the deals really verified?', a: 'Yes! Every deal is manually verified before being posted to ensure authenticity.' },
        { q: 'How can I submit a deal I found?', a: 'You can email us at help@siddudeals.online or use the contact form!' },
    ];

    return (
        <div className="page-content" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                padding: '120px 0 100px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Elements */}
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite' }}></div>
                <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(118,75,162,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite reverse' }}></div>
                
                {/* Grid Pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    opacity: 0.5
                }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
                            <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link></li>
                            <li className="breadcrumb-item active" style={{ color: '#FFD700' }}>Contact Us</li>
                        </ol>
                    </nav>
                    <div className="row align-items-center">
                        <div className="col-lg-8" style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s ease'
                        }}>
                            <h1 style={{ 
                                color: '#fff', 
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                                fontWeight: '900',
                                lineHeight: '1.1',
                                marginBottom: '20px'
                            }}>
                                Let's <span style={{ 
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Connect</span> 👋
                            </h1>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.85)', 
                                fontSize: '18px',
                                maxWidth: '600px',
                                lineHeight: '1.7'
                            }}>
                                Have a deal tip? Questions about a product? Want to partner with us? We'd love to hear from you!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Email Contact Card */}
            <section style={{ marginTop: '-50px', position: 'relative', zIndex: 20, padding: '0 15px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <a 
                                href="mailto:help@siddudeals.online"
                                style={{ textDecoration: 'none', display: 'block' }}
                            >
                                <div style={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '24px',
                                    padding: '40px',
                                    boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    textAlign: 'center'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 35px 100px rgba(102,126,234,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 25px 80px rgba(0,0,0,0.3)';
                                }}
                                >
                                    <div style={{
                                        width: '90px',
                                        height: '90px',
                                        background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '40px',
                                        margin: '0 auto 25px',
                                        boxShadow: '0 10px 40px rgba(102,126,234,0.3)'
                                    }}>
                                        📧
                                    </div>
                                    <h3 style={{ fontWeight: '800', color: '#fff', marginBottom: '10px', fontSize: '1.5rem' }}>Email Us Directly</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '20px' }}>
                                        We typically respond within 24 hours
                                    </p>
                                    <span style={{ 
                                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontWeight: '700',
                                        fontSize: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}>
                                        help@siddudeals.online
                                        <span style={{ color: '#FFD700' }}>→</span>
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form & FAQ */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="row g-5">
                        {/* Contact Form */}
                        <div className="col-lg-7">
                            <div style={{
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '28px',
                                padding: '45px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                            }}>
                                {isSubmitted ? (
                                    /* Success State */
                                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                        <div style={{
                                            width: '100px',
                                            height: '100px',
                                            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '50px',
                                            margin: '0 auto 30px',
                                            animation: 'scaleIn 0.5s ease-out',
                                            boxShadow: '0 20px 50px rgba(17,153,142,0.4)'
                                        }}>
                                            ✓
                                        </div>
                                        <h2 style={{ color: '#fff', fontWeight: '800', marginBottom: '15px', fontSize: '2rem' }}>
                                            Message Sent! 🎉
                                        </h2>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '400px', margin: '0 auto 30px', lineHeight: '1.7' }}>
                                            Thanks for reaching out! We'll get back to you at <span style={{ color: '#FFD700' }}>help@siddudeals.online</span> soon.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: '#fff',
                                                padding: '16px 40px',
                                                borderRadius: '50px',
                                                border: 'none',
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 15px 40px rgba(102,126,234,0.3)'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    /* Form */
                                    <>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                                            padding: '10px 24px',
                                            borderRadius: '50px',
                                            marginBottom: '20px'
                                        }}>
                                            <span>✉️</span>
                                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>SEND MESSAGE</span>
                                        </div>
                                        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '10px', color: '#fff' }}>
                                            Drop Us a <span style={{ 
                                                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text'
                                            }}>Line</span>
                                        </h2>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '30px' }}>
                                            Fill out the form below and we'll get back to you within 24 hours
                                        </p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block', color: 'rgba(255,255,255,0.9)' }}>Your Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="John Doe"
                                                        style={{
                                                            width: '100%',
                                                            padding: '16px 20px',
                                                            borderRadius: '14px',
                                                            border: '2px solid rgba(255,255,255,0.1)',
                                                            fontSize: '15px',
                                                            transition: 'all 0.3s',
                                                            outline: 'none',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            color: '#fff'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = '#667eea';
                                                            e.target.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.2)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block', color: 'rgba(255,255,255,0.9)' }}>Your Email *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="john@example.com"
                                                        style={{
                                                            width: '100%',
                                                            padding: '16px 20px',
                                                            borderRadius: '14px',
                                                            border: '2px solid rgba(255,255,255,0.1)',
                                                            fontSize: '15px',
                                                            transition: 'all 0.3s',
                                                            outline: 'none',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            color: '#fff'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = '#667eea';
                                                            e.target.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.2)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block', color: 'rgba(255,255,255,0.9)' }}>Subject *</label>
                                                    <select
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '16px 20px',
                                                            borderRadius: '14px',
                                                            border: '2px solid rgba(255,255,255,0.1)',
                                                            fontSize: '15px',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            color: formData.subject ? '#fff' : 'rgba(255,255,255,0.5)',
                                                            outline: 'none'
                                                        }}
                                                    >
                                                        <option value="" style={{ background: '#1a1a2e' }}>Select a topic...</option>
                                                        <option value="deal-tip" style={{ background: '#1a1a2e', color: '#fff' }}>🔥 Submit a Deal Tip</option>
                                                        <option value="partnership" style={{ background: '#1a1a2e', color: '#fff' }}>🤝 Partnership Inquiry</option>
                                                        <option value="feedback" style={{ background: '#1a1a2e', color: '#fff' }}>💬 Feedback</option>
                                                        <option value="support" style={{ background: '#1a1a2e', color: '#fff' }}>🆘 Support/Issue</option>
                                                        <option value="other" style={{ background: '#1a1a2e', color: '#fff' }}>📋 Other</option>
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <label style={{ fontWeight: '600', marginBottom: '10px', display: 'block', color: 'rgba(255,255,255,0.9)' }}>Your Message *</label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                        rows={5}
                                                        placeholder="Tell us what's on your mind..."
                                                        style={{
                                                            width: '100%',
                                                            padding: '16px 20px',
                                                            borderRadius: '14px',
                                                            border: '2px solid rgba(255,255,255,0.1)',
                                                            fontSize: '15px',
                                                            resize: 'vertical',
                                                            outline: 'none',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            color: '#fff'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = '#667eea';
                                                            e.target.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.2)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    ></textarea>
                                                </div>
                                                <div className="col-12">
                                                    <button
                                                        type="submit"
                                                        style={{
                                                            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                                            color: '#000',
                                                            padding: '18px 45px',
                                                            borderRadius: '50px',
                                                            border: 'none',
                                                            fontWeight: '800',
                                                            fontSize: '16px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                            boxShadow: '0 15px 40px rgba(255,215,0,0.3)',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '10px'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                                            e.currentTarget.style.boxShadow = '0 25px 50px rgba(255,215,0,0.4)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,215,0,0.3)';
                                                        }}
                                                    >
                                                        🚀 Send Message
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
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                                padding: '10px 24px',
                                borderRadius: '50px',
                                marginBottom: '20px'
                            }}>
                                <span>❓</span>
                                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>FAQ</span>
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '30px', color: '#fff' }}>
                                Common <span style={{ 
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Questions</span>
                            </h3>

                            <div className="d-flex flex-column gap-4">
                                {faqs.map((faq, index) => (
                                    <div 
                                        key={index}
                                        style={{
                                            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '20px',
                                            padding: '25px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateX(10px)';
                                            e.currentTarget.style.borderColor = 'rgba(102,126,234,0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateX(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        }}
                                    >
                                        <h6 style={{ fontWeight: '700', marginBottom: '12px', color: '#fff', fontSize: '16px' }}>
                                            {faq.q}
                                        </h6>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '14px', lineHeight: '1.7' }}>
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                                borderRadius: '20px',
                                padding: '30px',
                                marginTop: '30px',
                                textAlign: 'center',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <span style={{ fontSize: '40px', display: 'block', marginBottom: '15px' }}>💡</span>
                                <h6 style={{ fontWeight: '700', marginBottom: '10px', color: '#fff' }}>Pro Tip!</h6>
                                <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '14px', lineHeight: '1.7' }}>
                                    Email us directly at <span style={{ color: '#FFD700', fontWeight: '600' }}>help@siddudeals.online</span> for fastest response!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                padding: '80px 0',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div className="container text-center">
                    <h3 style={{ color: '#fff', fontWeight: '800', marginBottom: '15px', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                        Want to Partner With Us? 🤝
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                        Brands and retailers - let's bring exclusive deals to students!
                    </p>
                    <a href="mailto:help@siddudeals.online" style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                        color: '#000',
                        padding: '18px 40px',
                        borderRadius: '50px',
                        fontWeight: '800',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 15px 40px rgba(255,215,0,0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(255,215,0,0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,215,0,0.3)';
                    }}
                    >
                        📧 help@siddudeals.online
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ContactUs1;