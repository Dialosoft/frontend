"use client";
import AccountMovileNav from "@/components/Forum/Account/movilenav";

import { Bell, HelpCircle, MonitorCog, ScrollText, Shield, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
export default function SettingsPage() {
	const pathname = usePathname();

	const menuItems = [
		{
			icon: <UserRoundCog className={`h-5 w-5 ${pathname === "/a/settings/account" ? "text-primary-400" : "text-black-500 group-hover:text-secondary"}`} />,
			label: "Account",
			link: "/a/settings/account",
		},
		{
			icon: <Shield className={`h-5 w-5 ${pathname === "/a/settings/security" ? "text-primary-400" : "text-black-500 group-hover:text-secondary"}`} />,
			label: "Security",
			link: "/a/settings/security",
		},
		{
			icon: <Bell className={`h-5 w-5 ${pathname === "/a/settings/notifications" ? "text-primary-400" : "text-black-500 group-hover:text-secondary"}`} />,
			label: "Notifications",
			link: "/a/settings/notifications",
		},
		{
			icon: <MonitorCog className={`h-5 w-5 ${pathname === "/a/settings/apparence" ? "text-primary-400" : "text-black-500 group-hover:text-secondary"}`} />,
			label: "Apparence",
			link: "/a/settings/apparence",
		},
		{
			icon: <ScrollText className={`h-5 w-5 ${pathname === "/a/settings/privacity" ? "text-primary-400" : "text-black-500 group-hover:text-secondary"}`} />,
			label: "Privacity",
			link: "/a/settings/privacity",
		},
		{
			icon: <HelpCircle className={`h-5 w-5 ${pathname === "/a/settings/help" ? "text-primary-400" : "text-black-500 group-hover:text-secondary"}`} />,
			label: "Help Center",
			link: "/a/settings/help",
		},
	];
	return (
		<div className="lg:container max-lg:mx-4 max-sm:flex-col  flex   mt-4 lg:mt-16">
			<AccountMovileNav />

			<div className=" w-full space-y-4 mr-4">
				<div className="h-10 rounded-full bg-black-300 bg-opacity-25"></div>
				<div className="bg-black-300 bg-opacity-25 rounded-lg p-2 grid grid-cols-1 gap-2">
					{menuItems.map(item => (
						<Link href={item.link} className="w-full" key={uuidv4()}>
							<div
								className={`flex group justify-start items-center w-full space-x-2 px-4 hover:text-secondary hover:bg-black-300 hover:bg-opacity-25 rounded-md h-14 ${
									pathname === item.link ? "text-primary-400" : "text-black-500 group-hover:text-secondary"
								}`}
							>
								{item.icon}
								<div className={`${pathname === item.link ? "text-primary-400" : "text-black-500 group-hover:text-secondary"}`}>{item.label}</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
