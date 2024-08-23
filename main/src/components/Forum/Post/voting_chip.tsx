import { ArrowBigUp as UpIcon, ArrowBigDown as DownIcon, Flame as VoteIcon } from "lucide-react";

export default function PostVotingChip() {
	const arrowsStyle =
		"bg-opacity-25 text-black-500 bg-black-500 rounded-full size-8 px-1 cursor-pointer hover:bg-opacity-40 hover:text-secondary transition-colors";

	return (
		<div className="flex gap-1 items-center justify-center bg-black-500 bg-opacity-25 rounded-full m-2 p-1">
			<UpIcon className={arrowsStyle} />
			<div className="flex items-center">
				<p className="translate-x-1">231</p>
				<VoteIcon className="pb-1 translate-x-px" />
			</div>
			<DownIcon className={arrowsStyle} />
		</div>
	);
}
