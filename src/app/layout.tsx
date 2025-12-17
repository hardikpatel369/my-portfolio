import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Hardik Patel | Software Developer & Tech Leader',
    description: 'Full-stack developer with expertise in Java, Android, Python, and cloud technologies. Experienced in leading teams and delivering innovative software solutions.',
    keywords: ['Software Developer', 'Android Developer', 'Full Stack', 'Java', 'Python', 'Firebase', 'React', 'Next.js'],
    authors: [{ name: 'Hardik Patel' }],
    openGraph: {
        title: 'Hardik Patel | Software Developer & Tech Leader',
        description: 'Full-stack developer with expertise in Java, Android, Python, and cloud technologies.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
