
import React from 'react';
import { motion } from 'framer-motion';
import Wishlist from '@/components/profile/Wishlist'; // Re-using the Wishlist component for display

const FavoritesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* The Wishlist component already has a title "My Wishlist" */}
        <Wishlist /> 
      </motion.div>
    </div>
  );
};

export default FavoritesPage;
