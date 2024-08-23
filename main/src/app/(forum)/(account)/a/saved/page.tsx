"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { getAllSaved } from "@/utils/Saved/getFavorites";
const SavedPost = dynamic(() => import("@/components/Forum/Account/Saved_Section/SvfPost"));
const AccountSideNav = dynamic(() => import("@/components/Forum/Account/sidenav"));
const Aside = dynamic(() => import("@/components/Forum/side_info/main"));
const AccountMovileNav = dynamic(() => import("@/components/Forum/Account/movilenav"));
import { changeFavorite } from "@/utils/Saved/changeFavorite";

interface Comment {
	id: string;
	username: string;
	content: string;
	positiveReaction: number;
	negativeReaction: number;
	creationTime: string;
	parentCommentId?: string;
}

interface Post {
	postOwner: string;
	content: string;
	image: string;
	comments: Comment[];
	postId: string;
	positiveReaction: number;
	negativeReaction: number;
	creationTime: string;
	isFavorite: boolean;
	saveTime: string;
}

type PostsArray = Post[];

export default function SavedSection() {
	const [username, setUsername] = useState<string>("Busta");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [postsList, setPostsList] = useState<PostsArray>([]);
	const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	useEffect(() => {
		const fetchSaved = async () => {
			const userData = await getAllSaved(username);
			setPostsList(userData);
		};

		fetchSaved();
	}, [username]);

	useEffect(() => {
		if (selectedPostId) {
			const updateFavoriteStatus = async () => {
				const result = await changeFavorite({ postId: selectedPostId, isFavorite });

				if (result && "success" in result) {
					if (result.success) {
						console.log("Favorite status updated successfully.");
					} else {
						console.error("Failed to update favorite status:", result.message);
					}
				} else {
					console.error("Unexpected response format:", result);
				}
			};

			updateFavoriteStatus();
		}
	}, [selectedPostId, isFavorite]);

	if (!postsList.length) {
		return <div>Loading...</div>;
	}
	const sortedPosts = postsList.sort((a, b) => new Date(b.saveTime).getTime() - new Date(a.saveTime).getTime());

	const filteredPosts = sortedPosts.filter(
		post => post.content.toLowerCase().includes(searchTerm.toLowerCase()) || post.comments.some(comment => comment.content.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	function formatDate(dateString: string) {
		const date = new Date(dateString);

		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "short",
			year: "numeric",
		};

		return new Intl.DateTimeFormat("en-UK", options).format(date);
	}

	return (
		<div className="lg:container max-lg:mx-4 max-sm:flex-col flex mt-8 lg:mt-16 mb-4 max-sm:mb-20">
			<AccountMovileNav />
			<div className="xl:max-w-[317px] w-fit mr-4 xl:w-full min-w-[60px] max-sm:hidden">
				<AccountSideNav />
			</div>
			<div className="w-full xl:w-[778px] xl:max-w-[778px] lg:mr-4">
				<div className="flex justify-between mb-4 w-full">
					<div className="flex items-center bg-black-300 bg-opacity-25 rounded-full p-2 space-x-2">
						<Search className="text-primary-400 h-5 w-5" />
						<input
							type="text"
							className="bg-transparent outline-none placeholder:text-black-500"
							placeholder="Search comment..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className="text-black-500 flex items-center space-x-2">
						<div className="max-sm:hidden">Sort by:</div>
						<button className="flex items-center hover:bg-black-300 hover:bg-opacity-25 px-2 py-1 rounded-lg">
							<span>Best</span>
							<ChevronDown className="w-4 h-4" />
						</button>
					</div>
				</div>
				{filteredPosts.map(post => (
					<SavedPost
						key={post.postId}
						user={post.postOwner}
						username={post.postOwner}
						title={post.content}
						message={post.content}
						answers={post.comments.length}
						likes={post.positiveReaction}
						date={formatDate(post.creationTime)}
						date_saved={formatDate(post.saveTime)}
						isFavorite={post.isFavorite}
						setIsFavorite={newIsFavorite => {
							setIsFavorite(newIsFavorite);
							setSelectedPostId(post.postId);
						}}
					/>
				))}
			</div>
			<Aside />
		</div>
	);
}
