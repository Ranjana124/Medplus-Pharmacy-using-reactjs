
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { PrescriptionProvider } from '@/contexts/PrescriptionContext';
import { WishlistProvider } from '@/contexts/WishlistContext';

import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProfilePage from '@/pages/ProfilePage';
import UploadPrescriptionPage from '@/pages/UploadPrescriptionPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import FavoritesPage from '@/pages/FavoritesPage';
import OrdersPage from '@/pages/OrdersPage';
import HealthTipsPage from '@/pages/HealthTipsPage';
import ContactPage from '@/pages/ContactPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import MyPrescriptionsPage from '@/pages/MyPrescriptionsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminProductsPage from '@/pages/admin/AdminProductsPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PrescriptionProvider>
          <WishlistProvider>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
              </Route>

              {/* Main Routes */}
              <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="upload-prescription" element={<UploadPrescriptionPage />} />
                <Route path="my-prescriptions" element={<MyPrescriptionsPage />} />
                <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="health-tips" element={<HealthTipsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
            <Toaster />
          </WishlistProvider>
        </PrescriptionProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
