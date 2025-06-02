
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [orderId] = useState('ORD' + Math.floor(Math.random() * 10000));

  useEffect(() => {
    if (state?.orderDetails) {
      try {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
          id: orderId,
          userId: user?.email || 'GUEST',
          userName: user?.displayName || 'Guest User',
          date: new Date().toISOString(),
          items: state.orderDetails.items,
          total: state.orderDetails.total,
          status: 'Processing',
          paymentMethod: state.orderDetails.paymentMethod || 'Card',
          paymentStatus: 'Paid'
        };
        localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
        clearCart();
      } catch (error) {
        console.error('Error saving order:', error);
      }
    }
  }, [state, user, orderId]);

  if (!state?.orderDetails) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">No order details found</h1>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full"
      >
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p className="text-gray-600 mb-2">
          A confirmation email with your order details has been sent to your email address.
        </p>
        <p className="text-gray-600 mb-8">
          Your Order ID is: <span className="font-semibold text-primary">{orderId}</span>
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
          <Link to="/products">
            <Button size="lg" className="w-full md:w-auto">
              <ShoppingBag size={18} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" size="lg" className="w-full md:w-auto">
              View Orders
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
