import { Link } from "react-router-dom";
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
    return (
        <div className="page-content" style={{ background: '#FAFAFA' }}>
            {/* Hero Section */}
            <MainSliderIndex2 />

            {/* Trust Bar */}
            <section style={{ background: '#fff', padding: '25px 0', borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
                        {benefits.map((item, index) => (
                            <div className="col-lg-3 col-md-6 col-6 mb-3 mb-lg-0" key={index}>
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <span style={{ fontSize: '28px' }}>{item.icon}</span>
                                    <div className="text-start">
                                        <h6 style={{ margin: 0, fontWeight: '700', fontSize: '14px' }}>{item.title}</h6>
                                        <small style={{ color: '#666', fontSize: '12px' }}>{item.desc}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    {/* Section Header */}
                    <div className="text-center mb-5">
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
                            🛒 SHOP BY CATEGORY
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>
                            Explore Top <span style={{ color: '#667eea' }}>Deals</span>
                        </h2>
                        <p style={{ color: '#666', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
                            Find the best discounts on everything you need for college life
                        </p>
                    </div>

                    {/* Category Grid */}
                    <div className="row g-4">
                        {categoryDeals.map((cat, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <Link to={cat.link} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: '#fff',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        position: 'relative'
                                    }}
                                    className="category-card"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                                    }}
                                    >
                                        {/* Discount Badge */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: cat.color,
                                            color: '#fff',
                                            padding: '8px 15px',
                                            borderRadius: '10px',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            zIndex: 10
                                        }}>
                                            {cat.discount}
                                        </div>
                                        
                                        {/* Image */}
                                        <div style={{
                                            background: `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}05 100%)`,
                                            padding: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '200px'
                                        }}>
                                            <img 
                                                src={cat.image} 
                                                alt={cat.name}
                                                style={{
                                                    maxHeight: '150px',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Content */}
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <span style={{ fontSize: '30px', display: 'block', marginBottom: '10px' }}>{cat.icon}</span>
                                            <h5 style={{ margin: 0, fontWeight: '700', color: '#333' }}>{cat.name}</h5>
                                            <span style={{ 
                                                color: cat.color, 
                                                fontSize: '13px', 
                                                fontWeight: '600',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                marginTop: '8px'
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
            <section style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '5px' }}>
                                🔥 Trending Now
                            </h2>
                            <p style={{ color: '#666', margin: 0 }}>Most popular deals this week</p>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="tranding-button-prev" style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: '#f5f5f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6"/>
                                </svg>
                            </div>
                            <div className="tranding-button-next" style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
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
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '30px',
                        padding: '60px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative Elements */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            bottom: '-30px',
                            left: '20%',
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%'
                        }}></div>
                        
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '800', marginBottom: '15px' }}>
                                    Never Miss a Deal! 🎉
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '25px', maxWidth: '500px' }}>
                                    Join 10,000+ students who save money with our exclusive deals. 
                                    Get notified about flash sales and limited-time offers!
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <Link to="/deals" style={{
                                        background: '#FFD700',
                                        color: '#000',
                                        padding: '15px 35px',
                                        borderRadius: '50px',
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        🔥 Explore All Deals
                                    </Link>
                                    <Link to="/about" style={{
                                        background: 'transparent',
                                        color: '#fff',
                                        padding: '15px 35px',
                                        borderRadius: '50px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        border: '2px solid rgba(255,255,255,0.5)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 text-center d-none d-lg-block">
                                <div style={{ fontSize: '120px' }}>🛍️</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>
                            How It <span style={{ color: '#667eea' }}>Works</span>
                        </h2>
                        <p style={{ color: '#666', fontSize: '16px' }}>
                            Save money in 3 simple steps
                        </p>
                    </div>
                    
                    <div className="row g-4">
                        {[
                            { step: '01', icon: '🔍', title: 'Browse Deals', desc: 'Explore thousands of verified deals across multiple categories' },
                            { step: '02', icon: '🏷️', title: 'Compare Prices', desc: 'We compare prices from top retailers to find you the best deal' },
                            { step: '03', icon: '💳', title: 'Save Money', desc: 'Click through to the retailer and complete your purchase with exclusive discounts' },
                        ].map((item, index) => (
                            <div className="col-lg-4" key={index}>
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px 30px',
                                    borderRadius: '20px',
                                    background: '#FAFAFA',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        fontSize: '60px',
                                        fontWeight: '900',
                                        color: '#f0f0f0',
                                        lineHeight: 1
                                    }}>
                                        {item.step}
                                    </span>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '35px',
                                        margin: '0 auto 20px'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h4 style={{ fontWeight: '700', marginBottom: '10px' }}>{item.title}</h4>
                                    <p style={{ color: '#666', margin: 0 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ background: '#1a1a2e', padding: '60px 0' }}>
                <div className="container text-center">
                    <h3 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '700', marginBottom: '20px' }}>
                        Ready to Start Saving? 💰
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '25px' }}>
                        Join thousands of students saving money every day
                    </p>
                    <Link to="/deals" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        padding: '18px 45px',
                        borderRadius: '50px',
                        fontWeight: '700',
                        fontSize: '16px',
                        textDecoration: 'none',
                        display: 'inline-block',
                        boxShadow: '0 10px 30px rgba(102,126,234,0.4)'
                    }}>
                        🚀 Start Shopping Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home2;