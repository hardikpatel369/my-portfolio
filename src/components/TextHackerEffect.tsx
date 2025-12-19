'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

interface TextHackerEffectProps {
    text: string
    className?: string
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?'

export default function TextHackerEffect({ text, className = '' }: TextHackerEffectProps) {
    const [displayText, setDisplayText] = useState(text)
    const [isHovering, setIsHovering] = useState(false)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const iterationRef = useRef(0)

    const scrambleText = useCallback(() => {
        iterationRef.current = 0

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' '
                        if (index < iterationRef.current) {
                            return text[index]
                        }
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
                    })
                    .join('')
            )

            if (iterationRef.current >= text.length) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                }
            }

            iterationRef.current += 1 / 3
        }, 30)
    }, [text])

    const handleMouseEnter = () => {
        setIsHovering(true)
        scrambleText()
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setDisplayText(text)
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return (
        <span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer ${className}`}
            style={{ display: 'inline-block' }}
        >
            {displayText}
        </span>
    )
}
