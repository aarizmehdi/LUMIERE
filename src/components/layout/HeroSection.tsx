import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from '../3d/Hero3D';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split text animation
            const words = heroRef.current?.querySelectorAll('.hero-word');

            if (words) {
                gsap.fromTo(words,
                    { y: 100, opacity: 0, rotate: 5 },
                    {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: 'elastic.out(1, 0.75)',
                        delay: 0.2
                    }
                );
            }

            gsap.fromTo('.hero-subtitle',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power2.out' }
            );

            gsap.fromTo('.hero-cta',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power2.out' }
            );

            // Overlay Fade In (Darken the hero section)
            gsap.to('.hero-scroll-overlay', {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '60% top',
                    scrub: true
                },
                opacity: 0.85,
                ease: 'power1.out'
            });

            // Smooth Scroll Blur & Fade for Hero Content
            gsap.to('.hero-content, .hero-visual', {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top', // Start immediately
                    end: 'bottom center', // Extend till bottom reaches center
                    scrub: 1 // Add smooth scrub lag
                },
                opacity: 0,
                filter: 'blur(10px)', // Reduced blur amount
                y: -50, // Reduced vertical movement
                ease: 'none' // Linear for consistent speed
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero">
            <div className="hero-scroll-overlay" />
            <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="hero-content w-full md:w-1/2 pt-32 md:pt-0">
                    <p className="hero-label fade-in text-accent tracking-[0.2em] mb-6">THOUGHTFULLY CURATED</p>
                    <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-text-primary" style={{ pointerEvents: 'none' }}>
                        <span className="hero-word inline-block mr-4">Objects</span>
                        <span className="hero-word inline-block mr-4">that</span>
                        <br />
                        <span className="hero-word inline-block mr-4">enhance</span>
                        <span className="hero-word inline-block">life</span>
                    </h1>
                    <p className="hero-subtitle text-lg md:text-xl text-text-secondary mb-10 max-w-lg leading-relaxed" style={{ pointerEvents: 'none' }}>Discover pieces designed with intention,<br />crafted to bring calm to your space</p>
                    <Link to="/products/all">
                        <button className="hero-cta btn-primary px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform">Explore Collection</button>
                    </Link>
                </div>

                <div className="hero-visual w-full md:w-1/2 h-[50vh] md:h-[80vh] flex items-center justify-center relative">
                    <React.Suspense fallback={null}>
                        <Hero3D />
                    </React.Suspense>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
