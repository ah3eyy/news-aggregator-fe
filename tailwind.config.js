/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            'sans': ['"Open Sans"', 'sans-serif'],
            'inter': ['"Inter"']
        },
        extend: {
            colors: {
                primary: "#017C53",
                light: "#D0D5DD",
                white: "#FFFFFF"
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
        },
    },
    plugins: [],
}

