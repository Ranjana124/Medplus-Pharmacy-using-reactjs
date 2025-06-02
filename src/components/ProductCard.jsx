import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`mr-0.5 ${i + 1 <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));

  // Use first image from product.images array, or fallback
  const imageUrl = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://via.placeholder.com/300x200.png?text=No+Image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group relative"
    >
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="w-full h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={product.name}
            src={imageUrl}
          />
        </div>
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </Link>

      <Button
        size="icon"
        variant="ghost"
        className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white ${
          isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
        }`}
        onClick={handleToggleWishlist}
      >
        <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
      </Button>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">
          <Link to={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-gray-500 mb-2 flex-grow">
          {product.description?.substring(0, 40)}...
        </p>

        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0} reviews)</span>
        </div>

        <div className="flex items-baseline mb-3">
          <span className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button onClick={handleAddToCart} className="w-full mt-auto" size="sm">
          <ShoppingCart size={16} className="mr-2" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
