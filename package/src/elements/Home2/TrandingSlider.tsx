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
            <div className="text-center py-5">
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px 40px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        border: '3px solid rgba(102, 126, 234, 0.3)',
                        borderTopColor: '#667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '500' }}>Loading amazing deals...</span>
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
            <div className="text-center py-5">
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>No deals available right now</p>
            </div>
        );
    }
    
    return (
        <>
            <Swiper 
                slidesPerView={4}
                speed={1000}
                loop={recentProducts.length > 4}
                parallax={true}            
                spaceBetween={24}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                navigation={{
                    nextEl: ".tranding-button-next",
                    prevEl: ".tranding-button-prev",
                }}
                modules={[Autoplay, Navigation]}
                breakpoints={{
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    591: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    340: {
                        slidesPerView: 1,
                        spaceBetween: 12,
                    },
                }}
                className="swiper-four"
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
                                        background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        border: isHovered ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: isHovered 
                                            ? '0 20px 60px rgba(102, 126, 234, 0.3), 0 0 30px rgba(102, 126, 234, 0.15)' 
                                            : '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Discount Badge */}
                                    {hasDiscount && (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '12px',
                                                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                                                color: '#000',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                zIndex: 10,
                                                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                                                animation: isHovered ? 'badge-bounce 0.6s ease' : 'none'
                                            }}
                                        >
                                            🔥 {discountPercent}% OFF
                                        </div>
                                    )}
                                    
                                    {/* Image Container */}
                                    <div 
                                        style={{ 
                                            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                                            padding: '20px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {/* Glow Effect */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '100px',
                                            height: '100px',
                                            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
                                            filter: 'blur(30px)',
                                            opacity: isHovered ? 1 : 0.3,
                                            transition: 'opacity 0.4s ease'
                                        }}></div>
                                        
                                        <img 
                                            src={product.image_url || '/placeholder.png'} 
                                            alt={product.title}
                                            style={{ 
                                                width: '100%', 
                                                height: '180px',
                                                objectFit: 'contain',
                                                position: 'relative',
                                                zIndex: 2,
                                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                                transition: 'transform 0.4s ease'
                                            }} 
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div style={{ padding: '16px' }}>
                                        {/* Category Badge */}
                                        <span 
                                            style={{
                                                display: 'inline-block',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: '#fff',
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.65rem',
                                                fontWeight: '500',
                                                marginBottom: '8px'
                                            }}
                                        >
                                            Student Deal
                                        </span>
                                        
                                        {/* Title */}
                                        <h6 style={{ 
                                            color: '#ffffff', 
                                            fontWeight: '600',
                                            margin: '0 0 10px 0',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.4',
                                            minHeight: '2.5em',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical' as const
                                        }}>
                                            {product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}
                                        </h6>
                                        
                                        {/* Pricing */}
                                        <div 
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
                                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                marginBottom: '12px'
                                            }}
                                        >
                                            {hasDiscount ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                    <span style={{ 
                                                        color: 'rgba(255,255,255,0.5)', 
                                                        textDecoration: 'line-through',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                        ₹{formatPrice(product.mrp!)}
                                                    </span>
                                                    <span style={{ 
                                                        color: '#10b981', 
                                                        fontWeight: '700',
                                                        fontSize: '1.2rem',
                                                        textShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                                                    }}>
                                                        ₹{formatPrice(product.discounted_price!)}
                                                    </span>
                                                </div>
                                            ) : product.discounted_price || product.mrp ? (
                                                <span style={{ 
                                                    color: '#10b981', 
                                                    fontWeight: '700',
                                                    fontSize: '1.2rem'
                                                }}>
                                                    ₹{formatPrice(product.discounted_price || product.mrp || 0)}
                                                </span>
                                            ) : (
                                                <span style={{ color: '#10b981', fontWeight: '600' }}>View Price</span>
                                            )}
                                        </div>
                                        
                                        {/* CTA Button */}
                                        <div 
                                            style={{
                                                background: isHovered 
                                                    ? 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' 
                                                    : 'rgba(255,255,255,0.1)',
                                                border: isHovered ? 'none' : '1px solid rgba(255,255,255,0.2)',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                fontSize: '0.85rem',
                                                color: '#ffffff',
                                                transition: 'all 0.3s ease',
                                                boxShadow: isHovered ? '0 5px 20px rgba(244, 63, 94, 0.4)' : 'none'
                                            }}
                                        >
                                            {isHovered ? '🚀 Get This Deal' : 'View Deal'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <div className="tranding-button-prev" style={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
            </div>
            <div className="tranding-button-next" style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="9,6 15,12 9,18"></polyline>
                </svg>
            </div>
            
            <style>{`
                @keyframes badge-bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .tranding-button-prev:hover,
                .tranding-button-next:hover {
                    transform: translateY(-50%) scale(1.1);
                }
            `}</style>
        </>
    )
}