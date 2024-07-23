"use client";

import debounce from "just-debounce-it";
import { useState, useEffect } from "react";

const useWindowWidth = () => {
	const isClient = typeof window === "object";
	const [windowWidth, setWindowWidth] = useState<number>(() => isClient ? window.innerWidth : 0);

	useEffect(() => {
		const handleResize = debounce(() => setWindowWidth(window.innerWidth), 300);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			handleResize.cancel();
		};
	}, []);

	return windowWidth;
};

export default useWindowWidth;