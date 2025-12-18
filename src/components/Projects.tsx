'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'Lush Salon Platform',
        subtitle: 'Full-Stack Web App',
        year: '2025',
        tech: ['Firebase', 'Stripe', 'Full-stack'],
        description: 'A fully functional salon booking platform with user & admin dashboards. Integrated Firebase backend and Stripe payments.',
        link: 'https://lush-salon-369.web.app',
    },
    {
        title: 'Table-side Ordering',
        subtitle: 'Android Application',
        year: '2020',
        tech: ['Java', 'Android', 'SQL'],
        description: 'Android app for direct table ordering in restaurants. SQL database for order management with API-driven communication.',
        link: null,
    },
    {
        title: 'COVID-19 Tracker',
        subtitle: 'Android Application',
        year: '2020',
        tech: ['Java', 'Android', 'APIs'],
        description: 'Real-time COVID-19 case tracker with data at national, state, and district levels in India with safety guidelines.',
        link: null,
    },
]

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation with dramatic entrance
            gsap.fromTo('.projects-title',
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.projects-title', start: 'top 85%', toggleActions: 'play none none reset' }
                }
            )

            // Horizontal scroll with enhanced panel animations
            const horizontal = horizontalRef.current
            if (horizontal) {
                const panels = gsap.utils.toArray<HTMLElement>('.project-panel')

                // Main horizontal scroll
                const scrollTween = gsap.to(panels, {
                    xPercent: -100 * (panels.length - 1),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: horizontal,
                        pin: true,
                        scrub: 1,
                        snap: 1 / (panels.length - 1),
                        end: () => '+=' + (horizontal.scrollWidth - window.innerWidth),
                    }
                })

                // Individual panel content animations
                panels.forEach((panel, index) => {
                    const content = panel.querySelector('.project-content')
                    const number = panel.querySelector('.project-number')
                    const title = panel.querySelector('.project-title')
                    const tags = panel.querySelectorAll('.project-tag')
                    const desc = panel.querySelector('.project-desc')
                    const btn = panel.querySelector('.project-btn')

                    // Common animation config
                    // For the first panel (index 0), we need special handling because it's already in view
                    // when the horizontal scroll starts. We'll use the horizontal wrapper's vertical scroll
                    // to trigger the entry/exit for the first panel.
                    const isFirst = index === 0

                    const triggerConfig = isFirst ? {
                        trigger: horizontal, // Use the specific container
                        start: 'top 40%', // Trigger only when the section is well into view (content visible)
                        toggleActions: 'play none none reverse' // Reverse when scrolling back up
                    } : {
                        trigger: panel,
                        containerAnimation: scrollTween,
                        start: 'left 80%',
                        end: 'left 20%',
                        toggleActions: 'play reverse play reverse'
                    }

                    // Content reveal
                    gsap.fromTo(content,
                        { opacity: 0.3, scale: 0.9, rotateY: -10 },
                        {
                            opacity: 1, scale: 1, rotateY: 0,
                            duration: 0.8,
                            scrollTrigger: isFirst ? {
                                ...triggerConfig,
                                scrub: false
                            } : {
                                ...triggerConfig,
                                scrub: 1
                            }
                        }
                    )

                    // Number spinning in
                    gsap.fromTo(number,
                        { scale: 0, rotation: -180, opacity: 0 },
                        {
                            scale: 1, rotation: 0, opacity: 1,
                            duration: 0.8,
                            ease: 'back.out(1.5)',
                            scrollTrigger: isFirst ? {
                                trigger: horizontal,
                                start: 'top 40%',
                                toggleActions: 'play none none reverse'
                            } : {
                                trigger: panel,
                                containerAnimation: scrollTween,
                                start: 'left 60%',
                                toggleActions: 'play reverse play reverse'
                            }
                        }
                    )

                    // Title slide up
                    gsap.fromTo(title,
                        { y: 40, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            duration: 0.6,
                            scrollTrigger: isFirst ? {
                                trigger: horizontal,
                                start: 'top 40%',
                                toggleActions: 'play none none reverse'
                            } : {
                                trigger: panel,
                                containerAnimation: scrollTween,
                                start: 'left 50%',
                                toggleActions: 'play reverse play reverse'
                            }
                        }
                    )

                    // Tags wave animation
                    gsap.fromTo(tags,
                        { y: 20, opacity: 0, scale: 0.8 },
                        {
                            y: 0, opacity: 1, scale: 1,
                            stagger: 0.1,
                            duration: 0.4,
                            ease: 'back.out(1.5)',
                            scrollTrigger: isFirst ? {
                                trigger: horizontal,
                                start: 'top 40%',
                                toggleActions: 'play none none reverse'
                            } : {
                                trigger: panel,
                                containerAnimation: scrollTween,
                                start: 'left 45%',
                                toggleActions: 'play reverse play reverse'
                            }
                        }
                    )

                    // Description fade
                    gsap.fromTo(desc,
                        { y: 20, opacity: 0 },
                        {
                            y: 0, opacity: 1,
                            duration: 0.5,
                            scrollTrigger: isFirst ? {
                                trigger: horizontal,
                                start: 'top 40%',
                                toggleActions: 'play none none reverse'
                            } : {
                                trigger: panel,
                                containerAnimation: scrollTween,
                                start: 'left 40%',
                                toggleActions: 'play reverse play reverse'
                            }
                        }
                    )

                    // Button bounce in
                    gsap.fromTo(btn,
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1, opacity: 1,
                            duration: 0.5,
                            ease: 'elastic.out(1, 0.5)',
                            scrollTrigger: isFirst ? {
                                trigger: horizontal,
                                start: 'top 40%',
                                toggleActions: 'play none none reverse'
                            } : {
                                trigger: panel,
                                containerAnimation: scrollTween,
                                start: 'left 35%',
                                toggleActions: 'play reverse play reverse'
                            }
                        }
                    )
                })

                // Progress dots animation
                gsap.fromTo('.progress-dot',
                    { scale: 0 },
                    {
                        scale: 1,
                        stagger: 0.1,
                        duration: 0.3,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: horizontal,
                            start: 'top 80%',
                            toggleActions: 'play none none reset'
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="projects" className="bg-[var(--bg-primary)]">
            <div className="projects-title text-center py-20">
                <p className="text-[var(--accent)] font-medium tracking-widest uppercase text-xs mb-4">Portfolio</p>
                <h2 className="text-white mb-4">Featured Projects</h2>
                <p className="text-[var(--text-muted)] text-sm">Scroll to explore →</p>
            </div>

            <div ref={horizontalRef} className="overflow-hidden">
                <div className="flex flex-nowrap">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-panel flex-shrink-0 w-screen h-screen flex items-center justify-center px-4 md:px-8"
                            style={{ perspective: '1000px' }}
                        >
                            <div className="project-content max-w-3xl w-full bg-[var(--bg-secondary)] rounded-2xl p-8 md:p-12 border border-[var(--border-subtle)] relative overflow-hidden">
                                {/* Project number */}
                                <span className="project-number absolute top-6 right-8 text-5xl md:text-6xl font-bold text-[var(--bg-tertiary)] select-none">
                                    0{index + 1}
                                </span>

                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-glow)] text-[var(--accent)] mb-4">
                                        {project.year}
                                    </span>

                                    <h3 className="project-title text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-[var(--text-secondary)] mb-6">{project.subtitle}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="project-tag px-3 py-1 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-sm border border-[var(--border-subtle)]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="project-desc text-[var(--text-secondary)] leading-relaxed mb-8">
                                        {project.description}
                                    </p>

                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-btn btn-primary inline-flex"
                                        >
                                            View Live Demo
                                        </a>
                                    ) : (
                                        <span className="project-btn btn-secondary inline-flex cursor-default opacity-60">
                                            Private Project
                                        </span>
                                    )}
                                </div>

                                {/* Progress dots */}
                                <div className="absolute bottom-6 right-8 flex gap-2">
                                    {projects.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`progress-dot w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-[var(--accent)]' : 'bg-[var(--bg-tertiary)]'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
