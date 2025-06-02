
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, CreditCard, Shield, Heart, LogOut, ScrollText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '@/components/profile/ProfileInfo';
import OrderHistory from '@/components/profile/OrderHistory';
import Wishlist from '@/components/profile/Wishlist';
import PaymentMethods from '@/components/profile/PaymentMethods';
import AccountSecurity from '@/components/profile/AccountSecurity';
import MyPrescriptions from '@/components/profile/MyPrescriptions'; 

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User, component: <ProfileInfo profileData={user} setProfileData={updateUser} /> },
    { id: 'orders', label: 'Order History', icon: ShoppingBag, component: <OrderHistory /> },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart, component: <Wishlist /> },
    { id: 'prescriptions', label: 'My Prescriptions', icon: ScrollText, component: <MyPrescriptions /> },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard, component: <PaymentMethods /> },
    { id: 'security', label: 'Account Security', icon: Shield, component: <AccountSecurity /> },
  ];

  const renderActiveTab = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab ? tab.component : null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center mb-3">
                  <span className="text-4xl font-bold text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors
                      ${activeTab === tab.id 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                      }`}
                  >
                    <tab.icon size={18} className="mr-3" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>
          <main className="md:w-3/4">
            {renderActiveTab()}
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
