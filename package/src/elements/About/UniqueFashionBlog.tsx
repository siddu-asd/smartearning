import IMAGES from "../../constant/theme";

const UniqueFashionBlog = () => {
    return (
        <div className="container">
            <div className="row about-style2 align-items-xl-center align-items-start">
                <div className="col-lg-6 col-lg-5 col-sm-5 m-b30 sticky-top">
                    <div className="about-thumb">
                        <img src={IMAGES.MenPng} alt="" />
                    </div>
                </div>
                <div className="col-lg-6 col-md-7 col-sm-7">
                    <div className="about-content">
                        <div className="section-head style-2 d-block">
                            <h3 className="title w-100">Your Smart Student Shopping Destination at Studentcrazydeals</h3>
                            <p>At Studentcrazydeals, we understand the student budget. That's why we hunt down the best deals on electronics, dorm essentials, study supplies, and everything you need for campus life. Our team of student deal hunters curates quality products at prices that won't drain your wallet.</p>
                            <p>Whether you're setting up your first dorm room, looking for a laptop for classes, or just need affordable everyday essentials, we've got you covered. Our easy-to-browse categories and honest product descriptions help you make smart buying decisions without the overwhelm.</p>
                        </div>
                        <div className="about-bx-detail">
                            <div className="about-bx-pic radius">
                                <img src={IMAGES.testimonial4} alt="" />
                            </div>
                            <div>
                                <h6 className="name">Kenneth Fong</h6> 
                                <span className="position">Ceo and founder</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>    
    );
};

export default UniqueFashionBlog;