import React from 'react';
import { gsap } from 'gsap';

const FloatingImage = ({ src, alt, className, speed = 1 }: { src: string, alt: string, className: string, speed?: number }) => {
    const imageRef = React.useRef(null);

    React.useEffect(() => {
        // Gentle floating animation
        gsap.to(imageRef.current, {
            y: -20 * speed,
            rotation: 2 * speed,
            duration: 2 + Math.random(),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random()
        });
    }, [speed]);

    return (
        <div ref={imageRef} className={`absolute ${className} drop-shadow-2xl`}>
            <div className="relative group">
                {/* Carton/Sticker Style Border & Shadow */}
                <div className="absolute inset-0 bg-white rounded-2xl translate-x-2 translate-y-2 border-2 border-black" />
                <img
                    src={src}
                    alt={alt}
                    className="relative w-full h-full object-cover rounded-2xl border-2 border-black bg-white z-10"
                />
            </div>
        </div>
    );
};

const HeroVisuals = () => {
    return (
        <div className="relative w-full h-full pointer-events-none">
            {/* Centerpiece - Headphones */}
            <FloatingImage
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                alt="Nebula Headphones"
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 z-20"
                speed={1}
            />

            {/* Top Left - Drone */}
            <FloatingImage
                src="https://images.unsplash.com/photo-1506947411487-a56738267384?w=500&q=80"
                alt="Lumina Drone"
                className="top-[15%] left-[10%] w-40 h-40 md:w-48 md:h-48 z-10"
                speed={1.2}
            />

            {/* Bottom Right - Shoes */}
            <FloatingImage
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
                alt="Aether Runner"
                className="bottom-[20%] right-[10%] w-48 h-48 md:w-56 md:h-56 z-10"
                speed={0.8}
            />

            {/* Top Right - Bag (Faded) */}
            <FloatingImage
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80"
                alt="Weekend Voyager"
                className="top-[20%] right-[15%] w-32 h-32 md:w-40 md:h-40 z-0 opacity-80"
                speed={1.5}
            />

            {/* Bottom Left - Watch (Faded) */}
            <FloatingImage
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80"
                alt="Hyperion Watch"
                className="bottom-[25%] left-[15%] w-36 h-36 md:w-44 md:h-44 z-0 opacity-80"
                speed={0.9}
            />
        </div>
    );
};

export default HeroVisuals;
