import { useRef, useEffect, useState } from 'react';

const SmoothCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        // Disable on touch devices
        if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

        // Hide default cursor
        document.body.style.cursor = 'none';

        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseOver = (e: MouseEvent) => {
            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .product-card, .interactive, .thumbnail, .size-btn, .quantity-controls-premium, input, select, textarea')) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        const animate = () => {
            // Linear interpolation for smooth movement
            pos.current.x += (mouse.current.x - pos.current.x) * 0.2; // Smoother factor (0.2 instead of 0.8)
            pos.current.y += (mouse.current.y - pos.current.y) * 0.2;

            if (cursorRef.current) {
                // Use translate3d for GPU acceleration
                const scale = hovered ? 2.5 : 1;
                cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale})`;
            }

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(rafId);
            document.body.style.cursor = 'auto';
        };
    }, [hovered]);

    return <div ref={cursorRef} className="smooth-cursor" style={{ pointerEvents: 'none' }} />;
};

export default SmoothCursor;
