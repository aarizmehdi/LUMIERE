import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
    {
        id: 1,
        title: "The Monochrome Series",
        subtitle: "Minimalist Essentials",
        image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1000&auto=format&fit=crop", // Dark matte black furniture/object
        link: "/category/minimalist"
    },
    {
        id: 2,
        title: "Urban Utility",
        subtitle: "Function Meets Fashion",
        image: "https://images.unsplash.com/photo-1512353087810-25dfcd100962?q=80&w=1000&auto=format&fit=crop", // Dark moody architectural/fashion
        link: "/category/urban"
    },
    {
        id: 3,
        title: "Future Tech",
        subtitle: "Seamless Integration",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop", // Sleek abstract neon/tech hardware
        link: "/category/tech"
    },
    {
        id: 4,
        title: "Heritage Leather",
        subtitle: "Crafted for Longevity",
        image: "https://images.unsplash.com/photo-1551214012-84f95e060dee?q=80&w=1000&auto=format&fit=crop", // Dark moody leather abstract
        link: "/category/leather"
    }
];

const FeaturedCollection: React.FC = () => {
    const componentRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const totalWidth = slider.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollDistance = totalWidth - windowWidth;

        gsap.to(slider, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: componentRef.current,
                start: "top top",
                end: `+=${scrollDistance}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // Parallax effect for images
        gsap.utils.toArray<HTMLElement>('.collection-image').forEach((img) => {
            gsap.to(img, {
                xPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: 1,
                }
            });
        });

    }, { scope: componentRef });

    return (
        <section ref={componentRef} className="relative h-screen overflow-hidden bg-bg-primary">

            <div ref={sliderRef} className="flex h-full w-fit">

                {/* 1. Title Slide (First item in the scroll) */}
                <div className="w-screen h-full flex flex-col justify-center px-8 md:px-24 shrink-0 border-r border-white/5 bg-bg-primary z-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-[1px] bg-accent" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
                                Est. 2024
                            </p>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-heading font-medium text-text-primary leading-[0.9] mb-10">
                            Curated <br />
                            <span className="italic font-light text-text-secondary">Collections</span>
                        </h2>
                        <p className="text-text-secondary text-xl md:text-2xl max-w-lg leading-relaxed mb-12">
                            Immerse yourself in our defining series. Each collection tells a unique story of form, function, and future.
                        </p>
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-text-primary animate-pulse">
                            Scroll to Explore <FiArrowRight />
                        </div>
                    </div>
                </div>

                {/* 2. Collection Slides */}
                {collections.map((item, index) => (
                    <div key={item.id} className="relative w-[85vw] md:w-[60vw] h-full flex items-center justify-center shrink-0 border-r border-white/5 bg-bg-secondary">
                        <div className="relative w-full h-full group overflow-hidden">
                            <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                            <img
                                src={item.image}
                                alt={item.title}
                                className="collection-image w-[130%] h-full object-cover object-center -translate-x-[15%]"
                            />

                            <div className="absolute bottom-0 left-0 p-10 md:p-16 z-20 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                <span className="text-[8rem] md:text-[12rem] font-black text-white/5 absolute -top-20 md:-40 right-10 pointer-events-none select-none">
                                    0{index + 1}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-heading font-black text-white mb-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    {item.title}
                                </h3>
                                <p className="text-xl md:text-2xl text-white/90 mb-8 font-serif italic translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {item.subtitle}
                                </p>
                                <Link to={item.link} className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-150">
                                    View Collection <FiArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Final Spacer/Link Slide */}
                {/* End of Line Indicator - Refined & Tight */}
                <div className="h-full flex items-center justify-center px-12 md:px-20 shrink-0 border-l border-white/10 ml-auto bg-bg-primary">
                    <div className="h-32 w-[1px] bg-accent/30 mr-8" /> {/* Premium Decorative Line */}
                    <span
                        className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-text-disabled select-none pointer-events-none"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                    >
                        End of Collection
                    </span>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
