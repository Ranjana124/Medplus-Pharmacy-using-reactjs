
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const ProductFilters = ({
  categories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onClearFilters
}) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="text-sm text-gray-500 hover:text-primary"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="search" className="text-base font-medium mb-2 block">Search</Label>
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </form>
        </div>
        
        <Separator />
        
        <div>
          <Label htmlFor="category" className="text-base font-medium mb-2 block">Category</Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-base font-medium mb-2 block">Price Range (₹)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              min="0"
              value={priceRange.min}
              onChange={(e) => onPriceChange(Number(e.target.value), priceRange.max)}
              className="w-1/2"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              min="0"
              value={priceRange.max}
              onChange={(e) => onPriceChange(priceRange.min, Number(e.target.value))}
              className="w-1/2"
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label htmlFor="sort" className="text-base font-medium mb-2 block">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
