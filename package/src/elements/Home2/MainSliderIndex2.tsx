import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGES } from "../../constant/theme";

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

/**
 * MainSliderIndex2 - Meesho Style Hero Section
 */
export default function MainSliderIndex2() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const stats = [
        { value: '50K+', label: 'Happy Students', icon: '🎓' },
        { value: '10K+', label: 'Deals Found', icon: '🔥' },
        { value: '80%', label: 'Max Savings', icon: '💰' },
    ];

    return (
        <div 
            className="main-slider style-2" 
            style={{ 
                background: `linear-gradient(135deg, ${MEESHO.pink} 0%, ${MEESHO.pinkDark} 100%)`,
                minHeight: '70vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)
                `
            }} />

            {/* Main Content */}
            <div className="container" style={{ position: 'relative', zIndex: 10, padding: '50px 0' }}>
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                        <div style={{ 
                            opacity: isVisible ? 1 : 0, 
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.5s ease'
                        }}>
                            {/* Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'rgba(255,255,255,0.2)',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                marginBottom: '20px'
                            }}>
                                <span>🔥</span>
                                <span style={{ 
                                    color: MEESHO.white, 
                                    fontSize: '12px', 
                                    fontWeight: '600'
                                }}>
                                    #1 STUDENT DEALS PLATFORM
                                </span>
                            </div>
                            
                            {/* Main Heading */}
                            <h1 style={{ 
                                fontSize: 'clamp(2rem, 5vw, 3rem)', 
                                fontWeight: '700',
                                lineHeight: '1.2',
                                marginBottom: '16px',
                                color: MEESHO.white
                            }}>
                                Save Up To{' '}
                                <span style={{ 
                                    color: '#FFE066',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                }}>80% OFF</span>
                                <br />
                                On Student Essentials
                            </h1>
                            
                            {/* Subtitle */}
                            <p style={{ 
                                fontSize: '16px', 
                                color: 'rgba(255,255,255,0.9)',
                                marginBottom: '24px',
                                maxWidth: '450px',
                                lineHeight: '1.5'
                            }}>
                                Discover amazing deals on laptops, phones, appliances & more. 
                                Free delivery on all orders!
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="d-flex flex-wrap gap-3" style={{ marginBottom: '32px' }}>
                                <Link 
                                    to="/deals" 
                                    style={{
                                        background: MEESHO.white,
                                        color: MEESHO.pink,
                                        padding: '14px 28px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '15px',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    🛒 Shop All Deals
                                </Link>
                                <Link 
                                    to="/about"
                                    style={{
                                        background: 'transparent',
                                        color: MEESHO.white,
                                        padding: '14px 28px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '15px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        border: '2px solid rgba(255,255,255,0.5)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.borderColor = MEESHO.white;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                    }}
                                >
                                    How It Works
                                </Link>
                            </div>
                            
                            {/* Stats */}
                            <div className="d-flex flex-wrap gap-3">
                                {stats.map((stat, index) => (
                                    <div 
                                        key={index}
                                        style={{
                                            textAlign: 'center',
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                                            transition: `all 0.4s ease ${0.2 + index * 0.1}s`
                                        }}
                                    >
                                        <div style={{
                                            background: 'rgba(255,255,255,0.15)',
                                            borderRadius: '8px',
                                            padding: '12px 18px',
                                            minWidth: '90px',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <span style={{ fontSize: '18px', display: 'block', marginBottom: '4px' }}>{stat.icon}</span>
                                            <div style={{ color: MEESHO.white, fontSize: '20px', fontWeight: '700' }}>{stat.value}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: '500' }}>{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Hero Image */}
                    <div className="col-lg-6 col-md-12 d-none d-lg-block">
                        <div style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                            transition: 'all 0.6s ease 0.2s',
                            position: 'relative'
                        }}>
                            {/* Main Image Container */}
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                padding: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <img 
                                    src={IMAGES.laptopSaleCategory || '/placeholder.png'}
                                    alt="Student Deals"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '350px',
                                        objectFit: 'contain'
                                    }}
                                />
                                
                                {/* Floating Deal Badge - Meesho Style */}
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    background: MEESHO.white,
                                    color: MEESHO.pink,
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}>
                                    🔥 -40% OFF
                                </div>

                                {/* Free Delivery Badge */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '16px',
                                    left: '16px',
                                    background: MEESHO.greenLight,
                                    color: MEESHO.green,
                                    padding: '8px 14px',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    🚚 Free Delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
