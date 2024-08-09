"use client";
import { useState } from "react";
import Rol from "../User/rol";
import { UserRound, Bookmark, Settings, Moon, LogOut } from "lucide-react";
import Link from "next/link";
import { link } from "fs";
import { v4 as uuidv4 } from "uuid";
import { Bell } from "lucide-react";
export default function NotificationsOverlay() {
	
	const menuItems = [
		{
			photo: "",
			name: "Alexander",
			type: "ha respondido a tu hilo",
			time: "2h",
			link: "",
		},
		{
			photo: "",
			name: "Alexander",
			type: "ha respondido a tu hilo",
			time: "2h",
			link: "",
		},
		
	];

	return (
		<>
			<div className=" absolute shadow-2xl top-[4.5rem]  right-[7.5rem] w-72 font-medium  bg-black-700 text-black-500  rounded-lg p-1 flex-col flex items-center justify-start ">
				<div className="flex text-secondary justify-center items-center space-x-2 w-full p-4 text-lg">
					<Bell className="w-5 h-5" />
					<div className=" font-semibold">Notifications</div>
				</div>

				{menuItems.map(item => (
					<Link href="/" className="w-full">
						<div
							key={uuidv4()}
							className="flex justify-between items-center w-full space-x-2 px-2 hover:text-secondary hover:bg-black-300 hover:bg-opacity-25 rounded-md h-14"
						>
							<div className="flex space-x-2 items-center  min-w-0">
								<div className="bg-black-900 border border-primary-400 rounded-full h-10 w-10 min-w-10" />
								<div className="text-secondary">
									{item.name}
								</div>
								<div className="text-sm max-w-full truncate">
									{item.type}
								</div>
							</div>

							<div className="text-sm">{item.time}</div>
						</div>
					</Link>
				))}

				<div className="flex justify-between items-center w-full space-x-2 px-4  text-sm rounded-md h-14 ">
					<div className="hover:text-red cursor-pointer">Delete</div>
					<div className="hover:text-secondary cursor-pointer">
						See More
					</div>
				</div>
			</div>
		</>
	);
}
