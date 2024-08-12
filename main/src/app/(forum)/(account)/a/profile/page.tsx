"use client";
import Profile from "@/components/Account/Profile_Section/profile";
import { useState } from "react";
import AccountSideNav from "@/components/Account/sidenav";
export default function ProfileSection() {

	const UserInfo ={
	feed: 21,
	posts: 32,
	answers: 223
	}
	
		const [activeSection, setActiveSection] = useState("feed");

	return (
		<div className="container   flex  space-x-4 mt-16">
			<div className="max-w-[317px] w-full">
				<AccountSideNav />
			</div>

			<div className="space-y-4">
				<Profile />
				{/* <div className="flex space-x-4 select-none ">
					<div
						onClick={() => setActiveSection("feed")}
						className={`rounded-md bg-black-300 flex space-x-2 px-4 py-3 border border-black-300 border-opacity-25 ${
							activeSection === "feed"
								? "bg-opacity-50 "
								: "bg-opacity-25 border "
						}`}
					>
						<div className="font-medium">User Feed</div>
						<div
							className={
								activeSection === "feed"
									? "text-primary-400"
									: "text-black-500"
							}
						>
							{UserInfo.feed}
						</div>
					</div>
					<div
						onClick={() => setActiveSection("posts")}
						className={`rounded-md bg-black-300 flex space-x-2 px-4 py-3 border border-black-300 border-opacity-25 ${
							activeSection === "posts"
								? "bg-opacity-50"
								: "bg-opacity-25"
						}`}
					>
						<div className="font-medium">Posts</div>
						<div
							className={
								activeSection === "posts"
									? "text-primary-400"
									: "text-black-500"
							}
						>
							{UserInfo.posts}
						</div>
					</div>
					<div
						onClick={() => setActiveSection("answers")}
						className={`rounded-md bg-black-300 flex space-x-2 px-4 py-3 border border-black-300 border-opacity-25 ${
							activeSection === "answers"
								? "bg-opacity-50"
								: "bg-opacity-25"
						}`}
					>
						<div className="font-medium">Answers</div>
						<div
							className={
								activeSection === "answers"
									? "text-primary-400"
									: "text-black-500"
							}
						>
							{UserInfo.answers}
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
