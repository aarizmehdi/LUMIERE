import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiCheck, FiArrowRight, FiLock } from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const { cart, subtotal } = useShop();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);

    // Refs for animations
    const containerRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    // Initial load animation
    useGSAP(() => {
        gsap.from(".checkout-step", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

        gsap.from(".order-summary", {
            x: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        } else {
            handlePlaceOrder();
        }
    };

    const handlePlaceOrder = () => {
        setIsSuccess(true);

        // Success Animation
        const tl = gsap.timeline();
        tl.to(containerRef.current, { opacity: 0, duration: 0.5, pointerEvents: "none" })
            .fromTo(successRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
            )
            .to(".success-icon", {
                scale: 1.2,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            })
            .to(".success-message > *", {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5
            });
    };

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="h-screen flex flex-col items-center justify-center space-y-4 bg-bg-primary text-text-primary">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <button onClick={() => navigate('/')} className="text-accent hover:underline">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 relative overflow-hidden bg-bg-primary transition-colors duration-500">
            {/* Success Overlay */}
            {isSuccess && (
                <div ref={successRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
                    <div className="text-center space-y-6 success-message px-6">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto success-icon shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                            <FiCheck className="text-white text-5xl" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white translate-y-10 opacity-0">Order Placed!</h1>
                        <p className="text-gray-400 text-xl max-w-md mx-auto translate-y-10 opacity-0">
                            Thank you for your purchase. Your order #849201 is being processed and will be shipped shortly.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-white text-black rounded-full font-bold mt-8 inline-block translate-y-10 opacity-0 hover:bg-gray-200 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            )}

            <div ref={containerRef} className="container mx-auto px-6">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-8 border-b border-border pb-6">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Steps Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step 1: Shipping */}
                        <div className={`checkout-step border border-border rounded-xl p-6 transition-all duration-500 ${currentStep === 1 ? 'bg-card-bg ring-1 ring-accent/50 shadow-lg' : 'bg-transparent opacity-60'}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full border ${currentStep > 1 ? 'bg-green-500 border-green-500 text-white' : 'border-accent text-accent'}`}>
                                    {currentStep > 1 ? <FiCheck /> : '1'}
                                </span>
                                <h2 className="text-xl font-bold text-text-primary">Shipping Information</h2>
                            </div>

                            <div className={`space-y-4 overflow-hidden transition-all duration-500 ${currentStep === 1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                    <input type="text" placeholder="Last Name" className="bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                </div>
                                <input type="email" placeholder="Email Address" className="w-full bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                <input type="text" placeholder="Street Address" className="w-full bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="City" className="bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                    <input type="text" placeholder="Postal Code" className="bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Payment */}
                        <div className={`checkout-step border border-border rounded-xl p-6 transition-all duration-500 ${currentStep === 2 ? 'bg-card-bg ring-1 ring-accent/50 shadow-lg' : 'bg-transparent opacity-60'}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full border ${currentStep > 2 ? 'bg-green-500 border-green-500 text-white' : 'border-accent text-accent'}`}>
                                    {currentStep > 2 ? <FiCheck /> : '2'}
                                </span>
                                <h2 className="text-xl font-bold text-text-primary">Payment Details</h2>
                            </div>

                            <div className={`space-y-4 overflow-hidden transition-all duration-500 ${currentStep === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-4 border border-accent/30 bg-accent/5 rounded-lg flex items-center gap-3 text-accent">
                                    <FiLock />
                                    <span className="text-sm">Payments are secure and encrypted.</span>
                                </div>
                                <input type="text" placeholder="Card Number" className="w-full bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none font-mono" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM / YY" className="bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                    <input type="text" placeholder="CVC" className="bg-transparent border border-border rounded-lg p-3 text-text-primary placeholder-text-muted focus:border-accent outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Review */}
                        <div className={`checkout-step border border-border rounded-xl p-6 transition-all duration-500 ${currentStep === 3 ? 'bg-card-bg ring-1 ring-accent/50 shadow-lg' : 'bg-transparent opacity-60'}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full border ${currentStep === 3 ? 'bg-accent text-white border-accent' : 'border-border text-text-muted'}`}>
                                    3
                                </span>
                                <h2 className="text-xl font-bold text-text-primary">Review Order</h2>
                            </div>

                            <div className={`space-y-4 overflow-hidden transition-all duration-500 ${currentStep === 3 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-text-secondary">Please review your items and shipping details before confirming.</p>
                                <div className="flex items-start gap-3 p-4 bg-bg-secondary rounded-lg border border-border">
                                    <input type="checkbox" id="terms" className="mt-1" />
                                    <label htmlFor="terms" className="text-sm text-text-secondary">
                                        I agree to the <span className="text-text-primary underline cursor-pointer">Terms & Conditions</span> and <span className="text-text-primary underline cursor-pointer">Privacy Policy</span>.
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                onClick={handleNextStep}
                                className="w-full md:w-auto px-8 py-4 bg-text-primary text-bg-primary hover:bg-accent hover:text-white rounded-full font-bold flex items-center justify-center gap-2 text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                {currentStep === 3 ? 'Place Order' : 'Continue'}
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="order-summary sticky top-24 bg-card-bg backdrop-blur-md border border-border rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold text-text-primary mb-6">Order Summary</h3>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide mb-6">
                                {cart.map(item => (
                                    <div key={item.id + item.selectedColor} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-border">
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-text-primary font-medium truncate">{item.name}</h4>
                                            <p className="text-sm text-text-muted">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="text-text-primary font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-border pt-4">
                                <div className="flex justify-between text-text-secondary">
                                    <span>Subtotal</span>
                                    <span>${subtotal?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-secondary">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-accent pt-4 border-t border-border">
                                    <span>Total</span>
                                    <span>${subtotal?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
