
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
        duration: 3000,
      });
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
      duration: 3000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Browse our products and find something you like!
          </p>
          <Link to="/products">
            <Button size="lg" className="px-8">
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="border-t first:border-t-0 border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                    <div className="md:col-span-6 flex items-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-md flex items-center justify-center mr-4">
                        <img 
                          alt={item.name} 
                          className="h-16 w-16 object-contain" 
                          src={item.images && item.images.length > 0 ? item.images[0] : '/images/medical kit.jpg'} 
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-500 text-sm flex items-center mt-2 md:hidden"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-sm font-medium">Price:</span>
                      <span>₹{item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-sm font-medium">Quantity:</span>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-l-md rounded-r-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <div className="h-8 w-10 flex items-center justify-center border-y border-input text-sm">
                          {item.quantity}
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-r-md rounded-l-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-sm font-medium">Total:</span>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <div className="hidden md:flex md:col-span-12 lg:col-span-1 justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  className="text-sm text-gray-600"
                  onClick={handleClearCart}
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/products" className="text-primary hover:underline flex items-center">
                <ArrowRight size={16} className="mr-2 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full mb-4" 
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                <p>Secure checkout powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
