import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
    {
        name: 'Electronics',
        image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&q=80',
        description: 'Future-ready tech'
    },
    {
        name: 'Fashion',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80',
        description: 'Timeless elegance'
    },
    {
        name: 'Home',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80',
        description: 'Sanctuary created'
    },
    {
        name: 'Gaming',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
        description: 'Level up'
    }
];

const CategoryShowcase: React.FC = () => {
    return (
        <section className="py-20 container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[800px] md:h-[600px]">
                {categories.map((cat, index) => (
                    <Link
                        to={`/category/${cat.name.toLowerCase()}`}
                        key={cat.name}
                        className={`relative group overflow-hidden rounded-2xl block ${index === 0 || index === 3 ? 'md:col-span-1' : 'md:col-span-1'
                            }`}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-3xl font-heading font-bold text-white mb-2">{cat.name}</h3>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                <p className="text-primary text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    {cat.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryShowcase;
