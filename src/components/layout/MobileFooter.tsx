import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const MobileFooter: React.FC = () => {
    return (
        <footer className="py-8 px-6 pb-24 text-center border-t border-border/50 bg-bg-primary md:hidden">
            <div className="flex justify-center gap-6 mb-6">
                <a href="#" className="p-2 rounded-full bg-bg-secondary text-text-secondary hover:text-accent transition-colors">
                    <FiInstagram size={18} />
                </a>
                <a href="#" className="p-2 rounded-full bg-bg-secondary text-text-secondary hover:text-accent transition-colors">
                    <FiTwitter size={18} />
                </a>
                <a href="#" className="p-2 rounded-full bg-bg-secondary text-text-secondary hover:text-accent transition-colors">
                    <FiFacebook size={18} />
                </a>
            </div>

            <p className="text-xs text-text-muted mb-2">
                &copy; {new Date().getFullYear()} Lumiere. All rights reserved.
            </p>
            <div className="flex justify-center gap-4 text-[10px] text-text-muted tracking-wide uppercase">
                <span>Privacy</span>
                <span>•</span>
                <span>Terms</span>
                <span>•</span>
                <span>Support</span>
            </div>
        </footer>
    );
};

export default MobileFooter;
