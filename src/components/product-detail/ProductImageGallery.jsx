
import React from 'react';
import { motion } from 'framer-motion';

const ProductImageGallery = ({ productName }) => {
  return (
    <motion.div 
      className="lg:w-2/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex items-center justify-center">
        <img  alt={productName} className="max-h-80 object-contain" src="https://images.unsplash.com/photo-1547813949-f3e9e32d3ab7" />
      </div>
      
      <div className="flex mt-4 gap-2">
        {[1, 2, 3].map((_, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-primary transition-colors"
          >
            <img  alt={`${productName} view ${index + 1}`} className="h-16 w-16 object-contain" src="https://images.unsplash.com/photo-1632065509860-4fbcfc89ed7c" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
