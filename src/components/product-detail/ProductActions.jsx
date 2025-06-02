
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Heart, Minus, Plus, Share2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/components/ui/use-toast';

const ProductActions = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };
  
  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      })
      .then(() => toast({ title: "Shared successfully!" }))
      .catch((error) => toast({ title: "Share failed", description: error.message, variant: "destructive" }));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied!", description: "Product link copied to clipboard." });
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} className="h-10 w-10 rounded-r-none hover:bg-gray-100">
            <Minus size={16} />
          </Button>
          <Input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-10 w-16 text-center border-y-0 border-x focus:ring-0 focus:border-gray-300"
            min="1"
          />
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="h-10 w-10 rounded-l-none hover:bg-gray-100">
            <Plus size={16} />
          </Button>
        </div>
      </div>

      <Button onClick={handleAddToCart} size="lg" className="w-full bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-500/90 text-white">
        <ShoppingCart size={20} className="mr-2" /> Add to Cart
      </Button>
      
      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          className={`w-full flex items-center justify-center border-2 ${
            isInWishlist(product.id) ? 'border-red-500 text-red-500 hover:bg-red-50' : 'border-gray-300 hover:border-primary hover:text-primary'
          }`}
          onClick={handleToggleWishlist}
        >
          <Heart size={20} className="mr-2" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
          {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
        <Button variant="outline" className="w-full flex items-center justify-center border-gray-300 hover:border-primary hover:text-primary" onClick={handleShare}>
          <Share2 size={20} className="mr-2" /> Share
        </Button>
      </div>

       {product.prescriptionNeeded && (
        <div className="p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded-md">
          <p className="text-sm font-medium">A prescription is required for this item.</p>
        </div>
      )}
    </div>
  );
};

// Dummy Label component if not imported from shadcn/ui
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={className}>{children}</label>
);


export default ProductActions;
