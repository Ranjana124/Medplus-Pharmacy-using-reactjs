
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button size="lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
        
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">You might be looking for:</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/products" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
              <h4 className="font-medium">Products</h4>
              <p className="text-sm text-gray-600">Browse our pharmacy products</p>
            </Link>
            <Link to="/cart" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
              <h4 className="font-medium">Shopping Cart</h4>
              <p className="text-sm text-gray-600">View your cart items</p>
            </Link>
            <Link to="/login" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
              <h4 className="font-medium">Account</h4>
              <p className="text-sm text-gray-600">Sign in to your account</p>
            </Link>
            <Link to="/contact" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
              <h4 className="font-medium">Contact Us</h4>
              <p className="text-sm text-gray-600">Get in touch with our team</p>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
