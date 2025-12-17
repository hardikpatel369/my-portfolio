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
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'py-3 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]'
                    : 'py-5 bg-transparent'
                }`}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="text-xl font-bold text-[var(--accent)]">
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

                {/* CTA */}
                <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-5 text-sm">
                    Hire Me
                </a>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <div className="container py-6 flex flex-col gap-4">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-lg font-medium py-2 ${activeSection === item.href.slice(1) ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary justify-center mt-4">
                        Hire Me
                    </a>
                </div>
            </div>
        </nav>
    )
}
