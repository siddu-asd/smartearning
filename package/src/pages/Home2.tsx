import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGES } from "../constant/theme";
import MainSliderIndex2 from "../elements/Home2/MainSliderIndex2";
import TrandingSlider from "../elements/Home2/TrandingSlider";

// Category data for the deals section
const categoryDeals = [
    { name: 'Laptops', icon: '💻', discount: 'Up to 40% OFF', image: IMAGES.laptopSaleCategory, link: '/deals/laptop-deals', color: '#4F46E5' },
    { name: 'Mobiles', icon: '📱', discount: 'Up to 50% OFF', image: IMAGES.mobileDealsCategory, link: '/deals/mobile-deals', color: '#7C3AED' },
    { name: 'Headphones', icon: '🎧', discount: 'Up to 60% OFF', image: IMAGES.headphoneThumbnail, link: '/deals/audio-headphones', color: '#EC4899' },
    { name: 'Appliances', icon: '🏠', discount: 'Up to 45% OFF', image: IMAGES.homeAppliancesCategory, link: '/deals/home-appliances', color: '#F59E0B' },
    { name: 'Furniture', icon: '🪑', discount: 'Up to 35% OFF', image: IMAGES.officeChairThumbnail, link: '/deals/study-furniture', color: '#10B981' },
    { name: 'TVs & More', icon: '📺', discount: 'Up to 55% OFF', image: IMAGES.tvThumbnail, link: '/deals/entertainment', color: '#EF4444' },
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
        <div className="page-content" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)' }}>
            {/* Hero Section */}
            <MainSliderIndex2 />

            {/* Trust Bar */}
            <section style={{ 
                background: 'linear-gradient(180deg, #24243e 0%, #0f0c29 100%)',
                padding: '40px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                position: 'relative'
            }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
                        {benefits.map((item, index) => (
                            <div 
                                className="col-lg-3 col-md-6 col-6 mb-4 mb-lg-0" 
                                key={index}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.5s ease ${index * 0.1}s`
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center gap-3" style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    <span style={{ 
                                        fontSize: '32px',
                                        filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.3))'
                                    }}>{item.icon}</span>
                                    <div className="text-start">
                                        <h6 style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#fff' }}>{item.title}</h6>
                                        <small style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{item.desc}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
                {/* Background Decorations */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(118,75,162,0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    {/* Section Header */}
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
                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>SHOP BY CATEGORY</span>
                        </div>
                        <h2 style={{ 
                            fontSize: 'clamp(2rem, 4vw, 3rem)', 
                            fontWeight: '900', 
                            marginBottom: '15px',
                            color: '#fff'
                        }}>
                            Explore Top <span style={{ 
                                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Deals</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
                            Find the best discounts on everything you need for college life
                        </p>
                    </div>

                    {/* Category Grid */}
                    <div className="row g-4">
                        {categoryDeals.map((cat, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <Link to={cat.link} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        position: 'relative'
                                    }}
                                    className="category-card"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = `0 30px 60px rgba(${cat.color === '#4F46E5' ? '79,70,229' : '102,126,234'},0.3)`;
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                    }}
                                    >
                                        {/* Discount Badge */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}cc 100%)`,
                                            color: '#fff',
                                            padding: '10px 18px',
                                            borderRadius: '50px',
                                            fontSize: '12px',
                                            fontWeight: '800',
                                            zIndex: 10,
                                            boxShadow: `0 10px 25px ${cat.color}50`,
                                            animation: 'heartbeat 2s ease-in-out infinite'
                                        }}>
                                            {cat.discount}
                                        </div>
                                        
                                        {/* Image */}
                                        <div style={{
                                            background: `linear-gradient(135deg, ${cat.color}20 0%, ${cat.color}05 100%)`,
                                            padding: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '220px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Glow Effect */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '150px',
                                                height: '150px',
                                                background: `radial-gradient(circle, ${cat.color}30 0%, transparent 70%)`,
                                                filter: 'blur(30px)'
                                            }} />
                                            <img 
                                                src={cat.image} 
                                                alt={cat.name}
                                                style={{
                                                    maxHeight: '160px',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain',
                                                    transition: 'transform 0.4s ease',
                                                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
                                                    position: 'relative',
                                                    zIndex: 5
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Content */}
                                        <div style={{ padding: '25px', textAlign: 'center' }}>
                                            <span style={{ fontSize: '35px', display: 'block', marginBottom: '12px' }}>{cat.icon}</span>
                                            <h5 style={{ margin: 0, fontWeight: '800', color: '#fff', fontSize: '1.2rem' }}>{cat.name}</h5>
                                            <span style={{ 
                                                color: '#FFD700', 
                                                fontSize: '14px', 
                                                fontWeight: '600',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                marginTop: '12px'
                                            }}>
                                                Shop Now 
                                                <span style={{ transition: 'transform 0.3s ease' }}>→</span>
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
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)',
                padding: '100px 0',
                position: 'relative'
            }}>
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-3">
                        <div>
                            <div style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'linear-gradient(135deg, rgba(255,107,107,0.3) 0%, rgba(255,75,43,0.3) 100%)',
                                padding: '10px 24px',
                                borderRadius: '50px',
                                marginBottom: '15px',
                                border: '1px solid rgba(255,107,107,0.2)'
                            }}>
                                <span style={{ animation: 'heartbeat 1s infinite' }}>🔥</span>
                                <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>HOT RIGHT NOW</span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '900', marginBottom: '5px', color: '#fff' }}>
                                Trending <span style={{ 
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Deals</span>
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>Most popular deals this week</p>
                        </div>
                        <div className="d-flex gap-3">
                            <div className="tranding-button-prev" style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                color: '#fff'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6"/>
                                </svg>
                            </div>
                            <div className="tranding-button-next" style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 30px rgba(102,126,234,0.4)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <TrandingSlider />
                </div>
            </section>

            {/* CTA Banner Section */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '32px',
                        padding: 'clamp(40px, 5vw, 80px)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative Elements */}
                        <div style={{
                            position: 'absolute',
                            top: '-80px',
                            right: '-80px',
                            width: '300px',
                            height: '300px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-50px',
                            left: '15%',
                            width: '150px',
                            height: '150px',
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: '50%'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            left: '5%',
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255,215,0,0.2)',
                            borderRadius: '50%',
                            filter: 'blur(40px)'
                        }} />
                        
                        <div className="row align-items-center" style={{ position: 'relative', zIndex: 10 }}>
                            <div className="col-lg-8 mb-4 mb-lg-0">
                                <h2 style={{ 
                                    color: '#fff', 
                                    fontSize: 'clamp(1.8rem, 4vw, 3rem)', 
                                    fontWeight: '900', 
                                    marginBottom: '20px',
                                    lineHeight: '1.2'
                                }}>
                                    Never Miss a Deal! 🎉
                                </h2>
                                <p style={{ 
                                    color: 'rgba(255,255,255,0.9)', 
                                    fontSize: 'clamp(16px, 2vw, 20px)', 
                                    marginBottom: '30px', 
                                    maxWidth: '550px',
                                    lineHeight: '1.7'
                                }}>
                                    Join <span style={{ color: '#FFD700', fontWeight: '700' }}>50,000+</span> students who save money with our exclusive deals. 
                                    Get notified about flash sales and limited-time offers!
                                </p>
                                <div className="d-flex flex-wrap gap-3">
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
                                        🔥 Explore All Deals
                                    </Link>
                                    <Link to="/about" style={{
                                        background: 'rgba(255,255,255,0.15)',
                                        backdropFilter: 'blur(10px)',
                                        color: '#fff',
                                        padding: '18px 35px',
                                        borderRadius: '50px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'inline-block',
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
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center d-none d-lg-block">
                                <div style={{ 
                                    fontSize: '140px',
                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                                    animation: 'float 3s ease-in-out infinite'
                                }}>🛍️</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{ padding: '100px 0', position: 'relative' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <div style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, rgba(17,153,142,0.3) 0%, rgba(56,239,125,0.3) 100%)',
                            padding: '10px 24px',
                            borderRadius: '50px',
                            marginBottom: '20px',
                            border: '1px solid rgba(56,239,125,0.2)'
                        }}>
                            <span>⚡</span>
                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>SIMPLE PROCESS</span>
                        </div>
                        <h2 style={{ 
                            fontSize: 'clamp(2rem, 4vw, 3rem)', 
                            fontWeight: '900', 
                            marginBottom: '15px',
                            color: '#fff'
                        }}>
                            How It <span style={{ 
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Works</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>
                            Save money in 3 simple steps
                        </p>
                    </div>
                    
                    <div className="row g-4">
                        {[
                            { step: '01', icon: '🔍', title: 'Browse Deals', desc: 'Explore thousands of verified deals across multiple categories', color: '#667eea' },
                            { step: '02', icon: '🏷️', title: 'Compare Prices', desc: 'We compare prices from top retailers to find you the best deal', color: '#764ba2' },
                            { step: '03', icon: '💳', title: 'Save Money', desc: 'Click through to the retailer and complete your purchase with exclusive discounts', color: '#11998e' },
                        ].map((item, index) => (
                            <div className="col-lg-4" key={index}>
                                <div style={{
                                    textAlign: 'center',
                                    padding: '50px 35px',
                                    borderRadius: '28px',
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                    backdropFilter: 'blur(10px)',
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
                                    {/* Step Number Background */}
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
                                    <h4 style={{ fontWeight: '800', marginBottom: '15px', color: '#fff', fontSize: '1.3rem' }}>{item.title}</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: '1.7' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ 
                background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                padding: '80px 0',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div className="container text-center">
                    <h3 style={{ 
                        color: '#fff', 
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
                        fontWeight: '800', 
                        marginBottom: '15px' 
                    }}>
                        Ready to Start Saving? 💰
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                        Join thousands of students saving money every day
                    </p>
                    <Link to="/deals" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        padding: '20px 50px',
                        borderRadius: '50px',
                        fontWeight: '800',
                        fontSize: '16px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 15px 40px rgba(102,126,234,0.4)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(102,126,234,0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(102,126,234,0.4)';
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