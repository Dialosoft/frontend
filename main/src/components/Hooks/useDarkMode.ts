"use client";

import { useEffect, useState } from "react";

export default function useDarkMode() {
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			const storedTheme = localStorage.getItem("theme");
			return storedTheme
				? storedTheme
				: window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light";
		}

		return "dark";
	});

	const colorTheme = theme === "dark" ? "light" : "dark";

	useEffect(() => {
		const rootHtml = window.document.documentElement;
		const rootBody = window.document.body;

		rootHtml.classList.remove(colorTheme);
		rootBody.classList.remove(colorTheme);

		rootHtml.classList.add(theme);
		rootBody.classList.add(theme);

		localStorage.setItem("theme", theme);
	}, [theme, colorTheme]);

	return [theme, setTheme] as const;
}
