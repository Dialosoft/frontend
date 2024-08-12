"use client";
import Profile from "@/components/Account/Profile_Section/profile";
import { useState } from "react";
import AccountSideNav from "@/components/Account/sidenav";
export default function SettingsSection() {
	const UserInfo = {
		feed: 21,
		posts: 32,
		answers: 223,
	};

	const [activeSection, setActiveSection] = useState("feed");

	return (
		<div className="container   flex  space-x-4 mt-16">
			<div className="max-w-[317px] w-full">
				<AccountSideNav />
			</div>
		</div>
	);
}