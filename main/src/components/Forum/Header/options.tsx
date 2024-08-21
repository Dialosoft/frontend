"use client"
import { useState } from "react";
import Rol from "./User/rol";
import { UserRound, Bookmark, Settings, Moon, LogOut } from "lucide-react";
import Link from "next/link";
import { link } from "fs";
import { v4 as uuidv4 } from "uuid";

export default function OptionsOverlay() {
		const [toggle, setToggle] = useState(false)
		const User = {
			name: "Alejandro",
			username: "@alejandro",
			role: "Admin",
		};
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
		];

	return (
		<>
			<div className=" absolute shadow-2xl top-[4.5rem]  right-12 w-64 font-medium  bg-black-700 text-black-500  rounded-lg p-1 flex-col flex items-center justify-start ">
				<div className="flex justify-between w-full p-4">
					<div className="text-secondary font-semibold">
						{User.name}
					</div>
					<Rol rol={User.role} />
				</div>

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
				<div className="flex justify-between items-center w-full  px-4 hover:text-secondary hover:bg-black-300 hover:bg-opacity-25 rounded-md h-14 ">
					<div className="space-x-2 flex">
						<Moon className="h-5 w-5 " />
						<div> Dark Mode</div>
					</div>
					<div
						onClick={() => setToggle(!toggle)}
						className="bg-black-300 bg-opacity-25 rounded-full h-5 w-10"
					>
						<div
							className={`bg-primary-400 rounded-full aspect-square h-full ease-in duration-100 ${
								toggle && "translate-x-5"
							} `}
						/>
					</div>
				</div>
				<div className="flex justify-start items-center w-full space-x-2 px-4 hover:text-red hover:bg-black-300 hover:bg-opacity-25 rounded-md h-14 ">
					<LogOut className="h-5 w-5 " />
					<div> Log Out</div>
				</div>
			</div>
			
		</>
	);
}
