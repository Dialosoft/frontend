import LastArticles from "./last_articles/main";
import Members from "./members/main";

export default function Aside() {
	return (
		<div className="flex-col space-y-4 max-lg:hidden">
			<LastArticles />
			<Members />
		</div>
	);
}
