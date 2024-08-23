<<<<<<< HEAD
"use client";
import Categories from "@/components/Forum/main_section/main";
import Aside from "@/components/Forum/side_info/main";
import getWidth from "@/utils/getWidth";
=======
import dynamic from "next/dynamic";
>>>>>>> 44ea55c50ce7b94e68336a682c78472099261e2c

const Categories = dynamic(() => import("@/components/Forum/main_section/main"), { ssr: false });
const Aside = dynamic(() => import("@/components/Forum/side_info/main"));

export default function Home() {
<<<<<<< HEAD
	const width = getWidth();

=======
>>>>>>> 44ea55c50ce7b94e68336a682c78472099261e2c
	return (
		<>
			<div className="container w-full flex items-start justify-between space-x-4 mt-8 lg:mt-16">
				<Categories />
				<Aside />
			</div>
		</>
	);
}
