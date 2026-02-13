import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiHeart, FiShoppingBag, FiSearch } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav: React.FC = () => {
    const { totalItems, toggleCart } = useShop();
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { icon: FiHome, path: '/', name: 'Home' },
        { icon: FiGrid, path: '/shop', name: 'Shop' },
        { icon: FiSearch, action: 'search', name: 'Search' }, // Placeholder for now, can trigger modal
        { icon: FiHeart, path: '/wishlist', name: 'Saved' },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe"
                >
                    <div className="bg-bg-primary/80 backdrop-blur-xl border-t border-border px-6 py-3 flex justify-between items-center pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                        {navItems.map((item) => (
                            item.path ? (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === item.path ? 'text-accent' : 'text-text-secondary'
                                        }`}
                                >
                                    <item.icon size={22} className={location.pathname === item.path ? "fill-current/20" : ""} />
                                    {/* <span className="text-[10px] font-medium">{item.name}</span> */}
                                </Link>
                            ) : (
                                <button
                                    key={item.name}
                                    onClick={() => {/* Trigger Search Modal - To be implemented if needed */ }}
                                    className="flex flex-col items-center gap-1 text-text-secondary"
                                >
                                    <item.icon size={22} />
                                </button>
                            )
                        ))}

                        {/* Cart Item - Handled Separately for Badge */}
                        <button
                            onClick={toggleCart}
                            className="flex flex-col items-center gap-1 text-text-secondary relative"
                        >
                            <FiShoppingBag size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-accent text-bg-primary text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BottomNav;
