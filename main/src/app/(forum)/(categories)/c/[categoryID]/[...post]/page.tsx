"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { ChevronRight, ChevronLeft, BellRing, Smile, Image as ImageIcon, Paperclip, Send, ChevronDown, Search } from "lucide-react";
import dynamic from "next/dynamic";

const Aside = dynamic(() => import("@/components/Forum/side_info/main"));
const Post = dynamic(() => import("@/components/Forum/Post_Section/post"));
const Comments = dynamic(() => import("@/components/Forum/Post_Section/comments"));

import getWidth from "@/utils/getWidth";

type Props = {
	params: {
		categoryID: string;
		postID: string;
	};
};
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
type CommentType = UserType & { id: string };
const initialUser: UserType = {
	user: "Alejandro",
	username: "@alejandro",
	rate: 0,
	best: false,
	message: "",
	answers: 0,
	likes: 0,
	date: "",
};
const initialComments: CommentType[] = [
	{
		id: "1",
		user: "Alejandro",
		username: "@alejandro",
		rate: 321,
		best: true,
		message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit condimentum risus in consectetur. Nullam placerat diam in imperdiet varius.",
		answers: 234,
		likes: 1234,
		date: "11. Sep. 2001",
	},
	{
		id: "2",
		user: "Busta",
		username: "@bustalover",
		rate: 221,
		best: false,
		message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit condimentum risus in consectetur. Nullam placerat diam in imperdiet varius.",
		answers: 24,
		likes: 243,
		date: "24. Feb. 2002",
	},
];
export default function PostPage({ params }: Props) {
	const width = getWidth();
	const [user, setUser] = useState<UserType>(initialUser);
	const [inputValue, setInputValue] = useState<string>("");
	const [commentsList, setCommentsList] = useState<CommentType[]>(initialComments);
	const handleSubmit = () => {
		if (!inputValue.trim()) {
			return;
		}

		const newComment: CommentType = {
			...user, //esta vaina copia todo lo de user al nuevo comentario (user, username, etc.)
			id: (commentsList.length + 1).toString(), //agrega id al comentario
			message: inputValue,
			date: new Date()
				.toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				})
				.replace(/ /g, ". "),
		};

		setCommentsList([...commentsList, newComment]);

		setInputValue("");
		setUser({ ...initialUser });
	};

	const PostInfo = [
		{
			id: "1",
			title: " Invade Event: Party 1",
		},
		{
			id: "2",
			title: "Invade Event: Party 2",
		},
		{
			id: "3",
			title: "Invade Event: Party 3",
		},
		{
			id: "4",
			title: "Invade Event: Party 4",
		},
		{
			id: "5",
			title: "Invade Event: Party 5",
		},
		{
			id: "6",
			title: "Invade Event: Party 6",
		},
	];
	const CategoryInfo = [
		{
			id: "1",
			title: " News and announcements",
		},
		{
			id: "2",
			title: "Promotions & events",
		},
		{
			id: "3",
			title: "Rules & FAQs",
		},
	];

	const Category = CategoryInfo.find(category => category.id === params.categoryID);
	const [categoryID, setCategoryID] = useState(params.postID);

	useEffect(() => {
		const urlSegments = window.location.pathname.split("/");
		const lastSegment = urlSegments[urlSegments.length - 1];
		setCategoryID(lastSegment);
	}, []);

	const PostID = PostInfo.find(category => category.id === categoryID);

	return (
		<div className=" lg:container max-lg:mx-4 flex justify-center space-x-4 font-medium mt-16">
			<div className="w-full  -mt-12 ">
				<div className="flex items-end justify-between w-full  max-w-[1110px] ">
					<div className="  font-medium w-full ">
						<div className="flex justify-between">
							<Link href={`/c/${params.categoryID}`}>
								<button className="flex mb-2 h-9 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary ">
									<ChevronLeft className="w-4 h-4" />
									<span className="">Return</span>
								</button>
							</Link>
							<button className="md:hidden flex h-9  items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary  ">
								<BellRing className="w-4 h-4" />
								<span className="">Follow Post</span>
							</button>
						</div>

						<div className="max-h-4 h-4 text-black-500 flex items-center text-sm ">
							<Link href="/" className="hover:text-secondary">
								Main category
							</Link>
							<ChevronRight className="w-4 h-4" />
							<Link href={`/c/${params.categoryID}`} className="hover:text-secondary">
								{width > 640 ? <span>{Category?.title}</span> : <span>...</span>}
							</Link>
							<ChevronRight className="w-4 h-4" />
							<span className="text-secondary">{PostID?.title}</span>
						</div>
						<div className="flex justify-between items-end">
							<div className="text-3xl font-semibold w-fit">{PostID?.title}</div>
							<button className="max-md:hidden h-9 flex items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary ">
								<BellRing className="w-4 h-4" />
								<span className="">Follow Post</span>
							</button>
						</div>
					</div>
				</div>
				<Post />
				<div className="flex w-full space-x-4 items-center text-black-500 bg-black-300 bg-opacity-25 max-w-[1110px] rounded-lg mt-1 h-12 px-4 ">
					<Smile className="h-6 w-6 hover:text-secondary" />
					<input
						type="text"
						className=" outline-none bg-transparent w-full placeholder-black-500 text-secondary "
						placeholder="Enter message..."
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					<ImageIcon className="h-6 w-6 hover:text-secondary" />
					<Paperclip className="h-6 w-6 hover:text-secondary" />
					<Send onClick={handleSubmit} className="h-6 w-6 text-primary-400 hover:text-primary-500" />
				</div>
				<div className="mt-1 flex max-sm:justify-between">
					<div className="text-black-500 flex  items-center md:space-x-2 ">
						<div className="max-sm:hidden">Sort by:</div>
						<button className="flex  items-center hover:bg-black-300 hover:bg-opacity-25 px-2 py-1 rounded-lg">
							<span>Best</span>
							<ChevronDown className="w-4 h-4" />
						</button>
					</div>
					<div className="flex items-center bg-black-300 bg-opacity-25 rounded-full p-2  space-x-2">
						<Search className="text-primary-400 h-5 w-5" />
						<input type="text" className="bg-transparent outline-none placeholder:text-black-500" placeholder="Search comment..." />
					</div>
				</div>
				{commentsList.map(CommentsList => (
					<Comments
						key={uuidv4()}
						user={CommentsList.user}
						username={CommentsList.username}
						rate={CommentsList.rate}
						best={CommentsList.best}
						message={CommentsList.message}
						answers={CommentsList.answers}
						likes={CommentsList.likes}
						date={CommentsList.date}
					/>
				))}
			</div>

			<Aside />
		</div>
	);
}
