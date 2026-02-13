import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick, variant = 'primary' }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        if (!button || !text) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const textXTo = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const textYTo = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.3);
            yTo(y * 0.3);
            textXTo(x * 0.2);
            textYTo(y * 0.2);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);
        };

        const handleMouseEnter = () => {
            if (fillRef.current) {
                gsap.to(fillRef.current, { scale: 1.5, duration: 0.5, ease: "power2.out" });
            }
        };

        const handleMouseOut = () => {
            if (fillRef.current) {
                gsap.to(fillRef.current, { scale: 0, duration: 0.5, ease: "power2.in" });
            }
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);
        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseOut);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
            button.removeEventListener("mouseenter", handleMouseEnter);
            button.removeEventListener("mouseleave", handleMouseOut);
        };
    }, []);

    const baseClasses = "relative px-8 py-4 rounded-full overflow-hidden transition-colors flex items-center justify-center group font-medium tracking-wide uppercase text-sm";
    const variantClasses = variant === 'primary'
        ? "bg-premium-accent text-premium-black border border-premium-accent"
        : "bg-transparent text-white border border-white/20 hover:border-white/40";

    return (
        <button
            ref={buttonRef}
            className={`${baseClasses} ${variantClasses} ${className}`}
            onClick={onClick}
        >
            <div ref={fillRef} className="absolute inset-0 bg-white/20 rounded-full scale-0 origin-center pointer-events-none" />
            <span ref={textRef} className="relative z-10 block pointer-events-none">
                {children}
            </span>
        </button>
    );
}

export default MagneticButton;
