
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth(); // Get user to associate wishlist with

  // Load wishlist from localStorage on initial render, specific to user
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Error parsing wishlist data:', error);
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]); // Initialize if no saved wishlist for user
      }
    } else {
      setWishlistItems([]); // Clear wishlist if no user
    }
  }, [user]);

  // Save wishlist to localStorage whenever it changes, specific to user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const addToWishlist = (product) => {
    if (!user) {
      toast({ title: "Please log in", description: "You need to be logged in to add items to your wishlist.", variant: "destructive" });
      return;
    }
    setWishlistItems((prevItems) => {
      if (prevItems.find(item => item.id === product.id)) {
        toast({ title: "Already in Wishlist", description: `${product.name} is already in your wishlist.`, variant: "default" });
        return prevItems;
      }
      toast({ title: "Added to Wishlist", description: `${product.name} has been added to your wishlist.` });
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
     if (!user) return;
    setWishlistItems((prevItems) => {
      const productToRemove = prevItems.find(item => item.id === productId);
      if (productToRemove) {
        toast({ title: "Removed from Wishlist", description: `${productToRemove.name} has been removed from your wishlist.` });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
