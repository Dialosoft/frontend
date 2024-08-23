import Link from "next/link";
import { UserRound } from "lucide-react";

interface NotifyProps {
	link: string;
	name: string;
	type: string;
	time: string;
}

export default function Notify_Template({ name, type, time, link }: NotifyProps) {
	const fullText = name + " " + type;

	return (
		<Link className="inline-block w-full px-2 py-1 transition-all ease-in-out duration-300 hover:bg-black-300 hover:bg-opacity-25 rounded-md" title={fullText} href={link} prefetch={false}>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-[.5rem] overflow-hidden">
					<div className="w-8 h-8 flex-shrink-0 rounded-full border border-primary-400 flex items-center justify-center">
						<UserRound size={20} />
					</div>
					<span className="select-none flex-1 truncate text-black-500">
						<span className="text-secondary">{name}</span> <span>{type}</span>
					</span>
				</div>

				<span className="select-none text-sm pl-1">{time}</span>
			</div>
		</Link>
	);
}
