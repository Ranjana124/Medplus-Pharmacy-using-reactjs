import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Search, Heart, Phone, UploadCloud, ScrollText, LogOut, ClipboardList, UserCircle, LifeBuoy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); 
    closeMenu();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Upload Prescription', path: '/upload-prescription', icon: <UploadCloud size={16} className="mr-1"/> },
    { name: 'Health Tips', path: '/health-tips', icon: <Info size={16} className="mr-1"/> },
    { name: 'Contact', path: '/contact', icon: <LifeBuoy size={16} className="mr-1"/> },
  ];

  return (
    <header className="bg-gradient-to-r from-green-500 to-teal-500 shadow-lg sticky top-0 z-50 text-white">
      <div className="bg-primary/80 backdrop-blur-sm py-2">
        <div className="container mx-auto flex justify-between items-center text-sm px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span>24/7 Support: +91 8660204905</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/profile" className="hover:underline">My Account</Link>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Sign In</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
            <span className="text-3xl font-bold tracking-tight">Medi<span className="text-green-200">Pharm</span></span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex relative w-2/5">
            <input
              type="text"
              placeholder="Search medications, health products..."
              className="w-full py-2.5 px-5 border border-green-400 bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 text-white placeholder-green-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-100 hover:text-white">
              <Search size={22} />
            </button>
          </form>

          <div className="hidden md:flex items-center space-x-5">
            <Link to="/favorites" className="hover:text-green-200 transition-colors flex flex-col items-center">
              <Heart size={24} />
              <span className="text-xs mt-0.5">Wishlist</span>
            </Link>
            <Link to="/cart" className="hover:text-green-200 transition-colors relative flex flex-col items-center">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
              <span className="text-xs mt-0.5">Cart</span>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hover:bg-white/10 focus:bg-white/10 p-0 rounded-full">
                    <div className="flex flex-col items-center">
                      <UserCircle size={24} />
                       <span className="text-xs mt-0.5">{user.name.split(' ')[0]}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4 mt-2 bg-white text-gray-800 shadow-xl rounded-lg border-gray-200">
                  <DropdownMenuLabel className="font-medium">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User size={16} className="mr-2" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center cursor-pointer">
                      <ClipboardList size={16} className="mr-2" /> Orders
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link to="/my-prescriptions" className="flex items-center cursor-pointer">
                      <ScrollText size={16} className="mr-2" /> My Prescriptions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer flex items-center">
                    <LogOut size={16} className="mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
               <Link to="/login" className="flex flex-col items-center hover:text-green-200 transition-colors">
                <UserCircle size={24} />
                <span className="text-xs mt-0.5">Sign In</span>
              </Link>
            )}
          </div>

          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav className="hidden md:flex mt-4 justify-center">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className="nav-link font-medium hover:text-green-200 transition-colors py-2 flex items-center text-sm"
                >
                  {link.icon} {link.name}
                </Link>
              </li>
            ))}
            <li key="/admin/login">
                <Link 
                  to="/admin/login" 
                  className="nav-link font-medium hover:text-green-200 transition-colors py-2 flex items-center text-sm"
                >
                   Admin Login
                </Link>
              </li>
          </ul>
        </nav>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-teal-600 absolute top-full left-0 right-0 shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-5">
            <form onSubmit={handleSearch} className="relative mb-5">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2.5 px-5 border border-green-400 bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 text-white placeholder-green-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-100 hover:text-white">
                <Search size={22} />
              </button>
            </form>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="block py-3 px-2 text-lg rounded-md hover:bg-teal-500 flex items-center"
                    onClick={closeMenu}
                  >
                     {link.icon && React.cloneElement(link.icon, { size: 20, className: "mr-3"})} {link.name}
                  </Link>
                </li>
              ))}
              <li className="border-t border-teal-500 pt-3 mt-3">
                <Link 
                  to="/cart" 
                  className="flex items-center py-3 px-2 text-lg rounded-md hover:bg-teal-500"
                  onClick={closeMenu}
                >
                  <ShoppingCart size={20} className="mr-3" />
                  <span>Cart ({getCartCount()})</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className="flex items-center py-3 px-2 text-lg rounded-md hover:bg-teal-500"
                  onClick={closeMenu}
                >
                  <Heart size={20} className="mr-3" />
                  <span>Wishlist</span>
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className="flex items-center py-3 px-2 text-lg rounded-md hover:bg-teal-500"
                      onClick={closeMenu}
                    >
                      <User size={20} className="mr-3" />
                      <span>Profile</span>
                    </Link>
                  </li>
                   <li>
                    <Link 
                      to="/orders" 
                      className="flex items-center py-3 px-2 text-lg rounded-md hover:bg-teal-500"
                      onClick={closeMenu}
                    >
                      <ClipboardList size={20} className="mr-3" />
                      <span>Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/my-prescriptions" 
                      className="flex items-center py-3 px-2 text-lg rounded-md hover:bg-teal-500"
                      onClick={closeMenu}
                    >
                      <ScrollText size={20} className="mr-3" />
                      <span>My Prescriptions</span>
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center py-3 px-2 text-lg rounded-md hover:bg-teal-500 w-full text-left text-red-300"
                    >
                      <LogOut size={20} className="mr-3" />
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    className="flex items-center py-3 px-2 text-lg rounded-md hover:bg-teal-500"
                    onClick={closeMenu}
                  >
                    <User size={20} className="mr-3" />
                    <span>Sign In / Register</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;