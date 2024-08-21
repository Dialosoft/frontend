"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { UserRound, Bookmark, Settings, Moon, Sun, LogOut } from "lucide-react";

const Role = dynamic(() => import("@/components/Forum/Header/User/role"));

interface UserProps {
	name: string,
	admin: boolean,
	mod: boolean
}

export default function User({ name, admin, mod }: UserProps) {
	const [isDark, setDark] = useState(true);

	const toggleDark = () => {
		setDark(!isDark);
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
		}
	];

	return (
		<div className="absolute overflow-hidden w-64 top-full mt-[1rem] right-0 rounded-lg bg-black-700 border border-opacity-25 border-black-300 text-black-500">
			<div className="m-[1rem] flex flex-col items-center justify-start space-y-[1rem]">
				<div className="w-full flex items-center justify-between">
					<span className="select-none text-secondary font-semibold">{name}</span>
					<Role admin={admin} mod={mod} />
				</div>

				<div className="w-full flex flex-col items-center justify-center space-y-[.4rem]">
					{menuItems.map((item) => (
						<Link className="inline-block w-full p-2 rounded-md transition-all ease-in-out duration-300 group hover:bg-black-300 hover:bg-opacity-25" href={item.link} key={uuidv4()} prefetch={false}>
							<div className="flex items-center justify-start space-x-[.5rem] transition-all ease-in-out duration-300 group-hover:text-secondary">
								<div>{item.icon}</div>
								<span className="select-none">{item.label}</span>
							</div>
						</Link>
					))}

					<button className="w-full p-2 rounded-md flex items-center justify-between transition-all ease-in-out duration-300 group hover:bg-black-300 hover:bg-opacity-25" onClick={toggleDark}>
						<div className="flex items-center justify-start space-x-[.5rem] transition-all ease-in-out duration-300 group-hover:text-secondary">
							<div>{isDark ? (<Moon size={24} />) : (<Sun size={24} />)}</div>
							<span className="select-none">{ isDark ? "Dark Mode" : "Light Mode" }</span>
						</div>

						<div className="bg-black-300 bg-opacity-25 rounded-full h-5 w-10">
							<div className={`bg-primary-400 rounded-full aspect-square h-full ease-in duration-100 ${isDark && "translate-x-5"}`}></div>
						</div>
					</button>

					<button className="w-full p-2 rounded-md flex items-center justify-start space-x-[.5rem] transition-all ease-in-out duration-300 hover:text-red hover:bg-black-300 hover:bg-opacity-25">
						<LogOut size={24} />
						<span className="select-none">Log Out</span>
					</button>
				</div>
			</div>
		</div>
	);
}