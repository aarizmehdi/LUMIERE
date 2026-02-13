import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiEye, FiHeart } from 'react-icons/fi';
import type { Product } from '../../data/products';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, addToWishlist, wishlist, setSelectedProduct } = useShop();
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const requestRef = useRef<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!contentRef.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;

        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
        requestRef.current = requestAnimationFrame(() => {
            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    rotationY: mouseX * 20,
                    rotationX: -mouseY * 20,
                    duration: 0.5,
                    ease: "power2.out",
                    transformPerspective: 1000,
                    transformOrigin: "center",
                    overwrite: "auto"
                });
            }
        });
    };

    const handleMouseLeave = () => {
        if (!contentRef.current) return;
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
        gsap.to(contentRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    const isWishlisted = wishlist.includes(product.id);

    return (
        <div
            ref={cardRef}
            onClick={() => setSelectedProduct(product)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group w-full aspect-[4/5] perspective-1000 cursor-pointer active:scale-[0.98] transition-transform duration-200"
        >
            <div
                ref={contentRef}
                className="w-full h-full absolute inset-0 bg-secondary/80 backdrop-blur-md rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl border border-white/5 transform-style-3d hover:-translate-y-2 will-change-transform"
            >
                <div className="h-[65%] w-full relative bg-product-light dark:bg-product-dark transition-colors duration-500">
                    {!isImageLoaded && (
                        <div className="absolute inset-0 animate-pulse bg-product-light dark:bg-product-dark" />
                    )}

                    <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        onLoad={() => setIsImageLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    />

                    {product.stock < 5 && (
                        <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-20" title="Low Stock" />
                    )}

                    <button
                        onClick={(e) => { e.stopPropagation(); addToWishlist(product.id); }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 hover:scale-110 ${isWishlisted ? 'bg-white/90 text-red-500 shadow-sm' : 'bg-black/20 text-white hover:bg-white/30'}`}
                    >
                        <FiHeart className={isWishlisted ? "fill-current" : ""} size={16} />
                    </button>

                    <div className="absolute inset-x-4 bottom-4 hidden md:flex justify-between items-center bg-white/10 backdrop-blur-md rounded-2xl p-1.5 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                            className="flex-1 bg-white text-black text-xs font-bold py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                            className="p-2.5 ml-1.5 text-white hover:bg-black/20 rounded-xl transition-colors"
                        >
                            <FiEye size={16} />
                        </button>
                    </div>
                </div>

                <div className="h-[35%] p-5 flex flex-col justify-center bg-card-bg transition-colors duration-500">
                    <div className="flex justify-between items-start w-full mb-1">
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-[15px] font-semibold text-text-primary leading-tight truncate pr-2 tracking-tight">
                                {product.name}
                            </h3>
                            <p className="text-xs text-text-secondary font-medium">{product.category}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[15px] font-semibold text-text-primary tracking-tight">${product.price}</span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-yellow-500">
                            <span className="text-xs">★</span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{product.rating}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[10px] text-gray-400">{product.reviews} reviews</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
