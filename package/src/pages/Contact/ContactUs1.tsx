import { Link } from "react-router-dom";
import { useState } from "react";

const ContactUs1 = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thanks for reaching out! We\'ll get back to you soon.');
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            description: 'For general inquiries and support',
            value: 'hello@studentcrazydeals.com',
            link: 'mailto:hello@studentcrazydeals.com'
        },
        {
            icon: '💬',
            title: 'WhatsApp',
            description: 'Quick responses during business hours',
            value: '+91 98765 43210',
            link: 'https://wa.me/919876543210'
        },
        {
            icon: '📱',
            title: 'Social Media',
            description: 'Follow us for deal updates',
            value: '@studentcrazydeals',
            link: 'https://instagram.com/studentcrazydeals'
        },
    ];

    const faqs = [
        { q: 'How do you find these deals?', a: 'We have a dedicated team that scours the internet, partners with brands, and tracks flash sales to bring you the best prices.' },
        { q: 'Are the deals really verified?', a: 'Yes! Every deal is manually verified before being posted to ensure authenticity.' },
        { q: 'How can I submit a deal I found?', a: 'You can email us at deals@studentcrazydeals.com or use the contact form below!' },
    ];

    return (
        <div className="page-content" style={{ background: '#FAFAFA' }}>
            {/* Hero Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '80px 0 120px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
                            <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
                            <li className="breadcrumb-item active" style={{ color: '#fff' }}>Contact Us</li>
                        </ol>
                    </nav>
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 style={{ 
                                color: '#fff', 
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                                fontWeight: '800',
                                lineHeight: '1.2',
                                marginBottom: '20px'
                            }}>
                                Let's <span style={{ color: '#FFD700' }}>Connect</span> 👋
                            </h1>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '18px',
                                maxWidth: '600px'
                            }}>
                                Have a deal tip? Questions about a product? Want to partner with us? We'd love to hear from you!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section style={{ marginTop: '-60px', position: 'relative', zIndex: 20, padding: '0 15px' }}>
                <div className="container">
                    <div className="row g-4">
                        {contactMethods.map((method, index) => (
                            <div className="col-lg-4" key={index}>
                                <a 
                                    href={method.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', display: 'block' }}
                                >
                                    <div style={{
                                        background: '#fff',
                                        borderRadius: '20px',
                                        padding: '30px',
                                        height: '100%',
                                        boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        textAlign: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 25px 60px rgba(102,126,234,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.1)';
                                    }}
                                    >
                                        <div style={{
                                            width: '70px',
                                            height: '70px',
                                            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '32px',
                                            margin: '0 auto 20px'
                                        }}>
                                            {method.icon}
                                        </div>
                                        <h5 style={{ fontWeight: '700', color: '#333', marginBottom: '8px' }}>{method.title}</h5>
                                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{method.description}</p>
                                        <span style={{ 
                                            color: '#667eea', 
                                            fontWeight: '600',
                                            fontSize: '15px'
                                        }}>{method.value}</span>
                                    </div>
                                </a>
                            </div>
                        ))}
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
                                background: '#fff',
                                borderRadius: '24px',
                                padding: '40px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
                            }}>
                                <span style={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: '#fff',
                                    padding: '8px 20px',
                                    borderRadius: '50px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    display: 'inline-block',
                                    marginBottom: '15px'
                                }}>
                                    ✉️ SEND MESSAGE
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '10px' }}>
                                    Drop Us a <span style={{ color: '#667eea' }}>Line</span>
                                </h2>
                                <p style={{ color: '#666', marginBottom: '30px' }}>
                                    Fill out the form below and we'll get back to you within 24 hours
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 18px',
                                                    borderRadius: '12px',
                                                    border: '2px solid #eee',
                                                    fontSize: '15px',
                                                    transition: 'border-color 0.3s',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#eee'}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Your Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 18px',
                                                    borderRadius: '12px',
                                                    border: '2px solid #eee',
                                                    fontSize: '15px',
                                                    transition: 'border-color 0.3s',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#eee'}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Subject *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 18px',
                                                    borderRadius: '12px',
                                                    border: '2px solid #eee',
                                                    fontSize: '15px',
                                                    background: '#fff',
                                                    outline: 'none'
                                                }}
                                            >
                                                <option value="">Select a topic...</option>
                                                <option value="deal-tip">🔥 Submit a Deal Tip</option>
                                                <option value="partnership">🤝 Partnership Inquiry</option>
                                                <option value="feedback">💬 Feedback</option>
                                                <option value="support">🆘 Support/Issue</option>
                                                <option value="other">📋 Other</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Your Message *</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                placeholder="Tell us what's on your mind..."
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 18px',
                                                    borderRadius: '12px',
                                                    border: '2px solid #eee',
                                                    fontSize: '15px',
                                                    resize: 'vertical',
                                                    outline: 'none'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#eee'}
                                            ></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: '#fff',
                                                    padding: '16px 40px',
                                                    borderRadius: '50px',
                                                    border: 'none',
                                                    fontWeight: '700',
                                                    fontSize: '16px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                🚀 Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="col-lg-5">
                            <span style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                padding: '8px 20px',
                                borderRadius: '50px',
                                fontSize: '13px',
                                fontWeight: '600',
                                display: 'inline-block',
                                marginBottom: '15px'
                            }}>
                                ❓ FAQ
                            </span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '30px' }}>
                                Common <span style={{ color: '#667eea' }}>Questions</span>
                            </h3>

                            <div className="d-flex flex-column gap-4">
                                {faqs.map((faq, index) => (
                                    <div 
                                        key={index}
                                        style={{
                                            background: '#fff',
                                            borderRadius: '16px',
                                            padding: '25px',
                                            boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <h6 style={{ fontWeight: '700', marginBottom: '10px', color: '#333' }}>
                                            {faq.q}
                                        </h6>
                                        <p style={{ color: '#666', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                                borderRadius: '16px',
                                padding: '25px',
                                marginTop: '30px',
                                textAlign: 'center'
                            }}>
                                <span style={{ fontSize: '32px', display: 'block', marginBottom: '10px' }}>💡</span>
                                <h6 style={{ fontWeight: '700', marginBottom: '8px' }}>Pro Tip!</h6>
                                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                                    Follow us on social media to get instant deal alerts and flash sale notifications!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '60px 0'
            }}>
                <div className="container text-center">
                    <h3 style={{ color: '#fff', fontWeight: '800', marginBottom: '15px' }}>
                        Want to Partner With Us? 🤝
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '25px' }}>
                        Brands and retailers - let's bring exclusive deals to students!
                    </p>
                    <a href="mailto:partnerships@studentcrazydeals.com" style={{
                        background: '#FFD700',
                        color: '#000',
                        padding: '14px 35px',
                        borderRadius: '50px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}>
                        📧 partnerships@studentcrazydeals.com
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ContactUs1;