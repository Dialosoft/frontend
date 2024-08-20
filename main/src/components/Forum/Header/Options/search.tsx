import Link from "next/link";
import { Search } from "lucide-react";

export default function Search_Header() {
	return (
		<Link href="/search" prefetch={false}>
			<Search className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-primary-500" size={24} />
		</Link>
	);
}