"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Profile = dynamic(() => import("@/components/Forum/Account/Profile_Section/profile"));
const AccountSideNav = dynamic(() => import("@/components/Forum/Account/sidenav"));
const FeedPost = dynamic(() => import("@/components/Forum/Account/Profile_Section/feed_comments"));
const UserPosts = dynamic(() => import("@/components/Forum/Account/Profile_Section/user_posts"));
const AccountMovileNav = dynamic(() => import("@/components/Forum/Account/movilenav"));

import { getUser } from "@/utils/User/getUser";

interface UserProps {
	created_at: string;
	uuid: string;
	username: string;
	role: {
		admin_role: boolean;
		mod_role: boolean;
	};
}

export default function ProfileSection() {
	const [user, setUser] = useState<UserProps | null>(null);
	const [activeSection, setActiveSection] = useState("feed");

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			setUser(userData);
		};

		fetchUser();
	}, []);

	if (!user) {
		return <div>Loading...</div>;
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);

		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "short",
			year: "numeric",
		};

		return new Intl.DateTimeFormat("en-UK", options).format(date);
	}

	user.created_at = formatDate(user.created_at);

	const User = {
		name: "Alejandro",
		username: "@alejandro",
		role: "Admin",
		pronoun: "she/her",
		registration_date: "28 Feb. 2020",
		answers: 313, //
		feed: 21, //
		posts: 32, //
		likes: 3232,
		best_answers: 323,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae scelerisque tortor. Maecenas aliquet libero vitae nisl lobortis.",
		feed_comments: [
			{
				user: "Pedro",
				username: "@perrosanxe",
				date: "7 April 2021",
				message: " Más sabe el perro sanxe por perro que por sanxe",
			},
			{
				user: "Alejandro",
				username: "@jaro.c",
				date: "20 January 2021",
				message: " Me gusta que me den duro 0//W//0 ",
			},
			{
				user: "Flussen",
				username: "@flussen",
				date: "4 June 2002",
				message: " Hello World ",
			},
		],
		user_posts: [
			{
				title: "Invade Event: Venequia",
				answers: 453,
				date: "7 April 2021",
				views: 8567,
			},
			{
				title: "Invade Event: Poland",
				answers: 33,
				date: "7 April 2021",
				views: 757,
			},
		],
	};

	const feedCommentsCount = User.feed_comments.length;
	const UserPostCount = User.user_posts.length;

	return (
		<div className="lg:container max-lg:mx-4 max-sm:flex-col flex mt-8 lg:mt-16 mb-4 max-sm:mb-20">
			<AccountMovileNav />
			<div className="xl:max-w-[317px] mr-4 w-fit xl:w-full min-w-[60px] max-sm:hidden max-xl:sm:mr-4">
				<AccountSideNav />
			</div>

			<div className="space-y-4">
				<Profile
					id={user.uuid}
					name={String(user.username).toUpperCase()}
					username={"@" + user.username}
					role={{ mod: user.role.mod_role, admin: user.role.admin_role }}
					pronoun=""
					registration_date={user.created_at}
					description={User.description}
					answers={User.answers}
					likes={User.likes}
					best_answers={User.best_answers}
				/>

				<div className="flex space-x-4 select-none ">
					<div
						onClick={() => setActiveSection("feed")}
						className={`rounded-md bg-black-300 flex space-x-2 px-4 py-3 border border-black-300 border-opacity-25 ${
							activeSection === "feed" ? "bg-opacity-50 " : "bg-opacity-25 border "
						}`}
					>
						<div className="font-medium">User Feed</div>
						<div className={activeSection === "feed" ? "text-primary-400" : "text-black-500"}>{feedCommentsCount}</div>
					</div>
					<div
						onClick={() => setActiveSection("posts")}
						className={`rounded-md bg-black-300 flex space-x-2 px-4 py-3 border border-black-300 border-opacity-25 ${activeSection === "posts" ? "bg-opacity-50" : "bg-opacity-25"}`}
					>
						<div className="font-medium">Posts</div>
						<div className={activeSection === "posts" ? "text-primary-400" : "text-black-500"}>{UserPostCount}</div>
					</div>
					{/* <div
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
							{User.answers}
						</div>
					</div> */}
				</div>

				{activeSection === "feed" && <FeedPost messages={User.feed_comments} />}

				{activeSection === "posts" && <UserPosts messages={User.user_posts} />}
			</div>
		</div>
	);
}
