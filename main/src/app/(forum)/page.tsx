import Categories from "@/components/Forum/main_section/main";
import Aside from "@/components/Forum/side_info/main";

export default function Home() {
	return (
		<>
		<div className="container w-full flex items-start justify-between space-x-4 mt-8 lg:mt-16">
			<Categories />
			<Aside />
		</div>
		</>
	);
}
