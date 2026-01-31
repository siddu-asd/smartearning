import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGES } from "../constant/theme";
import MainSliderIndex2 from "../elements/Home2/MainSliderIndex2";
import TrandingSlider from "../elements/Home2/TrandingSlider";

// Category data for the deals section
const categoryDeals = [
    { name: 'Laptops', icon: '💻', discount: 'Up to 40% OFF', image: IMAGES.laptopSaleCategory, link: '/deals/laptop-deals', color: '#2563eb' },
    { name: 'Mobiles', icon: '📱', discount: 'Up to 50% OFF', image: IMAGES.mobileDealsCategory, link: '/deals/mobile-deals', color: '#7c3aed' },
    { name: 'Headphones', icon: '🎧', discount: 'Up to 60% OFF', image: IMAGES.headphoneThumbnail, link: '/deals/audio-headphones', color: '#db2777' },
    { name: 'Appliances', icon: '🏠', discount: 'Up to 45% OFF', image: IMAGES.homeAppliancesCategory, link: '/deals/home-appliances', color: '#ea580c' },
    { name: 'Furniture', icon: '🪑', discount: 'Up to 35% OFF', image: IMAGES.officeChairThumbnail, link: '/deals/study-furniture', color: '#16a34a' },
    { name: 'TVs & More', icon: '📺', discount: 'Up to 55% OFF', image: IMAGES.tvThumbnail, link: '/deals/entertainment', color: '#dc2626' },
];

// Features/Benefits data
const benefits = [
    { icon: '🔥', title: 'Hot Deals Daily', desc: 'New exclusive deals every day' },
    { icon: '✅', title: '100% Verified', desc: 'All deals are manually verified' },
    { icon: '💰', title: 'Best Prices', desc: 'Price comparison across stores' },
    { icon: '🎓', title: 'Student Special', desc: 'Extra discounts for students' },
];

