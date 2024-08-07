import Category from "./category";
import { v4 as uuidv4 } from "uuid";
export default function MainSection() {
	const category = [
		{
			type: "Info",
			title: "News and announcements",
			posts: 52,
			comments: 2133,
		},
		{
			type: "Event",
			title: "Promotions & events",
			posts: 32,
			comments: 8333,
		},
		{
			type: "Help",
			title: "Rules & FAQs",
			posts: 62,
			comments: 1733,
		},
	];

	return (
		<div className="w-full space-y-4">
			<h2 className=" text-3xl font-semibold">Main Category</h2>
			<div className="bg-black-500 bg-opacity-25 max-w-[1110px] p-2 space-y-2 rounded-lg">
				{category.map(category => (
					<Category
						key={uuidv4()}
						type={category.type}
						title={category.title}
						posts={category.posts}
						comments={category.comments}
					/>
				))}
			</div>
		</div>
	);
}
