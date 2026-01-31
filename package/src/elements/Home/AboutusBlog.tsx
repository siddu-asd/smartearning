import { Link } from "react-router-dom";
import IMAGES, { SVGICON } from "../../constant/theme";

const AboutusBlog = () => {
    return (
        <div className="row about-style1">
            <div className="col-lg-6 col-md-12 m-b30">
                <div className="about-thumb wow fadeInUp  position-relative" data-wow-delay="0.2s">
                    <div className="dz-media h-100">	
                        <img src={IMAGES.Womenpng} alt="" />
                    </div>	
                    <Link to="/deals" className="btn btn-outline-secondary btn-light btn-xl">Student Essentials</Link>	
                </div>
            </div>
            <div className="col-lg-6 col-md-12 align-self-center">
                <div className="about-content">
                    <div className="section-head style-1 wow fadeInUp" data-wow-delay="0.4s">
                        <h3 className="title ">Your one-stop shop for student essentials!</h3>
                        <p>From dorm room setups to study gear, we curate the best deals on products every student needs. Save money while getting quality items for college life.</p>
                    </div>
                    <Link to="/about-us" className="service-btn-2 wow fadeInUp" data-wow-delay="0.6s">
                        <span className="icon-wrapper" dangerouslySetInnerHTML={{__html: SVGICON.ArrowUpSvg}}></span>
                    </Link>                    
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="shop-card style-6 wow fadeInUp" data-wow-delay="0.8s">
                                <div className="dz-media">
                                    <img src={IMAGES.productmedium1} alt="image" />
                                </div>
                                <div className="dz-content">
                                    <Link to="/deals" className="btn btn-outline-secondary btn-light btn-md">Study Supplies</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="shop-card style-6 wow fadeInUp" data-wow-delay="1.0s">
                                <div className="dz-media">
                                    <img src={IMAGES.productmedium2} alt="image" />
                                </div>
                                <div className="dz-content">
                                    <Link to="/deals" className="btn btn-outline-secondary btn-light btn-md">Dorm Essentials</Link>
                                </div>
                                <span className="sale-badge">50% <br/>Sale <img src={IMAGES.starpng} alt="" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutusBlog;