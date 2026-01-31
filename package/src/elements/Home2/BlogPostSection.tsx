import { Link } from "react-router-dom";
import { useBlogs } from "../../hooks/useSupabase";

export default function BlogPostSection(){
    const { blogs, loading } = useBlogs();
    
    // Get first 2 blogs for the home page section
    const featuredBlogs = blogs.slice(0, 2);
    
    if (loading) {
        return (
            <div className="text-center py-4">
                <p className="text-muted">Loading blog posts...</p>
            </div>
        );
    }
    
    if (featuredBlogs.length === 0) {
        return (
            <div className="text-center py-4">
                <p className="text-muted">No blog posts available</p>
            </div>
        );
    }
    
    return(
        <div className="row blog-shap">
            {featuredBlogs.map((blog, i)=>(
                <div className="col-lg-6 col-md-6 col-sm-12 m-b30 wow fadeInUp" data-wow-delay="0.1s" key={i}>
                    <div className={`dz-card blog-half style-6 ${i === 0 ? '' : 'shape2'}`}>
                        <div className="dz-media">
                            {blog.featured_image ? (
                                <img src={blog.featured_image} alt={blog.title} />
                            ) : (
                                <div style={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    height: '200px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ color: 'white', fontSize: '24px' }}>📝</span>
                                </div>
                            )}
                        </div>
                        <div className="dz-info">
                            <div className="dz-meta">
                                <ul>
                                    <li className="post-date">
                                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric', 
                                            year: 'numeric' 
                                        }) : 'Recent'}
                                    </li>
                                </ul>
                            </div>
                            <h4 className="dz-title">
                                <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                            </h4>
                            <Link to={`/blog/${blog.slug}`} className="btn btn-theme text-uppercase">Read more<i className="fa-solid fa-arrow-right"/></Link>
                        </div>
                    </div>
                </div> 
            ))}
        </div>	
    )
}