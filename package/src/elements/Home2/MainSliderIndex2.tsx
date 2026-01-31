import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";

export default function MainSliderIndex2(){
    return(
        <div className="main-slider style-2" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '85vh', position: 'relative', overflow: 'hidden' }}> 
            {/* Decorative Elements */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            
            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="row align-items-center" style={{ minHeight: '70vh' }}>
                    {/* Left Content */}
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                        <div className="wow fadeInLeft" data-wow-delay="0.2s">
                            {/* Badge */}
                            <span style={{ 
                                display: 'inline-block',
                                background: 'rgba(255,255,255,0.2)',
                                color: '#fff',
                                padding: '8px 20px',
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginBottom: '20px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                🎓 #1 Student Deals Platform
                            </span>
                            
                            {/* Main Heading */}
                            <h1 style={{ 
                                color: '#fff', 
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                                fontWeight: '800',
                                lineHeight: '1.1',
                                marginBottom: '20px'
                            }}>
                                Save Up To <br/>
                                <span style={{ 
                                    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>70% OFF</span><br/>
                                on Student Essentials
                            </h1>
                            
                            {/* Subtitle */}
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '18px',
                                marginBottom: '30px',
                                maxWidth: '500px'
                            }}>
                                Laptops, Mobiles, Headphones, Furniture & More. 
                                Exclusive deals curated for college students!
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="d-flex flex-wrap gap-3">
                                <Link 
                                    to="/deals" 
                                    className="btn"
                                    style={{ 
                                        background: '#FFD700',
                                        color: '#000',
                                        padding: '15px 35px',
                                        borderRadius: '50px',
                                        fontWeight: '700',
                                        fontSize: '16px',
                                        boxShadow: '0 10px 30px rgba(255,215,0,0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    🔥 Browse Hot Deals
                                </Link>
                                <Link 
                                    to="/deals/laptop-deals" 
                                    className="btn"
                                    style={{ 
                                        background: 'transparent',
                                        color: '#fff',
                                        padding: '15px 35px',
                                        borderRadius: '50px',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        border: '2px solid rgba(255,255,255,0.5)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    💻 Laptop Deals
                                </Link>
                            </div>
                            
                            {/* Trust Badges */}
                            <div className="d-flex align-items-center gap-4 mt-4">
                                <div className="d-flex align-items-center">
                                    <span style={{ color: '#FFD700', fontSize: '20px', marginRight: '8px' }}>⭐</span>
                                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>10K+ Happy Students</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span style={{ color: '#FFD700', fontSize: '20px', marginRight: '8px' }}>✅</span>
                                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Verified Deals</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Image */}
                    <div className="col-lg-6 col-md-12">
                        <div className="wow fadeInRight" data-wow-delay="0.4s" style={{ position: 'relative' }}>
                            {/* Glow Effect */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                height: '80%',
                                background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                                borderRadius: '50%',
                                filter: 'blur(40px)'
                            }}></div>
                            
                            {/* Hero Image */}
                            <img 
                                src={IMAGES.HeroSectionImage} 
                                alt="Student Deals" 
                                style={{ 
                                    width: '100%',
                                    maxWidth: '550px',
                                    height: 'auto',
                                    display: 'block',
                                    margin: '0 auto',
                                    position: 'relative',
                                    zIndex: 5,
                                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))',
                                    borderRadius: '32px'
                                }}
                            />
                            
                            {/* Floating Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: '#FF4757',
                                color: '#fff',
                                padding: '15px 25px',
                                borderRadius: '15px',
                                fontWeight: '700',
                                fontSize: '18px',
                                boxShadow: '0 10px 30px rgba(255,71,87,0.4)',
                                animation: 'pulse 2s infinite'
                            }}>
                                🔥 HOT
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}
