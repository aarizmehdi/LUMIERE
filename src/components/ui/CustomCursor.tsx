import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (cursor) {
                cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
            }
        };

        const navLinks = document.querySelectorAll('a, button');

        const onMouseEnter = () => {
            if (cursor) cursor.classList.add('scale-[0]');
            if (follower) follower.classList.add('scale-[1.5]', 'bg-primary/20', 'backdrop-blur-sm', 'border-transparent');
        };

        const onMouseLeave = () => {
            if (cursor) cursor.classList.remove('scale-[0]');
            if (follower) follower.classList.remove('scale-[1.5]', 'bg-primary/20', 'backdrop-blur-sm', 'border-transparent');
        };

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnter);
            link.addEventListener('mouseleave', onMouseLeave);
        });

        // Animation loop for smooth follower
        let animationFrameId: number;
        const loop = () => {
            posX += (mouseX - posX) / 9; // Easing
            posY += (mouseY - posY) / 9;

            if (follower) {
                follower.style.transform = `translate3d(${posX - 16}px, ${posY - 16}px, 0)`;
            }
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        window.addEventListener('mousemove', onMouseMove);

        // Re-bind listeners on mutation (for dynamic content)
        const observer = new MutationObserver(() => {
            const newLinks = document.querySelectorAll('a, button');
            newLinks.forEach(link => {
                link.removeEventListener('mouseenter', onMouseEnter); // Prevent duplicates
                link.removeEventListener('mouseleave', onMouseLeave);
                link.addEventListener('mouseenter', onMouseEnter);
                link.addEventListener('mouseleave', onMouseLeave);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            navLinks.forEach(link => {
                link.removeEventListener('mouseenter', onMouseEnter);
                link.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block transition-transform duration-75 ease-out will-change-transform"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-primary/50 bg-primary/5 rounded-full pointer-events-none z-[9999] hidden md:block transition-[width,height,background-color,border-color] duration-300 ease-out will-change-transform backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            />
        </>
    );
};

export default CustomCursor;
