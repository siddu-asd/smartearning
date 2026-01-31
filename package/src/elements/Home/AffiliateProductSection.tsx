import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/useSupabase";
import AffiliateProductCard from "../../components/AffiliateProductCard";
import { CATEGORIES } from "../../constant/categories";
import { AffiliateProduct } from "../../constant/affiliateData";
import { IMAGES } from "../../constant/theme";

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

// Filter categories - these map to our database category values
const filterCategories = [
    { name: 'All', categoryValues: null },
    { name: 'Electronics', categoryValues: ['1', '2', '5', '7'] },
    { name: 'Appliances', categoryValues: ['3', '4'] },
    { name: 'Furniture', categoryValues: ['6'] },
];

const AffiliateProductSection = () => {
    const { products, loading } = useProducts();
    const [activeFilter, setActiveFilter] = useState(0);

    // Transform products to AffiliateProduct format
    const transformedProducts: AffiliateProduct[] = useMemo(() => {
        return products.map(p => {
            let categoryId = p.category || 'misc';
            if (categoryId && isNaN(Number(categoryId))) {
                categoryId = categoryNameToId[categoryId.toLowerCase()] || '7';
            }
            const category = CATEGORIES.find(c => c.id === categoryId);
            
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
                category: category,
                mrp: mrpValue,
                discountedPrice: discountedValue,
            };
        });
    }, [products]);

    // Filter products based on selected category
    const filteredData = useMemo(() => {
        const filter = filterCategories[activeFilter];
        if (!filter.categoryValues) {
            return transformedProducts.slice(0, 8);
        }
        return transformedProducts.filter(p => 
            filter.categoryValues?.includes(p.categoryId)
        ).slice(0, 8);
    }, [transformedProducts, activeFilter]);

    const filterCategory = (index: number) => {
        setActiveFilter(index);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading deals...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-5">
                <h4 className="text-muted">No deals available</h4>
                <p>Check back soon for amazing student deals!</p>
            </div>
        );
    }

    return (
        <>
            <div className="row justify-content-md-between align-items-start">
                <div className="col-lg-6 col-md-12">
                    <div className="section-head style-1 m-b30">
                        <div className="left-content">
                            <h2 className="title">Best Deals for Students</h2>
                        </div>
                    </div>	
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="site-filters clearfix style-1 align-items-center ms-lg-auto">
                        <ul className="filters">
                            {filterCategories.map((item, ind) => (
                                <li 
                                    className={`btn ${activeFilter === ind ? "active" : ""}`} 
                                    key={ind}
                                    onClick={() => filterCategory(ind)}
                                >
                                    <input type="radio" />
                                    <Link to="#">{item.name}</Link> 
                                </li>
                            ))}                            
                        </ul>			
                    </div>
                </div>
            </div>
            <div className="clearfix">
                <ul id="masonry" className="row g-xl-4 g-3 list-unstyled">
                    {filteredData.map((item, ind) => (
                        <li 
                            className="col-6 col-xl-3 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" 
                            data-wow-delay="0.2s" 
                            key={ind}
                        >
                            <AffiliateProductCard product={item} />
                        </li>
                    ))}                    
                </ul>
            </div>
        </>
    );
};

export default AffiliateProductSection;
