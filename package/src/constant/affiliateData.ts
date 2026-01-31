import { IMAGES } from './theme';
import { Category, CATEGORIES } from './categories';

// Affiliate Product Interface
export interface AffiliateProduct {
  id: string;
  name: string;
  slug: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  pros: string[];
  cons: string[];
  categoryId: string;
  category?: Category;
  affiliateUrl: string;
  buttonText: string;
  metaTitle: string;
  metaDescription: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  mrp?: number;
  discountedPrice?: number;
}

// Blog Post Interface
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  content: string;
  categoryId: string;
  category?: Category;
  metaTitle: string;
  metaDescription: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  author?: string;
}

// Sample Affiliate Products Data - Student Focused
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: '1',
    name: 'Noise Cancelling Study Headphones',
    slug: 'noise-cancelling-study-headphones',
    images: [IMAGES.headphoneThumbnail, IMAGES.headphoneThumbnail],
    shortDescription: 'Block out dorm noise and focus on your studies with premium noise-cancelling headphones.',
    fullDescription: 'These wireless headphones are perfect for students who need to concentrate in noisy environments. Features active noise cancellation, 30-hour battery life for all-day study sessions, and comfortable ear cushions for extended wear during exams prep.',
    pros: ['Blocks dorm/library noise', 'Long battery for study sessions', 'Comfortable for hours', 'Built-in microphone for online classes'],
    cons: ['Slightly bulky for backpack', 'Higher budget option'],
    categoryId: '5',
    affiliateUrl: 'https://www.amazon.com/dp/example1?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Noise Cancelling Headphones for Students',
    metaDescription: 'Top-rated noise cancelling headphones perfect for studying in dorms, libraries, and coffee shops.',
    status: 'active',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-20',
  },
  {
    id: '2',
    name: 'Student Laptop - Budget Friendly',
    slug: 'student-laptop-budget-friendly',
    images: [IMAGES.laptopSaleCategory, IMAGES.laptopSaleCategory],
    shortDescription: 'Affordable laptop perfect for taking notes, writing papers, and online classes.',
    fullDescription: 'This budget-friendly laptop is ideal for students who need a reliable machine for coursework. Features a 15" display, fast processor for multitasking between research and writing, and all-day battery life to get through classes without charging.',
    pros: ['Lightweight for carrying to class', 'Fast boot-up time', 'Great battery life', 'Budget-friendly'],
    cons: ['Basic graphics for gaming', 'Limited storage space'],
    categoryId: '1',
    affiliateUrl: 'https://www.amazon.com/dp/example2?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Budget Laptop for College Students',
    metaDescription: 'Affordable student laptop with long battery life, perfect for classes, notes, and papers.',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-18',
  },
  {
    id: '3',
    name: 'Ergonomic Study Chair',
    slug: 'ergonomic-study-chair',
    images: [IMAGES.officeChairThumbnail, IMAGES.officeChairThumbnail],
    shortDescription: 'Comfortable chair for long study sessions with lumbar support.',
    fullDescription: 'This ergonomic study chair is designed for students spending hours at their desk. Features adjustable height, lumbar support, and breathable mesh back to keep you comfortable during exam prep marathons.',
    pros: ['Lumbar support', 'Adjustable height', 'Breathable mesh', 'Armrests included'],
    cons: ['Assembly required', 'Takes up space'],
    categoryId: '6',
    affiliateUrl: 'https://www.amazon.com/dp/example3?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Study Chair for College Students',
    metaDescription: 'Ergonomic study chair with lumbar support. Comfortable seating for long study sessions.',
    status: 'active',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-15',
  },
  {
    id: '4',
    name: 'Smart TV for Dorms',
    slug: 'smart-tv-dorms',
    images: [IMAGES.tvThumbnail, IMAGES.tvThumbnail],
    shortDescription: 'Compact smart TV perfect for streaming shows and movies in your dorm.',
    fullDescription: 'This compact smart TV is ideal for dorm rooms. Built-in streaming apps, easy setup, and perfect size for small spaces. Great for movie nights, gaming, and watching lectures.',
    pros: ['Built-in streaming apps', 'Perfect dorm size', 'Easy setup', 'Good picture quality'],
    cons: ['No external speakers', 'Limited ports'],
    categoryId: '7',
    affiliateUrl: 'https://www.amazon.com/dp/example4?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Smart TV for Dorm Rooms',
    metaDescription: 'Compact smart TV with streaming built-in. Perfect for college dorms.',
    status: 'active',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-10',
  },
  {
    id: '5',
    name: 'Student Smartphone Bundle',
    slug: 'student-smartphone-bundle',
    images: [IMAGES.mobileDealsCategory, IMAGES.mobileDealsCategory],
    shortDescription: 'Budget-friendly smartphone with case and screen protector.',
    fullDescription: 'This smartphone bundle is perfect for students who need a reliable phone without breaking the bank. Includes protective case and screen protector. Great camera for campus photos and smooth performance for social media.',
    pros: ['Budget-friendly', 'Includes case & protector', 'Good camera', 'Long battery'],
    cons: ['Mid-range specs', 'No wireless charging'],
    categoryId: '2',
    affiliateUrl: 'https://www.amazon.com/dp/example5?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Budget Smartphone for College Students',
    metaDescription: 'Affordable smartphone bundle for students. Includes case and screen protector.',
    status: 'active',
    createdAt: '2024-12-20',
    updatedAt: '2025-01-05',
  },
  {
    id: '6',
    name: 'Mini Microwave for Dorms',
    slug: 'mini-microwave-dorms',
    images: [IMAGES.homeAppliancesCategory, IMAGES.homeAppliancesCategory],
    shortDescription: 'Compact microwave perfect for dorm rooms and quick meals.',
    fullDescription: 'This mini microwave is dorm-approved and perfect for heating up quick meals, snacks, and beverages. Compact footprint fits on any desk or shelf, with easy-to-use controls and multiple power levels.',
    pros: ['Dorm-approved size', 'Quick heating', 'Easy controls', 'Energy efficient'],
    cons: ['Small capacity', 'Basic features only'],
    categoryId: '3',
    affiliateUrl: 'https://www.amazon.com/dp/example6?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Mini Microwave for Dorm Rooms',
    metaDescription: 'Compact microwave perfect for college dorms. Quick meals made easy.',
    status: 'active',
    createdAt: '2024-12-15',
    updatedAt: '2025-01-01',
  },
  {
    id: '7',
    name: 'Portable Washing Machine',
    slug: 'portable-washing-machine',
    images: [IMAGES.washingMachineCategory, IMAGES.washingMachineCategory],
    shortDescription: 'Compact washing machine perfect for dorms and small apartments.',
    fullDescription: 'This portable washing machine is ideal for students living in dorms or apartments without laundry facilities. Compact design, easy to use, and energy efficient. Handles small loads of clothes, towels, and bedding.',
    pros: ['No laundromat needed', 'Compact size', 'Energy efficient', 'Easy to use'],
    cons: ['Small capacity', 'Manual drain'],
    categoryId: '4',
    affiliateUrl: 'https://www.amazon.com/dp/example7?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Portable Washing Machine for Students',
    metaDescription: 'Compact portable washer for dorms and apartments. Save money on laundry.',
    status: 'active',
    createdAt: '2024-12-10',
    updatedAt: '2024-12-25',
  },
  {
    id: '8',
    name: 'Wireless Earbuds for Students',
    slug: 'wireless-earbuds-students',
    images: [IMAGES.headphoneThumbnail, IMAGES.headphoneThumbnail],
    shortDescription: 'Compact earbuds perfect for commuting, studying, and online classes.',
    fullDescription: 'These wireless earbuds are perfect for students on the go. Great sound quality, long battery life, and comfortable fit for extended wear. Ideal for commuting, gym, and study sessions.',
    pros: ['Compact & portable', 'Good sound quality', 'Long battery', 'Comfortable fit'],
    cons: ['Easy to lose', 'No noise cancellation'],
    categoryId: '5',
    affiliateUrl: 'https://www.amazon.com/dp/example8?tag=yourtag-20',
    buttonText: 'Buy Now',
    metaTitle: 'Best Wireless Earbuds for College Students',
    metaDescription: 'Compact wireless earbuds for students. Great for commuting, studying, and classes.',
    status: 'active',
    createdAt: '2024-12-05',
    updatedAt: '2024-12-20',
  },
];

