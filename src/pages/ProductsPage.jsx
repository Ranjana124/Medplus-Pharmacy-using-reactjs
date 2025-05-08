
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductGrid from '@/components/products/ProductGrid';
import { products, searchProducts, getProductsByCategory } from '@/data/products';
import { getCategories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 }); // Adjusted max for INR
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = getCategories();

  useEffect(() => {
    setSearchQuery(searchParam || '');
    setSelectedCategory(categoryParam || '');
  }, [searchParam, categoryParam]);

  useEffect(() => {
    let result = [...products];
    
    if (selectedCategory) {
      result = getProductsByCategory(selectedCategory);
    }
    
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('featured');
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:hidden mb-4">
          <Button 
            onClick={toggleFilter} 
            variant="outline" 
            className="w-full flex items-center justify-center"
          >
            {isFilterOpen ? <X size={18} className="mr-2" /> : <Filter size={18} className="mr-2" />}
            {isFilterOpen ? 'Close Filters' : 'Show Filters'}
          </Button>
        </div>
        
        <motion.div 
          className={`w-full md:w-1/4 bg-white p-4 rounded-lg shadow-sm ${isFilterOpen ? 'block' : 'hidden md:block'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProductFilters
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onClearFilters={clearFilters}
          />
        </motion.div>
        
        <div className="w-full md:w-3/4">
          <ProductGrid 
            products={filteredProducts} 
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            categories={categories}
            onClearFilters={clearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
