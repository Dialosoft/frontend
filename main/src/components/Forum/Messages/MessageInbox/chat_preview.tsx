import { cropString } from "@/utils/cropString";
import { formatRelativeTime } from "@/utils/formatTime";
import Image from "next/image";
import Link from "next/link";

interface ChatPreviewProps {
	name: string;
	username: string;
	photo: string;
	opened: boolean;
}

function ChatPreview({ name, username, photo, opened }: ChatPreviewProps) {
	// TEST
	const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
	const lastMessageTimestamp = randomDate;

	return (
		<div
			className={`relative hover:bg-black-300 hover:bg-opacity-25 overflow-hidden gap-2 rounded-lg p-1 ${opened ? "border-r-[3px] border-primary-500 bg-black-300 bg-opacity-25" : ""}`}
		>
			<Link className="flex items-center gap-2 p-1" href={`/messages/${username}`}>
				<Image className="h-8 w-8 rounded-full border" src={""} alt={""} />
				<div className="flex flex-col">
					<p className="leading-tight text-sm">{name}</p>
					<p className="leading-tight text-xs text-black-500">{cropString("last message content", 20)}</p>
				</div>
				<p className="text-black-500 text-xs mt-auto ml-auto">{formatRelativeTime(lastMessageTimestamp)}</p>
			</Link>
		</div>
	);
}

export default ChatPreview;
