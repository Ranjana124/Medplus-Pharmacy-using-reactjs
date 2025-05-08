
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    content: 'MediPharm has been my go-to pharmacy for the past year. Their delivery is always on time, and their customer service is exceptional. I appreciate how they follow up to ensure I\'m taking my medications correctly.',
    rating: 5,
    image: 'woman-smiling'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Chronic Care Patient',
    content: 'As someone who needs regular medication, I can\'t express how much MediPharm has simplified my life. Their automatic refill system ensures I never run out of my essential medications.',
    rating: 5,
    image: 'asian-man-smiling'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'New Parent',
    content: 'When my baby got sick in the middle of the night, MediPharm\'s 24/7 pharmacist consultation was a lifesaver. They guided me through which medications were safe and even delivered them within hours.',
    rating: 4,
    image: 'woman-with-baby'
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Trusted by thousands of customers for their healthcare needs
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img  alt={testimonial.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1677696795873-ca21e7d76a51" />
                </div>
              </div>
              
              <div className="pt-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 text-center italic">"{testimonial.content}"</p>
                
                <div className="text-center">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
