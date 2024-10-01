"use client";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, BellRing, ChevronDown, Paperclip, Search, Send, Smile , Image} from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const Aside = dynamic(() => import("@/components/Forum/side_info/main"), { ssr: false });
const PostComponent = dynamic(() => import("@/components/Forum/Post_Section/post"), { ssr: false });
import { getPost } from "@/utils/Categories/getPostById";
import getWidth from "@/utils/getWidth";
import Post from "@/components/Forum/Post_Section/post";
import { getAllForums } from "@/utils/Categories/getCategories";
import { stringify } from "querystring";
import Author from "@/components/Forum/Post_Section/author";
import Comments from "@/components/Forum/Post_Section/comments";
type Props = {
	params: {
		categoryID: string;
		post: string[];
	};
}

type UserType = {
	user: string;
	username: string;
	rate: number;
	best: boolean;
	message: string;
	answers: number;
	likes: number;
	date: string;
	comments: [{}]
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
	comments: [{}]
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
		comments: [
			{
				id: "11",
				user: "Alejandro",
				username: "@alejandro",
				rate: 321,
				best: true,
				message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit condimentum risus in consectetur. Nullam placerat diam in imperdiet varius.",
				answers: 234,
				likes: 1234,
				date: "11. Sep. 2001",
				comments: [{}],
			},
		],
	},
];
export default function PostPage({ params }: Props) {
	const width = getWidth();
	const pathname = usePathname();
 const [categories, setCategories]= useState('')
	const [forum, setForum] = useState<any>(null);
	const [post, setPost] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const pathSegments = pathname.split("/");
	const categoryID = pathSegments[2]; 
	const postId = pathSegments[3];
	const [categoryName,setCategoryName]=useState('')
  const [plainText, setPlainText] = useState<string>("");

	const [user, setUser] = useState<UserType>(initialUser);
	const [inputValue, setInputValue] = useState<string>("");
	const [commentsList, setCommentsList] = useState<CommentType[]>(initialComments);
	const handleSubmit = () => {
		if (!inputValue.trim()) return;

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
useEffect(() => {
	const fetchCategories = async () => {
		const categoriesData = await getAllForums();

		if (categoriesData.success) {
			const categories = categoriesData.data;

			

			// Encuentra la categoría que coincida con el categoryID
			const matchingCategory = categories.find((category: { id: string; }) => category.id === categoryID);
			// Si se encuentra la categoría, actualiza el estado con el nombre de la categoría
			if (matchingCategory) {
				setCategoryName(matchingCategory.name);
			} else {
				console.log("Categoría no encontrada");
			}
		}
	};

	fetchCategories();
}, [categoryID]);
	useEffect(() => {
		
		async function fetchPost() {
			try {
				const response = await getPost(postId);
				 console.log('post:'+ response.data.content)
				if (response.success && response.data) {
					
					setPost(response.data);
					
					setPlainText(response.data.content);
				} else {
					setError("Failed to load the post.");
				}
			} catch (err) {
				console.error("Fetch Error:", err); 
				setError("An error occurred while fetching the post.");
			} finally {
				setIsLoading(false);
			}
		}

		fetchPost();
	}, [postId]);

	
	if (isLoading) {
		return <div className="container">Loading...</div>;
	}

	if (error) {
		return <div className="container">{error}</div>;
	}

	if (!post) {
		return <div className="container">Post not found.</div>;
	}

	return (
		<div className="lg:container max-lg:mx-4 flex justify-center space-x-4 font-medium mt-16">
			<div className="w-full ">
				<div className="flex items-end justify-between w-full">
					<div className="font-medium w-full">
						<div className="flex ">
							<Link href={`/c/${categoryID}`}>
								<button className="mr-2 flex mb-2 h-9 items-center justify-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-full w-9 text-black-500 hover:text-secondary">
									<ChevronLeft className="w-5 h-5" />
								</button>
							</Link>
							<div className="text-3xl font-semibold w-fit">{post.title}</div>
						</div>
					</div>
				</div>
				<Post username={post.postOwner} content={plainText} date={post.creationTime} isFavorite={post.isFavorite} />
				<div className="flex w-full space-x-4 items-center text-black-500 bg-black-300 bg-opacity-25  rounded-3xl mt-1 h-12 px-4 ">
					<Smile className="h-5 w-5 min-w-5 hover:text-secondary" />
					<input
						type="text"
						className=" outline-none bg-transparent  w-full placeholder-black-500 text-secondary "
						placeholder="Enter message..."
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>

					<Paperclip className="h-5 w-5 min-w-5 hover:text-secondary" />
					<Send onClick={handleSubmit} className="h-5 w-5 min-w-5 text-primary-400 hover:text-primary-500" />
				</div>
				<div className="mt-1 space-x-1 flex max-sm:justify-between">
					<div className="text-black-500 flex  items-center md:space-x-2 ">
						<div className="max-sm:hidden">Sort by:</div>
						<button className="flex  items-center hover:bg-black-300 hover:bg-opacity-25 px-2 py-1 rounded-full hover:text-secondary">
							<span>Best</span>
							<ChevronDown className="w-4 h-4" />
						</button>
					</div>
					<div className="flex items-center bg-black-300 bg-opacity-25 rounded-full p-2  space-x-2">
						<Search className="text-primary-400 h-5 w-5" />
						<input type="text" className="bg-transparent outline-none placeholder:text-black-500" placeholder="Search comment..." />
					</div>
				</div>
				{commentsList.map(comments => (
					<Comments key={uuidv4()} user={comments.user} username={comments.username} rate={comments.rate} best={comments.best} message={comments.message} answers={comments.answers} likes={comments.likes} date={comments.date} />
				))}
			</div>
			<Author username={post.postOwner} content={plainText} date={post.creationTime} isFavorite={post.isFavorite} />
		</div>
	);
}
