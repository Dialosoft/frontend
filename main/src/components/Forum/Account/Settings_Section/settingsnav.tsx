"use client";
import { UserRoundCog, Shield, Bell, MonitorCog, ScrollText, HelpCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNav() {
	const pathname = usePathname();

	const menuItems = [
		{
			icon: (
				<UserRoundCog
					className={`h-5 w-5 ${
						pathname == "/a/settings/account"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Account",
			link: "/a/settings/account",
		},
		{
			icon: (
				<Shield
					className={`h-5 w-5 ${
						pathname == "/a/settings/security"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Security",
			link: "/a/settings/security",
		},
		{
			icon: (
				<Bell
					className={`h-5 w-5 ${
						pathname == "/a/settings/notifications"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Notifications",
			link: "/a/settings/notifications",
		},
		{
			icon: (
				<MonitorCog
					className={`h-5 w-5 ${
						pathname == "/a/settings/apparence"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Apparence",
			link: "/a/settings/apparence",
		},
		{
			icon: (
				<ScrollText
					className={`h-5 w-5 ${
						pathname == "/a/settings/privacity"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Privacity",
			link: "/a/settings/privacity",
		},
		{
			icon: (
				<HelpCircle
					className={`h-5 w-5 ${
						pathname == "/a/settings/help"
							? "text-primary-400"
							: "text-black-500 group-hover:text-secondary"
					}`}
				/>
			),
			label: "Help Center",
			link: "/a/settings/help",
		},
	];

	return (
		<>
			<div className="bg-black-300 bg-opacity-25 rounded-lg p-2 grid grid-cols-1 gap-2">
				{menuItems.map(item => (
					<Link href={item.link} className="w-full" key={uuidv4()}>
						<div
							className={`flex group justify-start items-center w-full space-x-2 px-4 hover:text-secondary hover:bg-black-300 hover:bg-opacity-25 rounded-md h-14 ${
								pathname == item.link ? "text-primary-400" : "text-black-500 group-hover:text-secondary"
							}`}
						>
							{item.icon}
							<div
								className={`${
									pathname == item.link
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
