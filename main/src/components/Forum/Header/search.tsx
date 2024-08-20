import { Search } from "lucide-react";

export default function Search_Header() {
	return (
		<form className="w-1/3 bg-black-500 bg-opacity-25 rounded-full px-[1rem] py-[.8rem] flex items-center justify-start space-x-[1rem]">
			<Search className="stroke-primary-500" size={24} />
			<input type="search" placeholder="Search something..." className="w-full bg-transparent placeholder:text-black-500 focus:outline-none appearance-none" />
		</form>
	);
}