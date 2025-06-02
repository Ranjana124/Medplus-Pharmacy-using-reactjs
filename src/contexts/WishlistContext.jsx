
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const WishlistContext = createContext();

const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth();

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
        setWishlistItems([]);
      }
    } else {
      setWishlistItems([]);
    }
  }, [user]);

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

export { WishlistProvider, useWishlist };
