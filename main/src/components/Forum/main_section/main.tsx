import Category from "./category";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
export default function MainSection() {
	const category = [
		{
			id: "1",
			type: "Info",
			title: "News and announcements",
			posts: 52,
			comments: 2133,
		},
		{
			id: "2",
			type: "Event",
			title: "Promotions & events",
			posts: 32,
			comments: 8333,
		},
		{
			id: "3",
			type: "Help",
			title: "Rules & FAQs",
			posts: 62,
			comments: 1733,
		},
	];

	return (
		<div className="w-full space-y-4">
			<h2 className=" text-3xl font-semibold">Main Category</h2>
			<div className="bg-black-300 bg-opacity-25 max-w-[1110px]  p-2 grid grid-cols-1 gap-2 rounded-lg">
				{category.map(category => (
					<Link href={`c/${category.id}`} key={uuidv4()}>
						<Category
							type={category.type}
							title={category.title}
							posts={category.posts}
							comments={category.comments}
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
