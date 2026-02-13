import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ParticleField: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const particleCount = 40; // Reduced from 150 for performance
        const particles: HTMLDivElement[] = [];

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const circle = document.createElement('div');
            circle.style.position = 'absolute';
            circle.style.width = `${Math.random() * 3 + 1}px`;
            circle.style.height = circle.style.width;
            circle.style.backgroundColor = Math.random() > 0.5 ? '#d4af37' : '#ffffff'; // Gold or White
            circle.style.borderRadius = '50%';
            circle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
            circle.style.pointerEvents = 'none';
            containerRef.current.appendChild(circle);
            particles.push(circle);

            // Initial position
            gsap.set(circle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
            });

            // Animate
            animateParticle(circle);
        }

        function animateParticle(circle: HTMLDivElement) {
            gsap.to(circle, {
                x: `+=${Math.random() * 100 - 50}`,
                y: `+=${Math.random() * 100 - 50}`,
                duration: Math.random() * 10 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 5,
            });

            gsap.to(circle, {
                opacity: Math.random() * 0.5 + 0.1,
                duration: Math.random() * 3 + 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            gsap.to(particles, {
                x: `+=${(clientX - window.innerWidth / 2) * 0.05}`,
                y: `+=${(clientY - window.innerHeight / 2) * 0.05}`,
                duration: 2,
                ease: 'power2.out',
                stagger: 0.001
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            particles.forEach(p => p.remove());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen"
        />
    );
};

export default ParticleField;
