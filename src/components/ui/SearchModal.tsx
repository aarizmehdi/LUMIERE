import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight, FiTrendingUp, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    // Lock body scroll when open & Keyboard Shortcuts
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                // We'd need a way to open it from here if we had access to setter, 
                // but usually this listener is global. For now just focus if open.
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const filteredProducts = query
        ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
        : [];

    const handleNavigate = (id: string) => {
        navigate(`/product/${id}`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-0 left-0 right-0 z-[101] p-4 md:p-12 flex justify-center"
                    >
                        <div className="w-full max-w-3xl bg-bg-primary border border-glass-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                            <div className="flex items-center p-6 border-b border-border">
                                <FiSearch className="text-accent mr-4" size={24} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for luxury..."
                                    className="flex-1 bg-transparent text-2xl text-text-primary placeholder-text-muted focus:outline-none font-heading"
                                />
                                <div className="hidden md:flex gap-2 items-center text-xs text-text-muted font-mono border border-border px-2 py-1 rounded mr-4">
                                    <span>ESC</span> to close
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition-colors text-text-muted hover:text-text-primary">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="p-6 min-h-[300px]">
                                {query === '' ? (
                                    <div className="animate-fade-in">
                                        <div className="mb-8">
                                            <h4 className="flex items-center gap-2 text-sm text-text-secondary uppercase tracking-widest mb-4">
                                                <FiTrendingUp /> Trending Now
                                            </h4>
                                            <div className="flex gap-3 flex-wrap">
                                                {['Cyberpunk Hoodie', 'Neon Sneakers', 'Holographic Bag', 'Smart Ring'].map((tag, i) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setQuery(tag)}
                                                        className="px-4 py-2 rounded-full bg-bg-secondary hover:bg-accent/10 hover:text-accent transition-all border border-border hover:border-accent/50 text-sm text-text-primary"
                                                        style={{ animationDelay: `${i * 100}ms` }}
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm text-text-secondary uppercase tracking-widest mb-4">
                                                <FiClock /> Recent Searches
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="text-text-muted text-sm italic">No recent searches</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {filteredProducts.map((product, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                key={product.id}
                                                onClick={() => handleNavigate(product.id)}
                                                className="flex items-center gap-4 p-4 hover:bg-bg-secondary rounded-xl cursor-pointer group transition-colors border border-transparent hover:border-border"
                                            >
                                                <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                                                <div className="flex-grow">
                                                    <h4 className="text-text-primary text-lg font-medium group-hover:text-accent transition-colors">{product.name}</h4>
                                                    <p className="text-text-secondary text-sm">{product.category}</p>
                                                </div>
                                                <span className="text-accent font-bold font-mono">${product.price}</span>
                                                <FiArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-text-muted" />
                                            </motion.div>
                                        ))}
                                        {filteredProducts.length === 0 && (
                                            <div className="text-center text-text-muted py-12">
                                                <p className="text-lg">No results found for "{query}"</p>
                                                <p className="text-sm mt-2">Try checking your spelling or using different keywords.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="bg-bg-secondary p-4 text-center text-xs text-text-muted border-t border-border">
                                Search powered by Lumiere Intelligence
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
