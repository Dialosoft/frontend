"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { UserRound, Bookmark, Settings, Moon, Sun, LogOut } from "lucide-react";

import Session_LogOut from "@/utils/Session/logOut";
import useDarkMode from "@/components/Hooks/useDarkMode";

const Role = dynamic(() => import("@/components/Forum/Header/User/role"));

interface UserProps {
	name: string;
	admin: boolean;
	mod: boolean;
}

export default function User({ name, admin, mod }: UserProps) {
	const [theme, setTheme] = useDarkMode();

	const toggleDark = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const menuItems = [
		{
			icon: <UserRound size={24} />,
			label: "Profile",
			link: "/a/profile",
		},
		{
			icon: <Bookmark size={24} />,
			label: "Saved",
			link: "/a/saved",
		},
		{
			icon: <Settings size={24} />,
			label: "Settings",
			link: "/a/settings/account",
		},
	];

	const handle_Logout = async () => {
		await Session_LogOut();
		window.location.reload();
	};

	return (
		<div className="absolute overflow-hidden w-72 top-full mt-[1rem] right-0 rounded-lg bg-secondary dark:bg-black-700 border border-opacity-25 border-black-300 text-black-500">
			<div className="m-[1rem] flex flex-col items-center justify-start space-y-[1rem]">
				<div className="w-full flex items-center justify-between">
					<span className="select-none text-secondary font-semibold">{name}</span>
					<Role admin={admin} mod={mod} />
				</div>

				<div className="w-full flex flex-col items-center justify-center space-y-[.4rem]">
					{menuItems.map(item => (
						<Link
							className="inline-block w-full p-2 rounded-md transition-all ease-in-out duration-300 group hover:bg-black-300 hover:bg-opacity-25"
							href={item.link}
							key={uuidv4()}
							prefetch={false}
						>
							<div className="flex items-center justify-start space-x-[.5rem] transition-all ease-in-out duration-300 group-hover:text-secondary">
								<div>{item.icon}</div>
								<span className="select-none">{item.label}</span>
							</div>
						</Link>
					))}

					<button
						className="w-full p-2 rounded-md flex items-center justify-between transition-all ease-in-out duration-300 group hover:bg-black-300 hover:bg-opacity-25"
						onClick={toggleDark}
					>
						<div className="flex items-center justify-start space-x-[.5rem] transition-all ease-in-out duration-300 group-hover:text-secondary">
							<div>{theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}</div>
							<span className="select-none">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>

							<div className="text-yellow rounded-md border border-yellow bg-yellow bg-opacity-25 px-1 py-0.5 flex items-center justify-center">
								<span className="select-none text-xs">Beta</span>
							</div>
						</div>

						<div className="bg-black-300 bg-opacity-25 rounded-full h-5 w-10">
							<div className={`bg-primary-400 rounded-full aspect-square h-full ease-in duration-100 ${theme === "dark" && "translate-x-5"}`}></div>
						</div>
					</button>

					<button
						onClick={handle_Logout}
						className="w-full p-2 rounded-md flex items-center justify-start space-x-[.5rem] transition-all ease-in-out duration-300 hover:text-red hover:bg-black-300 hover:bg-opacity-25"
					>
						<LogOut size={24} />
						<span className="select-none">Log Out</span>
					</button>
				</div>
			</div>
		</div>
	);
}
