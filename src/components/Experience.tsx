'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
    {
        period: 'Aug 2022 - Aug 2025',
        company: 'Sainsbury\'s',
        location: 'London',
        role: '3S Manager – Online Department',
        description: [
            'Promoted from General Assistant to 3S Manager, overseeing entire online operations',
            'Managed end-to-end workflows including order processing and logistics',
            'Supervised and mentored department colleagues, improving team productivity'
        ]
    },
    {
        period: 'Mar 2021 - Jul 2022',
        company: 'Sainsbury\'s',
        location: 'London',
        role: 'General Assistant',
        description: [
            'Managed online customer orders with accuracy and timely processing',
            'Resolved customer complaints, maintaining high satisfaction',
            'Collaborated with team to improve order processing efficiency'
        ]
    },
    {
        period: 'Sep 2018 - Jan 2021',
        company: 'Nathani Software Pvt. Ltd.',
        location: 'Surat, India',
        role: 'Android Developer',
        description: [
            'Developed Android applications using Java with clean, efficient code',
            'Integrated APIs for smooth app-to-backend communication',
            'Collaborated with cross-functional teams to design and deploy mobile apps'
        ]
    }
]

export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title with scale and blur
            gsap.fromTo('.experience-title',
                { y: 60, opacity: 0, scale: 0.95, filter: 'blur(10px)' },
                {
                    y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.experience-title', start: 'top 85%', toggleActions: 'play none none reset' }
                }
            )

            // Animated line drawing
            gsap.fromTo('.exp-line',
                { scaleY: 0 },
                {
                    scaleY: 1, duration: 1.5, ease: 'power2.out',
                    scrollTrigger: { trigger: '.experience-grid', start: 'top 80%', toggleActions: 'play none none reset' }
                }
            )

            // Experience cards with unique staggered reveal
            const cards = gsap.utils.toArray('.experience-card')
            cards.forEach((card, index) => {
                const direction = index % 2 === 0 ? -1 : 1

                gsap.fromTo(card as Element,
                    {
                        x: 80 * direction,
                        y: 50,
                        opacity: 0,
                        rotateY: 15 * direction,
                        scale: 0.9
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        rotateY: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card as Element,
                            start: 'top 85%',
                            toggleActions: 'play none none reset'
                        }
                    }
                )

                // Animate indicators on scroll
                gsap.fromTo((card as HTMLElement).querySelector('.exp-indicator'),
                    { height: '0%' },
                    {
                        height: '40%',
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card as Element,
                            start: 'top 80%',
                            toggleActions: 'play none none reset'
                        }
                    }
                )

                // Number reveal
                gsap.fromTo((card as HTMLElement).querySelector('.exp-number'),
                    { scale: 0, opacity: 0, rotation: -90 },
                    {
                        scale: 1, opacity: 1, rotation: 0,
                        duration: 0.6,
                        delay: 0.3,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: card as Element,
                            start: 'top 80%',
                            toggleActions: 'play none none reset'
                        }
                    }
                )

                // Description items stagger
                const items = (card as HTMLElement).querySelectorAll('.exp-item')
                gsap.fromTo(items,
                    { x: 20, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        stagger: 0.1,
                        duration: 0.4,
                        delay: 0.4,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card as Element,
                            start: 'top 80%',
                            toggleActions: 'play none none reset'
                        }
                    }
                )
            })

            // Parallax for the entire section
            gsap.to('.exp-bg-accent', {
                y: -150,
                rotation: 30,
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
        <section ref={sectionRef} id="experience" className="bg-[var(--bg-secondary)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border-subtle)]" />

            {/* Background accent */}
            <div className="exp-bg-accent absolute -top-20 -right-20 w-64 h-64 border border-[var(--accent)] opacity-5 rounded-full" />

            <div className="container">
                <div className="experience-title text-center mb-16">
                    <p className="text-[var(--accent)] font-medium tracking-widest uppercase text-xs mb-4">Career</p>
                    <h2 className="text-white">Work Experience</h2>
                </div>

                <div className="experience-grid relative max-w-3xl mx-auto" style={{ perspective: '1000px' }}>
                    {/* Animated vertical line */}
                    <div className="exp-line absolute left-0 top-0 bottom-0 w-px bg-[var(--accent)] origin-top opacity-20" />

                    <div className="grid gap-8 pl-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="experience-card relative bg-[var(--bg-tertiary)] rounded-xl p-6 md:p-8 border border-[var(--border-subtle)] overflow-hidden"
                            >
                                {/* Animated side indicator */}
                                <div
                                    className="exp-indicator absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-[var(--accent)] rounded-r-full"
                                    style={{ height: '0%' }}
                                />

                                {/* Dot on the line */}
                                <div className="absolute -left-[calc(2rem+4px)] top-8 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-secondary)]" />

                                <div className="pl-2">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-glow)] text-[var(--accent)] mb-3">
                                                {exp.period}
                                            </span>
                                            <h3 className="text-white text-xl mb-1">{exp.role}</h3>
                                            <p className="text-[var(--accent)] text-sm font-medium">{exp.company}</p>
                                            <p className="text-[var(--text-muted)] text-xs mt-1">{exp.location}</p>
                                        </div>

                                        <span className="exp-number text-5xl md:text-6xl font-bold text-[var(--bg-elevated)] select-none">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <ul className="space-y-2 mt-4">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="exp-item flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                                                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] mt-2 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
