
import React from 'react';
import { Pill, Stethoscope, Baby, ShieldPlus, Droplet, Apple, HeartPulse, Sun } from 'lucide-react';

export const categories = [
  {
    id: 1,
    name: 'Medicines',
    slug: 'medicines',
    icon: <Pill className="w-6 h-6 text-primary" />,
    productCount: 5, // Updated count
    description: 'Prescription and over-the-counter medications'
  },
  {
    id: 2,
    name: 'Supplements',
    slug: 'supplements',
    icon: <Apple className="w-6 h-6 text-primary" />,
    productCount: 5, // Updated count
    description: 'Nutritional supplements and vitamins'
  },
  {
    id: 3,
    name: 'Personal Care',
    slug: 'personal-care',
    icon: <Droplet className="w-6 h-6 text-primary" />,
    productCount: 5, // Updated count
    description: 'Hygiene and personal care products'
  },
  {
    id: 4,
    name: 'Healthcare Essentials',
    slug: 'healthcare-essentials',
    icon: <ShieldPlus className="w-6 h-6 text-primary" />, // Changed icon
    productCount: 4, // Updated count
    description: 'First aid, sanitizers, masks, etc.'
  },
  {
    id: 5,
    name: 'Baby Care',
    slug: 'baby-care',
    icon: <Baby className="w-6 h-6 text-primary" />,
    productCount: 5, // Updated count
    description: 'Products for baby health and care'
  },
  {
    id: 6,
    name: 'Medical Devices',
    slug: 'medical-devices',
    icon: <Stethoscope className="w-6 h-6 text-primary" />,
    productCount: 5, // Updated count
    description: 'Health monitoring and medical devices'
  },
  {
    id: 7,
    name: 'Pain Relief', // Kept from original, can be merged or kept separate
    slug: 'pain-relief',
    icon: <HeartPulse className="w-6 h-6 text-primary" />,
    productCount: 1,
    description: 'Products for pain management'
  },
  {
    id: 8,
    name: 'Allergy', // Kept from original
    slug: 'allergy',
    icon: <Sun className="w-6 h-6 text-primary" />, // Changed icon
    productCount: 1,
    description: 'Products for allergy relief'
  }
];

export const getCategories = () => {
  return categories;
};

export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug.toLowerCase() === slug.toLowerCase());
};
