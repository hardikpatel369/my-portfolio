'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            // Dramatic staggered text reveal with character split effect
            tl.fromTo('.hero-label',
                { y: 30, opacity: 0, filter: 'blur(10px)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 }
            )
                .fromTo('.hero-name',
                    { y: 80, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' },
                    '-=0.4'
                )
                .fromTo('.hero-title',
                    { y: 40, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
                    { y: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.8 },
                    '-=0.6'
                )
                .fromTo('.hero-desc',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    '-=0.3'
                )
                .fromTo('.hero-buttons > *',
                    { y: 30, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.5, ease: 'back.out(1.5)' },
                    '-=0.2'
                )
                .fromTo('.hero-image-wrapper',
                    { scale: 0.8, opacity: 0, rotation: -10 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
                    '-=0.8'
                )
                .fromTo('.hero-stats > *',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
                    '-=0.5'
                )
                .fromTo('.hero-glow',
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
                    '-=1'
                )

            // Parallax on scroll
            gsap.to('.hero-image-wrapper', {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5
                }
            })

            gsap.to('.hero-glow', {
                y: 80,
                scale: 1.2,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 3
                }
            })

            // Text fade out on scroll
            gsap.to('.hero-content', {
                y: -50,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'center center',
                    end: 'bottom top',
                    scrub: 1
                }
            })

        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative min-h-screen flex items-center bg-bg-primary"
        >
            {/* Animated glow */}
            <div className="hero-glow opacity-0 absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[var(--accent-glow)] blur-[120px]" />
            <div className="hero-glow opacity-0 absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[var(--accent-glow)] blur-[100px] opacity-50" />

            {/* Grid lines */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(var(--text-muted) 1px, transparent 1px)`,
                    backgroundSize: '1px 80px'
                }}
            />

            <div className="container relative z-10 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Text Content */}
                    <div className="hero-content flex-1 text-center lg:text-left max-w-2xl">
                        <p className="hero-label opacity-0 text-[var(--accent)] font-medium tracking-widest uppercase text-xs mb-6">
                            Available for opportunities
                        </p>

                        <h1 className="hero-name opacity-0 text-white mb-4">
                            Hardik Patel
                        </h1>

                        <p className="hero-title opacity-0 text-xl md:text-2xl text-[var(--text-secondary)] font-medium mb-6">
                            Software Developer & Tech Leader
                        </p>

                        <p className="hero-desc opacity-0 text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                            7+ years crafting Android apps, full-stack platforms, and leading teams.
                            B.Tech in IT + MBA from Canterbury. Passionate about AI-driven solutions.
                        </p>

                        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <a href="#projects" className="btn-primary opacity-0">
                                View My Work
                            </a>
                            <a href="#contact" className="btn-secondary opacity-0">
                                Get in Touch
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats flex gap-8 justify-center lg:justify-start">
                            <div className="opacity-0">
                                <div className="text-2xl font-bold text-white">7+</div>
                                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Years Exp.</div>
                            </div>
                            <div className="w-px bg-[var(--border-subtle)] opacity-0" />
                            <div className="opacity-0">
                                <div className="text-2xl font-bold text-white">15+</div>
                                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Projects</div>
                            </div>
                            <div className="w-px bg-[var(--border-subtle)] opacity-0" />
                            <div className="opacity-0">
                                <div className="text-2xl font-bold text-white">2</div>
                                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Degrees</div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="hero-image-wrapper opacity-0 flex-shrink-0">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            {/* Accent border */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-[var(--accent)] opacity-20 rotate-3" />
                            <div className="absolute inset-0 rounded-2xl border border-[var(--border-subtle)] -rotate-3" />

                            {/* Image */}
                            <div className="absolute inset-3 rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                                <Image
                                    src="/hardik.jpg"
                                    alt="Hardik Patel"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Tech badge */}
                            <div className="absolute -bottom-4 -right-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2">
                                <span className="text-[var(--accent)] font-semibold text-sm">Android • Firebase • AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
