import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0fdf3",
					100: "#dcfce4",
					200: "#bcf6cb",
					300: "#87eea3",
					400: "#4cdc74",
					500: "#27d257",
					600: "#18a13e",
					700: "#167f34",
					800: "#17642d",
					900: "#155228",
					950: "#062d13"
				},
				secondary: "#D3D3ED",
				black: {
					500: "#3A3A50",
					900: "#0F0F13"
				}
			},
			screens: {
				sm: "100%",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1920px",
				"4xl": "2560px"
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem"
				},
				screens: {
					"3xl": "1920px"
				}
			}
		}
	},
	plugins: []
};

export default config;