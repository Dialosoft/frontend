"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, BellRing } from "lucide-react";
import dynamic from "next/dynamic";

const Aside = dynamic(() => import("@/components/Forum/side_info/main"), { ssr: false });
const PostComponent = dynamic(() => import("@/components/Forum/Post_Section/post"), { ssr: false });

import getWidth from "@/utils/getWidth";
import { getPost } from "@/utils/Categories/createPost";
import { getCategory } from "@/utils/Categories/getCategories";

type Props = {
	params: {
		categoryID: string;
		post: string[];
	};
};

export default function PostPage({ params }: Props) {
	const router = useRouter();
	const width = getWidth();

	const [forum, setForum] = useState<any>(null);
	const [post, setPost] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch forum data
	useEffect(() => {
		const fetchForumAndPostData = async () => {
			const forumsData = await getCategory(params.categoryID);
			if (forumsData.success) {
				setForum(forumsData.data);
			}
			
			const postData = await getPost(params.post[0]);
			if (postData.success) {
				setPost(postData.data);
			}
			
			setIsLoading(false);
		};

		fetchForumAndPostData();
	}, [params.categoryID, params.post[0]]);

	if (isLoading) {
		return <div className="container">Loading...</div>;
	}

	console.log(forum, post)

	if (error) {
		return <div className="container">{error}</div>;
	}

	if (!forum || !post) {
		return <div className="container">Forum or Post not found.</div>;
	}

	return (
		<div className="lg:container max-lg:mx-4 flex justify-center space-x-4 font-medium mt-16">
			<div className="w-full -mt-12">
				<div className="flex items-end justify-between w-full">
					<div className="font-medium w-full">
						<div className="flex justify-between">
							<Link href={`/c/${params.categoryID}`}>
								<button className="flex mb-2 h-9 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary">
									<ChevronLeft className="w-4 h-4" />
									<span>Return</span>
								</button>
							</Link>
							<button className="md:hidden flex h-9 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary">
								<BellRing className="w-4 h-4" />
								<span>Follow Post</span>
							</button>
						</div>

						<div className="max-h-4 h-4 text-black-500 flex items-center text-sm">
							<Link href="/" className="hover:text-secondary">
								{forum?.category?.name}
							</Link>
							<ChevronRight className="w-4 h-4" />
							<Link href={`/c/${params.categoryID}`} className="hover:text-secondary">
								{width > 640 ? <span>{forum.name}</span> : <span>...</span>}
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

				{/* {post && <PostComponent post={post} />} */}

			</div>

			<Aside />
		</div>
	);
}
