
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Medi<span className="text-primary">Pharm</span></h3>
            <p className="text-gray-400 mb-4">Your trusted online pharmacy for all your healthcare needs. We provide quality medications and health products with professional care.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/products?category=prescription" className="text-gray-400 hover:text-primary transition-colors">Prescriptions</Link>
              </li>
              <li>
                <Link to="/health-tips" className="text-gray-400 hover:text-primary transition-colors">Health Tips</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=medications" className="text-gray-400 hover:text-primary transition-colors">Medications</Link>
              </li>
              <li>
                <Link to="/products?category=vitamins" className="text-gray-400 hover:text-primary transition-colors">Vitamins & Supplements</Link>
              </li>
              <li>
                <Link to="/products?category=personal-care" className="text-gray-400 hover:text-primary transition-colors">Personal Care</Link>
              </li>
              <li>
                <Link to="/products?category=first-aid" className="text-gray-400 hover:text-primary transition-colors">First Aid</Link>
              </li>
              <li>
                <Link to="/products?category=baby-care" className="text-gray-400 hover:text-primary transition-colors">Baby Care</Link>
              </li>
              <li>
                <Link to="/products?category=medical-devices" className="text-gray-400 hover:text-primary transition-colors">Medical Devices</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-400">456, Electronic City, Bengaluru, KA 560100</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary flex-shrink-0" />
                <span className="text-gray-400">+91 8660204905</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary flex-shrink-0" />
                <span className="text-gray-400">support@medipharm.co.in</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="font-medium mb-2">Business Hours</h5>
              <p className="text-gray-400">Monday - Friday: 8am - 10pm</p>
              <p className="text-gray-400">Saturday - Sunday: 9am - 7pm</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 MediPharm. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</Link>
              <Link to="/shipping-policy" className="text-gray-400 hover:text-primary text-sm transition-colors">Shipping Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
