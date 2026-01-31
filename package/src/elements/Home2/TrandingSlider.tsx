import { Autoplay, Navigation } from "swiper/modules";
import {Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useSupabase";

export default function TrandingSlider() {
    // Get products from Supabase
    const { products, loading } = useProducts();
    
    // Get first 8 products for slider
    const recentProducts = products.slice(0, 8);
    
    if (loading || recentProducts.length === 0) {
        return (
            <div className="text-center py-4">
                <p className="text-muted">{loading ? 'Loading deals...' : 'No deals available'}</p>
            </div>
        );
    }
    
    return (
        <Swiper 
            slidesPerView={4}
            speed = {1000}
            loop = {recentProducts.length > 4}
            parallax = {true}            
            spaceBetween = {30}
            autoplay = {{
                delay: 2500,
            }}
            navigation ={{
                nextEl: ".tranding-button-next",
                prevEl: ".tranding-button-prev",
            }}
            modules={[Autoplay, Navigation]}
            breakpoints = {{
                1200: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3,
                },
                591: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                340: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
            }}
            className="swiper-four"
        >
            {recentProducts.map((product, ind)=>(
                <SwiperSlide key={ind}>
                    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                borderRadius: '12px', 
                                overflow: 'hidden',
                                backgroundColor: '#f5f5f5',
                                marginBottom: '12px'
                            }}>
                                <img 
                                    src={product.image_url || '/placeholder.png'} 
                                    alt={product.title}
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }} 
                                />
                            </div>
                            <h6 style={{ 
                                color: '#000', 
                                fontWeight: '600',
                                margin: 0,
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title}
                            </h6>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}                           
        </Swiper>
    )
}