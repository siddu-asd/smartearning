import { Outlet, Route, Routes } from "react-router-dom";

// Header and Footer
import AffiliateHeader from "../components/AffiliateHeader";
import Footer from "../components/Footer";
import ScrollTop from "../constant/ScrollTop";

// Pages - Only essential affiliate marketing pages
import Home2 from "../pages/Home2";
import ShopPage from "../pages/Shop/ShopPage";
import ShopCategoryPage from "../pages/Shop/ShopCategoryPage";
import ProductDetailPage from "../pages/Shop/ProductDetailPage";
import BlogListPage from "../pages/Blog/BlogListPage";
import BlogDetailPage from "../pages/Blog/BlogDetailPage";
import AboutUs from "../pages/About/AboutUs";
import ContactUs1 from "../pages/Contact/ContactUs1";
import ErrorPage1 from "../pages/Error/ErrorPage1";

/**
 * Simple Affiliate Marketing Router
 * Only essential pages for StudentCrazyDeals
 */
const Index = () => {
  // Main Layout with Header and Footer
  function MainLayout() {
    return (
      <div className="page-wraper">
        <AffiliateHeader />
        <Outlet />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* All Pages use MainLayout */}
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<Home2 />} />

          {/* Deals/Shop Pages */}
          <Route path="/deals" element={<ShopPage />} />
          <Route path="/deals/:categorySlug" element={<ShopCategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />

          {/* Blog Pages */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />

          {/* Info Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs1 />} />

          {/* 404 */}
          <Route path="*" element={<ErrorPage1 />} />
        </Route>
      </Routes>
      <ScrollTop />
    </>
  );
};

export default Index;
