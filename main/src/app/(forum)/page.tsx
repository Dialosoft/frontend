import PostOverview from "@/components/Post/overview";
import LastArticles from "@/components/side_info/last_articles/main";
import Category from "@/components/main_section/main";
import Members from "@/components/side_info/members/main";
import Aside from "@/components/side_info/main";
export default function Home() {
	return (
		<div className=" container flex justify-center   mt-16">
			<Category />
			<Aside/>
		</div>
	);
}
