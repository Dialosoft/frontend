import { Calendar } from "lucide-react";
import { ScrollText } from "lucide-react";
import { MessageCircleQuestion } from "lucide-react";

import LastPost from "./last_post";
interface CategoryProps {
	type: string
	title: string;
	posts: number;
	comments: number;
}

const formatNumber = (num: number): string => {
	if (num < 1000) {
		return num.toString();
	}
	return (num / 1000).toFixed(1) + "k";
};
export default function Category({ title, posts, comments , type}: CategoryProps) {
	const post = [
		{ title: "Invade Event: Poland", user: "@alejandro", date: "2h" },
	];
	const renderIcon = () => {
		switch (type) {
			case "Event":
				return <Calendar />;
			case "Help":
				return <MessageCircleQuestion />;
			case "Info":
				return <ScrollText />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex justify-between space-x-2 items-center hover:bg-black-500 py-2 px-4 rounded-md hover:bg-opacity-25">
				<div className="flex w-full text-primary-400 space-x-2">
					{renderIcon()}
					<h3 className="text-xl text-secondary font-semibold">{title}</h3>
				</div>
				<div className="flex space-x-4 w-full justify-end items-center">
					<div className="flex space-x-4">
						<div className="flex-col">
							<div className="text-black-500 text-xs">Posts</div>
							<span>{posts}</span>
						</div>
						<div className="flex-col">
							<div className="text-black-500 text-xs">Comments</div>
							<span>{formatNumber(comments)}</span>
						</div>
					</div>
					<LastPost
						title={post[0].title}
						user={post[0].user}
						time={post[0].date}
					/>
				</div>
			</div>
		</>
	);
}
