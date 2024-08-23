import { cookies } from "next/headers";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const Aside = dynamic(() => import("@/components/Forum/side_info/main"));
const Post = dynamic(() => import("@/components/Forum/Category_Section/post"));

import { getCategory, getForumbyId } from "@/utils/Categories/getCategories";

type Props = {
	params: {
		categoryID: string;
	};
};

export default async function Category({ params }: Props) {
	const session = cookies().get("_atkn");

	const ForumInfo = await getCategory(params.categoryID);
	if (!ForumInfo.success) {
		return <div className="container">Not found...</div>;
	}

	const PostsSearch = await getForumbyId(params.categoryID);
	let PostsInfo = [];
	if (PostsSearch.success) {
		PostsInfo = PostsSearch.data;
	}

	console.log(PostsInfo);

	return (
		<div className="lg:container w-full max-lg:mx-4 flex justify-center space-x-4 mt-8 lg:mt-16">
			<div className="w-full -my-1">
				<div className="flex max-sm:flex-col items-start justify-between w-full">
					<div className="text-3xl font-semibold">
						{ForumInfo.data.name}
						<div className=" max-h-4 h-4 -mt-1 mb-2 font-medium text-black-500 flex items-center text-sm">
							<Link href="/" className="hover:text-secondary">
								{ForumInfo.data.category.name}
							</Link>
							<ChevronRight className="w-4 h-4" />
							<span className="text-secondary">{ForumInfo.data.name}</span>
						</div>
					</div>

					<div className="flex items-center max-sm:justify-between max-sm:w-full max-sm:mb-4 font-medium space-x-2 mt-2">
						<div className="text-black-500 flex items-center sm:space-x-2">
							<div className="max-md:hidden">Sort by:</div>
							<button className="flex items-center hover:bg-black-300 hover:bg-opacity-25 px-2 py-1 rounded-lg">
								<span>Best</span>
								<ChevronDown className="w-4 h-4" />
							</button>
						</div>
						{session?.value && (
							<Link href={`${params.categoryID}/create`}>
								<button className="flex items-center py-1 px-2 rounded-lg bg-primary-400 hover:bg-primary-500 text-black-900 space-x-1">
									<Plus className="w-4 h-4" />
									<span className="">
										Create <span className=""> a post</span>
									</span>
								</button>
							</Link>
						)}
					</div>
				</div>

				{((PostsInfo.length > 0) && (PostsInfo.filter(post => post.fixed).length > 0)) && (
					<div className="w-full bg-black-300 bg-opacity-25 p-2 space-y-2 rounded-lg">
						{PostsInfo.filter(post => post.fixed).map(post => (
							<Link href={`${params.categoryID}/${post.id}`} key={uuidv4()}>
								<Post
									id={post.id}
									user={post.user}
									title={post.title}
									answers={post.answers}
									views={post.views}
									date={formatDistanceToNow(new Date(post.date), { addSuffix: true })}
									fixed={post.fixed}
								/>
							</Link>
						))}
					</div>
				)}

				<div className="flex items-end justify-between w-full my-4">
					<div className="text-3xl font-semibold">Posts</div>
				</div>

				<div className="w-full bg-black-300 bg-opacity-25 p-2 space-y-2 rounded-lg">
					{PostsInfo.filter(post => !post.fixed).map(post => (
						<Link href={`${params.categoryID}/${post.postId}`} key={uuidv4()}>
							<Post
								id={post.postId}
								user={post.postOwner}
								title={post.title}
								answers={post.comments.length}
								views={0}
								date={formatDistanceToNow(new Date(post.creationTime), { addSuffix: true })}
								fixed={post.fixed}
							/>
						</Link>
					))}

					{!PostsInfo.length && <span>Looks like there are no posts here yet. Be the first to start a conversation!</span>}
				</div>
			</div>

			<Aside />
		</div>
	);
}
