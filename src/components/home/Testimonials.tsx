import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiStar } from 'react-icons/fi';

const testimonials = [
    { id: 1, name: "Sarah L.", role: "Influencer", text: "Absolutely stunning quality. The unboxing experience was as premium as the product itself.", rating: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "James D.", role: "CEO", text: "Efficiency meets luxury. The fastest delivery I've ever experienced.", rating: 5, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Elena R.", role: "Designer", text: "A masterpiece of e-commerce design. Browsing feels like an art gallery tour.", rating: 5, img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const Testimonials: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".testimonial-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-bg-primary relative overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                        Client Voices
                    </h2>
                    <p className="text-text-secondary">Join thousands of satisfied connoisseurs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="testimonial-card glass-panel p-8 relative group hover:bg-bg-secondary/50 transition-colors duration-300 border border-border">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16 fill-current text-text-primary" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46463 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" />
                                </svg>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <FiStar key={i} className="text-accent fill-current" />
                                ))}
                            </div>

                            <p className="text-text-secondary mb-8 italic leading-relaxed">"{t.text}"</p>

                            <div className="flex items-center gap-4">
                                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-accent/50" />
                                <div>
                                    <h4 className="text-text-primary font-bold">{t.name}</h4>
                                    <span className="text-xs text-accent uppercase tracking-wider">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
