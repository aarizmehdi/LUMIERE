import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import CartItem from './CartItem';

const CartDrawer: React.FC = () => {
    const { isCartOpen, toggleCart, cart, subtotal } = useShop();
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-secondary border-l border-border shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <FiShoppingBag className="text-accent" size={24} />
                                <h2 className="text-xl font-heading font-bold text-text-primary">Your Cart</h2>
                                <span className="bg-bg-tertiary text-text-secondary text-xs px-2 py-1 rounded-full">{cart.length} items</span>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-bg-tertiary rounded-full transition-colors text-text-muted hover:text-text-primary"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-2">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center text-gray-500">
                                        <FiShoppingBag size={32} />
                                    </div>
                                    <p className="text-text-muted">Your cart is empty.</p>
                                    <button onClick={toggleCart} className="text-primary hover:underline">
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <CartItem key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} item={item} />
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-glass-border bg-secondary/20">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-text-primary pt-3 border-t border-glass-border/50">
                                        <span>Total</span>
                                        <span className="text-primary">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { toggleCart(); navigate('/checkout'); }}
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                >
                                    Checkout
                                    <FiArrowRight />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
