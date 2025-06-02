
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import FeaturedProducts from '@/components/FeaturedProducts';
import ServiceFeatures from '@/components/ServiceFeatures';
import TestimonialSection from '@/components/TestimonialSection';
import NewsletterSection from '@/components/NewsletterSection';
import { getCategories } from '@/data/categories';
import { getFeaturedProducts, getPopularProducts } from '@/data/products';

const HomePage = () => {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();
  const popularProducts = getPopularProducts();

  return (
    <div>
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the health products you need by exploring our carefully organized categories
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <FeaturedProducts 
        title="Featured Products" 
        products={featuredProducts} 
        viewAllLink="/products?featured=true" 
      />
      
      {/* Health Tips Banner */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0 md:pr-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Expert Health Advice</h2>
              <p className="text-gray-600 mb-6">
                Our team of licensed pharmacists and healthcare professionals provide valuable insights and advice to help you maintain optimal health.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Medication Management</h3>
                    <p className="text-gray-600">Learn how to properly take your medications and avoid potential interactions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Preventive Care</h3>
                    <p className="text-gray-600">Tips and advice on maintaining good health and preventing common illnesses.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Chronic Condition Management</h3>
                    <p className="text-gray-600">Guidance on managing chronic health conditions for better quality of life.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img  alt="Pharmacist providing advice" className="w-full h-auto rounded-lg" src="https://images.unsplash.com/photo-1696861286643-341a8d7a79e9" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Consult Our Pharmacists</h3>
                    <p className="mb-4">Get professional advice from our team of experienced pharmacists</p>
                    <button className="bg-white text-primary px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                      Book a Consultation
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Popular Products */}
      <FeaturedProducts 
        title="Popular Products" 
        products={popularProducts} 
        viewAllLink="/products?popular=true" 
      />
      
      {/* Service Features */}
      <ServiceFeatures />
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