// Sample Blog Posts Data - Student Focused
export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Best Study Headphones for College Students',
    slug: 'best-study-headphones-college-students',
    featuredImage: IMAGES.BlogGridPic1,
    content: `
      <p>Struggling to focus in a noisy dorm or library? The right headphones can make all the difference in your study sessions.</p>
      <h2>What Students Need in Headphones</h2>
      <p>When shopping for study headphones, consider these student-specific factors:</p>
      <ul>
        <li>Noise cancellation for blocking out roommates</li>
        <li>Long battery life for all-day classes</li>
        <li>Comfortable for extended study sessions</li>
        <li>Good microphone for online classes and group calls</li>
      </ul>
      <h2>Our Top Picks for Students</h2>
      <p>After testing dozens of options, here are our recommendations for different budgets...</p>
    `,
    categoryId: '1',
    metaTitle: 'Best Study Headphones for College Students - 2025 Guide',
    metaDescription: 'Find the perfect headphones for studying in dorms and libraries. Noise-cancelling options for students.',
    status: 'published',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20',
    author: 'Tech Team',
  },
  {
    id: '2',
    title: 'Best Budget Laptops for Students',
    slug: 'best-budget-laptops-students',
    featuredImage: IMAGES.BlogGridPic2,
    content: `
      <p>Finding a great laptop on a student budget doesn't have to be difficult. Here's our guide to the best affordable options.</p>
      <h2>Budget Considerations</h2>
      <p>Students need laptops that balance performance, portability, and price. You don't need the latest gaming rig to write papers and attend online classes.</p>
      <h2>Top Recommendations</h2>
      <p>Our top picks for student laptops that won't break the bank but will get you through college...</p>
    `,
    categoryId: '1',
    metaTitle: 'Best Budget Laptops for Students 2025 - College Guide',
    metaDescription: 'Find the best affordable laptops for college students. Perfect for notes, papers, and online classes.',
    status: 'published',
    createdAt: '2025-01-18',
    updatedAt: '2025-01-18',
    author: 'Student Tech Team',
  },
  {
    id: '3',
    title: 'Dorm Room Setup Guide: Everything You Need',
    slug: 'dorm-room-setup-guide',
    featuredImage: IMAGES.BlogGridPic3,
    content: `
      <p>Moving into a dorm for the first time? Here's everything you need to create a comfortable study and living space.</p>
      <h2>Essential Dorm Items</h2>
      <p>From bedding to storage solutions, these are the must-haves for dorm life...</p>
      <h2>Space-Saving Tips</h2>
      <p>Dorm rooms are small! Learn how to maximize your space without feeling cramped...</p>
    `,
    categoryId: '2',
    metaTitle: 'Complete Dorm Room Setup Guide for College Students',
    metaDescription: 'Everything you need for your dorm room. Essential items, space-saving tips, and budget-friendly options.',
    status: 'published',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
    author: 'Campus Life Team',
  },
  {
    id: '4',
    title: 'Study Productivity Hacks for College Students',
    slug: 'study-productivity-hacks-college',
    featuredImage: IMAGES.BlogGridPic4,
    content: `
      <p>Struggling to stay focused during study sessions? These productivity hacks will help you get more done.</p>
      <h2>Creating the Right Environment</h2>
      <p>The right study setup can make a huge difference in your concentration...</p>
      <h2>Must-Have Study Tools</h2>
      <p>From apps to physical tools, here's what successful students use...</p>
    `,
    categoryId: '3',
    metaTitle: 'Study Productivity Hacks for College Students 2025',
    metaDescription: 'Boost your study productivity with these college-tested tips, tools, and techniques.',
    status: 'published',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-12',
    author: 'Study Tips Team',
  },
];

// Helper functions
export const getProductBySlug = (slug: string): AffiliateProduct | undefined => {
  return AFFILIATE_PRODUCTS.find(p => p.slug === slug);
};

export const getProductsByCategory = (categoryId: string): AffiliateProduct[] => {
  return AFFILIATE_PRODUCTS.filter(p => p.categoryId === categoryId && p.status === 'active');
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(p => p.slug === slug);
};

export const getBlogsByCategory = (categoryId: string): BlogPost[] => {
  return BLOG_POSTS.filter(p => p.categoryId === categoryId && p.status === 'published');
};

export const getActiveProducts = (): AffiliateProduct[] => {
  return AFFILIATE_PRODUCTS.filter(p => p.status === 'active');
};

export const getPublishedBlogs = (): BlogPost[] => {
  return BLOG_POSTS.filter(p => p.status === 'published');
};

// Add category reference to products and blogs
export const getProductWithCategory = (product: AffiliateProduct): AffiliateProduct => {
  const category = CATEGORIES.find(c => c.id === product.categoryId);
  return { ...product, category };
};

export const getBlogWithCategory = (blog: BlogPost): BlogPost => {
  const category = CATEGORIES.find(c => c.id === blog.categoryId);
  return { ...blog, category };
};
