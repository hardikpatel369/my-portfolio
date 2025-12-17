'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title with dramatic reveal
            gsap.fromTo('.contact-title',
                { y: 60, opacity: 0, scale: 0.95, filter: 'blur(10px)' },
                {
                    y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.contact-title', start: 'top 85%', toggleActions: 'play none none reset' }
                }
            )

            // Form container with 3D entrance
            gsap.fromTo('.contact-form',
                { x: -60, opacity: 0, rotateY: 15 },
                {
                    x: 0, opacity: 1, rotateY: 0, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', toggleActions: 'play none none reset' }
                }
            )

            // Form inputs staggered reveal
            gsap.fromTo('.form-group',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: '.contact-form', start: 'top 75%', toggleActions: 'play none none reset' }
                }
            )

            // Submit button elastic bounce
            gsap.fromTo('.submit-btn',
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 0.8,
                    ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: { trigger: '.submit-btn', start: 'top 90%', toggleActions: 'play none none reset' }
                }
            )

            // Info card slide in from right
            gsap.fromTo('.contact-info',
                { x: 60, opacity: 0, rotateY: -15 },
                {
                    x: 0, opacity: 1, rotateY: 0, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', toggleActions: 'play none none reset' }
                }
            )

            // Contact items staggered
            gsap.fromTo('.contact-item',
                { x: 30, opacity: 0 },
                {
                    x: 0, opacity: 1, stagger: 0.1, duration: 0.5,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: '.contact-info', start: 'top 75%', toggleActions: 'play none none reset' }
                }
            )

            // Portfolio button special animation
            gsap.fromTo('.portfolio-btn',
                { y: 20, opacity: 0, scale: 0.9 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.6,
                    ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: '.portfolio-btn', start: 'top 90%', toggleActions: 'play none none reset' }
                }
            )

            // Footer reveal
            gsap.fromTo('.contact-footer',
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6,
                    scrollTrigger: { trigger: '.contact-footer', start: 'top 95%', toggleActions: 'play none none reset' }
                }
            )

            // Background glow parallax
            gsap.to('.contact-glow',
                {
                    y: -100,
                    scale: 1.5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                    }
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Button animation on submit
        gsap.to('.submit-btn', {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        })

        await new Promise(resolve => setTimeout(resolve, 1500))
        setFormState({ name: '', email: '', message: '' })
        setIsSubmitting(false)

        // Success animation
        gsap.fromTo('.submit-btn',
            { scale: 1.1 },
            { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
        )
    }

    return (
        <section ref={sectionRef} id="contact" className="bg-[var(--bg-secondary)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border-subtle)]" />

            {/* Background glow */}
            <div className="contact-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent-glow)] blur-[150px] opacity-20" />

            <div className="container relative z-10">
                <div className="contact-title text-center mb-16">
                    <p className="text-[var(--accent)] font-medium tracking-widest uppercase text-xs mb-4">Contact</p>
                    <h2 className="text-white">Let&apos;s Connect</h2>
                </div>

                <div className="contact-grid grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="contact-form space-y-6">
                        <div className="form-group">
                            <label className="block text-[var(--text-muted)] text-sm mb-2">Name</label>
                            <input
                                type="text"
                                value={formState.name}
                                onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                                required
                                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--accent)] transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-[var(--text-muted)] text-sm mb-2">Email</label>
                            <input
                                type="email"
                                value={formState.email}
                                onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                                required
                                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--accent)] transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-[var(--text-muted)] text-sm mb-2">Message</label>
                            <textarea
                                value={formState.message}
                                onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                                required
                                rows={4}
                                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-white outline-none focus:border-[var(--accent)] transition-colors resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="submit-btn btn-primary w-full justify-center">
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="contact-info space-y-6">
                        <div className="card">
                            <h3 className="text-white mb-4">Contact Information</h3>

                            <div className="space-y-4">
                                <a href="mailto:patelhardik94271@gmail.com" className="contact-item flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                                    <span className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">📧</span>
                                    patelhardik94271@gmail.com
                                </a>

                                <a href="tel:+918849569553" className="contact-item flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                                    <span className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">📱</span>
                                    +91 8849569553
                                </a>

                                <div className="contact-item flex items-center gap-3 text-[var(--text-secondary)]">
                                    <span className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">📍</span>
                                    London, UK
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://hardik-patel.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-btn btn-secondary w-full justify-center"
                        >
                            Visit Portfolio ↗
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="contact-footer mt-20 pt-8 border-t border-[var(--border-subtle)] text-center">
                    <p className="text-[var(--text-muted)] text-sm">
                        © {new Date().getFullYear()} Hardik Patel
                    </p>
                </div>
            </div>
        </section>
    )
}
