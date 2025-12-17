'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Home() {
    const lenisRef = useRef<any>(null)

    useEffect(() => {
        // Initialize smooth scroll behavior
        const initLenis = async () => {
            try {
                const Lenis = (await import('@studio-freight/lenis')).default
                const lenisInstance = new Lenis({
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                })

                lenisRef.current = lenisInstance

                const raf = (time: number) => {
                    lenisInstance.raf(time)
                    requestAnimationFrame(raf)
                }

                requestAnimationFrame(raf)

                // Connect Lenis to GSAP ScrollTrigger
                lenisInstance.on('scroll', ScrollTrigger.update)
                gsap.ticker.add((time) => {
                    lenisInstance.raf(time * 1000)
                })
                gsap.ticker.lagSmoothing(0)

            } catch (error) {
                console.log('Lenis not available, using native scroll')
            }
        }

        initLenis()

        // Smooth scroll for anchor links with GSAP
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const anchor = target.closest('a[href^="#"]')

            if (anchor) {
                e.preventDefault()
                const href = anchor.getAttribute('href')
                if (href && href !== '#') {
                    const targetElement = document.querySelector(href)
                    if (targetElement) {
                        // Use Lenis if available, otherwise GSAP
                        if (lenisRef.current) {
                            lenisRef.current.scrollTo(targetElement, {
                                duration: 1.5,
                                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                            })
                        } else {
                            gsap.to(window, {
                                duration: 1.5,
                                scrollTo: { y: targetElement, offsetY: 0 },
                                ease: 'power3.inOut'
                            })
                        }
                    }
                }
            }
        }

        document.addEventListener('click', handleAnchorClick)

        // Refresh ScrollTrigger on load
        ScrollTrigger.refresh()

        return () => {
            document.removeEventListener('click', handleAnchorClick)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            if (lenisRef.current) {
                lenisRef.current.destroy()
            }
        }
    }, [])

    return (
        <main className="relative">
            <Navigation />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
        </main>
    )
}
