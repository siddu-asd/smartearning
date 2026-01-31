import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import { useEffect, useState } from "react";

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({ students: 0, deals: 0, brands: 0, saved: 0 });
    
    useEffect(() => {
        setIsVisible(true);
        
        // Animate counters
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        
        const targets = { students: 50000, deals: 10000, brands: 100, saved: 5 };
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCounters({
                students: Math.floor(targets.students * progress),
                deals: Math.floor(targets.deals * progress),
                brands: Math.floor(targets.brands * progress),
                saved: Math.floor(targets.saved * progress * 10) / 10
            });
            
            if (step >= steps) clearInterval(timer);
        }, interval);
        
        return () => clearInterval(timer);
    }, []);
    
    // Team/Stats data
    const stats = [
        { number: `${(counters.students / 1000).toFixed(0)}K+`, label: 'Happy Students', icon: '🎓', color: '#667eea' },
        { number: `${(counters.deals / 1000).toFixed(0)}K+`, label: 'Active Deals', icon: '🔥', color: '#EC4899' },
        { number: `${counters.brands}+`, label: 'Partner Brands', icon: '🤝', color: '#F59E0B' },
        { number: `₹${counters.saved}Cr+`, label: 'Saved by Users', icon: '💰', color: '#10B981' },
    ];

    const categories = [
        { icon: '💻', name: 'Laptops & Computers', desc: 'Best deals on laptops perfect for studying, coding, and entertainment', color: '#4F46E5' },
        { icon: '📱', name: 'Smartphones', desc: 'Affordable mobile phones and accessories for staying connected', color: '#7C3AED' },
        { icon: '🎧', name: 'Audio & Headphones', desc: 'Quality headphones and speakers for music and online classes', color: '#EC4899' },
        { icon: '🪑', name: 'Study Furniture', desc: 'Comfortable chairs and desks for long study sessions', color: '#10B981' },
        { icon: '🏠', name: 'Home Appliances', desc: 'Essential appliances for dorm rooms and apartments', color: '#F59E0B' },
        { icon: '📺', name: 'Entertainment', desc: 'TVs, gaming consoles, and streaming devices for downtime', color: '#EF4444' },
    ];

    const whyChooseUs = [
        { icon: '✨', title: 'Curated Deals', desc: 'Every deal is handpicked and verified by our team' },
        { icon: '⚡', title: 'Real-Time Updates', desc: 'New deals added every hour, so you never miss out' },
        { icon: '🛡️', title: '100% Free', desc: 'No hidden fees, no subscriptions, completely free' },
        { icon: '🎯', title: 'Student Focused', desc: 'Products and deals specifically relevant to students' },
    ];

    return (
        <div className="page-content" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)' }}>
            {/* Hero Section */}
            <section style={{ 
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                padding: '100px 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(102,126,234,0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'float 8s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(118,75,162,0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'float 10s ease-in-out infinite reverse'
                }} />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    transform: 'translate(-50%, -50%)'
                }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <nav aria-label="breadcrumb" className="mb-4">
                                <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
                                    <li className="breadcrumb-item">
                                        <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" style={{ color: '#FFD700' }}>About Us</li>
                                </ol>
                            </nav>
                            
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                marginBottom: '25px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.6s ease'
                            }}>
                                <span style={{ animation: 'heartbeat 2s infinite' }}>🚀</span>
                                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>ABOUT STUDENTCRAZYDEALS</span>
                            </div>
                            
                            <h1 style={{ 
                                color: '#fff', 
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                                fontWeight: '900',
                                lineHeight: '1.1',
                                marginBottom: '25px',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.6s ease 0.1s'
                            }}>
                                Your Gateway to <br/>
                                <span style={{ 
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Amazing Student Deals</span>
                            </h1>
                            
                            <p style={{ 
                                color: 'rgba(255,255,255,0.8)', 
                                fontSize: 'clamp(16px, 2vw, 20px)',
                                marginBottom: '35px',
                                maxWidth: '550px',
                                lineHeight: '1.7',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.6s ease 0.2s'
                            }}>
                                We find the best discounts so you don't have to. Save big on laptops, mobiles, furniture & more!
                            </p>
                            
                            <div style={{
                                display: 'flex',
                                gap: '15px',
                                flexWrap: 'wrap',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.6s ease 0.3s'
                            }}>
                                <Link to="/deals" style={{
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
                                    🔥 Browse Deals
                                </Link>
                                <Link to="/contact" style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    color: '#fff',
                                    padding: '18px 35px',
                                    borderRadius: '50px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                }}
                                >
                                    📧 Get in Touch
                                </Link>
                            </div>
                        </div>
                        
                        <div className="col-lg-5">
                            <div style={{
                                position: 'relative',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.9)',
                                transition: 'all 0.8s ease 0.4s'
                            }}>
                                {/* Glow Effect */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100%',
                                    height: '100%',
                                    background: 'radial-gradient(circle, rgba(102,126,234,0.4) 0%, transparent 70%)',
                                    filter: 'blur(50px)',
                                    zIndex: -1
                                }} />
                                
                                {/* Image Container with Glass Effect */}
                                <div style={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '32px',
                                    padding: '20px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
                                }}>
                                    <img 
                                        src={IMAGES.HeroSectionImage} 
                                        alt="About StudentCrazyDeals"
                                        style={{
                                            width: '100%',
                                            maxWidth: '400px',
                                            borderRadius: '20px',
                                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                                        }}
                                    />
                                </div>
                                
                                {/* Floating Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                    color: '#fff',
                                    padding: '15px 25px',
                                    borderRadius: '16px',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    boxShadow: '0 15px 30px rgba(16,185,129,0.4)',
                                    animation: 'float 3s ease-in-out infinite'
                                }}>
                                    100% Verified ✓
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ padding: '80px 0', position: 'relative' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '32px',
                        padding: '50px 40px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative gradient */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #FFD700 100%)'
                        }} />
                        
                        <div className="row g-4">
                            {stats.map((stat, index) => (
                                <div className="col-lg-3 col-md-6 col-6" key={index}>
                                    <div style={{ 
                                        textAlign: 'center',
                                        padding: '20px',
                                        borderRadius: '20px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    >
                                        <span style={{ 
                                            fontSize: '50px', 
                                            display: 'block', 
                                            marginBottom: '15px',
                                            filter: `drop-shadow(0 0 20px ${stat.color}50)`
                                        }}>{stat.icon}</span>
                                        <div style={{ 
                                            fontSize: 'clamp(2rem, 4vw, 3rem)', 
                                            fontWeight: '900',
                                            background: `linear-gradient(135deg, ${stat.color} 0%, #fff 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            marginBottom: '5px'
                                        }}>
                                            {stat.number}
                                        </div>
                                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: '500' }}>{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
                {/* Background Decoration */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-20%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)'
                }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <div style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                marginBottom: '25px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <span>🎯</span>
                                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>OUR MISSION</span>
                            </div>
                            
                            <h2 style={{ 
                                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                                fontWeight: '900', 
                                marginBottom: '25px',
                                color: '#fff'
                            }}>
                                Helping Students <br/>
                                <span style={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Save Money</span>
                            </h2>
                            
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: '1.9', marginBottom: '20px' }}>
                                <strong style={{ color: '#FFD700' }}>StudentCrazyDeals</strong> is your trusted source for finding the best deals on products every student needs. We scour the internet to find incredible discounts on tech gadgets, study furniture, home appliances, and more.
                            </p>
                            
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: '1.9', marginBottom: '35px' }}>
                                Our mission is simple: help students save money without compromising on quality. Every deal is manually verified to ensure you get genuine discounts.
                            </p>
                            
                            <div className="d-flex flex-wrap gap-4">
                                {[{ text: 'Verified Deals', icon: '✓' }, { text: 'Daily Updates', icon: '✓' }, { text: '100% Free', icon: '✓' }].map((item, i) => (
                                    <div key={i} className="d-flex align-items-center gap-3" style={{
                                        background: 'rgba(16,185,129,0.1)',
                                        padding: '12px 20px',
                                        borderRadius: '50px',
                                        border: '1px solid rgba(16,185,129,0.2)'
                                    }}>
                                        <span style={{ 
                                            color: '#10B981', 
                                            fontSize: '18px',
                                            fontWeight: '700'
                                        }}>{item.icon}</span>
                                        <span style={{ fontWeight: '600', color: '#fff' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <div style={{
                                position: 'relative'
                            }}>
                                {/* Glow */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80%',
                                    height: '80%',
                                    background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)',
                                    filter: 'blur(50px)',
                                    zIndex: -1
                                }} />
                                
                                <div style={{
                                    background: 'linear-gradient(145deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.1) 100%)',
                                    borderRadius: '32px',
                                    padding: '40px',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <img 
                                        src={IMAGES.laptopSaleCategory} 
                                        alt="Student Deals" 
                                        style={{ 
                                            width: '100%',
                                            borderRadius: '20px',
                                            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section style={{ 
                padding: '100px 0',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)'
            }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <div style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(239,68,68,0.3) 100%)',
                            padding: '10px 24px',
                            borderRadius: '50px',
                            marginBottom: '20px',
                            border: '1px solid rgba(236,72,153,0.2)'
                        }}>
                            <span>💎</span>
                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>WHY CHOOSE US</span>
                        </div>
                        <h2 style={{ 
                            fontSize: 'clamp(2rem, 4vw, 3rem)', 
                            fontWeight: '900', 
                            marginBottom: '15px',
                            color: '#fff'
                        }}>
                            What Makes Us <span style={{ 
                                background: 'linear-gradient(135deg, #EC4899 0%, #EF4444 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Different</span>
                        </h2>
                    </div>
                    
                    <div className="row g-4">
                        {whyChooseUs.map((item, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div style={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                                    borderRadius: '24px',
                                    padding: '40px 30px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    height: '100%',
                                    transition: 'all 0.4s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.borderColor = 'rgba(102,126,234,0.3)';
                                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(102,126,234,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <span style={{ 
                                        fontSize: '50px', 
                                        display: 'block', 
                                        marginBottom: '20px',
                                        filter: 'drop-shadow(0 0 20px rgba(102,126,234,0.5))'
                                    }}>{item.icon}</span>
                                    <h5 style={{ fontWeight: '800', marginBottom: '12px', color: '#fff', fontSize: '1.1rem' }}>{item.title}</h5>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '14px', lineHeight: '1.7' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <div style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                            padding: '10px 24px',
                            borderRadius: '50px',
                            marginBottom: '20px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <span>🛒</span>
                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>CATEGORIES</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '15px', color: '#fff' }}>
                            Deals We Find <span style={{ 
                                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>For You</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>Handpicked offers across categories students need most</p>
                    </div>

                    <div className="row g-4">
                        {categories.map((cat, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div style={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                                    borderRadius: '24px',
                                    padding: '40px 30px',
                                    height: '100%',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'all 0.4s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.borderColor = `${cat.color}50`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                                >
                                    {/* Glow effect */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '100px',
                                        height: '100px',
                                        background: `radial-gradient(circle, ${cat.color}30 0%, transparent 70%)`,
                                        filter: 'blur(30px)'
                                    }} />
                                    
                                    <span style={{ 
                                        fontSize: '60px', 
                                        display: 'block', 
                                        marginBottom: '20px',
                                        filter: `drop-shadow(0 0 15px ${cat.color}50)`,
                                        position: 'relative',
                                        zIndex: 10
                                    }}>{cat.icon}</span>
                                    <h5 style={{ fontWeight: '800', marginBottom: '12px', color: '#fff' }}>{cat.name}</h5>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '14px', lineHeight: '1.7' }}>{cat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{ 
                padding: '100px 0',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)'
            }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <div style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.3) 100%)',
                            padding: '10px 24px',
                            borderRadius: '50px',
                            marginBottom: '20px',
                            border: '1px solid rgba(16,185,129,0.2)'
                        }}>
                            <span>⚡</span>
                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>SIMPLE PROCESS</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', color: '#fff' }}>
                            How It <span style={{ 
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Works</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Finding your perfect deal is easy</p>
                    </div>

                    <div className="row g-4">
                        {[
                            { step: '01', icon: '🔍', title: 'Browse Deals', desc: 'Explore our curated collection of student-friendly deals across all categories', color: '#667eea' },
                            { step: '02', icon: '❤️', title: 'Find Your Deal', desc: 'Click on any product that catches your eye to see more details', color: '#EC4899' },
                            { step: '03', icon: '🎉', title: 'Get the Discount', desc: 'Click "Get Deal" and you\'ll be taken directly to the retailer\'s discounted page', color: '#10B981' },
                        ].map((item, index) => (
                            <div className="col-lg-4" key={index}>
                                <div style={{
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                                    borderRadius: '28px',
                                    padding: '50px 35px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.borderColor = `${item.color}50`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                                >
                                    <span style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '25px',
                                        fontSize: '80px',
                                        fontWeight: '900',
                                        color: 'rgba(255,255,255,0.03)',
                                        lineHeight: 1
                                    }}>
                                        {item.step}
                                    </span>
                                    <div style={{
                                        width: '90px',
                                        height: '90px',
                                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}99 100%)`,
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '40px',
                                        margin: '0 auto 25px',
                                        boxShadow: `0 20px 40px ${item.color}40`,
                                        position: 'relative',
                                        zIndex: 10
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h5 style={{ fontWeight: '800', marginBottom: '15px', color: '#fff', fontSize: '1.3rem' }}>{item.title}</h5>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: '1.7' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '32px',
                        padding: 'clamp(50px, 6vw, 80px)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative Elements */}
                        <div style={{
                            position: 'absolute',
                            top: '-100px',
                            right: '-100px',
                            width: '300px',
                            height: '300px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-80px',
                            left: '10%',
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: '50%'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '30%',
                            left: '5%',
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255,215,0,0.2)',
                            borderRadius: '50%',
                            filter: 'blur(40px)'
                        }} />
                        
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <div style={{ fontSize: '70px', marginBottom: '20px', animation: 'float 3s ease-in-out infinite' }}>💰</div>
                            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '20px' }}>
                                Ready to Save Money?
                            </h2>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                marginBottom: '35px', 
                                maxWidth: '550px', 
                                margin: '0 auto 35px',
                                fontSize: '18px',
                                lineHeight: '1.7'
                            }}>
                                Start browsing thousands of deals curated just for students
                            </p>
                            <div className="d-flex flex-wrap justify-content-center gap-4">
                                <Link to="/deals" style={{
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                    color: '#000',
                                    padding: '20px 45px',
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
                                    🔥 Explore Deals
                                </Link>
                                <Link to="/contact" style={{
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    color: '#fff',
                                    padding: '20px 40px',
                                    borderRadius: '50px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                }}
                                >
                                    📧 Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;