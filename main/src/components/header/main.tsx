import { Suspense } from "react";
import dynamic from "next/dynamic";

import { Search_sk } from "@/components/header/skeletons";

const Search = dynamic(() => import("@/components/header/search"), { loading: () => <Search_sk /> });

export default function Main_Header() {
	return (
		<header className="py-[1rem] border-b-2 border-black-500">
			<div className="container flex items-center justify-between">
				{/* Icon */}
				<div>
					<span className="select-none font-semibold text-xl lg:text-2xl">{process.env.Name}</span>
				</div>

				{/* Search */}
				<Suspense fallback={<Search_sk />}>
					<Search />
				</Suspense>

				<div>

				</div>
			</div>
		</header>
	);
}