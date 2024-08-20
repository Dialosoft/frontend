"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Bell, MessageCircleMore } from "lucide-react";
import ProfileRol from "../User/profile_rol";
import { Search_sk } from "@/components/Forum/Header/skeletons";
import OptionsOverlay from "./options";
import { useState } from "react";
import Link from "next/link";
import NotificationsOverlay from "./notifications";
const Search = dynamic(() => import("@/components/Forum/Header/search"), {
	loading: () => <Search_sk />,
});
const DarkMode = dynamic(() => import("@/components/Forum/Header/dark_tester"), {
	ssr: false,
});

export default function Main_Header() {
	const User = {
		name: "Alejandro",
		username: "@alejandro",
		rol: "Admin",
		photo: "",
	};
	const [showNotifications, setShowNotifications] = useState(false);

	const [showOptions, setShowOptions] = useState(false);
	return (
		<header className="py-[1rem] border-b-2 border-black-500 ">
			<div className="container z-10 flex items-center justify-between relative">
				<Link
					onClick={() => {
						setShowOptions(false), setShowNotifications(false);
					}}
					href="/"
				>
					<span className="select-none font-semibold text-xl lg:text-2xl">
						{process.env.Name}
					</span>
				</Link>

				<Suspense fallback={<Search_sk />}>
					<Search />
				</Suspense>

				<div className="flex items-center space-x-4 text-black-500">
					<Link
						onClick={() => {
							setShowOptions(false), setShowNotifications(false);
						}}
						href="/messages"
					>
						<MessageCircleMore className="hover:text-secondary" />
					</Link>
					<button
						onClick={() => {
							setShowNotifications(!showNotifications),
								setShowOptions(false);
						}}
					>
						<Bell className="hover:text-secondary" />
					</button>
					<button
						onClick={() => {
							setShowOptions(!showOptions),
								setShowNotifications(false);
						}}
					>
						<ProfileRol rol={User.rol} />
					</button>
				</div>
				{showOptions && <OptionsOverlay />}
				{showNotifications && <NotificationsOverlay />}
			</div>
			{(showOptions || showNotifications) && (
				<div
					onClick={() => {
						setShowOptions(false), setShowNotifications(false);
					}}
					className="absolute  h-screen w-screen top-0 right-0  cursor-pointer "
				/>
			)}
		</header>
	);
}
