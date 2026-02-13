import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag, FiStar, FiCheck } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductPreviewModal: React.FC = () => {
    const { selectedProduct, setSelectedProduct, addToCart } = useShop();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Close modal on route change
    React.useEffect(() => {
        setSelectedProduct(null);
    }, [location.pathname, setSelectedProduct]);

    if (!selectedProduct) return null;

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(selectedProduct, 1, undefined, selectedSize || undefined);
        setTimeout(() => setIsAdding(false), 1000);
    };

    const handleViewDetails = () => {
        setSelectedProduct(null);
        navigate(`/product/${selectedProduct.id}`);
    };

    return (
        <AnimatePresence>
            {selectedProduct && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedProduct(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-card-bg w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-border"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-md"
                        >
                            <FiX size={20} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-zinc-900 relative">
                            <img
                                src={selectedProduct.images[0]}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-sm font-bold tracking-widest text-accent uppercase mb-2">
                                        {selectedProduct.category}
                                    </h3>
                                    <h2 className="text-3xl font-heading font-bold text-text-primary mb-2 leading-tight">
                                        {selectedProduct.name}
                                    </h2>
                                </div>
                                <div className="text-2xl font-bold text-text-primary">
                                    ${selectedProduct.price}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6 text-sm">
                                <span className="flex text-yellow-500">
                                    <FiStar className="fill-current" />
                                    <span className="ml-1 text-text-primary font-medium">{selectedProduct.rating}</span>
                                </span>
                                <span className="text-text-muted">•</span>
                                <span className="text-text-muted">{selectedProduct.reviews} reviews</span>
                            </div>

                            <p className="text-text-secondary leading-relaxed mb-8 line-clamp-3">
                                {selectedProduct.description}
                            </p>

                            <div className="space-y-6 mt-auto">
                                {/* Size Selector */}
                                <div>
                                    <span className="text-sm font-bold text-text-primary uppercase tracking-wider block mb-3">Select Size</span>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                                    ? 'bg-text-primary text-bg-primary'
                                                    : 'border border-border text-text-secondary hover:border-text-muted'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdding}
                                        className={`flex-1 py-3 px-6 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${isAdding
                                            ? 'bg-green-500 text-white'
                                            : 'bg-text-primary text-bg-primary hover:opacity-90'
                                            }`}
                                    >
                                        {isAdding ? <><FiCheck /> Added</> : <><FiShoppingBag /> Add to Cart</>}
                                    </button>
                                    <button
                                        onClick={handleViewDetails}
                                        className="py-3 px-6 rounded-full font-bold text-sm uppercase tracking-wider border border-border text-text-primary hover:bg-bg-secondary transition-all"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProductPreviewModal;
