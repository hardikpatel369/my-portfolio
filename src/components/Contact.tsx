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

            // Contact items staggered (excluding social links)
            gsap.fromTo('.contact-item:not(.social-link)',
                { x: 30, opacity: 0 },
                {
                    x: 0, opacity: 1, stagger: 0.1, duration: 0.5,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: '.contact-info', start: 'top 75%', toggleActions: 'play none none reset' }
                }
            )

            // Social links animation
            gsap.fromTo('.social-link',
                { y: 20, opacity: 0, scale: 0.9 },
                {
                    y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.6,
                    ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: '.contact-info .flex.gap-4', start: 'top 90%', toggleActions: 'play none none reset' }
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

        try {
            // Send data to n8n webhook via internal proxy
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    timestamp: new Date().toISOString(),
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            // Clear form on success
            setFormState({ name: '', email: '', message: '' })

            // Success animation
            gsap.fromTo('.submit-btn',
                { scale: 1.1 },
                { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
            )
        } catch (error) {
            console.error('Error sending message:', error)
            // You could add error handling UI here
        } finally {
            setIsSubmitting(false)
        }
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
                                    Surat, Gujarat
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 mt-6 pt-6 border-t border-[var(--border-subtle)]">
                                <a
                                    href="https://github.com/hardikpatel369"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                >
                                    <span className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </span>
                                    GitHub
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/hardikpatel369/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                >
                                    <span className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </span>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
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
