import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './components/auth/AuthContext';
import { NotificationProvider } from './components/auth/NotificationContext';
import { CartProvider } from './contexts/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import CookieConsent from './components/shared/CookieConsent';
import ScrollToTop from './components/shared/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import UserOrdersPage from './pages/UserOrdersPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminUsersPage from './pages/AdminUsersPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/Resetpasswordpage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  return (
    <GoogleOAuthProvider clientId="306473157405-fo2qubid2nre5vn86bcneborsm9eccsj.apps.googleusercontent.com">
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <div className="App">
                <Navbar />
                <CookieConsent />
                <main className="main-content">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/tote-bags" element={<ProductsPage categoryProp="Tote Bags" />} />
                    <Route path="/clutches" element={<ProductsPage categoryProp="Clutches" />} />
                    <Route path="/sleeves" element={<ProductsPage categoryProp="Sleeves" />} />
                    <Route path="/products/:productId" element={<ProductDetailsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgetPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    
                    {/* Protected Customer Routes */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/cart" element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/order-confirmation/:orderId" element={
                      <ProtectedRoute>
                        <OrderConfirmationPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/orders" element={
                      <ProtectedRoute>
                        <UserOrdersPage />
                      </ProtectedRoute>
                    } />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminDashboardPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/admin/products" element={
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminProductsPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/admin/orders" element={
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminOrdersPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/admin/users" element={
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminUsersPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/admin/products/create" element={
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <CreateProductPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/admin/products/edit/:productId" element={
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <EditProductPage />
                      </RoleBasedRoute>
                    } />
                    
                    {/* 404 Route */}
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </NotificationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;