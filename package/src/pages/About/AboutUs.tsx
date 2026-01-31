import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";
import { useEffect, useState, useRef } from "react";

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({ students: 0, deals: 0, brands: 0, saved: 0 });
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setIsVisible(true);
        
        // Intersection Observer for stats section
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
                saved: Math.floor(targets.saved * easeOut * 10) / 10
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
        <div className="page-content" style={{ background: '#FFFFFF' }}>
            {/* Hero Section */}
            <section style={{ 
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                padding: '80px 0 60px',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-100px',
                    left: '-100px',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%'
                }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-8 mx-auto text-center">
                            <nav aria-label="breadcrumb" className="mb-4">
                                <ol className="breadcrumb mb-0 justify-content-center" style={{ background: 'transparent' }}>
                                    <li className="breadcrumb-item">
                                        <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" style={{ color: '#fff' }}>About Us</li>
                                </ol>
                            </nav>
                            
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255,255,255,0.2)',
                                padding: '10px 20px',
                                borderRadius: '50px',
                                marginBottom: '24px',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.6s ease'
                            }}>
                                <span>🎓</span>
                                <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>FOR STUDENTS, BY STUDENTS</span>
                            </div>
                            
                            <h1 style={{ 
                                color: '#fff', 
                                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
                                fontWeight: '800',
                                lineHeight: '1.2',
                                marginBottom: '20px',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.6s ease 0.1s'
                            }}>
                                About StudentCrazyDeals
                            </h1>
                            
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: 'clamp(16px, 2vw, 20px)',
                                marginBottom: '32px',
                                maxWidth: '600px',
                                margin: '0 auto 32px',
                                lineHeight: '1.7',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.6s ease 0.2s'
                            }}>
                                Your one-stop destination for finding the best deals on everything students need - from laptops to furniture!
                            </p>
                            
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.6s ease 0.3s'
                            }}>
                                <Link to="/shop" style={{
                                    background: '#fff',
                                    color: '#2563EB',
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                                }}
                                >
                                    🔥 Browse Deals
                                </Link>
                                <Link to="/contact" style={{
                                    background: 'transparent',
                                    color: '#fff',
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    border: '2px solid rgba(255,255,255,0.5)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.borderColor = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                }}
                                >
                                    📧 Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section style={{ 
                padding: '80px 0',
                background: '#FFFFFF'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div style={{
                                position: 'relative',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(37, 99, 235, 0.15)'
                            }}>
                                <img 
                                    src={IMAGES.AboutPic1} 
                                    alt="Students Shopping" 
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto',
                                        display: 'block'
                                    }} 
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '24px',
                                    left: '24px',
                                    background: '#fff',
                                    padding: '16px 24px',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <span style={{ fontSize: '32px' }}>🎯</span>
                                    <div>
                                        <div style={{ fontWeight: '700', color: '#111827', fontSize: '18px' }}>Since 2023</div>
                                        <div style={{ color: '#6B7280', fontSize: '14px' }}>Helping Students Save</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div style={{ paddingLeft: '20px' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: '#EFF6FF',
                                    padding: '8px 16px',
                                    borderRadius: '50px',
                                    marginBottom: '20px'
                                }}>
                                    <span style={{ color: '#2563EB', fontSize: '14px', fontWeight: '600' }}>WHO WE ARE</span>
                                </div>
                                
                                <h2 style={{ 
                                    color: '#111827', 
                                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                                    fontWeight: '800',
                                    lineHeight: '1.2',
                                    marginBottom: '20px'
                                }}>
                                    Empowering Students to 
                                    <span style={{ color: '#2563EB' }}> Save More</span>
                                </h2>
                                
                                <p style={{ 
                                    color: '#6B7280', 
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    marginBottom: '20px'
                                }}>
                                    StudentCrazyDeals was born from a simple idea: students shouldn't have to break the bank to get quality products. We're a team of passionate deal hunters dedicated to finding the best discounts, offers, and exclusive deals from top brands.
                                </p>
                                
                                <p style={{ 
                                    color: '#6B7280', 
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    marginBottom: '28px'
                                }}>
                                    Whether you're looking for a new laptop, smartphone, furniture for your dorm, or everyday essentials - we've got you covered with verified deals that actually save you money.
                                </p>
                                
                                <div style={{
                                    display: 'flex',
                                    gap: '24px',
                                    flexWrap: 'wrap'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            background: '#10B981',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>
                                        </div>
                                        <span style={{ color: '#111827', fontWeight: '500' }}>Verified Deals</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            background: '#10B981',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>
                                        </div>
                                        <span style={{ color: '#111827', fontWeight: '500' }}>Daily Updates</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            background: '#10B981',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>
                                        </div>
                                        <span style={{ color: '#111827', fontWeight: '500' }}>100% Free</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Counter Section */}
            <section ref={statsRef} style={{ 
                padding: '80px 0',
                background: '#F9FAFB'
            }}>
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8 text-center">
                            <h2 style={{ 
                                color: '#111827', 
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                                fontWeight: '800',
                                marginBottom: '16px'
                            }}>
                                Our Impact in Numbers
                            </h2>
                            <p style={{ 
                                color: '#6B7280', 
                                fontSize: '16px',
                                maxWidth: '500px',
                                margin: '0 auto'
                            }}>
                                Here's what we've achieved together with our amazing community
                            </p>
                        </div>
                    </div>
                    
                    <div className="row">
                        {stats.map((stat, index) => (
                            <div key={index} className="col-6 col-lg-3 mb-4 mb-lg-0">
                                <div style={{
                                    background: '#FFFFFF',
                                    borderRadius: '20px',
                                    padding: '32px 24px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    border: '1px solid #E5E7EB',
                                    transition: 'all 0.3s ease',
                                    opacity: statsVisible ? 1 : 0,
                                    transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transitionDelay: `${index * 0.1}s`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                                }}
                                >
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        background: `${stat.color}15`,
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px',
                                        fontSize: '28px'
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div style={{
                                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                        fontWeight: '800',
                                        color: stat.color,
                                        marginBottom: '8px',
                                        fontFamily: 'system-ui'
                                    }}>
                                        {stat.number}
                                    </div>
                                    <div style={{
                                        color: '#6B7280',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Offer Section */}
            <section style={{ 
                padding: '80px 0',
                background: '#FFFFFF'
            }}>
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8 text-center">
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#F0FDF4',
                                padding: '8px 16px',
                                borderRadius: '50px',
                                marginBottom: '16px'
                            }}>
                                <span style={{ color: '#10B981', fontSize: '14px', fontWeight: '600' }}>CATEGORIES</span>
                            </div>
                            <h2 style={{ 
                                color: '#111827', 
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                                fontWeight: '800',
                                marginBottom: '16px'
                            }}>
                                What We Offer
                            </h2>
                            <p style={{ 
                                color: '#6B7280', 
                                fontSize: '16px',
                                maxWidth: '550px',
                                margin: '0 auto'
                            }}>
                                From tech gadgets to home essentials, we cover all categories that matter to students
                            </p>
                        </div>
                    </div>
                    
                    <div className="row">
                        {categories.map((category, index) => (
                            <div key={index} className="col-md-6 col-lg-4 mb-4">
                                <div style={{
                                    background: '#FFFFFF',
                                    borderRadius: '20px',
                                    padding: '32px',
                                    height: '100%',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    border: '1px solid #E5E7EB',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.borderColor = category.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                                    e.currentTarget.style.borderColor = '#E5E7EB';
                                }}
                                >
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        background: `${category.color}15`,
                                        borderRadius: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '20px',
                                        fontSize: '28px'
                                    }}>
                                        {category.icon}
                                    </div>
                                    <h3 style={{
                                        color: '#111827',
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        marginBottom: '12px'
                                    }}>
                                        {category.name}
                                    </h3>
                                    <p style={{
                                        color: '#6B7280',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        margin: 0
                                    }}>
                                        {category.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section style={{ 
                padding: '80px 0',
                background: '#F9FAFB'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#FEF3C7',
                                padding: '8px 16px',
                                borderRadius: '50px',
                                marginBottom: '16px'
                            }}>
                                <span style={{ color: '#F59E0B', fontSize: '14px', fontWeight: '600' }}>WHY US</span>
                            </div>
                            <h2 style={{ 
                                color: '#111827', 
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                                fontWeight: '800',
                                lineHeight: '1.2',
                                marginBottom: '20px'
                            }}>
                                Why Students 
                                <span style={{ color: '#F59E0B' }}> Love Us</span>
                            </h2>
                            <p style={{ 
                                color: '#6B7280', 
                                fontSize: '16px',
                                lineHeight: '1.8',
                                marginBottom: '28px'
                            }}>
                                We're not just another deals website. We understand student life, student budgets, and student needs. That's why thousands of students trust us for their shopping decisions.
                            </p>
                            <Link to="/shop" style={{
                                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                                color: '#fff',
                                padding: '16px 32px',
                                borderRadius: '12px',
                                fontWeight: '600',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 99, 235, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.3)';
                            }}
                            >
                                Start Saving Now →
                            </Link>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                {whyChooseUs.map((item, index) => (
                                    <div key={index} className="col-sm-6 mb-4">
                                        <div style={{
                                            background: '#FFFFFF',
                                            borderRadius: '20px',
                                            padding: '28px',
                                            height: '100%',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                            border: '1px solid #E5E7EB',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                                        }}
                                        >
                                            <div style={{
                                                fontSize: '36px',
                                                marginBottom: '16px'
                                            }}>
                                                {item.icon}
                                            </div>
                                            <h4 style={{
                                                color: '#111827',
                                                fontSize: '18px',
                                                fontWeight: '700',
                                                marginBottom: '10px'
                                            }}>
                                                {item.title}
                                            </h4>
                                            <p style={{
                                                color: '#6B7280',
                                                fontSize: '14px',
                                                lineHeight: '1.6',
                                                margin: 0
                                            }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ 
                padding: '80px 0',
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-80px',
                    right: '-80px',
                    width: '250px',
                    height: '250px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: '-60px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%'
                }} />
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255,255,255,0.2)',
                                padding: '10px 20px',
                                borderRadius: '50px',
                                marginBottom: '24px'
                            }}>
                                <span>🚀</span>
                                <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>JOIN 50,000+ STUDENTS</span>
                            </div>
                            
                            <h2 style={{ 
                                color: '#fff', 
                                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', 
                                fontWeight: '800',
                                marginBottom: '20px'
                            }}>
                                Ready to Start Saving?
                            </h2>
                            
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '18px',
                                marginBottom: '32px',
                                maxWidth: '500px',
                                margin: '0 auto 32px'
                            }}>
                                Join our community and never miss out on the best deals for students. It's completely free!
                            </p>
                            
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <Link to="/shop" style={{
                                    background: '#fff',
                                    color: '#2563EB',
                                    padding: '18px 36px',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                    transition: 'all 0.3s ease',
                                    fontSize: '16px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                                }}
                                >
                                    🔥 Explore Deals
                                </Link>
                                <Link to="/contact" style={{
                                    background: 'transparent',
                                    color: '#fff',
                                    padding: '18px 36px',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    border: '2px solid rgba(255,255,255,0.5)',
                                    transition: 'all 0.3s ease',
                                    fontSize: '16px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.borderColor = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                }}
                                >
                                    💬 Get in Touch
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