import React from 'react';

const NoiseOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] mix-blend-overlay">
            <div
                className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"
                style={{ backgroundRepeat: 'repeat', backgroundSize: '100px' }}
            />
        </div>
    );
};

export default NoiseOverlay;
