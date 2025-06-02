
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Plus,
  Minus,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductActions from '@/components/product-detail/ProductActions';
import ProductTabs from '@/components/product-detail/ProductTabs';
import RelatedProducts from '@/components/product-detail/RelatedProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProductsData, setRelatedProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchedProduct = getProductById(id);
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      const related = getProductsByCategory(fetchedProduct.category)
        .filter(p => p.id !== fetchedProduct.id)
        .slice(0, 4);
      setRelatedProductsData(related);
    }
    
    setIsLoading(false);
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart.`,
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="flex items-center text-primary hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Back to Products
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <ProductImageGallery productName={product.name} />
        
        <motion.div 
          className="lg:w-3/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductInfo product={product} />
          <Separator className="my-6" />
          <ProductActions 
            quantity={quantity} 
            onQuantityChange={handleQuantityChange} 
            onAddToCart={handleAddToCart} 
          />
          <ProductTabs product={product} />
        </motion.div>
      </div>
      
      <RelatedProducts products={relatedProductsData} />
    </div>
  );
};

export default ProductDetailPage;
