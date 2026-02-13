import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalBackground = () => {
    const meshRef = useRef(null);

    useEffect(() => {
        // Parallax effect for grading mesh
        gsap.to(meshRef.current, {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            rotation: 45,
            ease: "none"
        });

        // Floating orbs animation
        gsap.to(".orb-1", {
            y: 100,
            x: -50,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".orb-2", {
            y: -80,
            x: 60,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
    }, []);

    return (
        <>
            <div className="fixed-background">
                <div ref={meshRef} className="gradient-mesh" />
                <div className="orb orb-1" />
                <div className="orb orb-2" />
            </div>
            <div className="noise-overlay" />
        </>
    );
};

export default GlobalBackground;
