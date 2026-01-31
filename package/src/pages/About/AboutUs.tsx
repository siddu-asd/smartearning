import { Link } from "react-router-dom";
import { IMAGES } from "../../constant/theme";

const AboutUs = () => {
    // Team/Stats data
    const stats = [
        { number: '10K+', label: 'Happy Students', icon: '🎓' },
        { number: '500+', label: 'Active Deals', icon: '🔥' },
        { number: '50+', label: 'Partner Brands', icon: '🤝' },
        { number: '₹1Cr+', label: 'Saved by Users', icon: '💰' },
    ];

    const categories = [
        { icon: '💻', name: 'Laptops & Computers', desc: 'Best deals on laptops perfect for studying, coding, and entertainment' },
        { icon: '📱', name: 'Smartphones', desc: 'Affordable mobile phones and accessories for staying connected' },
        { icon: '🎧', name: 'Audio & Headphones', desc: 'Quality headphones and speakers for music and online classes' },
        { icon: '🪑', name: 'Study Furniture', desc: 'Comfortable chairs and desks for long study sessions' },
        { icon: '🏠', name: 'Home Appliances', desc: 'Essential appliances for dorm rooms and apartments' },
        { icon: '📺', name: 'Entertainment', desc: 'TVs, gaming consoles, and streaming devices for downtime' },
    ];

    return (
        <div className="page-content" style={{ background: '#FAFAFA' }}>
            {/* Hero Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '80px 0 100px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-50px', left: '5%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-4 mb-lg-0">
                            <nav aria-label="breadcrumb" className="mb-3">
                                <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
                                    <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
                                    <li className="breadcrumb-item active" style={{ color: '#fff' }}>About Us</li>
                                </ol>
                            </nav>
                            <h1 style={{ 
                                color: '#fff', 
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                                fontWeight: '800',
                                lineHeight: '1.2',
                                marginBottom: '20px'
                            }}>
                                Your Gateway to <br/>
                                <span style={{ color: '#FFD700' }}>Amazing Student Deals</span>
                            </h1>
                            <p style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '18px',
                                marginBottom: '30px',
                                maxWidth: '550px'
                            }}>
                                We find the best discounts so you don't have to. Save big on laptops, mobiles, furniture & more!
                            </p>
                            <Link to="/deals" style={{
                                background: '#FFD700',
                                color: '#000',
                                padding: '15px 35px',
                                borderRadius: '50px',
                                fontWeight: '700',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}>
                                🔥 Browse Deals
                            </Link>
                        </div>
                        <div className="col-lg-5">
                            <img 
                                src={IMAGES.HeroSectionImage} 
                                alt="About StudentCrazyDeals"
                                style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    borderRadius: '24px',
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ marginTop: '-50px', position: 'relative', zIndex: 20, padding: '0 15px' }}>
                <div className="container">
                    <div style={{
                        background: '#fff',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                    }}>
                        <div className="row g-4">
                            {stats.map((stat, index) => (
                                <div className="col-lg-3 col-md-6 col-6" key={index}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>{stat.icon}</span>
                                        <div style={{ 
                                            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
                                            fontWeight: '800',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            {stat.number}
                                        </div>
                                        <div style={{ color: '#666', fontSize: '14px' }}>{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                padding: '8px 20px',
                                borderRadius: '50px',
                                fontSize: '13px',
                                fontWeight: '600',
                                display: 'inline-block',
                                marginBottom: '20px'
                            }}>
                                🎯 OUR MISSION
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '20px' }}>
                                Helping Students <span style={{ color: '#667eea' }}>Save Money</span>
                            </h2>
                            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                                <strong>StudentCrazyDeals</strong> is your trusted source for finding the best deals on products every student needs. We scour the internet to find incredible discounts on tech gadgets, study furniture, home appliances, and more.
                            </p>
                            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                                Our mission is simple: help students save money without compromising on quality. Every deal is manually verified to ensure you get genuine discounts.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ color: '#10B981', fontSize: '20px' }}>✓</span>
                                    <span style={{ fontWeight: '600' }}>Verified Deals</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ color: '#10B981', fontSize: '20px' }}>✓</span>
                                    <span style={{ fontWeight: '600' }}>Daily Updates</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <span style={{ color: '#10B981', fontSize: '20px' }}>✓</span>
                                    <span style={{ fontWeight: '600' }}>100% Free</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                                borderRadius: '24px',
                                padding: '40px',
                                position: 'relative'
                            }}>
                                <img 
                                    src={IMAGES.laptopSaleCategory} 
                                    alt="Student Deals" 
                                    style={{ 
                                        width: '100%',
                                        borderRadius: '16px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section style={{ background: '#fff', padding: '80px 0' }}>
                <div className="container">
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
                            🛒 CATEGORIES
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '10px' }}>
                            Deals We Find <span style={{ color: '#667eea' }}>For You</span>
                        </h2>
                        <p style={{ color: '#666' }}>Handpicked offers across categories students need most</p>
                    </div>

                    <div className="row g-4">
                        {categories.map((cat, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div style={{
                                    background: '#FAFAFA',
                                    borderRadius: '20px',
                                    padding: '30px',
                                    height: '100%',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <span style={{ fontSize: '48px', display: 'block', marginBottom: '15px' }}>{cat.icon}</span>
                                    <h5 style={{ fontWeight: '700', marginBottom: '10px' }}>{cat.name}</h5>
                                    <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{cat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800' }}>
                            How It <span style={{ color: '#667eea' }}>Works</span>
                        </h2>
                        <p style={{ color: '#666' }}>Finding your perfect deal is easy</p>
                    </div>

                    <div className="row g-4">
                        {[
                            { step: '01', icon: '🔍', title: 'Browse Deals', desc: 'Explore our curated collection of student-friendly deals across all categories' },
                            { step: '02', icon: '❤️', title: 'Find Your Deal', desc: 'Click on any product that catches your eye to see more details' },
                            { step: '03', icon: '🎉', title: 'Get the Discount', desc: 'Click "Get Deal" and you\'ll be taken directly to the retailer\'s discounted page' },
                        ].map((item, index) => (
                            <div className="col-lg-4" key={index}>
                                <div style={{
                                    background: '#fff',
                                    borderRadius: '20px',
                                    padding: '40px 30px',
                                    textAlign: 'center',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '15px',
                                        left: '20px',
                                        fontSize: '50px',
                                        fontWeight: '900',
                                        color: '#f0f0f0'
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
                                    <h5 style={{ fontWeight: '700', marginBottom: '10px' }}>{item.title}</h5>
                                    <p style={{ color: '#666', margin: 0 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '80px 0'
            }}>
                <div className="container text-center">
                    <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '15px' }}>
                        Ready to Save Money? 💰
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                        Start browsing thousands of deals curated just for students
                    </p>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Link to="/deals" style={{
                            background: '#FFD700',
                            color: '#000',
                            padding: '15px 35px',
                            borderRadius: '50px',
                            fontWeight: '700',
                            textDecoration: 'none'
                        }}>
                            🔥 Explore Deals
                        </Link>
                        <Link to="/contact" style={{
                            background: 'transparent',
                            color: '#fff',
                            padding: '15px 35px',
                            borderRadius: '50px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            border: '2px solid rgba(255,255,255,0.5)'
                        }}>
                            📧 Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;