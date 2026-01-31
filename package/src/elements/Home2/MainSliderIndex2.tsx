import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { IMAGES } from "../../constant/theme";

/**
 * MainSliderIndex2 - Redesigned Hero Section
 * Ultra-modern with stunning animations and particle effects
 */
export default function MainSliderIndex2() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
        
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left - rect.width / 2) / 30,
                    y: (e.clientY - rect.top - rect.height / 2) / 30
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const floatingDeals = [
        { icon: '💻', text: '-40%', delay: '0s', position: { top: '15%', left: '5%' } },
        { icon: '📱', text: '-50%', delay: '0.5s', position: { top: '65%', left: '8%' } },
        { icon: '🎧', text: '-60%', delay: '1s', position: { top: '25%', right: '3%' } },
        { icon: '🪑', text: '-35%', delay: '1.5s', position: { top: '70%', right: '5%' } },
    ];

    const stats = [
        { value: '50K+', label: 'Happy Students', icon: '🎓' },
        { value: '10K+', label: 'Deals Found', icon: '🔥' },
        { value: '70%', label: 'Max Savings', icon: '💰' },
    ];

    return (
        <div 
            ref={heroRef}
            className="main-slider style-2" 
            style={{ 
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Animated Background Elements */}
            <div className="hero-bg-elements" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {/* Animated Gradient Orbs */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(102,126,234,0.4) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 8s ease-in-out infinite',
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(118,75,162,0.4) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 10s ease-in-out infinite reverse',
                    transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
                }} />
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'float 12s ease-in-out infinite',
                    transform: 'translateX(-50%)'
                }} />
                
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

                {/* Floating Deal Badges - Hidden on mobile */}
                <div className="d-none d-lg-block">
                    {floatingDeals.map((deal, index) => (
                        <div 
                            key={index}
                            style={{
                                position: 'absolute',
                                ...deal.position,
                                animation: `float 4s ease-in-out infinite`,
                                animationDelay: deal.delay,
                                zIndex: 5
                            }}
                        >
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                padding: '15px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                border: '1px solid rgba(255,255,255,0.15)',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                            }}>
                                <span style={{ fontSize: '28px' }}>{deal.icon}</span>
                                <span style={{ 
                                    color: '#FFD700', 
                                    fontWeight: '800', 
                                    fontSize: '18px',
                                    textShadow: '0 0 20px rgba(255,215,0,0.5)'
                                }}>{deal.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '40px', paddingBottom: '40px' }}>
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
                        <div style={{ 
                            opacity: isVisible ? 1 : 0, 
                            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                            transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            {/* Animated Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '10px 24px',
                                borderRadius: '50px',
                                marginBottom: '25px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <span style={{ 
                                    animation: 'heartbeat 1.5s ease-in-out infinite',
                                    display: 'inline-block'
                                }}>🔥</span>
                                <span style={{ 
                                    color: '#fff', 
                                    fontSize: '14px', 
                                    fontWeight: '600',
                                    letterSpacing: '1px'
                                }}>
                                    #1 STUDENT DEALS PLATFORM
                                </span>
                            </div>
                            
                            {/* Main Heading with Gradient */}
                            <h1 style={{ 
                                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                                fontWeight: '900',
                                lineHeight: '1.05',
                                marginBottom: '25px',
                                color: '#fff'
                            }}>
                                <span style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s ease 0.1s',
                                    display: 'block'
                                }}>Save Up To</span>
                                <span style={{ 
                                    display: 'block',
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF6B6B 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    backgroundSize: '200% auto',
                                    animation: 'gradientShift 3s ease infinite',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s ease 0.2s',
                                    textShadow: 'none',
                                    filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.3))'
                                }}>
                                    70% OFF
                                </span>
                                <span style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: 'all 0.8s ease 0.3s',
                                    display: 'block'
                                }}>Student Essentials</span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p style={{ 
                                color: 'rgba(255,255,255,0.85)', 
                                fontSize: 'clamp(16px, 2vw, 20px)',
                                marginBottom: '35px',
                                maxWidth: '500px',
                                lineHeight: '1.7',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.8s ease 0.4s'
                            }}>
                                Laptops, Mobiles, Headphones, Furniture & More. 
                                <span style={{ color: '#FFD700', fontWeight: '600' }}> Exclusive deals</span> curated just for college students!
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="d-flex flex-wrap gap-3" style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.8s ease 0.5s'
                            }}>
                                <Link 
                                    to="/deals" 
                                    className="btn-glow"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                        color: '#000',
                                        padding: '18px 40px',
                                        borderRadius: '60px',
                                        fontWeight: '800',
                                        fontSize: '16px',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        boxShadow: '0 15px 40px rgba(255,215,0,0.35)',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        border: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
                                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(255,215,0,0.45)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,215,0,0.35)';
                                    }}
                                >
                                    <span style={{ fontSize: '20px' }}>🔥</span>
                                    Browse Hot Deals
                                </Link>
                                <Link 
                                    to="/deals/laptop-deals" 
                                    style={{ 
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        color: '#fff',
                                        padding: '18px 35px',
                                        borderRadius: '60px',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <span style={{ fontSize: '18px' }}>💻</span>
                                    Laptop Deals
                                </Link>
                            </div>

                            {/* Stats Row */}
                            <div className="d-flex flex-wrap gap-3 gap-md-4 mt-5" style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.8s ease 0.6s'
                            }}>
                                {stats.map((stat, index) => (
                                    <div 
                                        key={index}
                                        style={{
                                            textAlign: 'center',
                                            padding: '12px 16px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            minWidth: '90px',
                                            flex: '1 1 auto'
                                        }}
                                    >
                                        <div style={{ fontSize: '20px', marginBottom: '5px' }}>{stat.icon}</div>
                                        <div style={{ 
                                            color: '#FFD700', 
                                            fontWeight: '800', 
                                            fontSize: 'clamp(18px, 3vw, 24px)',
                                            lineHeight: '1'
                                        }}>{stat.value}</div>
                                        <div style={{ 
                                            color: 'rgba(255,255,255,0.7)', 
                                            fontSize: '11px',
                                            marginTop: '5px'
                                        }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right - Hero Visual */}
                    <div className="col-lg-6 col-md-12">
                        <div style={{ 
                            position: 'relative',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? `translateX(0)` : 'translateX(100px)',
                            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
                        }}>
                            {/* Glow Ring */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '90%',
                                height: '90%',
                                background: 'conic-gradient(from 0deg, transparent, rgba(102,126,234,0.3), transparent, rgba(255,215,0,0.3), transparent)',
                                borderRadius: '50%',
                                animation: 'rotateGlow 8s linear infinite',
                                filter: 'blur(30px)'
                            }} />

                            {/* Main Image Container */}
                            <div style={{
                                position: 'relative',
                                padding: '20px',
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                borderRadius: '40px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.3)'
                            }}>
                                <img 
                                    src={IMAGES.HeroSectionImage} 
                                    alt="Student Deals" 
                                    style={{ 
                                        width: '100%',
                                        maxWidth: '500px',
                                        height: 'auto',
                                        display: 'block',
                                        margin: '0 auto',
                                        borderRadius: '30px',
                                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))'
                                    }}
                                />

                                {/* Hot Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '30px',
                                    right: '30px',
                                    background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
                                    color: '#fff',
                                    padding: '12px 22px',
                                    borderRadius: '50px',
                                    fontWeight: '800',
                                    fontSize: '14px',
                                    boxShadow: '0 10px 30px rgba(255,65,108,0.5)',
                                    animation: 'heartbeat 1.5s ease-in-out infinite',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    letterSpacing: '0.5px'
                                }}>
                                    <span>🔥</span> HOT DEAL
                                </div>

                                {/* Price Badge */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '30px',
                                    left: '30px',
                                    background: 'rgba(0,0,0,0.8)',
                                    backdropFilter: 'blur(10px)',
                                    color: '#fff',
                                    padding: '15px 25px',
                                    borderRadius: '20px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                }}>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '5px' }}>Starting from</div>
                                    <div style={{ 
                                        fontSize: '28px', 
                                        fontWeight: '800',
                                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>₹4,999</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on mobile */}
            <div className="d-none d-md-flex" style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                animation: 'bounce 2s ease-in-out infinite'
            }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', letterSpacing: '2px' }}>SCROLL</span>
                <div style={{
                    width: '24px',
                    height: '40px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '4px',
                        height: '8px',
                        background: '#FFD700',
                        borderRadius: '2px',
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        animation: 'float 1.5s ease-in-out infinite'
                    }} />
                </div>
            </div>
        </div>
    );
}
