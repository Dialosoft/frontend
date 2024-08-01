import UserChip from "@/components/User/chip";
import PostInteractions from "./interactions";
import PostVotingChip from "./voting_chip";

export default function PostOverview() {
	return (
		<article className="flex flex-col bg-black-500 bg-opacity-25 p-3 gap-2 rounded-xl">
			<div className="flex"><UserChip highlighted={true}/></div>
			<div>
				<h1 className="text-secondary font-medium text-lg">{"No se como centrar un div"}</h1>
				<p className="text-black-500 text-sm">{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum totam modi nihil. Impedit consectetur reiciendis velit id, totam earum pariatur a quos?"}</p>
			</div>
			<PostInteractions/>
		</article>
  	);
}
