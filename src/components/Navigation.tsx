'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
    const navRef = useRef<HTMLElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const menuItemsRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Handle body scroll lock
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    // GSAP animations
    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out' }
        )

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveSection(section.id),
                onEnterBack: () => setActiveSection(section.id),
            })
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Mobile menu animations
    useEffect(() => {
        if (!menuRef.current || !menuItemsRef.current) return

        const menuItems = menuItemsRef.current.querySelectorAll('.mobile-nav-item')
        const ctaButton = menuItemsRef.current.querySelector('.mobile-cta')

        if (isMobileMenuOpen) {
            // Open animation
            const tl = gsap.timeline()

            tl.to(menuRef.current, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3,
                ease: 'power2.out'
            })
                .fromTo(menuItems,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: 'power3.out'
                    },
                    '-=0.1'
                )
                .fromTo(ctaButton,
                    { y: 30, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(1.5)'
                    },
                    '-=0.2'
                )
        } else {
            // Close animation - exact mirror of open animation
            const tl = gsap.timeline({
                onComplete: () => {
                    if (menuRef.current) {
                        menuRef.current.style.visibility = 'hidden'
                    }
                    // Reset positions for next open
                    gsap.set(menuItems, { y: 0, opacity: 1 })
                    gsap.set(ctaButton, { y: 0, opacity: 1, scale: 1 })
                }
            })

            // CTA fades out first (reverse of it appearing last)
            tl.to(ctaButton, {
                y: 30,
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                ease: 'power3.in'
            })
                // Menu items stagger out - slide DOWN (same direction they came from), last to first
                .to(menuItems, {
                    y: 40,
                    opacity: 0,
                    stagger: {
                        each: 0.08,
                        from: 'end'
                    },
                    duration: 0.4,
                    ease: 'power3.in'
                }, '-=0.2')
                // Finally fade out the overlay
                .to(menuRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                }, '-=0.3')
        }
    }, [isMobileMenuOpen])

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false)
        // Small delay for animation to complete before scrolling
        setTimeout(() => {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }, 200)
    }

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 opacity-0 ${isScrolled
                    ? 'py-3 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]'
                    : 'py-5 bg-transparent'
                    }`}
            >
                <div className="container flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="text-xl font-bold text-[var(--accent)] z-50">
                        HP
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors ${activeSection === item.href.slice(1)
                                    ? 'text-[var(--accent)]'
                                    : 'text-[var(--text-secondary)] hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop-only Hire Me button - wrapped in div to bypass btn-primary display override */}
                    <div className="hidden md:block">
                        <a href="#contact" className="btn-primary !py-2 !px-5 text-sm">
                            Hire Me
                        </a>
                    </div>

                    {/* Mobile Toggle - Animated Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center z-50 relative"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-4 relative flex flex-col justify-between">
                            <span
                                className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                                    }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                                    }`}
                            />
                            <span
                                className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                                    }`}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Full-screen Mobile Menu */}
            <div
                ref={menuRef}
                className="md:hidden fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl"
                style={{ opacity: 0, visibility: 'hidden' }}
            >
                {/* Decorative elements */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-[var(--accent-glow)] blur-[100px] opacity-30" />
                <div className="absolute bottom-1/4 -right-20 w-48 h-48 rounded-full bg-[var(--accent-glow)] blur-[80px] opacity-20" />

                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(var(--text-muted) 1px, transparent 1px)`,
                        backgroundSize: '1px 60px'
                    }}
                />

                <div
                    ref={menuItemsRef}
                    className="h-full flex flex-col justify-center items-center px-8"
                >
                    {/* Nav Links */}
                    <div className="flex flex-col items-center gap-6 mb-12">
                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNavClick(item.href)
                                }}
                                className={`mobile-nav-item text-3xl font-semibold transition-all duration-300 hover:text-[var(--accent)] hover:scale-105 ${activeSection === item.href.slice(1)
                                    ? 'text-[var(--accent)]'
                                    : 'text-white'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault()
                            handleNavClick('#contact')
                        }}
                        className="mobile-cta btn-primary !py-4 !px-10 text-lg"
                    >
                        Hire Me
                    </a>


                </div>
            </div>
        </>
    )
}
