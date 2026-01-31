import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGES } from "../constant/theme";
import MainSliderIndex2 from "../elements/Home2/MainSliderIndex2";
import TrandingSlider from "../elements/Home2/TrandingSlider";

// Meesho Brand Colors
const MEESHO = {
    pink: '#F43397',
    pinkLight: '#FFF0F7',
    pinkDark: '#D91A7A',
    green: '#00AA4F',
    greenLight: '#E8F8EF',
    gray: '#666666',
    grayLight: '#F5F5F5',
    black: '#333333',
    white: '#FFFFFF',
};

// Category data with Meesho style colors
const categoryDeals = [
    { name: 'Laptops', icon: '💻', discount: 'Up to 40% OFF', image: IMAGES.laptopSaleCategory, link: '/deals/laptop-deals' },
    { name: 'Mobiles', icon: '📱', discount: 'Up to 50% OFF', image: IMAGES.mobileDealsCategory, link: '/deals/mobile-deals' },
    { name: 'Headphones', icon: '🎧', discount: 'Up to 60% OFF', image: IMAGES.headphoneThumbnail, link: '/deals/audio-headphones' },
    { name: 'Appliances', icon: '🏠', discount: 'Up to 45% OFF', image: IMAGES.homeAppliancesCategory, link: '/deals/home-appliances' },
    { name: 'Furniture', icon: '🪑', discount: 'Up to 35% OFF', image: IMAGES.officeChairThumbnail, link: '/deals/study-furniture' },
    { name: 'TVs & More', icon: '📺', discount: 'Up to 55% OFF', image: IMAGES.tvThumbnail, link: '/deals/entertainment' },
];

