import React, { useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from 'react-icons/fi';

const FilterSidebar: React.FC = () => {
    const [priceRange, setPriceRange] = useState([0, 1000]);

    return (
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8 glass-panel p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between md:hidden mb-4">
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <FiFilter /> Filters
                </h3>
                <button className="text-text-secondary hover:text-text-primary">
                    <FiX size={24} />
                </button>
            </div>

            {/* Categories */}
            <FilterSection title="Categories">
                <div className="space-y-2">
                    {['All Products', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'].map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-border bg-transparent checked:bg-accent checked:border-accent transition-colors" />
                            <span className="text-text-muted group-hover:text-text-primary transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range">
                <div className="px-2">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-1 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between text-sm text-text-muted mt-2 font-mono">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </FilterSection>

            {/* Colors */}
            <FilterSection title="Colors">
                <div className="flex flex-wrap gap-3">
                    {['#000000', '#ffffff', '#d4af37', '#e63946', '#3b82f6', '#10b981'].map((color) => (
                        <button
                            key={color}
                            className="w-8 h-8 rounded-full border border-border hover:scale-110 transition-transform relative"
                            style={{ backgroundColor: color }}
                        >
                            {/* Selected Indicator could go here */}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Sizes */}
            <FilterSection title="Sizes">
                <div className="grid grid-cols-4 gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button key={size} className="bg-bg-secondary hover:bg-bg-tertiary text-text-muted hover:text-text-primary rounded-md py-2 text-sm transition-colors border border-transparent hover:border-border">
                            {size}
                        </button>
                    ))}
                </div>
            </FilterSection>

            <button className="w-full py-3 border border-border text-text-primary rounded-lg hover:bg-bg-secondary transition-colors text-sm uppercase tracking-wider">
                Clear All Filters
            </button>
        </aside>
    );
};

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const contentRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (contentRef.current) {
            if (isOpen) {
                gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' });
            } else {
                gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
            }
        }
    }, [isOpen]);

    return (
        <div className="border-b border-border pb-4 last:border-0 last:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-2 text-text-primary font-medium hover:text-accent transition-colors"
            >
                {title}
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <div ref={contentRef} className="overflow-hidden">
                <div className="pt-2 pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
