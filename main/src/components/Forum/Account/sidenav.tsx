"use client"
import { UserRound, Bookmark, Settings, LogOut } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation'


export default function AccountSideNav() {
const pathname = usePathname()

	const menuItems = [
		{
			icon: (
				<UserRound
					className={`h-5 w-5 ${
						pathname == "/a/profile"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Profile",
			link: "/a/profile",
		},
		{
			icon: (
				<Bookmark
					className={`h-5 w-5 ${
						pathname == "/a/saved"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Saved",
			link: "/a/saved",
		},
		{
			icon: (
				<Settings
					className={`h-5 w-5 ${
						pathname.startsWith("/a/settings")
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Settings",
			link: "/a/settings/account",
		},
		{
			icon: (
				<LogOut
					className={`h-5 w-5 ${
						pathname == "/a/logout"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Logout",
			link: "/a/logout",
		},
	];

  return (
		<>
			<div className="bg-black-300 bg-opacity-25 rounded-lg p-2 grid grid-cols-1 gap-2">
				{menuItems.map(item => (
					<Link href={item.link} className="w-full" key={uuidv4()}>
						<div
							className={`flex group justify-start items-center w-full space-x-2 px-4 hover:text-secondary hover:bg-black-300 hover:bg-opacity-25 rounded-md h-14 ${
								pathname == item.link ||
								(item.link == "/a/settings/account" &&
									pathname.startsWith("/a/settings"))
									? "text-primary-400"
									: "text-black-500 group-hover:text-secondary"
							}`}
						>
							{item.icon}
							<div
								className={`${
									pathname == item.link ||
									(item.link == "/a/settings/account" &&
										pathname.startsWith("/a/settings"))
										? "text-primary-400"
										: "text-black-500 group-hover:text-secondary"
								}`}
							>
								{item.label}
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
  );
}