"use client";
import { v4 as uuidv4 } from "uuid";
import SavedPost from "@/components/Forum/Account/Saved_Section/SvfPost";
import { useState } from "react";
import AccountSideNav from "@/components/Forum/Account/sidenav";
import { ChevronDown, Search } from "lucide-react";
import Aside from "@/components/Forum/side_info/main";
import AccountMovileNav from "@/components/Forum/Account/movilenav";
type UserType = {
	user: string;
	username: string;
	rate: number;
	best: boolean;
	message: string;
	answers: number;
	likes: number;
	date: string;
};
type PostsType = {
	id: number;
	user: string;
	username: string;
	title: string;
	message: string;
	answers: number;
	likes: number;
	date: string;
	date_saved: string;
};
type CommentType = UserType & { id: string; type: string };

type UnifiedType = (CommentType & { type: "comment" }) | (PostsType & { type: "post" });

const initialPosts: PostsType[] = [
	{
		id: 321,
		user: "Flussen",
		username: "flussen",
		title: "Invade Event: Poland",
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit condimentum risus in consectetur. Nullam placerat diam in imperdiet varius.",
		answers: 324,
		likes: 432,
		date: "24. Feb. 2002",
		date_saved: "22 August 2024",
	},
];
export default function SavedSection() {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [PostsList, setPostsList] = useState<PostsType[]>(initialPosts);
	const filteredPosts = PostsList.filter(
		post =>
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.message.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<div className="lg:container max-lg:mx-4 max-sm:flex-col  flex   mt-8 lg:mt-16  max-sm:mb-20">
			<AccountMovileNav />
			<div className="xl:max-w-[317px] w-fit mr-4 xl:w-full min-w-[60px] max-sm:hidden ">
				<AccountSideNav />
			</div>
			<div className=" w-full xl:w-[778px] xl:max-w-[778px] lg:mr-4">
				<div className=" flex justify-between mb-4 w-full ">
					<div className="flex items-center bg-black-300 bg-opacity-25 rounded-full p-2  space-x-2">
						<Search className="text-primary-400 h-5 w-5" />
						<input
							type="text"
							className="bg-transparent outline-none placeholder:text-black-500"
							placeholder="Search comment..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="text-black-500 flex items-center space-x-2 ">
						<div className="max-sm:hidden">Sort by:</div>
						<button className="flex  items-center hover:bg-black-300 hover:bg-opacity-25 px-2 py-1 rounded-lg">
							<span>Best</span>
							<ChevronDown className="w-4 h-4" />
						</button>
					</div>
				</div>
				{filteredPosts.map(post => (
					<SavedPost
						key={uuidv4()}
						user={post.user}
						username={post.username}
						title={post.title}
						message={post.message}
						answers={post.answers}
						likes={post.likes}
						date={post.date}
						date_saved={post.date_saved}
					/>
				))}
			</div>
			<Aside />
		</div>
	);
}
