import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useSupabase";
import { useState } from "react";

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
                background: '#ffffff',
                borderRadius: '16px',
                margin: '0 16px'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 32px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: '3px solid #e2e8f0',
                        borderTopColor: '#2563eb',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{ color: '#64748b', fontWeight: '500', fontSize: '14px' }}>Loading deals...</span>
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
                background: '#ffffff',
                borderRadius: '16px',
                margin: '0 16px'
            }}>
                <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>No deals available at the moment</p>
            </div>
        );
    }
    
    return (
        <div style={{ position: 'relative' }}>
            <Swiper 
                slidesPerView={4}
                speed={800}
                loop={recentProducts.length > 4}
                spaceBetween={20}
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
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 16,
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
                                        background: '#ffffff',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: isHovered 
                                            ? '0 20px 40px rgba(0,0,0,0.12)' 
                                            : '0 4px 12px rgba(0,0,0,0.05)',
                                        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {/* Image Container */}
                                    <div 
                                        style={{ 
                                            background: '#f8fafc',
                                            padding: '24px',
                                            position: 'relative',
                                            minHeight: '180px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {/* Discount Badge */}
                                        {hasDiscount && (
                                            <div 
                                                style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    left: '12px',
                                                    background: '#dc2626',
                                                    color: '#ffffff',
                                                    padding: '5px 10px',
                                                    borderRadius: '6px',
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
                                    <div style={{ padding: '16px' }}>
                                        {/* Category Badge */}
                                        <span 
                                            style={{
                                                display: 'inline-block',
                                                background: '#eff6ff',
                                                color: '#2563eb',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            Student Deal
                                        </span>
                                        
                                        {/* Title */}
                                        <h6 style={{ 
                                            color: '#111827', 
                                            fontWeight: '600',
                                            margin: '0 0 12px 0',
                                            fontSize: '14px',
                                            lineHeight: '1.5',
                                            minHeight: '42px',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical' as const
                                        }}>
                                            {product.title.length > 45 ? product.title.substring(0, 45) + '...' : product.title}
                                        </h6>
                                        
                                        {/* Pricing */}
                                        <div 
                                            style={{
                                                background: '#f0fdf4',
                                                border: '1px solid #bbf7d0',
                                                borderRadius: '8px',
                                                padding: '10px',
                                                marginBottom: '12px'
                                            }}
                                        >
                                            {hasDiscount ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                    <span style={{ 
                                                        color: '#9ca3af', 
                                                        textDecoration: 'line-through',
                                                        fontSize: '13px'
                                                    }}>
                                                        ₹{formatPrice(product.mrp!)}
                                                    </span>
                                                    <span style={{ 
                                                        color: '#16a34a', 
                                                        fontWeight: '700',
                                                        fontSize: '18px'
                                                    }}>
                                                        ₹{formatPrice(product.discounted_price!)}
                                                    </span>
                                                </div>
                                            ) : product.discounted_price || product.mrp ? (
                                                <span style={{ 
                                                    color: '#16a34a', 
                                                    fontWeight: '700',
                                                    fontSize: '18px'
                                                }}>
                                                    ₹{formatPrice(product.discounted_price || product.mrp || 0)}
                                                </span>
                                            ) : (
                                                <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px' }}>
                                                    View Price
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* CTA Button */}
                                        <div 
                                            style={{
                                                background: isHovered ? '#2563eb' : '#f3f4f6',
                                                borderRadius: '8px',
                                                padding: '10px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                fontSize: '13px',
                                                color: isHovered ? '#ffffff' : '#374151',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {isHovered ? '🛒 Get This Deal' : 'View Deal'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            
            {/* Navigation Buttons */}
            <div 
                className="tranding-button-prev" 
                style={{
                    position: 'absolute',
                    left: '-16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563eb';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                }}
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    width: '44px',
                    height: '44px',
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563eb';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                }}
            >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}
