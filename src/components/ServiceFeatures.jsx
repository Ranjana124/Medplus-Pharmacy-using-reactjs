
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Clock, HeartPulse, Pill, Phone } from 'lucide-react';

const features = [
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Free Delivery',
    description: 'Free shipping on all orders over $50'
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Secure Payments',
    description: 'Protected and encrypted transactions'
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: 'Quick Delivery',
    description: 'Get your medications within 24-48 hours'
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    title: 'Quality Assurance',
    description: 'All products are verified and authentic'
  },
  {
    icon: <Pill className="h-10 w-10 text-primary" />,
    title: 'Prescription Services',
    description: 'Easy upload and refill of prescriptions'
  },
  {
    icon: <Phone className="h-10 w-10 text-primary" />,
    title: '24/7 Support',
    description: 'Professional assistance whenever you need'
  }
];

const ServiceFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose MediPharm
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We provide exceptional pharmacy services with a focus on customer satisfaction and healthcare excellence.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
