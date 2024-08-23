import dynamic from "next/dynamic";

const LastArticles = dynamic(() => import("./last_articles/main"));
const Members = dynamic(() => import("./members/main"));

export default function Aside() {
	return (
		<div className="flex-col space-y-4 max-lg:hidden">
			<LastArticles />
			<Members />
		</div>
	);
}
