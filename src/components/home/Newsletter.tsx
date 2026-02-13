import React, { useState } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 800);
    };

    return (
        <section className="py-32 relative overflow-hidden bg-[var(--bg-newsletter)] transition-colors duration-500">
            {/* Subtle Gradient Background - Reduced opacity for dark mode */}
            <div className="absolute inset-0 opacity-30 dark:opacity-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.02),transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
                    {/* Text Section */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-text-primary mb-6 leading-[1.1]">
                            Details Matter.
                            <span className="block text-text-muted font-light italic mt-2">So do you.</span>
                        </h2>
                        <p className="text-lg text-text-secondary max-w-md mx-auto md:mx-0 font-light leading-relaxed">
                            Curated design, exclusive releases, and stories from the studio. Join a community that values the finer things.
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="md:w-1/2 w-full max-w-md">
                        {status === 'idle' ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                <div className="group relative">
                                    <input
                                        type="email"
                                        placeholder=" "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="peer w-full bg-transparent border-b border-neutral-300 dark:border-neutral-800 py-4 text-xl text-neutral-900 dark:text-white placeholder-transparent focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-all duration-300"
                                        required
                                    />
                                    <label className="absolute left-0 top-4 text-neutral-500 dark:text-neutral-500 text-xl transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:text-sm peer-focus:text-neutral-900 dark:peer-focus:text-white peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm">
                                        Email Address
                                    </label>
                                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-900 dark:bg-white transition-all duration-500 group-hover:w-full peer-focus:w-full" />
                                </div>

                                <button
                                    type="submit"
                                    className="self-start flex items-center gap-3 text-neutral-900 dark:text-white font-medium hover:gap-5 transition-all duration-300 group"
                                >
                                    <span>Subscribe</span>
                                    <FiArrowRight className="text-xl opacity-70 group-hover:opacity-100" />
                                </button>

                                <p className="text-xs text-neutral-400 dark:text-neutral-600">
                                    No spam. Unsubscribe anytime.
                                </p>
                            </form>
                        ) : (
                            <div className="text-center md:text-left animate-fade-in-up">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 mb-6">
                                    <FiCheck className="text-2xl text-neutral-900 dark:text-white" />
                                </div>
                                <h3 className="text-2xl font-serif text-neutral-900 dark:text-white mb-2">Welcome.</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 font-light">
                                    You're on the list. Expect something special soon.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
