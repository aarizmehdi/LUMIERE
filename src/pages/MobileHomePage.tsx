import React from 'react';

import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const MobileHomePage: React.FC = () => {
    const feedProducts = products.slice(0, 8);

    const categories = [
        { name: 'All', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=100&q=80' },
        { name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=100&q=80' },
        { name: 'Tech', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80' },
        { name: 'Home', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=100&q=80' },
        { name: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=100&q=80' },
    ];

    return (
        <div className="min-h-screen pb-24 bg-bg-primary text-text-primary">
            <div className="py-4 px-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-4">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group min-w-[60px]">
                            <div className="w-[60px] h-[60px] rounded-full p-[2px] bg-gradient-to-tr from-accent to-orange-500">
                                <div className="w-full h-full rounded-full border-2 border-bg-primary overflow-hidden">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                            <span className="text-xs font-bold text-text-secondary">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 mb-8">
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden relative shadow-lg">
                    <img
                        src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80"
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">New Collection</span>
                        <h2 className="text-white text-2xl font-bold leading-tight">Summer Essentials</h2>
                    </div>
                </div>
            </div>

            <div className="px-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-text-primary">Trending Now</h3>
                    <span className="text-xs font-bold text-accent uppercase">View All</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {feedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileHomePage;
