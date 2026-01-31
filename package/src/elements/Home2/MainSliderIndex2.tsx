import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGES } from "../../constant/theme";

/**
 * MainSliderIndex2 - Clean Professional Hero Section
 * Simple, elegant design without overlapping elements
 */
export default function MainSliderIndex2() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const stats = [
        { value: '50K+', label: 'Happy Students', icon: '🎓' },
        { value: '10K+', label: 'Deals Found', icon: '🔥' },
        { value: '70%', label: 'Max Savings', icon: '💰' },
    ];

    return (
        <div 
            className="main-slider style-2" 
            style={{ 
                background: '#2563eb',
                minHeight: '80vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Simple Background Pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
            }} />

            {/* Main Content */}
            <div className="container" style={{ position: 'relative', zIndex: 10, padding: '60px 0' }}>
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
                        <div style={{ 
                            opacity: isVisible ? 1 : 0, 
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.6s ease'
                        }}>
                            {/* Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255,255,255,0.2)',
                                padding: '10px 20px',
                                borderRadius: '50px',
                                marginBottom: '24px'
                            }}>
                                <span>🔥</span>
                                <span style={{ 
                                    color: '#fff', 
                                    fontSize: '13px', 
                                    fontWeight: '600',
                                    letterSpacing: '0.5px'
                                }}>
                                    #1 STUDENT DEALS PLATFORM
                                </span>
                            </div>
                            
                            {/* Main Heading */}
                            <h1 style={{ 
                                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', 
                                fontWeight: '800',
                                lineHeight: '1.15',
                                marginBottom: '20px',
                                color: '#fff'
                            }}>
                                Save Up To{' '}
                                <span style={{ color: '#fbbf24' }}>80% OFF</span>
                                <br />
                                On Student Essentials
                            </h1>
                            
                            {/* Subtitle */}
                            <p style={{ 
                                fontSize: '18px', 
                                color: 'rgba(255,255,255,0.9)',
                                marginBottom: '32px',
                                maxWidth: '480px',
                                lineHeight: '1.6'
                            }}>
                                Discover amazing deals on laptops, phones, appliances, and more. 
                                Curated exclusively for students like you.
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="d-flex flex-wrap gap-3" style={{ marginBottom: '40px' }}>
                                <Link 
                                    to="/deals" 
                                    style={{
                                        background: '#ffffff',
                                        color: '#2563eb',
                                        padding: '16px 32px',
                                        borderRadius: '10px',
                                        fontWeight: '700',
                                        fontSize: '16px',
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
                                    🛒 Shop All Deals
                                </Link>
                                <Link 
                                    to="/about"
                                    style={{
                                        background: 'transparent',
                                        color: '#fff',
                                        padding: '16px 32px',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        fontSize: '16px',
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
                                    How It Works
                                </Link>
                            </div>
                            
                            {/* Stats */}
                            <div className="d-flex flex-wrap gap-4">
                                {stats.map((stat, index) => (
                                    <div 
                                        key={index}
                                        style={{
                                            textAlign: 'center',
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                            transition: `all 0.5s ease ${0.2 + index * 0.1}s`
                                        }}
                                    >
                                        <div style={{
                                            background: 'rgba(255,255,255,0.15)',
                                            borderRadius: '12px',
                                            padding: '16px 24px',
                                            minWidth: '100px'
                                        }}>
                                            <span style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }}>{stat.icon}</span>
                                            <div style={{ color: '#fff', fontSize: '24px', fontWeight: '800' }}>{stat.value}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '500' }}>{stat.label}</div>
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
                            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                            transition: 'all 0.8s ease 0.2s',
                            position: 'relative'
                        }}>
                            {/* Main Image Container */}
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '24px',
                                padding: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <img 
                                    src={IMAGES.laptopSaleCategory || '/placeholder.png'}
                                    alt="Student Deals"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '400px',
                                        objectFit: 'contain'
                                    }}
                                />
                                
                                {/* Floating Deal Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: '#dc2626',
                                    color: '#fff',
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    fontWeight: '700',
                                    fontSize: '18px'
                                }}>
                                    -40% OFF
                                </div>

                                {/* Category Pills */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '20px',
                                    right: '20px',
                                    display: 'flex',
                                    gap: '10px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center'
                                }}>
                                    {['💻 Laptops', '📱 Mobiles', '🎧 Audio', '🪑 Furniture'].map((cat, i) => (
                                        <span 
                                            key={i}
                                            style={{
                                                background: 'rgba(255,255,255,0.9)',
                                                color: '#374151',
                                                padding: '8px 16px',
                                                borderRadius: '50px',
                                                fontSize: '13px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
