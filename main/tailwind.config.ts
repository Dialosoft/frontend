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
			},
			screens: {
				sm: "100%",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1920px"
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					md: "2rem",
					xl: "1rem",
					"2xl": "2rem",
					"3xl": "1rem"
				},
				screens: {
					sm: "100%",
					md: "768px",
					lg: "1024px",
					xl: "1280px",
					"2xl": "1536px",
					"3xl": "2000px"
				}
			}
		}
	},
	plugins: []
};

export default config;