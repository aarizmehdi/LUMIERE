import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Image, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FloatingImage = ({ position, url, rotation, scale = 1 }: { position: [number, number, number], url: string, rotation?: [number, number, number], scale?: number }) => {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            // Subtle additional float/sway based on time
            const t = state.clock.getElapsedTime();
            ref.current.position.y += Math.sin(t * 0.5 + position[0]) * 0.001;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={ref} position={position} rotation={rotation ? new THREE.Euler(...rotation) : undefined} scale={scale}>
                <Image
                    url={url}
                    transparent
                    opacity={0.9} // Slight transparency for glass-like feel
                    side={THREE.DoubleSide}
                />
            </group>
        </Float>
    );
};

const HeroScene: React.FC = () => {
    // Product Images from our data
    const productImages = [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", // Headphones
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80", // Watch
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", // Shoe
    ];

    return (
        <div className="w-full h-full absolute top-0 left-0 -z-10 bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
                <Environment preset="city" blur={1} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

                {/* Main Center Image - Headphones */}
                <FloatingImage
                    position={[0, 0.5, 0]}
                    url={productImages[0]}
                    scale={3.5}
                />

                {/* Left Floating Image - Watch */}
                <FloatingImage
                    position={[-3.5, -1, -1]}
                    url={productImages[1]}
                    rotation={[0, 0.3, 0]}
                    scale={2.2}
                />

                {/* Right Floating Image - Shoe */}
                <FloatingImage
                    position={[3.5, 1.5, -1]}
                    url={productImages[2]}
                    rotation={[0, -0.3, 0]}
                    scale={2.5}
                />

                <ContactShadows
                    position={[0, -2.5, 0]}
                    opacity={0.6}
                    scale={15}
                    blur={2.5}
                    far={4.5}
                    resolution={128}
                    color="#000000"
                />
            </Canvas>
        </div>
    );
};

export default HeroScene;
