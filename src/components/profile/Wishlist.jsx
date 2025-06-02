
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-xl p-6 md:p-8"
    >
      <div className="flex items-center mb-8">
        <Heart className="w-8 h-8 text-primary mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-300 mb-6 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your wishlist yet. Start exploring!</p>
          <Link to="/products">
            <Button size="lg" className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-white">
              Discover Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {wishlistItems.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4 sm:mb-0 flex-grow">
                  <img  
                    alt={product.name} 
                    className="w-20 h-20 object-contain rounded-md mr-4 border border-gray-200 bg-white"
                    src={product.images?.[0] || `/images/${product.image}`} />
                  <div>
                    <Link to={`/products/${product.id}`} className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-md font-bold text-primary mt-1">₹{product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex space-x-3 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-100"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
