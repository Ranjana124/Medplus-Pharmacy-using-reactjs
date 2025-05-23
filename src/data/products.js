
import { categories as categoriesData } from './categories';

export const products = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'Effective pain relief for headaches, toothaches, and fever reduction.',
    price: 45.00,
    category: 'Medicines',
    images: ['/images/paracip-paracetamol-650-tablet.jpg'],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    isPopular: true,
    isFeatured: true,
    prescriptionNeeded: false,
  },
  {
    id: '2',
    name: 'Vitamin C 1000mg',
    description: 'Supports immune system health and antioxidant protection.',
    price: 250.00,
    originalPrice: 300.00,
    discount: 17,
    category: 'Supplements',
    images: ['/images/antacid-tablet-chewable.jpg'],
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    isPopular: true,
    isFeatured: true,
    prescriptionNeeded: false,
  },
  {
    id: '3',
    name: 'Digital Blood Pressure Monitor',
    description: 'Accurate and easy-to-use blood pressure monitoring device for home use.',
    price: 1800.00,
    originalPrice: 2200.00,
    discount: 18,
    category: 'Medical Devices',
    images: ['/images/digital bp.jpg'],
    rating: 4.5,
    reviewCount: 56,
    inStock: true,
    isPopular: false,
    isFeatured: true,
    prescriptionNeeded: false,
  },
  {
    id: '4',
    name: 'Cetirizine Allergy Tablets',
    description: 'Fast-acting relief from seasonal allergies and hay fever symptoms.',
    price: 70.00,
    category: 'Medicines',
    images: ['/images/cetrizine.jpg'],
    rating: 4.3,
    reviewCount: 42,
    inStock: true,
    isPopular: true,
    isFeatured: false,
    prescriptionNeeded: false,
  },
  {
    id: '5',
    name: 'Comprehensive First-Aid Kit',
    description: 'Comprehensive first aid kit for home, travel, and emergencies.',
    price: 750.00,
    category: 'Healthcare Essentials',
    images: ['/images/medical kit.jpg'],
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    isPopular: false,
    isFeatured: true,
    prescriptionNeeded: false,
  },
  {
    id: '6',
    name: 'Omega-3 Fish Oil Capsules',
    description: 'Supports heart health and cognitive function. 60 capsules.',
    price: 450.00,
    category: 'Supplements',
    images: ['/images/omega-3-fish-oil-capsules.jpg'],
    rating: 4.6,
    reviewCount: 63,
    inStock: true,
    isPopular: true,
    isFeatured: false,
    prescriptionNeeded: false,
  },
  {
    id: '7',
    name: 'Digital Thermometer',
    description: 'Fast and accurate temperature readings for the whole family.',
    price: 220.00,
    category: 'Medical Devices',
    images: ['/images/digital-thermometer.jpg'],
    rating: 4.4,
    reviewCount: 37,
    inStock: true,
    isPopular: false,
    isFeatured: true,
    prescriptionNeeded: false,
  },
  {
    id: '8',
    name: 'Hand Sanitizer Gel 250ml',
    description: 'Kills 99.9% of germs without water. Convenient for on-the-go use.',
    price: 90.00,
    category: 'Healthcare Essentials',
    images: ['/images/hand santi.jpg'],
    rating: 4.7,
    reviewCount: 92,
    inStock: true,
    isPopular: true,
    isFeatured: false,
    prescriptionNeeded: false,
  },
  // Baby Care
  {
    id: '9',
    name: 'Baby Diapers (Medium, 72 pack)',
    description: 'Soft and absorbent diapers for all-day comfort.',
    price: 899.00,
    category: 'Baby Care',
    images: ['/images/diapers.jpg'],
    rating: 4.6,
    reviewCount: 150,
    inStock: true,
    isPopular: true,
    prescriptionNeeded: false,
  },
  {
    id: '10',
    name: 'Gentle Baby Lotion (200ml)',
    description: 'Moisturizing lotion for delicate baby skin.',
    price: 180.00,
    category: 'Baby Care',
    images: ['/images/moisturizing cream.jpg'],
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '11',
    name: 'Tear-Free Baby Shampoo (100ml)',
    description: 'Mild shampoo for baby\'s hair and scalp.',
    price: 120.00,
    category: 'Baby Care',
    images: ['/images/baby shampoo.jpg'],
    rating: 4.7,
    reviewCount: 70,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '12',
    name: 'Sensitive Baby Wipes (80 count)',
    description: 'Alcohol-free and fragrance-free wipes.',
    price: 150.00,
    category: 'Baby Care',
    images: ['/images/baby wipes.jpg'],
    rating: 4.5,
    reviewCount: 110,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '13',
    name: 'Infant Formula (Stage 1, 400g)',
    description: 'Nutritionally complete formula for infants.',
    price: 650.00,
    category: 'Baby Care',
    images: ['/images/baby formula.jpg'],
    rating: 4.9,
    reviewCount: 200,
    inStock: true,
    isFeatured: true,
    prescriptionNeeded: false,
  },
  // Medical Devices (Additional)
  {
    id: '14',
    name: 'Glucometer with Strips (50 count)',
    description: 'For easy blood glucose monitoring at home.',
    price: 1200.00,
    category: 'Medical Devices',
    images: ['/images/glucometer.jpg'],
    rating: 4.6,
    reviewCount: 65,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '15',
    name: 'Portable Nebulizer Machine',
    description: 'Compact nebulizer for respiratory treatments.',
    price: 2500.00,
    category: 'Medical Devices',
    images: ['/images/nebulizer.jpg'],
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '16',
    name: 'Fingertip Pulse Oximeter',
    description: 'Measures blood oxygen saturation and pulse rate.',
    price: 999.00,
    category: 'Medical Devices',
    images: ['/images/pulse oximeter.jpg'],
    rating: 4.8,
    reviewCount: 130,
    inStock: true,
    isPopular: true,
    prescriptionNeeded: false,
  },
  // Healthcare Essentials (Additional)
  {
    id: '17',
    name: 'N95 Face Masks (Pack of 10)',
    description: 'High-filtration masks for protection against airborne particles.',
    price: 350.00,
    category: 'Healthcare Essentials',
    images: ['/images/n95 mask.jpg'],
    rating: 4.5,
    reviewCount: 180,
    inStock: true,
    isPopular: true,
    prescriptionNeeded: false,
  },
  {
    id: '18',
    name: 'Surface Disinfectant Spray (500ml)',
    description: 'Kills 99.9% of viruses and bacteria on surfaces.',
    price: 180.00,
    category: 'Healthcare Essentials',
    images: ['/images/surface disinfectant spray.jpg'],
    rating: 4.6,
    reviewCount: 90,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '19',
    name: 'Absorbent Cotton Rolls (500g)',
    description: 'Medical grade cotton for various uses.',
    price: 120.00,
    category: 'Healthcare Essentials',
    images: ['/images/cotton rolls.jpg'],
    rating: 4.4,
    reviewCount: 50,
    inStock: true,
    prescriptionNeeded: false,
  },
  // Medicines (Additional)
  {
    id: '20',
    name: 'Ibuprofen Pain Reliever (200mg, 20 tabs)',
    description: 'Relieves pain, fever, and inflammation.',
    price: 60.00,
    category: 'Medicines',
    images: ['/images/ibuprofen.jpg'],
    rating: 4.7,
    reviewCount: 110,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '21',
    name: 'Cold & Flu Relief Syrup (100ml)',
    description: 'Multi-symptom relief for cold and flu.',
    price: 95.00,
    category: 'Medicines',
    images: ['/images/flu syrup.jpg'],
    rating: 4.5,
    reviewCount: 80,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '22',
    name: 'Antacid Chewable Tablets (Mint, 30 tabs)',
    description: 'Quick relief from heartburn and indigestion.',
    price: 55.00,
    category: 'Medicines',
    images: ['/images/antacid-tablet-chewable.jpg'],
    rating: 4.6,
    reviewCount: 90,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '23',
    name: 'Amoxicillin 250mg (Prescription Only)',
    description: 'Antibiotic for bacterial infections. Requires prescription.',
    price: 120.00,
    category: 'Medicines',
    images: ['/images/amoxicillin.jpg'],
    rating: 4.9,
    reviewCount: 75,
    inStock: true,
    prescriptionNeeded: true,
  },
  // Personal Care
  {
    id: '24',
    name: 'Moisturizing Skin Cream (100g)',
    description: 'Hydrating cream for dry skin, suitable for daily use.',
    price: 220.00,
    category: 'Personal Care',
    images: ['/images/moisturizing cream.jpg'],
    rating: 4.6,
    reviewCount: 130,
    inStock: true,
    isPopular: true,
    prescriptionNeeded: false,
  },
  {
    id: '25',
    name: 'Anti-Dandruff Shampoo (200ml)',
    description: 'Effective relief from dandruff and itchy scalp.',
    price: 180.00,
    category: 'Personal Care',
    images: ['/images/anti dandruff shampoo.jpg'],
    rating: 4.5,
    reviewCount: 95,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '26',
    name: 'Fluoride Toothpaste (150g)',
    description: 'Cavity protection and fresh breath.',
    price: 85.00,
    category: 'Personal Care',
    images: ['/images/fluoride-regular-flavor-toothpaste.jpg'],
    rating: 4.7,
    reviewCount: 150,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '27',
    name: 'Antibacterial Soap Bar (Pack of 3)',
    description: 'Germ protection for the whole family.',
    price: 110.00,
    category: 'Personal Care',
    images: ['/images/soap.jpg'],
    rating: 4.8,
    reviewCount: 100,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '28',
    name: 'Roll-On Deodorant (50ml)',
    description: '24-hour protection against odor and wetness.',
    price: 150.00,
    category: 'Personal Care',
    images: ['/images/deodrant.jpg'],
    rating: 4.4,
    reviewCount: 70,
    inStock: true,
    prescriptionNeeded: false,
  },
  // Supplements (Additional)
  {
    id: '29',
    name: 'Multivitamin Tablets (60 count)',
    description: 'Complete daily nutrition with essential vitamins and minerals.',
    price: 350.00,
    category: 'Supplements',
    images: ['/images/multivitamin.jpg'],
    rating: 4.7,
    reviewCount: 120,
    inStock: true,
    isPopular: true,
    isFeatured: true,
    prescriptionNeeded: false,
  },
  {
    id: '30',
    name: 'Immunity Booster Effervescent Tablets (20 count)',
    description: 'Vitamin C, Zinc, and natural extracts for stronger immunity.',
    price: 280.00,
    category: 'Supplements',
    images: ['/images/immunity booster.jpg'],
    rating: 4.8,
    reviewCount: 90,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '31',
    name: 'Calcium + Vitamin D3 Tablets (60 count)',
    description: 'For strong bones and teeth.',
    price: 190.00,
    category: 'Supplements',
    images: ['/images/calcium tablets.jpg'],
    rating: 4.6,
    reviewCount: 110,
    inStock: true,
    prescriptionNeeded: false,
  },
  {
    id: '32',
    name: 'Whey Protein Powder (Chocolate, 1kg)',
    description: 'High-quality protein for muscle growth and recovery.',
    price: 1800.00,
    category: 'Supplements',
    images: ['/images/whey protien.jpg'],
    rating: 4.9,
    reviewCount: 150,
    inStock: true,
    isFeatured: true,
    prescriptionNeeded: false,
  }
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getPopularProducts = () => {
  return products.filter(product => product.isPopular);
};

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categorySlug) => {
  if (!categorySlug) return products;
  const categoryObj = categoriesData.find(cat => cat.slug.toLowerCase() === categorySlug.toLowerCase());
  if (!categoryObj) return []; 
  
  return products.filter(product => 
    product.category.toLowerCase() === categoryObj.name.toLowerCase()
  );
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};
