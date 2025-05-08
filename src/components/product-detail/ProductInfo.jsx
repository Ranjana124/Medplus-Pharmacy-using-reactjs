
import React from 'react';
import { Star } from 'lucide-react';

const ProductInfo = ({ product }) => {
  return (
    <>
      <div className="mb-2 text-sm font-medium text-primary">{product.category}</div>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
            />
          ))}
        </div>
        <span className="ml-2 text-gray-600">{product.rating || 0} ({product.reviewCount || 0} reviews)</span>
      </div>
      
      <div className="flex items-baseline mb-6">
        <span className="text-3xl font-bold">₹{product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-lg text-gray-500 line-through ml-3">
            ₹{product.originalPrice.toFixed(2)}
          </span>
        )}
        {product.discount && (
          <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
            {product.discount}% OFF
          </span>
        )}
      </div>
      
      <p className="text-gray-700 mb-6">{product.description}</p>
    </>
  );
};

export default ProductInfo;
