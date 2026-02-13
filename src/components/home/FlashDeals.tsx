import React, { useRef, useState, useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiZap } from 'react-icons/fi';

const FlashDeals: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            },
            xPercent: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Loop animation for "Flash Sale"
        gsap.to(".flash-icon", {
            scale: 1.2,
            opacity: 0.8,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full py-12 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-[var(--bg-flash-card)] rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-border shadow-2xl transition-colors duration-500">

                    {/* Animated Background Mesh */}
                    <div className="absolute inset-0 bg-mesh-gradient opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

                    {/* Left Content */}
                    <div className="relative z-10 mb-8 md:mb-0 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-accent font-bold tracking-widest uppercase">
                            <FiZap className="flash-icon" />
                            <span>Explosive Offers</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-text-primary mb-4">
                            FLASH SALE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">70% OFF</span>
                        </h2>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[85%] rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/30 animate-pulse-slow" />
                            </div>
                        </div>
                        <p className="text-xs text-text-muted mt-2 text-right">85% Claimed</p>
                    </div>

                    {/* Right Content (Timer) - Isolated Component */}
                    <CountdownTimer />

                    {/* CTA */}
                    <button className="relative z-10 mt-8 md:mt-0 md:ml-12 btn-primary whitespace-nowrap">
                        Shop Deals Now
                    </button>
                </div>
            </div>
        </section>
    );
};

const CountdownTimer = memo(() => {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative z-10 flex gap-4">
            <TimerBox value={timeLeft.hours} label="Hours" />
            <TimerBox value={timeLeft.minutes} label="Mins" />
            <TimerBox value={timeLeft.seconds} label="Secs" />
        </div>
    );
});

const TimerBox = memo(({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <div className="bg-bg-primary/50 backdrop-blur-md border border-border w-20 h-20 rounded-xl flex items-center justify-center mb-2 shadow-inner">
            <span className="text-3xl font-bold text-text-primary font-mono">
                {value.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="text-xs text-text-muted uppercase tracking-wider">{label}</span>
    </div>
));

export default FlashDeals;
