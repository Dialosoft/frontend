
import { ArrowBigDown, ArrowBigUp, Bookmark, Ellipsis, Heart, MessageSquare, Trophy } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface FeedComment {
	user: string;
	username: string;
	date: string;
	message: string;
}

interface FeedProps {
	messages: FeedComment[];
}
export default function FeedPost({ messages }:FeedProps) {
	return (
		<>
			{messages.map((msg) => (
				<div key={uuidv4()} className="mt-1 bg-black-300 bg-opacity-25 max-w-[1110px] p-4 space-y-4 rounded-lg">
					<div className="w-full flex justify-between">
						<div className="flex items-center space-x-2">
							<div className="aspect-square rounded-full  border border-primary-400 h-14 " />
							<div>
								<div className="flex space-x-2">
									{msg.user}
								</div>
								<div className="text-sm text-black-500 -mt-1">
									{msg.username}
								</div>
							</div>
						</div>
						<div className="flex space-x-2 text-black-500">
							<div className="text-sm">{msg.date}</div>

							<Ellipsis className="h-5 w-5 hover:text-secondary " />
						</div>
					</div>
					<p className="font-normal">{msg.message}</p>
				</div>
			))}
		</>
	);
}
