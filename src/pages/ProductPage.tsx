import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiShoppingBag, FiHeart, FiStar, FiTruck, FiShield, FiRotateCcw, FiPlus, FiMinus, FiChevronDown, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const AccordionItem = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
                duration: 0.4,
                ease: "power2.inOut"
            });
        }
    }, [isOpen]);

    return (
        <div className="border-t border-border overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex justify-between items-center text-left text-sm font-bold uppercase tracking-wider text-text-primary hover:text-accent transition-colors"
            >
                {title}
                <FiChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div ref={contentRef} className="h-0 opacity-0 text-text-secondary leading-relaxed text-sm pb-4">
                {children}
            </div>
        </div>
    );
};

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart, addToWishlist, wishlist } = useShop();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    const product = products.find(p => p.id === id);
    const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    useGSAP(() => {
        if (!product) return;
        const tl = gsap.timeline();

        tl.from(galleryRef.current?.children || [], {
            y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out"
        })
            .from(infoRef.current, {
                x: 20, opacity: 0, duration: 1, ease: "power3.out"
            }, "-=0.8");

    }, { scope: containerRef, dependencies: [id] });

    if (!product) return <div className="h-screen flex items-center justify-center text-text-primary">Product not found</div>;

    const isWishlisted = wishlist.includes(product.id);
    const sizes = ['XS', 'S', 'M', 'L', 'XL']; // Example sizes

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, quantity); // Assume simplified cart handling for demo
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <div ref={containerRef} className="bg-bg-primary min-h-screen text-text-primary transition-colors duration-500 pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-[1400px]">

                {/* Main Product Layout */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* LEFT: Vertical Scrolling Gallery (The "Visual" Experience) */}
                    <div ref={galleryRef} className="w-full lg:w-[60%] flex flex-col gap-6">
                        {product.images.map((img, idx) => (
                            <div key={idx} className="w-full bg-bg-secondary rounded-[2rem] overflow-hidden group border border-border">
                                <img
                                    src={img}
                                    alt={`${product.name} view ${idx + 1}`}
                                    onClick={() => setSelectedImage(img)}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
                                />
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Sticky Product Info (The "Functional" Experience) */}
                    <div className="w-full lg:w-[40%] relative">
                        <div ref={infoRef} className="lg:sticky lg:top-32 space-y-8">

                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase">
                                        {product.category}
                                    </h2>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium bg-yellow-500/10 px-2 py-1 rounded-full">
                                        <FiStar className="fill-current" />
                                        <span>{product.rating}</span>
                                        <span className="text-text-muted ml-1">({product.reviews})</span>
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight tracking-tight text-text-primary">
                                    {product.name}
                                </h1>

                                <div className="flex items-baseline gap-4 border-b border-border pb-6">
                                    <span className="text-3xl font-medium tracking-tight text-text-primary">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-text-muted line-through font-light">${product.originalPrice}</span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-text-secondary leading-relaxed text-lg font-light">
                                {product.description}
                            </p>

                            {/* Selectors */}
                            <div className="space-y-6">
                                {/* Size Selector */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold uppercase tracking-wider text-text-primary">Select Size</span>
                                        <button className="text-text-muted underline hover:text-text-primary">Size Guide</button>
                                    </div>
                                    <div className="grid grid-cols-5 gap-3">
                                        {sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`py-3 rounded-xl border font-medium transition-all duration-200 ${selectedSize === size
                                                    ? 'bg-text-primary text-bg-primary border-transparent shadow-lg scale-105'
                                                    : 'border-border text-text-secondary hover:border-text-muted'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Colors (if any) */}
                                {product.colors && (
                                    <div className="space-y-3">
                                        <span className="text-sm font-bold uppercase tracking-wider block text-text-primary">Color</span>
                                        <div className="flex gap-4">
                                            {product.colors.map(color => (
                                                <button
                                                    key={color}
                                                    className="w-12 h-12 rounded-full border-2 border-border shadow-xl focus:ring-2 focus:ring-offset-2 ring-text-primary relative group"
                                                    style={{ backgroundColor: color }}
                                                >
                                                    <div className="absolute inset-0 rounded-full shadow-inner opacity-0 group-hover:opacity-20 bg-black transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Add to Cart Actions */}
                            <div className="flex gap-4 pt-6">
                                <div className="flex items-center bg-bg-secondary rounded-full px-4 border border-border">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-accent text-text-primary"><FiMinus /></button>
                                    <span className="w-8 text-center font-medium text-lg text-text-primary">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-accent text-text-primary"><FiPlus /></button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className={`flex-1 py-4 px-8 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 ${isAdding ? 'bg-green-500 text-white' : 'bg-text-primary text-bg-primary hover:bg-opacity-90'
                                        }`}
                                >
                                    {isAdding ? 'Added to Cart' : <><FiShoppingBag /> Add to Cart</>}
                                </button>
                                <button
                                    onClick={() => addToWishlist(product.id)}
                                    className={`p-4 rounded-full border transition-all duration-300 ${isWishlisted
                                        ? 'bg-red-50 text-red-500 border-red-200'
                                        : 'border-border hover:border-text-muted text-text-secondary'
                                        }`}
                                >
                                    <FiHeart className={isWishlisted ? "fill-current" : ""} size={24} />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2 py-6 border-b border-border">
                                {[
                                    { icon: FiTruck, label: "Free Shipping" },
                                    { icon: FiShield, label: "2 Year Warranty" },
                                    { icon: FiRotateCcw, label: "Free Returns" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                                        <div className="p-3 bg-bg-secondary rounded-full text-text-primary">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 text-text-secondary">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Accordions */}
                            <div className="space-y-2">
                                <AccordionItem title="Product Details" defaultOpen>
                                    Crafted with precision and care, this piece exemplifies our commitment to quality.
                                    Made from premium materials sourced ethically, it is designed to stand the test of time both in style and durability.
                                </AccordionItem>
                                <AccordionItem title="Shipping & Returns">
                                    We offer free express shipping on all orders over $200.
                                    If you are not completely satisfied, you can return your item within 30 days for a full refund.
                                </AccordionItem>
                                <AccordionItem title="Care Instructions">
                                    Wipe clean with a soft, dry cloth. Avoid exposure to direct sunlight and moisture to maintain the finish.
                                </AccordionItem>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-40 border-t border-border pt-20">
                    <h3 className="text-3xl font-bold mb-12 text-text-primary">You may also like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>

            </div>

            {/* Image Preview Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <div className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                            <FiX size={32} />
                        </div>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Full Screen View"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductPage;
