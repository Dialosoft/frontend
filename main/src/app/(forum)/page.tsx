"use client"
import Categories from "@/components/Forum/main_section/main";
import Aside from "@/components/Forum/side_info/main";
import getWidth from "@/utils/getWidth"


export default function Home() {
	const width = getWidth()
	
	return (
		<>
			{width < 1024 ? (
				<div className="  flex justify-center space-x-4 mx-4 mt-8  ">
					<Categories />
					<Aside />
				</div>
			) : (
				<div className=" container flex justify-center space-x-4   mt-16">
					<Categories />
					<Aside />
				</div>
			)}
		</>
	);
}
