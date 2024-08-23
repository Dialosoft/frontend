import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const Aside = dynamic(() => import("@/components/Forum/side_info/main"));
const Post = dynamic(() => import("@/components/Forum/Category_Section/post"));

type Props = {
	params: {
		categoryID: string;
	};
};

export default function Category({ params }: Props) {
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

	const PostsInfo = [
		{
			id: 1,
			user: "@alejandro",
			title: "Invade Event: Poland",
			answers: 52,
			views: 2133,
			date: "2h",
			fixed: true,
		},
		{
			id: 2,
			user: "@alejandro",
			title: "Invade Event: Poland",
			answers: 52,
			views: 1833,
			date: "2h",
			fixed: true,
		},
		{
			id: 3,
			user: "@alejandro",
			title: "Invade Event: Poland",
			answers: 52,
			views: 1133,
			date: "2h",
			fixed: false,
		},
		{
			id: 4,
			user: "@alejandro",
			title: "Invade Event: Poland",
			answers: 52,
			views: 1133,
			date: "2h",
			fixed: true,
		},
		{
			id: 5,
			user: "@alejandro",
			title: "Invade Event: Poland",
			answers: 52,
			views: 1133,
			date: "2h",
			fixed: false,
		},
	];

	const Category = CategoryInfo.find(category => category.id === params.categoryID);
	if (!Category) {
		return null;
	}

	return (
		<div className="lg:container max-lg:mx-4 flex justify-center space-x-4 mt-8 lg:mt-16">
			<div className="w-full -my-1">
				<div className="flex  max-sm:flex-col items-start justify-between w-full  max-w-[1110px] ">
					<div className="text-3xl font-semibold">
						{Category.title}
						<div className=" max-h-4 h-4 -mt-1 mb-2 font-medium text-black-500 flex items-center text-sm">
							<Link href="/" className="hover:text-secondary">
								Main category
							</Link>
							<ChevronRight className="w-4 h-4" />
							<span className="text-secondary">{Category.title}</span>
						</div>
					</div>

					<div className="flex items-center max-sm:justify-between max-sm:w-full max-sm:mb-4 font-medium space-x-2 mt-2">
						<div className="text-black-500 flex items-center sm:space-x-2">
							<div className="max-md:hidden">Sort by:</div>
							<button className="flex  items-center hover:bg-black-300 hover:bg-opacity-25 px-2 py-1 rounded-lg">
								<span>Best</span>
								<ChevronDown className="w-4 h-4" />
							</button>
						</div>
						<Link href={`${params.categoryID}/create`}>
							<button className="flex items-center py-1 px-2 rounded-lg bg-primary-400 hover:bg-primary-500 text-black-900 space-x-1">
								<Plus className="w-4 h-4" />
								<span className="">
									Create <span className=""> a post</span>
								</span>
							</button>
						</Link>
					</div>
				</div>
				<div className="bg-black-300 bg-opacity-25 max-w-[1110px] p-2 space-y-2 rounded-lg">
					{PostsInfo.filter(post => post.fixed).map(post => (
						<Link href={`${params.categoryID}/${post.id}`} key={uuidv4()}>
							<Post id={post.id} user={post.user} title={post.title} answers={post.answers} views={post.views} date={post.date} fixed={post.fixed} />
						</Link>
					))}
				</div>
				<div className="flex items-end justify-between w-full my-4 max-w-[1110px] ">
					<div className="text-3xl font-semibold">Posts</div>
				</div>
				<div className="bg-black-300 bg-opacity-25 max-w-[1110px] p-2 space-y-2 rounded-lg">
					{PostsInfo.filter(post => !post.fixed).map(post => (
						<Link href={`${params.categoryID}/${post.id}`} key={uuidv4()}>
							<Post id={post.id} user={post.user} title={post.title} answers={post.answers} views={post.views} date={post.date} fixed={post.fixed} />
						</Link>
					))}
				</div>
			</div>

			<Aside />
		</div>
	);
}
