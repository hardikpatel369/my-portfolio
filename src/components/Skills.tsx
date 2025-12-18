'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = {
    technical: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform', 'Coroutines', 'Ktor', 'Java', 'Python', 'SQL', 'Android Studio', 'Firebase', 'REST APIs', 'Git'],
    automation: ['N8N', 'BeautifulSoup', 'Selenium', 'Web Scraping'],
    soft: ['Leadership', 'Team Management', 'Problem-solving', 'Time Management', 'Adaptability'],
    ai: ['Generative AI', 'LLMs', 'RAG', 'Computer Vision', 'AI Automation']
}

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo('.skills-title',
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.skills-title', start: 'top 85%', toggleActions: 'play none none reset' }
                }
            )

            // Skill groups with staggered 3D flip
            gsap.fromTo('.skill-group',
                { y: 80, opacity: 0, rotateY: -30, scale: 0.9 },
                {
                    y: 0, opacity: 1, rotateY: 0, scale: 1, stagger: 0.15, duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none reset' }
                }
            )

            // Skill tags wave animation
            const tags = gsap.utils.toArray('.skill-tag')
            tags.forEach((tag, index) => {
                gsap.fromTo(tag as Element,
                    { y: 30, opacity: 0, scale: 0.8 },
                    {
                        y: 0, opacity: 1, scale: 1, duration: 0.4,
                        delay: index * 0.03,
                        ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: '.skills-grid', start: 'top 75%', toggleActions: 'play none none reset' }
                    }
                )
            })

            // Floating animation on scroll for the background
            gsap.to('.skills-bg-glow', {
                y: -80,
                x: 50,
                scale: 1.2,
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
        <section ref={sectionRef} id="skills" className="bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background glow */}
            <div className="skills-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-glow)] blur-[150px] opacity-30" />

            <div className="container relative z-10">
                <div className="skills-title text-center mb-16">
                    <p className="text-[var(--accent)] font-medium tracking-widest uppercase text-xs mb-4">Expertise</p>
                    <h2 className="text-white">Skills & Technologies</h2>
                </div>

                <div className="skills-grid grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
                    {/* Technical Skills */}
                    <div className="skill-group card">
                        <h3 className="text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            Technical
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.technical.map((skill, i) => (
                                <span key={i} className="skill-tag px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all hover:scale-105 cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Automation */}
                    <div className="skill-group card">
                        <h3 className="text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            Automation
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.automation.map((skill, i) => (
                                <span key={i} className="skill-tag px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all hover:scale-105 cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="skill-group card">
                        <h3 className="text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.soft.map((skill, i) => (
                                <span key={i} className="skill-tag px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all hover:scale-105 cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* AI Awareness */}
                    <div className="skill-group card">
                        <h3 className="text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            AI & ML Awareness
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.ai.map((skill, i) => (
                                <span key={i} className="skill-tag px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all hover:scale-105 cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
