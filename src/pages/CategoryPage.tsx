import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    // Capitalize first letter
    const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    return (
        <div className="min-h-screen pt-24 md:pt-28 bg-bg-primary transition-colors duration-500">
            <div className="container mx-auto px-6 mb-8 md:mb-12 text-center">
                <h1 className="text-5xl md:text-8xl font-heading font-black text-text-primary uppercase tracking-tighter opacity-10 select-none">
                    {formattedCategory}
                </h1>
            </div>
            <ProductGrid category={formattedCategory} />
        </div>
    );
};

export default CategoryPage;
