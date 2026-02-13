import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ShopProvider } from './context/ShopContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/layout/Navbar';
import MobileHeader from './components/layout/MobileHeader';
import Footer from './components/layout/Footer';
import MobileFooter from './components/layout/MobileFooter';
import CartDrawer from './components/cart/CartDrawer';
import GlobalBackground from './components/ui/GlobalBackground';
import SmoothCursor from './components/ui/SmoothCursor';
import ProductPreviewModal from './components/ui/ProductPreviewModal';
import BottomNav from './components/layout/BottomNav';
import SmoothScroll from './components/layout/SmoothScroll';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.globalTimeline.timeScale(1000);
    });
  }, []);

  return (
    <ThemeProvider>
      <ShopProvider>
        <Router>
          <SmoothScroll>
            <ScrollToTop />
            <div className="app bg-bg-primary min-h-screen transition-colors duration-500 relative">
              <GlobalBackground />
              <SmoothCursor />
              <Navbar />
              <MobileHeader />

              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />

                  <Route path="/products/all" element={<ShopPage />} />

                  <Route path="*" element={
                    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                      <h1 className="text-6xl font-heading font-bold text-text-primary mb-4">404</h1>
                      <p className="text-text-muted mb-8">Page not found.</p>
                      <a href="/" className="btn-primary">Return Home</a>
                    </div>
                  } />
                </Routes>
              </main>

              <Footer />
              <MobileFooter />
              <CartDrawer />
              <ProductPreviewModal />
              <BottomNav />
            </div>
          </SmoothScroll>
        </Router>
      </ShopProvider>
    </ThemeProvider>
  );
};

export default App;