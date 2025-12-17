'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
    useEffect(() => {
        // Initialize smooth scroll behavior
        const lenis = async () => {
            try {
                const Lenis = (await import('@studio-freight/lenis')).default
                const lenisInstance = new Lenis({
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                })

                function raf(time: number) {
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

        lenis()

        // Refresh ScrollTrigger on load
        ScrollTrigger.refresh()

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
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
