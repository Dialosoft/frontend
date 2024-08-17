"use client"
import { UserRound, Bookmark, Settings, LogOut } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";


export default function AccountSideNav() {

	const menuItems = [
		{
			icon: <UserRound className="h-5 w-5" />,
			label: "Profile",
			link: "/a/profile",
		},
		{
			icon: <Bookmark className="h-5 w-5" />,
			label: "Saved",
			link: "/a/saved",
		},
		{
			icon: <Settings className="h-5 w-5" />,
			label: "Settings",
			link: "/a/settings/account",
		},
		{
			icon: <Settings className="h-5 w-5" />,
			label: "Settings",
			link: "/a/settings/account",
		},
	];
	return (
		<>
			<div className="bg-black-300 bg-opacity-25 rounded-lg   p-2 grid grid-cols-1 gap-2 ">
				{menuItems.map(item => (
					<Link href={item.link} className="w-full">
						<div
							key={uuidv4()}
							className="flex justify-start items-center w-full space-x-2 px-4 hover:text-secondary hover:bg-black-300 hover:bg-opacity-25 rounded-md h-14"
						>
							{item.icon}
							<div>{item.label}</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
}
