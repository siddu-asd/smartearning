import IMAGES from './theme';

// Student-focused categories for affiliate catalog
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  description?: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Laptop Deals', slug: 'laptop-deals', image: IMAGES.laptopSaleCategory, description: 'Best laptop deals for students' },
  { id: '2', name: 'Mobile Deals', slug: 'mobile-deals', image: IMAGES.mobileDealsCategory, description: 'Smartphones & accessories for students' },
  { id: '3', name: 'Home Appliances', slug: 'home-appliances', image: IMAGES.homeAppliancesCategory, description: 'Essential appliances for dorm & home' },
  { id: '4', name: 'Laundry & Cleaning', slug: 'laundry-cleaning', image: IMAGES.washingMachineCategory, description: 'Washing machines, dryers & more' },
  { id: '5', name: 'Audio & Headphones', slug: 'audio-headphones', image: IMAGES.headphoneThumbnail, description: 'Headphones, speakers, earbuds' },
  { id: '6', name: 'Study Furniture', slug: 'study-furniture', image: IMAGES.officeChairThumbnail, description: 'Chairs, desks, study setup' },
  { id: '7', name: 'Entertainment', slug: 'entertainment', image: IMAGES.tvThumbnail, description: 'TVs, gaming, streaming devices' },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};
