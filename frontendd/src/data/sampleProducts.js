// Sample products data for ThisIsKnotty
// Using the user's actual images: knotty1.jpg and knotty2.jpg

export const sampleProducts = [
  {
    _id: '1',
    name: 'Classic Boho Crochet Tote',
    description: 'A beautiful handcrafted crochet tote bag with a timeless boho design. Perfect for everyday use, this spacious bag features intricate crochet patterns and a sturdy construction. Made with premium cotton yarn for durability and comfort.',
    price: 45.99,
    originalPrice: 59.99,
    discountPercentage: 23,
    category: 'Tote Bags',
    material: 'Premium Cotton Yarn',
    dimensions: '12" x 14" x 4"',
    careInstructions: 'Hand wash cold, lay flat to dry. Do not bleach or tumble dry.',
    inStock: true,
    stockQuantity: 8,
    sku: 'TB-BOHO-001',
    images: ['/knotty1.jpg'],
    featured: true,
    rating: 4.8,
    reviewCount: 12,
    tags: ['boho', 'tote', 'everyday', 'handmade', 'cotton']
  },
  {
    _id: '2',
    name: 'Elegant Market Crochet Bag',
    description: 'An elegant and spacious market-style crochet bag perfect for shopping, beach trips, or casual outings. This handcrafted piece features a sophisticated pattern with reinforced handles for maximum comfort and durability.',
    price: 52.99,
    originalPrice: 65.99,
    discountPercentage: 20,
    category: 'Market Bags',
    material: 'Premium Cotton Blend',
    dimensions: '15" x 18" x 6"',
    careInstructions: 'Hand wash in cold water, air dry. Avoid direct sunlight to preserve colors.',
    inStock: true,
    stockQuantity: 5,
    sku: 'MB-ELEG-002',
    images: ['/knotty2.jpg'],
    featured: true,
    rating: 4.9,
    reviewCount: 8,
    tags: ['market', 'elegant', 'spacious', 'handmade', 'beach']
  },
  {
    _id: '3',
    name: 'Cozy Winter Crochet Handbag',
    description: 'A warm and cozy crochet handbag perfect for the winter season. Made with soft, chunky yarn in warm earth tones, this bag combines style with comfort. Features a secure closure and comfortable shoulder strap.',
    price: 38.99,
    category: 'Handbags',
    material: 'Chunky Wool Blend',
    dimensions: '10" x 12" x 3"',
    careInstructions: 'Spot clean only. Keep away from moisture and direct heat.',
    inStock: true,
    stockQuantity: 12,
    sku: 'HB-WINT-003',
    images: ['/knotty1.jpg'],
    featured: false,
    rating: 4.7,
    reviewCount: 15,
    tags: ['winter', 'cozy', 'warm', 'handbag', 'wool']
  },
  {
    _id: '4',
    name: 'Summer Breeze Crochet Beach Bag',
    description: 'Lightweight and breathable crochet beach bag perfect for summer adventures. This airy design allows sand to fall through while keeping your essentials secure. Features a drawstring closure and long shoulder strap.',
    price: 42.99,
    category: 'Beach Bags',
    material: 'Lightweight Cotton',
    dimensions: '14" x 16" x 5"',
    careInstructions: 'Machine wash cold, tumble dry low. Can be bleached if needed.',
    inStock: true,
    stockQuantity: 10,
    sku: 'BB-SUMM-004',
    images: ['/knotty2.jpg'],
    featured: false,
    rating: 4.6,
    reviewCount: 22,
    tags: ['beach', 'summer', 'lightweight', 'breathable', 'drawstring']
  },
  {
    _id: '5',
    name: 'Vintage Style Crochet Crossbody',
    description: 'A charming vintage-inspired crochet crossbody bag with adjustable strap. Perfect for hands-free convenience, this bag features intricate lace-like patterns and a secure magnetic closure.',
    price: 35.99,
    category: 'Crossbody Bags',
    material: 'Fine Cotton Thread',
    dimensions: '8" x 10" x 2"',
    careInstructions: 'Hand wash gently, reshape while damp, air dry.',
    inStock: true,
    stockQuantity: 6,
    sku: 'CB-VINT-005',
    images: ['/knotty1.jpg'],
    featured: false,
    rating: 4.8,
    reviewCount: 18,
    tags: ['vintage', 'crossbody', 'lace', 'adjustable', 'magnetic']
  },
  {
    _id: '6',
    name: 'Modern Geometric Crochet Clutch',
    description: 'Contemporary geometric crochet clutch with bold patterns and clean lines. This statement piece is perfect for evening events or when you want to add a unique touch to your outfit.',
    price: 48.99,
    category: 'Clutches',
    material: 'Premium Acrylic Blend',
    dimensions: '9" x 6" x 1"',
    careInstructions: 'Spot clean with mild detergent. Do not machine wash.',
    inStock: true,
    stockQuantity: 4,
    sku: 'CL-GEO-006',
    images: ['/knotty2.jpg'],
    featured: false,
    rating: 4.9,
    reviewCount: 11,
    tags: ['modern', 'geometric', 'clutch', 'evening', 'statement']
  }
];

export const categories = [
  'Tote Bags',
  'Market Bags', 
  'Handbags',
  'Beach Bags',
  'Crossbody Bags',
  'Clutches'
];

export const getFeaturedProducts = () => {
  return sampleProducts.filter(product => product.featured);
};

export const getProductById = (id) => {
  return sampleProducts.find(product => product._id === id);
};

export const getProductsByCategory = (category) => {
  return sampleProducts.filter(product => product.category === category);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}; 