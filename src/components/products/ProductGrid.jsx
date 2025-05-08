
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const ProductGrid = ({ products, selectedCategory, searchQuery, categories, onClearFilters }) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {selectedCategory 
            ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Products'}`
            : searchQuery 
              ? `Search Results for "${searchQuery}"`
              : 'All Products'
          }
        </h1>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <Button onClick={onClearFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
