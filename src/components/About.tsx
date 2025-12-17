'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const interests = [
    { emoji: '🎮', label: 'Gaming' },
    { emoji: '🛼', label: 'Inline Skating' },
    { emoji: '🧩', label: 'Rubik\'s Cube' },
    { emoji: '🎬', label: 'Movies & Netflix' },
    { emoji: '🏍️', label: 'Traveling' },
]

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title with split text effect
            gsap.fromTo('.about-title',
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-title', start: 'top 85%', toggleActions: 'play none none reset' }
                }
            )

            // Description card with 3D tilt
            gsap.fromTo('.about-card',
                { y: 80, opacity: 0, rotateX: 15 },
                {
                    y: 0, opacity: 1, rotateX: 0, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-card', start: 'top 80%', toggleActions: 'play none none reset' }
                }
            )

            // Education cards with staggered slide-in
            gsap.fromTo('.edu-card',
                { x: -60, opacity: 0, scale: 0.9 },
                {
                    x: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.8,
                    ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: '.edu-grid', start: 'top 80%', toggleActions: 'play none none reset' }
                }
            )

            // Interest items with circular reveal
            gsap.fromTo('.interest-item',
                { scale: 0, rotation: -180, opacity: 0 },
                {
                    scale: 1, rotation: 0, opacity: 1, stagger: 0.1, duration: 0.6,
                    ease: 'back.out(2)',
                    scrollTrigger: { trigger: '.interests-grid', start: 'top 85%', toggleActions: 'play none none reset' }
                }
            )

            // Parallax for decorative elements
            gsap.to('.about-deco', {
                y: -100,
                rotation: 45,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="about" className="bg-[var(--bg-secondary)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border-subtle)]" />

            {/* Decorative element */}
            <div className="about-deco absolute top-20 right-10 w-32 h-32 border border-[var(--accent)] opacity-5 rounded-2xl rotate-12" />

            <div className="container">
                <div className="about-title text-center mb-16">
                    <p className="text-[var(--accent)] font-medium tracking-widest uppercase text-xs mb-4">About</p>
                    <h2 className="text-white">Get to Know Me</h2>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Description */}
                    <div className="about-card card mb-8" style={{ perspective: '1000px' }}>
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                            I&apos;m a <span className="text-[var(--accent)] font-medium">software developer</span> with 7+ years of experience
                            building Android applications and full-stack web platforms. I hold a B.Tech in IT and an MBA from
                            Canterbury Christ Church University.
                        </p>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Experienced in <span className="text-white font-medium">leading teams</span> and managing operations at Sainsbury&apos;s.
                            Passionate about AI, machine learning, and creating impactful software solutions.
                        </p>
                    </div>

                    {/* Education */}
                    <div className="edu-grid grid md:grid-cols-2 gap-4 mb-8">
                        <div className="edu-card card">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🎓</span>
                                <div>
                                    <h3 className="text-white text-base">B.Tech in IT</h3>
                                    <p className="text-[var(--text-muted)] text-sm">Atmiya University • 2014-2018</p>
                                </div>
                            </div>
                        </div>

                        <div className="edu-card card">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📚</span>
                                <div>
                                    <h3 className="text-white text-base">MBA</h3>
                                    <p className="text-[var(--text-muted)] text-sm">Canterbury Christ Church • 2021-2022</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interests */}
                    <div className="text-center">
                        <p className="text-[var(--text-muted)] text-sm mb-4">When I&apos;m not coding</p>
                        <div className="interests-grid flex flex-wrap justify-center gap-3">
                            {interests.map((interest, index) => (
                                <div
                                    key={index}
                                    className="interest-item bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-full px-4 py-2 flex items-center gap-2 hover:border-[var(--accent)] transition-colors cursor-default"
                                >
                                    <span>{interest.emoji}</span>
                                    <span className="text-[var(--text-secondary)] text-sm">{interest.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
