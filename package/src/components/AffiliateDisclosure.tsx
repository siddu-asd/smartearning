import { Link } from 'react-router-dom';

interface AffiliateDisclosureProps {
  variant?: 'inline' | 'block' | 'footer';
  className?: string;
}

/**
 * Affiliate Disclosure Component
 * Required by FTC guidelines for affiliate marketing websites.
 * Only shown on the disclosure page.
 */
export default function AffiliateDisclosure({ variant = 'block', className = '' }: AffiliateDisclosureProps) {
  const disclosureText = "We earn from qualifying purchases.";
  
  if (variant === 'inline') {
    return (
      <span className={`affiliate-disclosure-inline text-muted small ${className}`}>
        <i className="fas fa-info-circle me-1" />
        {disclosureText}
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`affiliate-disclosure-footer py-2 text-center bg-light border-top ${className}`}>
        <div className="container">
          <small className="text-muted">
            <i className="fas fa-info-circle me-1" />
            {disclosureText}{' '}
            <Link to="/affiliate-disclosure" className="text-muted text-decoration-underline">
              Learn more
            </Link>
          </small>
        </div>
      </div>
    );
  }

  // Default: block variant
  return (
    <div className={`affiliate-disclosure-block alert alert-light border ${className}`}>
      <div className="d-flex align-items-center">
        <i className="fas fa-info-circle text-primary me-2 fs-5" />
        <div>
          <strong className="d-block mb-1">Affiliate Disclosure</strong>
          <small className="text-muted">
            {disclosureText} This means we may receive a small commission at no extra cost to you 
            when you purchase through our links. This helps support our site and allows us to 
            continue providing quality content.
          </small>
        </div>
      </div>
    </div>
  );
}

/**
 * Product-specific affiliate disclaimer shown on product pages
 */
export function ProductAffiliateDisclaimer({ className = '' }: { className?: string }) {
  return (
    <div className={`product-affiliate-disclaimer small text-muted mt-3 p-3 bg-light rounded ${className}`}>
      <i className="fas fa-external-link-alt me-2" />
      <strong>Note:</strong> Clicking "Buy Now" will redirect you to our partner retailer. 
      Prices may vary and are subject to change. We earn a small commission from qualifying purchases.
    </div>
  );
}

/**
 * Price disclaimer for affiliate products
 */
export function PriceDisclaimer({ className = '' }: { className?: string }) {
  return (
    <small className={`price-disclaimer text-muted d-block ${className}`}>
      <i className="fas fa-tag me-1" />
      Price and availability subject to change.
    </small>
  );
}
