import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiHeart, FiMoon, FiSun } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { useTheme } from '../../context/ThemeContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';
import SearchModal from '../ui/SearchModal';

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
    const { totalItems, toggleCart } = useShop();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();

    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const nav = navRef.current;
        if (!nav) return;

        // Smart Navbar: Hide on scroll down, show on scroll up
        const showNav = gsap.fromTo(nav,
            { yPercent: 0, autoAlpha: 1 },
            { yPercent: -100, autoAlpha: 0, paused: true, duration: 0.3, ease: "power2.inOut" }
        ).progress(0);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                // If scrolling down and past 100px, hide. If scrolling up, show.
                if (self.direction === 1 && self.scroll() > 100) {
                    showNav.play();
                } else {
                    showNav.reverse();
                }
            }
        });

    }, { scope: navRef });

    // Mobile Menu Animation
    const toggleMobileMenu = () => {
        if (!mobileMenuOpen) {
            setMobileMenuOpen(true);
            gsap.to(mobileMenuRef.current, { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" });
        } else {
            gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.4, ease: "power3.in", onComplete: () => setMobileMenuOpen(false) });
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },

        { name: 'Electronics', path: '/category/electronics' },
        { name: 'Fashion', path: '/category/fashion' },
        { name: 'Home', path: '/category/home' },
        { name: 'Gaming', path: '/category/gaming' },
    ];

    return (
        <>
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <nav
                ref={navRef}
                className={cn(
                    'hidden md:block fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b',
                    'bg-bg-primary/80 backdrop-blur-md border-glass-border py-4'
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-heading font-black tracking-tighter relative group overflow-hidden">
                        <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 pb-1">
                            LUMIERE.
                        </span>
                        <span className="absolute top-0 left-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-accent pb-1">
                            LUMIERE.
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "nav-link text-xs font-bold tracking-[0.15em] uppercase relative overflow-hidden group",
                                    location.pathname === link.path ? "text-accent" : "text-text-secondary"
                                )}
                            >
                                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                <span className="absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-accent">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={toggleTheme}
                            className="text-text-primary hover:text-accent transition-colors"
                        >
                            {theme === 'dark' ? <FiSun size={22} /> : <FiMoon size={22} />}
                        </button>
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="text-text-primary hover:text-accent transition-colors"
                        >
                            <FiSearch size={22} />
                        </button>
                        <Link to="/wishlist" className="text-text-primary hover:text-accent transition-colors relative">
                            <FiHeart size={22} />
                        </Link>
                        <button
                            onClick={toggleCart}
                            className="text-text-primary hover:text-accent transition-colors relative group"
                        >
                            <FiShoppingBag size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-bg-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-text-primary"
                            onClick={toggleMobileMenu}
                        >
                            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    ref={mobileMenuRef}
                    className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-t border-glass-border overflow-hidden h-0 opacity-0"
                >
                    <div className="flex flex-col p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={toggleMobileMenu}
                                className="text-xl font-heading text-text-primary hover:text-accent"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
