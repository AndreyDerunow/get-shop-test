/** @type {import('tailwindcss').Config} */
const MAIN = "#86D3F4";
const BROWNGRAY = "#565656";
const ERROR = "#EA0000";

const colors = require("tailwindcss/colors");
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            ...colors,
            mainColor: MAIN,
            brownGray: BROWNGRAY,
            errorColor: ERROR
        },
        extend: {
            animation: {
                "bounce-x1": "bounceLoader 2s ease 1"
            },
            keyframes: {
                bounceLoader: {
                    "25%": { transform: "translateY(-30%)" },
                    "50%": { transform: "translateY(20%)" },
                    "75%": { transform: "translateY(-20)" },
                    "100%": { transform: "translateY(0)" }
                }
            }
        }
    },
    plugins: []
};
