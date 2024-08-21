"use client";

import dynamic from "next/dynamic";
import { Bell } from "lucide-react";
import { Suspense, useRef, useEffect, useState } from "react";

const Notify = dynamic(() => import("@/components/Forum/Header/Notify/main"));

export default function Notify_Header() {
	const notifyRef = useRef<HTMLDivElement>(null);
	const [showNotifications, setNotifications] = useState(false);

	const toggleNotify = () => {
		setNotifications(!showNotifications);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
				setNotifications(false);
			}
		}

		if (showNotifications) {
			document.addEventListener("pointerdown", handleClickOutside);
		} else {
			document.removeEventListener("pointerdown", handleClickOutside);
		}

		return () => document.removeEventListener("pointerdown", handleClickOutside);
	}, [showNotifications]);

	return (
		<div className="relative flex items-center justify-center" ref={notifyRef}>
			<button onClick={toggleNotify}>
				<Bell className={`stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary ${showNotifications && "stroke-secondary"}`} />
			</button>

			{ showNotifications && (
				<Suspense>
					<Notify />
				</Suspense>
			)}
		</div>
	);
}