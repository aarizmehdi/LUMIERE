import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';


const MobileHeader: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-border/50 md:hidden transition-colors duration-300">
            <div className="text-xl font-heading font-black tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">
                    LUMIERE.
                </span>
            </div>
            <div className="flex gap-4">
                <button className="p-2 bg-bg-secondary rounded-full text-text-primary hover:text-accent transition-colors">
                    <FiSearch size={18} />
                </button>
                <button className="p-2 bg-bg-secondary rounded-full text-text-primary relative hover:text-accent transition-colors">
                    <FiBell size={18} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-primary"></span>
                </button>
            </div>
        </header>
    );
};

export default MobileHeader;
