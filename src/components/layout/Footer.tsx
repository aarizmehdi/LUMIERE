import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowUpRight } from 'react-icons/fi';

const Footer: React.FC = () => {
    return (
        <footer className="hidden md:block bg-bg-secondary border-t border-border pt-20 pb-10 relative overflow-hidden transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-heading font-black tracking-tighter text-text-primary block">
                            LUMI<span className="text-premium-accent">ERE</span>.
                        </Link>
                        <p className="text-text-secondary leading-relaxed">
                            Elevating the standard of online commerce. <br />
                            Experience luxury in every interaction.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<FiInstagram />} href="#" />
                            <SocialIcon icon={<FiTwitter />} href="#" />
                            <SocialIcon icon={<FiFacebook />} href="#" />
                            <SocialIcon icon={<FiYoutube />} href="#" />
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h4 className="text-text-primary font-bold mb-6 text-lg">Shop</h4>
                        <ul className="space-y-4">
                            <FooterLink to="/shop">All Products</FooterLink>
                            <FooterLink to="/category/fashion">New Arrivals</FooterLink>
                            <FooterLink to="/shop?sort=featured">Best Sellers</FooterLink>
                            <FooterLink to="/shop?sort=sale">Flash Sale</FooterLink>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="text-text-primary font-bold mb-6 text-lg">Support</h4>
                        <ul className="space-y-4">
                            <FooterLink to="#">Contact Us</FooterLink>
                            <FooterLink to="#">FAQ</FooterLink>
                            <FooterLink to="#">Shipping & Returns</FooterLink>
                            <FooterLink to="#">Track Order</FooterLink>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-text-primary font-bold mb-6 text-lg">Company</h4>
                        <ul className="space-y-4">
                            <FooterLink to="#">About Us</FooterLink>
                            <FooterLink to="#">Careers</FooterLink>
                            <FooterLink to="#">Privacy Policy</FooterLink>
                            <FooterLink to="#">Terms of Service</FooterLink>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-muted text-sm">
                        &copy; {new Date().getFullYear()} Lumiere. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-text-muted">
                        <span className="hover:text-text-primary transition-colors cursor-pointer">Privacy</span>
                        <span className="hover:text-text-primary transition-colors cursor-pointer">Terms</span>
                        <span className="hover:text-text-primary transition-colors cursor-pointer">Cookies</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <li>
        <Link to={to} className="text-text-secondary hover:text-accent transition-colors flex items-center group w-fit">
            <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{children}</span>
                <span className="absolute top-0 left-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-accent">{children}</span>
            </span>
            <FiArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ml-1 text-accent text-xs" />
        </Link>
    </li>
);

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary hover:bg-accent hover:text-bg-primary hover:border-accent transition-all duration-300 hover:scale-110"
    >
        {icon}
    </a>
);

export default Footer;
