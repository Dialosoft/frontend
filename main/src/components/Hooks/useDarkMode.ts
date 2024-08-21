"use client";

import debounce from "just-debounce-it";
import { useEffect, useState } from "react";

export default function useDarkMode() {
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			const storedTheme = localStorage.getItem("theme");
			return storedTheme ? storedTheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		}

		return "light";
	});

	const colorTheme = theme === "dark" ? "light" : "dark";

	useEffect(() => {
		const root = window.document.documentElement;
	
		const applyTheme = () => {
			root.classList.remove(colorTheme);
			root.classList.add(theme);
			localStorage.setItem("theme", theme);
		};
	
		const debouncedApplyTheme = debounce(applyTheme, 200);
		debouncedApplyTheme();
		return () => debouncedApplyTheme.cancel();
	}, [theme, colorTheme]);

	return [colorTheme, setTheme] as const;
}