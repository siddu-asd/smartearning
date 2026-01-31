import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FeaturedSliderData } from '../../constant/Alldata';

const FeaturedCategorySlider = () => {
    return (
        <Swiper 
            slidesPerView = {5}
            spaceBetween = {15}
            loop = {true}                       
            navigation = {{
                nextEl: ".shop-button-next",
                prevEl: ".shop-button-prev",
            }}
            className="swiper-shop"
            modules={[Navigation]}
            breakpoints= {{
                1600: {
                    slidesPerView: 5,
                },
                1400: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 3,
                },
                575: {
                    slidesPerView: 2,
                },
                340: {
                    slidesPerView: 2,
                },
            }}
        >
            {FeaturedSliderData.map(({image, name, link}, ind)=>(
                <SwiperSlide key={ind}>
                    <div className="shop-box style-1 wow fadeInUp" data-wow-delay="0.2s">
                        <Link to={link || '/shop'}>
                            <div className="dz-media">
                                <img src={image} alt={name} style={{ objectFit: 'contain', height: '150px' }} />
                            </div>
                            <h6 className="product-name" style={{ color: '#000', textAlign: 'center', marginTop: '10px' }}>{name}</h6>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default FeaturedCategorySlider;