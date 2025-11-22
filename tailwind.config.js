/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#F59E0B", // Amber 500
                "background-light": "#F8F8F8",
                "background-dark": "#111827", // Gray 900
            },
            fontFamily: {
                display: ["Poppins", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem", // 8px
            },
        },
    },
    plugins: [],
}
