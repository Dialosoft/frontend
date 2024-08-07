import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				primary: {
					"50": "#eefbfd",
					"100": "#d4f4f9",
					"200": "#aee9f3",
					"300": "#76d8ea",
					"400": "#27b4d2",
					"500": "#1aa0c0",
					"600": "#1981a1",
					"700": "#1b6983",
					"800": "#1f566b",
					"900": "#1e485b",
					"950": "#0e2e3e",
				},
				secondary: "#D3D3ED",
				black: {
					500: "#3A3A50",
					900: "#0F0F13",
				},
			},
			screens: {
				sm: "100%",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1920px",
				"4xl": "2560px",
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
				},
				screens: {
					"3xl": "1920px",
				},
			},
		},
	},
	plugins: [],
};

export default config;
