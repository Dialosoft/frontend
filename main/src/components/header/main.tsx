import { Suspense } from "react";
import dynamic from "next/dynamic";

import { Search_sk } from "@/components/header/skeletons";

const Search = dynamic(() => import("@/components/header/search"), { loading: () => <Search_sk /> });
const DarkMode = dynamic(() => import("@/components/header/dark_tester"), { ssr: false });

export default function Main_Header() {
	return (
		<header className="py-[1rem] border-b-2 border-black-500">
			<div className="container flex items-center justify-between">
				<div>
					<span className="select-none font-semibold text-xl lg:text-2xl">{process.env.Name}</span>
				</div>

				<Suspense fallback={<Search_sk />}>
					<Search />
				</Suspense>

				<div>
					<DarkMode />
				</div>
			</div>
		</header>
	);
}