const Home2 = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="page-content" style={{ background: '#f8fafc' }}>
            {/* Hero Section */}
            <MainSliderIndex2 />

            {/* Trust Bar */}
            <section style={{ 
                background: '#ffffff',
                padding: '30px 0', 
                borderBottom: '1px solid #e5e7eb'
            }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        {benefits.map((item, index) => (
                            <div 
                                className="col-lg-3 col-md-6 col-6 mb-3 mb-lg-0" 
                                key={index}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.4s ease ${index * 0.1}s`
                                }}
                            >
                                <div className="d-flex align-items-center gap-3" style={{
                                    padding: '12px 16px',
                                    borderRadius: '12px'
                                }}>
                                    <span style={{ 
                                        fontSize: '28px',
                                        width: '48px',
                                        height: '48px',
                                        background: '#f8fafc',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>{item.icon}</span>
                                    <div>
                                        <h6 style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#111827' }}>{item.title}</h6>
                                        <small style={{ color: '#6b7280', fontSize: '12px' }}>{item.desc}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section style={{ padding: '60px 0', background: '#f8fafc' }}>
                <div className="container">
                    {/* Section Header */}
                    <div className="text-center" style={{ marginBottom: '40px' }}>
                        <span style={{ 
                            display: 'inline-block',
                            background: '#eff6ff',
                            color: '#2563eb',
                            padding: '8px 20px',
                            borderRadius: '50px',
                            fontSize: '13px',
                            fontWeight: '600',
                            marginBottom: '16px',
                            letterSpacing: '0.5px'
                        }}>
                            SHOP BY CATEGORY
                        </span>
                        <h2 style={{ 
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                            fontWeight: '800', 
                            marginBottom: '12px',
                            color: '#111827'
                        }}>
                            Explore Top Deals
                        </h2>
                        <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '450px', margin: '0 auto' }}>
                            Find the best discounts on everything you need for college life
                        </p>
                    </div>

                    {/* Category Grid */}
                    <div className="row g-4">
                        {categoryDeals.map((cat, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <Link to={cat.link} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: '#ffffff',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '1px solid #e5e7eb',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                        {/* Image */}
                                        <div style={{
                                            background: '#f8fafc',
                                            padding: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '180px',
                                            position: 'relative'
                                        }}>
                                            {/* Discount Badge */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                background: cat.color,
                                                color: '#fff',
                                                padding: '6px 14px',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: '700'
                                            }}>
                                                {cat.discount}
                                            </div>
                                            
                                            <img 
                                                src={cat.image} 
                                                alt={cat.name}
                                                style={{
                                                    maxHeight: '130px',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Content */}
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>{cat.icon}</span>
                                            <h5 style={{ margin: 0, fontWeight: '700', color: '#111827', fontSize: '18px' }}>{cat.name}</h5>
                                            <span style={{ 
                                                color: '#2563eb', 
                                                fontSize: '14px', 
                                                fontWeight: '600',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                marginTop: '10px'
                                            }}>
                                                Shop Now →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products Section */}
            <section style={{ 
                background: '#ffffff',
                padding: '60px 0',
                borderTop: '1px solid #e5e7eb',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center" style={{ marginBottom: '30px' }}>
                        <div>
                            <span style={{ 
                                display: 'inline-block',
                                background: '#fef2f2',
                                color: '#dc2626',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                marginBottom: '12px'
                            }}>
                                🔥 HOT RIGHT NOW
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '4px', color: '#111827' }}>
                                Trending Deals
                            </h2>
                            <p style={{ color: '#6b7280', margin: 0, fontSize: '15px' }}>Most popular deals this week</p>
                        </div>
                        <Link 
                            to="/deals" 
                            style={{
                                marginTop: '16px',
                                background: '#2563eb',
                                color: '#fff',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '14px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#1d4ed8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#2563eb';
                            }}
                        >
                            View All Deals →
                        </Link>
                    </div>
                    <TrandingSlider />
                </div>
            </section>

            {/* CTA Banner Section */}
            <section style={{ padding: '60px 0', background: '#f8fafc' }}>
                <div className="container">
                    <div style={{
                        background: '#2563eb',
                        borderRadius: '20px',
                        padding: 'clamp(30px, 5vw, 50px)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8 mb-4 mb-lg-0">
                                <h2 style={{ 
                                    color: '#fff', 
                                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', 
                                    fontWeight: '800', 
                                    marginBottom: '16px',
                                    lineHeight: '1.3'
                                }}>
                                    Never Miss a Deal! 🎉
                                </h2>
                                <p style={{ 
                                    color: 'rgba(255,255,255,0.9)', 
                                    fontSize: '16px', 
                                    marginBottom: '24px', 
                                    maxWidth: '500px',
                                    lineHeight: '1.6'
                                }}>
                                    Join <span style={{ fontWeight: '700' }}>50,000+</span> students who save money with our exclusive deals. 
                                    Get notified about flash sales and limited-time offers!
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <Link to="/deals" style={{
                                        background: '#ffffff',
                                        color: '#2563eb',
                                        padding: '14px 28px',
                                        borderRadius: '10px',
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                        🔥 Explore All Deals
                                    </Link>
                                    <Link to="/about" style={{
                                        background: 'transparent',
                                        color: '#fff',
                                        padding: '14px 28px',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        border: '2px solid rgba(255,255,255,0.5)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.borderColor = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                    }}
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center d-none d-lg-block">
                                <div style={{ fontSize: '100px' }}>🛍️</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{ padding: '60px 0', background: '#ffffff' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '40px' }}>
                        <span style={{ 
                            display: 'inline-block',
                            background: '#f0fdf4',
                            color: '#16a34a',
                            padding: '8px 20px',
                            borderRadius: '50px',
                            fontSize: '13px',
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}>
                            ⚡ SIMPLE PROCESS
                        </span>
                        <h2 style={{ 
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                            fontWeight: '800', 
                            marginBottom: '12px',
                            color: '#111827'
                        }}>
                            How It Works
                        </h2>
                        <p style={{ color: '#6b7280', fontSize: '16px' }}>
                            Save money in 3 simple steps
                        </p>
                    </div>
                    
                    <div className="row g-4">
                        {[
                            { step: '01', icon: '🔍', title: 'Browse Deals', desc: 'Explore thousands of verified deals across multiple categories', color: '#2563eb' },
                            { step: '02', icon: '🏷️', title: 'Compare Prices', desc: 'We compare prices from top retailers to find you the best deal', color: '#7c3aed' },
                            { step: '03', icon: '💳', title: 'Save Money', desc: 'Click through to the retailer and complete your purchase with exclusive discounts', color: '#16a34a' },
                        ].map((item, index) => (
                            <div className="col-lg-4" key={index}>
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px 30px',
                                    borderRadius: '16px',
                                    background: '#f8fafc',
                                    border: '1px solid #e5e7eb',
                                    transition: 'all 0.3s ease',
                                    height: '100%'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: item.color,
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '36px',
                                        margin: '0 auto 20px'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <span style={{
                                        display: 'inline-block',
                                        background: `${item.color}15`,
                                        color: item.color,
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        marginBottom: '12px'
                                    }}>
                                        STEP {item.step}
                                    </span>
                                    <h4 style={{ fontWeight: '700', marginBottom: '12px', color: '#111827', fontSize: '20px' }}>{item.title}</h4>
                                    <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6', fontSize: '15px' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ 
                background: '#f8fafc',
                padding: '50px 0',
                borderTop: '1px solid #e5e7eb'
            }}>
                <div className="container text-center">
                    <h3 style={{ 
                        color: '#111827', 
                        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', 
                        fontWeight: '700', 
                        marginBottom: '12px' 
                    }}>
                        Ready to Start Saving? 💰
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                        Join thousands of students saving money every day
                    </p>
                    <Link to="/deals" style={{
                        background: '#2563eb',
                        color: '#fff',
                        padding: '14px 36px',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '15px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1d4ed8';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#2563eb';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                        🚀 Start Shopping Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home2;
