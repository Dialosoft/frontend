"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Dark_Mode() {
	const [isDarkMode, setIsDarkMode] = useState(true);

	const toggleMode = () => {
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle("dark");
	}

	return (
		<button onClick={toggleMode}>
			{isDarkMode ? <Sun className="stroke-black-500" size={24} /> : <Moon className="stroke-black-500" size={24} />}
		</button>
	);
}