"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, BellRing } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { getForumbyId } from "@/utils/Categories/getCategories";
const Aside = dynamic(() => import("@/components/Forum/side_info/main"), { ssr: false });
const PostComponent = dynamic(() => import("@/components/Forum/Post_Section/post"), { ssr: false });
import { getPost } from "@/utils/Categories/getPostById";
import getWidth from "@/utils/getWidth";
import { getCategories } from "@/utils/Categories/getCategories";
type Props = {
	params: {
		categoryID: string;
		post: string[];
	};
};
interface Category {
	id: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}
export default function PostPage({ params }: Props) {
	const width = getWidth();
	const pathname = usePathname();
	const [categories, setCategories] = useState("");
	const [forum, setForum] = useState<any>(null);
	const [post, setPost] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const pathSegments = pathname.split("/");
	const categoryID = pathSegments[2];
	const postId = pathSegments[3];

	useEffect(() => {
		const fetchCategories = async () => {
			const categoriesData = await getCategories();
			console.log("categories" + JSON.stringify(categoriesData));

			if (categoriesData.success) {
				setCategories(categoriesData.data);
			}
			const category = categoriesData.data.find((cat: Category) => cat.id === categoryID);
		};
		fetchCategories();
	}, []);
	useEffect(() => {
		async function fetchPost() {
			try {
				const response = await getPost(postId);

				if (response.success && response.data) {
					setPost(response.data);
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
			<div className="w-full -mt-12">
				<div className="flex items-end justify-between w-full">
					<div className="font-medium w-full">
						<div className="flex justify-between">
							<Link href={`/c/${categoryID}`}>
								<button className="flex mb-2 h-9 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary">
									<ChevronLeft className="w-4 h-4" />
									<span>Returne</span>
								</button>
							</Link>
							<button className="md:hidden flex h-9 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary">
								<BellRing className="w-4 h-4" />
								<span>Follow Post</span>
							</button>
						</div>

						<div className="max-h-4 h-4 text-black-500 flex items-center text-sm">
							<Link href="/" className="hover:text-secondary">
								Main Category
							</Link>
							<ChevronRight className="w-4 h-4" />
							<Link href={`/c/${categoryID}`} className="hover:text-secondary">
								{width > 640 ? <span> Category Name </span> : <span>...</span>}
							</Link>
							<ChevronRight className="w-4 h-4" />
							<span className="text-secondary">{post.title}</span>
						</div>
						<div className="flex justify-between items-end">
							<div className="text-3xl font-semibold w-fit">{post.title}</div>
							<button className="max-md:hidden h-9 flex items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary">
								<BellRing className="w-4 h-4" />
								<span>Follow Post</span>
							</button>
						</div>
					</div>
				</div>

				{/* Renderizar el componente del post si está disponible */}
			</div>

			<Aside />
		</div>
	);
}
