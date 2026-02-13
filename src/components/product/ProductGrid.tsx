import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

interface ProductGridProps {
    category?: string;
    title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, title }) => {
    const [activeCategory, setActiveCategory] = useState(category || 'All');
    const [sortBy, setSortBy] = useState('featured');

    const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Gaming'];

    // Update active category if prop changes
    useEffect(() => {
        if (category) setActiveCategory(category);
    }, [category]);

    const filteredProducts = useMemo(() => {
        let result = products;
        if (activeCategory !== 'All') {
            result = result.filter(p =>
                p.category.toLowerCase() === activeCategory.toLowerCase() ||
                p.collections?.some(c => c.toLowerCase() === activeCategory.toLowerCase())
            );
        }

        return result.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });
    }, [activeCategory, sortBy]);

    return (
        <section className="py-20 px-6 container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-heading font-bold text-text-primary">{title || "Curated Collection"}</h2>
                    <p className="text-text-muted">Discover excellence in every category.</p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    {/* Categories - Only show if no fixed category provided */}
                    {!category && (
                        <div className="flex bg-bg-secondary/50 p-1 rounded-full backdrop-blur-md border border-glass-border overflow-x-auto max-w-full">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                        ? 'bg-accent text-bg-primary shadow-lg'
                                        : 'text-text-muted hover:text-text-primary'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Sort */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border)] rounded-full pl-6 pr-12 py-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)] transition-all cursor-pointer shadow-sm hover:shadow-md"
                        >
                            <option value="featured" className="bg-[var(--card-bg)] text-[var(--text-primary)]">Featured</option>
                            <option value="price-asc" className="bg-[var(--card-bg)] text-[var(--text-primary)]">Price: Low to High</option>
                            <option value="price-desc" className="bg-[var(--card-bg)] text-[var(--text-primary)]">Price: High to Low</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.05
                        }
                    }
                }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found in this category.
                </div>
            )}
        </section>
    );
};

export default ProductGrid;
