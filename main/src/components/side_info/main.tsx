import LastArticles from "./last_articles/main";
import Members from "./members/main";

export default function Aside() {
	return (
		<div className="flex-col space-y-8 w-full max-w-[317px]">
			<LastArticles />
			<Members />
		</div>
	);
}
