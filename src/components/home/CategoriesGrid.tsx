import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { id: 1, name: "Premium Electronics", count: "240 items", gradient: "from-blue-600 to-cyan-400", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80" },
    { id: 2, name: "Luxury Fashion", count: "180 items", gradient: "from-stone-500 to-neutral-400", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80" },
    { id: 3, name: "Home Excellence", count: "120 items", gradient: "from-emerald-600 to-teal-400", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80" },
    { id: 4, name: "Beauty & Wellness", count: "95 items", gradient: "from-pink-600 to-rose-400", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80" },
    { id: 5, name: "Sports Performance", count: "150 items", gradient: "from-orange-600 to-red-400", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" },
    { id: 6, name: "Lifestyle Essentials", count: "80 items", gradient: "from-yellow-500 to-amber-300", img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80" },
];

const CategoriesGrid: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.category-card');

        // Entrance Animation
        gsap.from(cards, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

        // Optimized 3D Tilt Effect
        cards.forEach((card) => {
            const content = card.querySelector('.card-content') as HTMLElement;

            // GSAP QuickTo for high performance updates
            const xTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3" });
            const xMove = gsap.quickTo(content, "x", { duration: 0.4, ease: "power3" });
            const yMove = gsap.quickTo(content, "y", { duration: 0.4, ease: "power3" });

            // Cache dimensions to avoid layout thrashing
            let bounds = card.getBoundingClientRect();

            const onEnter = () => {
                bounds = card.getBoundingClientRect();
                gsap.to(card, { scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)", duration: 0.5 });
            };

            const onMove = (e: MouseEvent) => {
                if (window.innerWidth < 1024) return;

                const x = e.clientX - bounds.left;
                const y = e.clientY - bounds.top;

                const centerX = bounds.width / 2;
                const centerY = bounds.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                xTo(rotateY);
                yTo(rotateX);
                xMove((x - centerX) * 0.05);
                yMove((y - centerY) * 0.05);
            };

            const onLeave = () => {
                xTo(0);
                yTo(0);
                xMove(0);
                yMove(0);
                gsap.to(card, { scale: 1, boxShadow: "none", duration: 0.5 });
            };

            card.addEventListener('mouseenter', onEnter);
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);

            return () => {
                card.removeEventListener('mouseenter', onEnter);
                card.removeEventListener('mousemove', onMove);
                card.removeEventListener('mouseleave', onLeave);
            };
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 bg-bg-primary relative z-10 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                        Explore Categories
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="category-card group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer transform-gpu perspective-1000"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-gray-200 transition-transform duration-700 group-hover:scale-110 will-change-transform"
                                style={{ backgroundImage: `url(${cat.img})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-60 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-80`} />

                            {/* Dark Gradient from bottom for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

                            {/* Content */}
                            <div className="card-content absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 will-change-transform">
                                <span className="block text-primary text-sm font-bold tracking-widest uppercase mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    {cat.count}
                                </span>
                                <h3 className="text-3xl font-heading font-bold text-white mb-4">
                                    {cat.name}
                                </h3>
                                <div className="flex items-center gap-2 text-white/80 group-hover:text-primary transition-colors duration-300">
                                    <span className="text-sm font-medium">Explore Collection</span>
                                    <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </div>
                            </div>

                            {/* Shinier Border */}
                            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:border-white/30 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesGrid;
