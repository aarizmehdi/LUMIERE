import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

interface ShopContextType {
    cart: CartItem[];
    wishlist: string[];
    isCartOpen: boolean;
    addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
    removeFromCart: (id: string, color?: string, size?: string) => void;
    updateQuantity: (id: string, quantity: number, color?: string, size?: string) => void;
    toggleCart: () => void;
    addToWishlist: (id: string) => void;
    subtotal: number;
    totalItems: number;
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
        setCart(prev => {
            const existing = prev.find(item =>
                item.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size
            );

            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.selectedColor === color && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string, color?: string, size?: string) => {
        setCart(prev => prev.filter(item =>
            !(item.id === id && item.selectedColor === color && item.selectedSize === size)
        ));
    };

    const updateQuantity = (id: string, quantity: number, color?: string, size?: string) => {
        if (quantity < 1) {
            removeFromCart(id, color, size);
            return;
        }
        setCart(prev => prev.map(item =>
            (item.id === id && item.selectedColor === color && item.selectedSize === size)
                ? { ...item, quantity }
                : item
        ));
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToWishlist = (id: string) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <ShopContext.Provider value={{
            cart,
            wishlist,
            isCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            addToWishlist,
            subtotal,
            totalItems,
            selectedProduct,
            setSelectedProduct,
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) throw new Error('useShop must be used within a ShopProvider');
    return context;
};
