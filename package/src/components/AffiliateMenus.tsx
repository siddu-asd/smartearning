import { Link } from "react-router-dom";

/**
 * Affiliate Menu Component
 * Simplified navigation for affiliate catalog website
 * Shop links directly to products page - no submenu
 */
export default function AffiliateMenus() {
  return (
    <ul className="nav navbar-nav">
      {/* Home */}
      <li>
        <Link to="/"><span>Home</span></Link>
      </li>

      {/* Shop - Direct link to all products */}
      <li>
        <Link to="/deals"><span>Deals</span></Link>
      </li>

      {/* Blog */}
      <li>
        <Link to="/blog"><span>Blog</span></Link>
      </li>

      {/* About */}
      <li>
        <Link to="/about"><span>About</span></Link>
      </li>

      {/* Contact */}
      <li>
        <Link to="/contact"><span>Contact</span></Link>
      </li>
    </ul>
  );
}
