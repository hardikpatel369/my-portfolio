/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#0c0c0c',
                'bg-secondary': '#141414',
                'bg-tertiary': '#1c1c1c',
                'bg-elevated': '#242424',
                'accent': '#e8a838',
                'accent-light': '#f4c45c',
                'accent-dark': '#c98a1e',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
