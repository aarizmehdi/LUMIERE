import React from 'react';
import HeroSection from '../components/layout/HeroSection';
import FeaturedCollection from '../components/ui/FeaturedCollection';
import ProductGrid from '../components/product/ProductGrid';
import CategoriesGrid from '../components/home/CategoriesGrid';
import FlashDeals from '../components/home/FlashDeals';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import MobileHomePage from './MobileHomePage';

const HomePage: React.FC = () => {
    return (
        <div className="bg-bg-primary overflow-hidden transition-colors duration-500">
            <div className="md:hidden">
                <MobileHomePage />
            </div>

            <div className="hidden md:block">
                <HeroSection />
                <FeaturedCollection />
                <CategoriesGrid />
                <FlashDeals />

                <div className="container mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500 font-bold tracking-widest uppercase mb-2 block">Curated For You</span>
                        <h2 className="text-4xl font-heading font-bold text-text-primary mb-4">Latest Drops</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-accent to-orange-500 mx-auto rounded-full" />
                    </div>
                    <ProductGrid />
                </div>

                <Testimonials />
                <Newsletter />
            </div>
        </div>
    );
};

export default HomePage;
