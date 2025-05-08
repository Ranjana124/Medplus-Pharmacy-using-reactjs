
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have this or will create it
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <Mail className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Get In Touch</h1>
          <p className="text-lg text-gray-600 mt-2">We'd love to hear from you. Send us a message or visit us.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">Our Address</h3>
                  <p className="text-gray-600">439 Electronic city, Bengaluru, Karnataka, 560100, India</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">Email Us</h3>
                  <a href="mailto:info@medipharm.co.in" className="text-primary hover:underline">info@medipharm.co.in</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">Call Us</h3>
                  <p className="text-gray-600">+91 8660204905</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
               <img  alt="Map showing pharmacy location in Bengaluru" className="w-full h-64 rounded-lg object-cover" src="/images/contact.jpg" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input type="text" id="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input type="text" id="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} value={formData.message} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <><Send size={18} className="mr-2" /> Send Message</>}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
