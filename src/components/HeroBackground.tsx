'use client'

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Primary gradient orb - top right */}
            <div
                className="absolute -top-20 -right-20 w-[600px] h-[600px]"
                style={{
                    background: 'radial-gradient(circle at center, rgba(232, 168, 56, 0.35) 0%, rgba(232, 168, 56, 0.15) 30%, rgba(232, 168, 56, 0.05) 50%, transparent 70%)',
                    filter: 'blur(40px)',
                    animation: 'floatOrb1 45s ease-in-out infinite'
                }}
            />

            {/* Secondary gradient orb - bottom left */}
            <div
                className="absolute -bottom-32 -left-32 w-[500px] h-[500px]"
                style={{
                    background: 'radial-gradient(circle at center, rgba(232, 168, 56, 0.25) 0%, rgba(201, 138, 30, 0.1) 40%, transparent 70%)',
                    filter: 'blur(50px)',
                    animation: 'floatOrb2 50s ease-in-out infinite'
                }}
            />

            {/* Tertiary subtle orb - center */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(232, 168, 56, 0.08) 0%, transparent 60%)',
                    filter: 'blur(60px)',
                    animation: 'pulse 35s ease-in-out infinite'
                }}
            />

            {/* Halftone dot pattern - top right corner */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px]"
                style={{
                    background: `
                        radial-gradient(circle at 2px 2px, rgba(232, 168, 56, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '16px 16px',
                    maskImage: 'radial-gradient(ellipse 100% 100% at 100% 0%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 100% 0%, black 0%, transparent 70%)',
                    opacity: 0.6
                }}
            />

            {/* Halftone dot pattern - bottom left corner */}
            <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px]"
                style={{
                    background: `
                        radial-gradient(circle at 2px 2px, rgba(232, 168, 56, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    maskImage: 'radial-gradient(ellipse 100% 100% at 0% 100%, black 0%, transparent 60%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 0% 100%, black 0%, transparent 60%)',
                    opacity: 0.4
                }}
            />

            {/* Subtle inner glow line */}
            <div
                className="absolute top-0 right-0 w-full h-[1px]"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(232, 168, 56, 0.15) 50%, rgba(232, 168, 56, 0.3) 100%)',
                    opacity: 0.5
                }}
            />

            <style jsx>{`
                @keyframes floatOrb1 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(-20px, 15px) scale(1.02);
                    }
                    50% {
                        transform: translate(10px, 25px) scale(0.98);
                    }
                    75% {
                        transform: translate(-15px, 10px) scale(1.01);
                    }
                }

                @keyframes floatOrb2 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(25px, -15px) scale(1.03);
                    }
                    66% {
                        transform: translate(15px, 20px) scale(0.97);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.6;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                }
            `}</style>
        </div>
    )
}
