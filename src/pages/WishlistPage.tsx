import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const WishlistPage: React.FC = () => {
    const { wishlist } = useShop();
    const navigate = useNavigate();

    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-heading font-black text-text-primary mb-4">YOUR WISHLIST</h1>
                <p className="text-text-muted">Curated favorites for later.</p>
            </div>

            {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlistProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <div className="w-24 h-24 bg-bg-secondary/30 rounded-full flex items-center justify-center text-text-muted">
                        <FiHeart size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">Your wishlist is empty</h2>
                    <p className="text-text-muted">Start exploring our collection to find your next favorite.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Explore Collection
                    </button>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
