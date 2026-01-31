import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useSupabase";
import { useState } from "react";

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

// Format price with commas
const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
};

// Calculate discount percentage
const calculateDiscount = (mrp: number, discounted: number) => {
    return Math.round(((mrp - discounted) / mrp) * 100);
};

export default function TrandingSlider() {
    // Get products from Supabase
    const { products, loading } = useProducts();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    // Get first 8 products for slider
    const recentProducts = products.slice(0, 8);
    
    if (loading) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                background: MEESHO.white,
                borderRadius: '8px',
                margin: '0 16px'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 32px',
                    background: MEESHO.grayLight,
                    borderRadius: '8px'
                }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: `3px solid ${MEESHO.grayLight}`,
                        borderTopColor: MEESHO.pink,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{ color: MEESHO.gray, fontWeight: '500', fontSize: '14px' }}>Loading deals...</span>
                </div>
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }
    
    if (recentProducts.length === 0) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                background: MEESHO.white,
                borderRadius: '8px',
                margin: '0 16px'
            }}>
                <p style={{ color: MEESHO.gray, fontSize: '15px', margin: 0 }}>No deals available at the moment</p>
            </div>
        );
    }
    
    return (
        <div style={{ position: 'relative' }}>
            <Swiper 
                slidesPerView={4}
                speed={800}
                loop={recentProducts.length > 4}
                spaceBetween={16}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                navigation={{
                    nextEl: ".tranding-button-next",
                    prevEl: ".tranding-button-prev",
                }}
                modules={[Autoplay, Navigation]}
                breakpoints={{
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 12,
                    },
                }}
                className="swiper-four"
                style={{ padding: '4px' }}
            >
                {recentProducts.map((product, ind) => {
                    const isHovered = hoveredIndex === ind;
                    const hasDiscount = product.mrp && product.discounted_price && product.mrp > product.discounted_price;
                    const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discounted_price!) : 0;
                    
                    return (
                        <SwiperSlide key={ind}>
                            <Link 
                                to={`/product/${product.slug}`} 
                                style={{ textDecoration: 'none', display: 'block' }}
                                onMouseEnter={() => setHoveredIndex(ind)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div 
                                    style={{ 
                                        background: MEESHO.white,
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: `1px solid ${MEESHO.grayLight}`,
                                        boxShadow: isHovered 
                                            ? '0 4px 16px rgba(0,0,0,0.1)' 
                                            : '0 1px 4px rgba(0,0,0,0.04)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {/* Image Container */}
                                    <div 
                                        style={{ 
                                            background: MEESHO.grayLight,
                                            padding: '16px',
                                            position: 'relative',
                                            aspectRatio: '1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {/* Discount Badge - Meesho Pink */}
                                        {hasDiscount && (
                                            <div 
                                                style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    left: '8px',
                                                    background: MEESHO.pink,
                                                    color: MEESHO.white,
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '700',
                                                    zIndex: 2
                                                }}
                                            >
                                                {discountPercent}% OFF
                                            </div>
                                        )}
                                        
                                        <img 
                                            src={product.image_url || '/placeholder.png'} 
                                            alt={product.title}
                                            style={{ 
                                                maxWidth: '100%', 
                                                maxHeight: '140px',
                                                objectFit: 'contain',
                                                transition: 'transform 0.3s ease',
                                                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                                            }} 
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div style={{ padding: '12px' }}>
                                        {/* Title */}
                                        <h6 style={{ 
                                            color: MEESHO.black, 
                                            fontWeight: '500',
                                            margin: '0 0 8px 0',
                                            fontSize: '14px',
                                            lineHeight: '1.4',
                                            minHeight: '40px',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical' as const
                                        }}>
                                            {product.title.length > 45 ? product.title.substring(0, 45) + '...' : product.title}
                                        </h6>
                                        
                                        {/* Pricing - Meesho Style */}
                                        <div style={{ marginBottom: '8px' }}>
                                            {hasDiscount ? (
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                                    <span style={{ 
                                                        color: MEESHO.black, 
                                                        fontWeight: '700',
                                                        fontSize: '16px'
                                                    }}>
                                                        ₹{formatPrice(product.discounted_price!)}
                                                    </span>
                                                    <span style={{ 
                                                        color: MEESHO.gray, 
                                                        textDecoration: 'line-through',
                                                        fontSize: '13px'
                                                    }}>
                                                        ₹{formatPrice(product.mrp!)}
                                                    </span>
                                                    <span style={{ 
                                                        color: MEESHO.green, 
                                                        fontWeight: '600',
                                                        fontSize: '12px'
                                                    }}>
                                                        {discountPercent}% off
                                                    </span>
                                                </div>
                                            ) : product.discounted_price || product.mrp ? (
                                                <span style={{ 
                                                    color: MEESHO.black, 
                                                    fontWeight: '700',
                                                    fontSize: '16px'
                                                }}>
                                                    ₹{formatPrice(product.discounted_price || product.mrp || 0)}
                                                </span>
                                            ) : (
                                                <span style={{ color: MEESHO.pink, fontWeight: '600', fontSize: '14px' }}>
                                                    View Price
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Free Delivery Badge */}
                                        <span style={{ 
                                            color: MEESHO.green, 
                                            fontSize: '12px', 
                                            fontWeight: '500'
                                        }}>
                                            🚚 Free Delivery
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            
            {/* Navigation Buttons - Meesho Pink */}
            <div 
                className="tranding-button-prev" 
                style={{
                    position: 'absolute',
                    left: '-16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    background: MEESHO.white,
                    border: `1px solid ${MEESHO.grayLight}`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = MEESHO.pink;
                    e.currentTarget.style.color = MEESHO.white;
                    e.currentTarget.style.borderColor = MEESHO.pink;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = MEESHO.white;
                    e.currentTarget.style.color = MEESHO.gray;
                    e.currentTarget.style.borderColor = MEESHO.grayLight;
                }}
            >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            
            <div 
                className="tranding-button-next" 
                style={{
                    position: 'absolute',
                    right: '-16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    background: MEESHO.white,
                    border: `1px solid ${MEESHO.grayLight}`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = MEESHO.pink;
                    e.currentTarget.style.color = MEESHO.white;
                    e.currentTarget.style.borderColor = MEESHO.pink;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = MEESHO.white;
                    e.currentTarget.style.color = MEESHO.gray;
                    e.currentTarget.style.borderColor = MEESHO.grayLight;
                }}
            >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}
