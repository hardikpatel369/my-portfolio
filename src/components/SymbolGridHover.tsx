'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface SymbolGridHoverProps {
    children: ReactNode
    className?: string
}

const config = {
    symbols: ["0", "1", "X", "*", "#", "$", "&", "@", "!", "?"],
    blockSize: 20,
    detectionRadius: 50,
    clusterSize: 5,
    blockLifetime: 500,
    emptyRatio: 0.3,
    scrambleRatio: 0.5,
    scrambleInterval: 100
}

const getRandomSymbol = () => config.symbols[Math.floor(Math.random() * config.symbols.length)]

interface Block {
    el: HTMLDivElement
    x: number
    y: number
    gridX: number
    gridY: number
    highlightEndTime: number
    isEmpty: boolean
    shouldScramble: boolean
    scrambleIntervalId: ReturnType<typeof setInterval> | null
}

export default function SymbolGridHover({ children, className = '' }: SymbolGridHoverProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const blocksRef = useRef<Block[]>([])
    const animationFrameRef = useRef<number | null>(null)

    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        // Create overlay
        const overlay = document.createElement('div')
        overlay.className = 'grid-overlay'
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        `
        wrapper.appendChild(overlay)
        overlayRef.current = overlay

        const width = wrapper.offsetWidth
        const height = wrapper.offsetHeight
        const cols = Math.ceil(width / config.blockSize)
        const rows = Math.ceil(height / config.blockSize)

        const blocks: Block[] = []

        // Create grid blocks
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const blockEl = document.createElement('div')

                const isEmpty = Math.random() < config.emptyRatio
                if (!isEmpty) {
                    blockEl.textContent = getRandomSymbol()
                }

                blockEl.style.cssText = `
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.9);
                    color: #00ff41;
                    font-size: 10px;
                    font-family: 'IBM Plex Mono', 'Consolas', monospace;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    width: ${config.blockSize}px;
                    height: ${config.blockSize}px;
                    left: ${c * config.blockSize}px;
                    top: ${r * config.blockSize}px;
                `

                overlay.appendChild(blockEl)

                blocks.push({
                    el: blockEl,
                    x: c * config.blockSize + config.blockSize / 2,
                    y: r * config.blockSize + config.blockSize / 2,
                    gridX: c,
                    gridY: r,
                    highlightEndTime: 0,
                    isEmpty: isEmpty,
                    shouldScramble: Math.random() < config.scrambleRatio,
                    scrambleIntervalId: null
                })
            }
        }

        blocksRef.current = blocks

        function activateBlock(block: Block) {
            const now = Date.now()
            block.el.style.opacity = '1'
            block.highlightEndTime = now + config.blockLifetime

            if (block.shouldScramble && !block.scrambleIntervalId && !block.isEmpty) {
                block.scrambleIntervalId = setInterval(() => {
                    block.el.textContent = getRandomSymbol()
                }, config.scrambleInterval)
            }
        }

        function triggerCluster(startBlock: Block, allBlocks: Block[]) {
            let current = startBlock
            for (let i = 0; i < config.clusterSize; i++) {
                const neighbors = allBlocks.filter(b =>
                    Math.abs(b.gridX - current.gridX) <= 1 &&
                    Math.abs(b.gridY - current.gridY) <= 1 &&
                    b !== current
                )
                if (neighbors.length > 0) {
                    const next = neighbors[Math.floor(Math.random() * neighbors.length)]
                    setTimeout(() => activateBlock(next), i * 50)
                    current = next
                }
            }
        }

        function handleMouseMove(e: MouseEvent) {
            if (!wrapper) return
            const rect = wrapper.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top

            let closestBlock: Block | null = null
            let minDistance = config.detectionRadius

            blocks.forEach(block => {
                const dx = mouseX - block.x
                const dy = mouseY - block.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < minDistance) {
                    minDistance = distance
                    closestBlock = block
                }
            })

            if (closestBlock) {
                activateBlock(closestBlock)
                triggerCluster(closestBlock, blocks)
            }
        }

        function updateHighlights() {
            const now = Date.now()
            blocks.forEach(block => {
                if (block.highlightEndTime > 0 && now > block.highlightEndTime) {
                    block.el.style.opacity = '0'
                    block.highlightEndTime = 0
                    if (block.scrambleIntervalId) {
                        clearInterval(block.scrambleIntervalId)
                        block.scrambleIntervalId = null
                    }
                }
            })
            animationFrameRef.current = requestAnimationFrame(updateHighlights)
        }

        wrapper.addEventListener('mousemove', handleMouseMove)
        updateHighlights()

        // Cleanup
        return () => {
            wrapper.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            blocks.forEach(block => {
                if (block.scrambleIntervalId) {
                    clearInterval(block.scrambleIntervalId)
                }
            })
            if (overlayRef.current && wrapper.contains(overlayRef.current)) {
                wrapper.removeChild(overlayRef.current)
            }
        }
    }, [])

    return (
        <div
            ref={wrapperRef}
            className={className}
            style={{ position: 'relative', width: '100%', height: '100%' }}
        >
            {children}
        </div>
    )
}
