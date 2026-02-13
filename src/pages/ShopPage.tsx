import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import { products } from '../data/products';

const ShopPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('featured');

    // Placeholder for filtered products logic (would connect to Sidebar content in a real app)
    const filteredProducts = useMemo(() => {
        let result = [...products, ...products]; // Duplicating for demo volume
        return result.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });
    }, [sortBy]);

    return (
        <div className="min-h-screen bg-bg-primary pt-24 pb-20">
            {/* Header / Breadcrumb Area */}
            <div className="bg-bg-secondary/30 border-y border-border py-12 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient opacity-30 animate-pulse-slow" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-text-primary mb-4">The Collection</h1>
                    <p className="text-text-secondary max-w-xl mx-auto">Curated artifacts of luxury for the modern connoisseur.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <FilterSidebar />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-bg-secondary/20 p-4 rounded-xl border border-border backdrop-blur-sm">
                        <div className="text-text-secondary text-sm mb-4 md:mb-0">
                            Showing <span className="text-text-primary font-bold">{filteredProducts.length}</span> results
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Sort Dropdown */}
                            <div className="relative group">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border)] rounded-full pl-6 pr-12 py-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)] transition-all cursor-pointer shadow-sm hover:shadow-md min-w-[180px]"
                                >
                                    <option value="featured" className="bg-[var(--card-bg)] text-[var(--text-primary)]">Sort: Featured</option>
                                    <option value="newest" className="bg-[var(--card-bg)] text-[var(--text-primary)]">Sort: Newest</option>
                                    <option value="price-asc" className="bg-[var(--card-bg)] text-[var(--text-primary)]">Price: Low to High</option>
                                    <option value="price-desc" className="bg-[var(--card-bg)] text-[var(--text-primary)]">Price: High to Low</option>
                                </select>
                                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                            </div>

                            {/* View Toggle */}
                            <div className="flex bg-bg-secondary/40 rounded-lg p-1 border border-border">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-primary text-black shadow-lg' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-primary text-black shadow-lg' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <FiList />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <motion.div
                        layout
                        className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
                    >
                        <AnimatePresence>
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={`${product.id}-${index}`} product={product} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-16 gap-2">
                        {[1, 2, 3, 4, '...'].map((page, i) => (
                            <button
                                key={i}
                                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors ${i === 0 ? 'bg-primary text-black font-bold' : 'text-text-muted hover:bg-bg-secondary hover:text-text-primary'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="px-4 h-10 rounded-full border border-border text-text-muted hover:bg-bg-secondary hover:text-text-primary transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