// Features/Benefits data
const benefits = [
    { icon: '🚚', title: 'Free Delivery', desc: 'On all orders' },
    { icon: '✅', title: 'Verified Deals', desc: '100% authentic' },
    { icon: '💰', title: 'Lowest Prices', desc: 'Best price guarantee' },
    { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free returns' },
];

const Home2 = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="page-content" style={{ background: MEESHO.grayLight }}>
            {/* Hero Section */}
            <MainSliderIndex2 />

            {/* Trust Bar - Meesho Style */}
            <section style={{ 
                background: MEESHO.white,
                padding: '20px 0', 
                borderBottom: `1px solid ${MEESHO.grayLight}`
            }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        {benefits.map((item, index) => (
                            <div 
                                className="col-lg-3 col-md-6 col-6 mb-2 mb-lg-0" 
                                key={index}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                                    transition: `all 0.3s ease ${index * 0.1}s`
                                }}
                            >
                                <div className="d-flex align-items-center gap-2" style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px'
                                }}>
                                    <span style={{ 
                                        fontSize: '24px',
                                        width: '40px',
                                        height: '40px',
                                        background: MEESHO.pinkLight,
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>{item.icon}</span>
                                    <div>
                                        <h6 style={{ margin: 0, fontWeight: '600', fontSize: '13px', color: MEESHO.black }}>{item.title}</h6>
                                        <small style={{ color: MEESHO.gray, fontSize: '11px' }}>{item.desc}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section - Meesho Style */}
            <section style={{ padding: '40px 0', background: MEESHO.grayLight }}>
                <div className="container">
                    {/* Section Header */}
                    <div className="text-center" style={{ marginBottom: '30px' }}>
                        <h2 style={{ 
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                            fontWeight: '700', 
                            marginBottom: '8px',
                            color: MEESHO.black
                        }}>
                            Shop by Category
                        </h2>
                        <p style={{ color: MEESHO.gray, fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                            Find the best deals on everything you need
                        </p>
                    </div>

                    {/* Category Grid - Meesho Style */}
                    <div className="row g-3">
                        {categoryDeals.map((cat, index) => (
                            <div className="col-lg-4 col-md-6 col-6" key={index}>
                                <Link to={cat.link} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: MEESHO.white,
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: `1px solid ${MEESHO.grayLight}`,
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                        {/* Image */}
                                        <div style={{
                                            background: MEESHO.grayLight,
                                            padding: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '140px',
                                            position: 'relative'
                                        }}>
                                            {/* Discount Badge - Meesho Pink */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '8px',
                                                left: '8px',
                                                background: MEESHO.pink,
                                                color: MEESHO.white,
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: '700'
                                            }}>
                                                {cat.discount}
                                            </div>
                                            
                                            <img 
                                                src={cat.image} 
                                                alt={cat.name}
                                                style={{
                                                    maxHeight: '100px',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Content */}
                                        <div style={{ padding: '12px', textAlign: 'center' }}>
                                            <h6 style={{ margin: 0, fontWeight: '600', color: MEESHO.black, fontSize: '14px' }}>{cat.name}</h6>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products Section - Meesho Style */}
            <section style={{ 
                background: MEESHO.white,
                padding: '40px 0',
                borderTop: `1px solid ${MEESHO.grayLight}`,
                borderBottom: `1px solid ${MEESHO.grayLight}`
            }}>
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center" style={{ marginBottom: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', marginBottom: '4px', color: MEESHO.black }}>
                                Trending Deals 🔥
                            </h2>
                            <p style={{ color: MEESHO.gray, margin: 0, fontSize: '14px' }}>Most popular deals this week</p>
                        </div>
                        <Link 
                            to="/deals" 
                            style={{
                                marginTop: '12px',
                                background: MEESHO.pink,
                                color: MEESHO.white,
                                padding: '10px 20px',
                                borderRadius: '6px',
                                fontWeight: '600',
                                fontSize: '13px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = MEESHO.pinkDark;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = MEESHO.pink;
                            }}
                        >
                            View All →
                        </Link>
                    </div>
                    <TrandingSlider />
                </div>
            </section>

            {/* CTA Banner Section - Meesho Pink Theme */}
            <section style={{ padding: '40px 0', background: MEESHO.grayLight }}>
                <div className="container">
                    <div style={{
                        background: `linear-gradient(135deg, ${MEESHO.pink} 0%, ${MEESHO.pinkDark} 100%)`,
                        borderRadius: '12px',
                        padding: 'clamp(24px, 5vw, 40px)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div className="row align-items-center">
                            <div className="col-lg-8 mb-4 mb-lg-0">
                                <h2 style={{ 
                                    color: MEESHO.white, 
                                    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', 
                                    fontWeight: '700', 
                                    marginBottom: '12px',
                                    lineHeight: '1.3'
                                }}>
                                    Never Miss a Deal! 🎉
                                </h2>
                                <p style={{ 
                                    color: 'rgba(255,255,255,0.9)', 
                                    fontSize: '14px', 
                                    marginBottom: '20px', 
                                    maxWidth: '450px',
                                    lineHeight: '1.5'
                                }}>
                                    Join <span style={{ fontWeight: '700' }}>50,000+</span> students saving money with our exclusive deals.
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <Link to="/deals" style={{
                                        background: MEESHO.white,
                                        color: MEESHO.pink,
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '14px',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    >
                                        🔥 Explore Deals
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center d-none d-lg-block">
                                <div style={{ fontSize: '80px' }}>🛍️</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section - Meesho Style */}
            <section style={{ padding: '40px 0', background: MEESHO.white }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '30px' }}>
                        <h2 style={{ 
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                            fontWeight: '700', 
                            marginBottom: '8px',
                            color: MEESHO.black
                        }}>
                            How It Works
                        </h2>
                        <p style={{ color: MEESHO.gray, fontSize: '14px' }}>
                            Save money in 3 simple steps
                        </p>
                    </div>
                    
                    <div className="row g-3">
                        {[
                            { step: '1', icon: '🔍', title: 'Browse Deals', desc: 'Explore verified deals across categories' },
                            { step: '2', icon: '🏷️', title: 'Compare Prices', desc: 'We find the best prices for you' },
                            { step: '3', icon: '💳', title: 'Save Money', desc: 'Complete purchase with discounts' },
                        ].map((item, index) => (
                            <div className="col-lg-4" key={index}>
                                <div style={{
                                    textAlign: 'center',
                                    padding: '30px 20px',
                                    borderRadius: '8px',
                                    background: MEESHO.grayLight,
                                    transition: 'all 0.2s ease',
                                    height: '100%'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        background: MEESHO.pink,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '28px',
                                        margin: '0 auto 16px'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <span style={{
                                        display: 'inline-block',
                                        background: MEESHO.pinkLight,
                                        color: MEESHO.pink,
                                        padding: '3px 10px',
                                        borderRadius: '12px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        marginBottom: '10px'
                                    }}>
                                        STEP {item.step}
                                    </span>
                                    <h5 style={{ fontWeight: '600', marginBottom: '8px', color: MEESHO.black, fontSize: '16px' }}>{item.title}</h5>
                                    <p style={{ color: MEESHO.gray, margin: 0, lineHeight: '1.5', fontSize: '13px' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Meesho Style */}
            <section style={{ 
                background: MEESHO.grayLight,
                padding: '40px 0',
                borderTop: `1px solid ${MEESHO.grayLight}`
            }}>
                <div className="container text-center">
                    <h3 style={{ 
                        color: MEESHO.black, 
                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                        fontWeight: '700', 
                        marginBottom: '10px' 
                    }}>
                        Ready to Start Saving? 💰
                    </h3>
                    <p style={{ color: MEESHO.gray, marginBottom: '20px', maxWidth: '350px', margin: '0 auto 20px', fontSize: '14px' }}>
                        Join thousands of students saving money every day
                    </p>
                    <Link to="/deals" style={{
                        background: MEESHO.pink,
                        color: MEESHO.white,
                        padding: '12px 30px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = MEESHO.pinkDark;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = MEESHO.pink;
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
