import UserChip from "@/components/Forum/User/chip";
import PostInteractions from "./interactions";
import PostVotingChip from "./voting_chip";
import { MessageSquareText as ResponseIcon } from "lucide-react";
import PostTags from "./tags";

export default function PostOverview() {
	return (
		<article className="flex flex-col bg-black-500 bg-opacity-25 p-3 gap-2 rounded-xl pb-3.5">
			<div className="flex gap-1">
				<UserChip size="sm" highlighted={true} nameSize="sm" />
				<PostVotingChip />
				<PostTags />
			</div>
			<div>
				<h1 className="font-medium text-lg">
					{"No se como centrar un div"}
				</h1>
				<p className="text-black-500 text-sm">
					{
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum totam modi nihil. Impedit consectetur reiciendis velit id, totam earum pariatur a quos?"
					}
				</p>
			</div>
			<div className="flex">
				<PostInteractions />
				<a
					href="#"
					className="flex items-center gap-2 px-3 justify-center bg-primary-500 rounded-full h-auto text-black-900 ml-auto font-bold hover:bg-primary-600 transition-colors"
				>
					<ResponseIcon className="text-center" />
					<p>Responder</p>
				</a>
			</div>
		</article>
	);
}
