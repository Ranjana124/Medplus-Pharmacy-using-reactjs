
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${encodeURIComponent(category.slug)}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="category-card overflow-hidden h-full border-2 border-gray-100 hover:border-primary/20 hover:shadow-lg">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {category.icon}
            </div>
            <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.productCount} products</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
