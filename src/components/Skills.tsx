'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = {
    technical: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform', 'Coroutines', 'Ktor', 'Java', 'Python', 'SQL', 'Android Studio', 'Firebase', 'REST APIs', 'Git'],
    automation: ['N8N', 'BeautifulSoup', 'Selenium', 'Web Scraping'],
    soft: ['Leadership', 'Team Management', 'Problem-solving', 'Time Management', 'Adaptability'],
    ai: ['Generative AI', 'LLMs', 'RAG', 'Computer Vision', 'AI Automation']
}

// Skill Tag Component with advanced animations
interface SkillTagProps {
    skill: string
    index: number
    categoryIndex: number
}

function SkillTag({ skill, index, categoryIndex }: SkillTagProps) {
    const tagRef = useRef<HTMLSpanElement>(null)
    const floatAnimationRef = useRef<gsap.core.Tween | null>(null)

    // 3D Tilt effect on mouse move
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
        const tag = tagRef.current
        if (!tag) return

        const rect = tag.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 5
        const rotateY = (centerX - x) / 5

        gsap.to(tag, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.15,
            boxShadow: '0 15px 35px rgba(232, 168, 56, 0.4), 0 0 20px rgba(232, 168, 56, 0.2)',
            duration: 0.2,
            ease: 'power2.out'
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        const tag = tagRef.current
        if (!tag) return

        gsap.to(tag, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            boxShadow: 'none',
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)'
        })
    }, [])

    useEffect(() => {
        const tag = tagRef.current
        if (!tag) return

        // Set up 3D perspective
        gsap.set(tag, { transformPerspective: 500 })

        // Staggered floating animation with unique timing per tag
        const floatVariant = (index + categoryIndex) % 3
        const duration = 2.5 + (index * 0.2) % 1.5
        const delay = (index * 0.15 + categoryIndex * 0.3) % 2

        const floatKeyframes = [
            { y: 0, rotation: 0 },
            { y: -4 - (floatVariant * 2), rotation: floatVariant === 0 ? 1 : floatVariant === 1 ? -0.5 : 0 },
            { y: 0, rotation: 0 }
        ]

        floatAnimationRef.current = gsap.to(tag, {
            keyframes: floatKeyframes,
            duration: duration,
            repeat: -1,
            ease: 'sine.inOut',
            delay: delay
        })

        // Random glow pulse effect - only some tags get it
        if ((index + categoryIndex) % 4 === 0) {
            gsap.to(tag, {
                keyframes: [
                    { boxShadow: '0 0 0 rgba(232, 168, 56, 0)' },
                    { boxShadow: '0 0 15px rgba(232, 168, 56, 0.3), 0 0 30px rgba(232, 168, 56, 0.15)' },
                    { boxShadow: '0 0 0 rgba(232, 168, 56, 0)' }
                ],
                duration: 3,
                repeat: -1,
                delay: index * 0.5,
                ease: 'sine.inOut'
            })
        }

        return () => {
            floatAnimationRef.current?.kill()
        }
    }, [index, categoryIndex])

    return (
        <span
            ref={tagRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="skill-tag skill-tag-animated skill-tag-3d px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-default relative z-0"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {skill}
        </span>
    )
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

            // Skill tags wave animation - staggered entrance
            const tags = gsap.utils.toArray('.skill-tag')
            tags.forEach((tag, index) => {
                gsap.fromTo(tag as Element,
                    { y: 30, opacity: 0, scale: 0.8, rotateX: -45 },
                    {
                        y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.5,
                        delay: index * 0.03,
                        ease: 'back.out(1.7)',
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
                        <div className="flex flex-wrap gap-2" style={{ perspective: '500px' }}>
                            {skills.technical.map((skill, i) => (
                                <SkillTag key={i} skill={skill} index={i} categoryIndex={0} />
                            ))}
                        </div>
                    </div>

                    {/* Automation */}
                    <div className="skill-group card">
                        <h3 className="text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            Automation
                        </h3>
                        <div className="flex flex-wrap gap-2" style={{ perspective: '500px' }}>
                            {skills.automation.map((skill, i) => (
                                <SkillTag key={i} skill={skill} index={i} categoryIndex={1} />
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="skill-group card">
                        <h3 className="text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2" style={{ perspective: '500px' }}>
                            {skills.soft.map((skill, i) => (
                                <SkillTag key={i} skill={skill} index={i} categoryIndex={2} />
                            ))}
                        </div>
                    </div>

                    {/* AI Awareness */}
                    <div className="skill-group card">
                        <h3 className="text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                            AI & ML Awareness
                        </h3>
                        <div className="flex flex-wrap gap-2" style={{ perspective: '500px' }}>
                            {skills.ai.map((skill, i) => (
                                <SkillTag key={i} skill={skill} index={i} categoryIndex={3} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
