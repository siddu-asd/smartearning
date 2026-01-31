import { useParams, Link } from 'react-router-dom';
import CommanBanner from '../../components/CommanBanner';
import AffiliateProductCard from '../../components/AffiliateProductCard';
import { CATEGORIES, getCategoryBySlug } from '../../constant/categories';
import { AffiliateProduct } from '../../constant/affiliateData';
import { useProducts } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

// Map old category names to new IDs
const categoryNameToId: Record<string, string> = {
  'laptops': '1', 'laptop': '1',
  'mobiles': '2', 'mobile': '2', 'phones': '2',
  'appliances': '3', 'home-appliances': '3',
  'laundry': '4',
  'headphones': '5', 'audio': '5',
  'furniture': '6',
  'entertainment': '7', 'electronics': '7', 'other': '7',
};

/**
 * Deals Category Page
 * Displays products filtered by category slug
 * Route: /deals/:categorySlug
 */
export default function ShopCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // Fetch products from Supabase
  const { products: supabaseProducts } = useProducts();
  
  // Find category by slug
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  
  // Transform and filter products
  const categoryProducts: AffiliateProduct[] = supabaseProducts
    .map(p => {
      let categoryId = p.category || 'misc';
      if (categoryId && isNaN(Number(categoryId))) {
        categoryId = categoryNameToId[categoryId.toLowerCase()] || '7';
      }
      const cat = CATEGORIES.find(c => c.id === categoryId);
      
      // Handle different possible field names for prices
      const mrpValue = p.mrp || p.original_price || p.price;
      const discountedValue = p.discounted_price || p.sale_price || p.price;
      
      return {
        id: p.id,
        name: p.title,
        slug: p.slug,
        categoryId: categoryId,
        images: [p.image_url || IMAGES.headphoneThumbnail],
        affiliateUrl: p.affiliate_link,
        shortDescription: `Great deal on ${p.title}!`,
        fullDescription: '',
        pros: [], cons: [],
        buttonText: 'Get Deal',
        metaTitle: p.title,
        metaDescription: '',
        status: 'active' as const,
        createdAt: p.created_at,
        updatedAt: p.created_at,
        category: cat,
        mrp: mrpValue,
        discountedPrice: discountedValue,
      };
    })
    .filter(p => category ? p.categoryId === category.id : true);

  if (!category) {
    return (
      <div className="page-content bg-light">
        <CommanBanner 
          parentText="Home" 
          currentText="Category Not Found" 
          mainText="Category Not Found" 
          image={IMAGES.HeroBanner1} 
        />
        <section className="content-inner text-center">
          <div className="container">
            <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3" />
            <h3>Category not found</h3>
            <p className="text-muted">The category you're looking for doesn't exist.</p>
            <Link to="/deals" className="btn btn-secondary">
              Browse All Deals
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Deals" 
        currentText={category.name} 
        mainText={category.name} 
        image={IMAGES.HeroBanner2} 
      />
      
      <section className="content-inner-3 pt-3">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar - Other Categories */}
            <div className="col-xl-3 col-lg-4 mb-4">
              <div className="sticky-top" style={{ top: '100px' }}>
                <div className="shop-filter bg-white p-4 rounded shadow-sm">
                  <h6 className="title mb-3 fw-bold">
                    <i className="flaticon-filter me-2" />
                    Categories
                  </h6>
                  
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link
                        to="/deals"
                        className="btn btn-sm w-100 text-start btn-outline-secondary"
                      >
                        All Deals
                      </Link>
                    </li>
                    {CATEGORIES.map((cat) => (
                      <li key={cat.id} className="mb-2">
                        <Link
                          to={`/deals/${cat.slug}`}
                          className={`btn btn-sm w-100 text-start ${cat.id === category.id ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Category Description */}
                {category.description && (
                  <div className="bg-white p-4 rounded shadow-sm mt-4">
                    <h6 className="fw-bold mb-2">About {category.name}</h6>
                    <p className="text-muted small mb-0">{category.description}</p>
                  </div>
                )}
                
              </div>
            </div>

            {/* Main Content - Product Grid */}
            <div className="col-xl-9 col-lg-8">
              {/* Results Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm">
                <div>
                  <h5 className="mb-0">{category.name}</h5>
                  <span className="text-muted small">
                    {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                <Link to="/deals" className="btn btn-sm btn-outline-secondary">
                  <i className="fas fa-arrow-left me-1" />
                  All Deals
                </Link>
              </div>

              {/* Product Grid */}
              {categoryProducts.length > 0 ? (
                <div className="row">
                  {categoryProducts.map((product) => (
                    <div key={product.id} className="col-xl-4 col-md-6 mb-4">
                      <AffiliateProductCard
                        product={product}
                        variant="grid"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 bg-white rounded">
                  <i className="fas fa-box-open fa-3x text-muted mb-3" />
                  <h5>No products in this category</h5>
                  <p className="text-muted">Check back later for new products!</p>
                  <Link to="/deals" className="btn btn-secondary">
                    Browse All Deals
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
