import {
	MessagesSquare as CommentIcon,
	Bookmark as BookmarkIcon,
	Share2 as ShareIcon,
	Ellipsis as EllipsisIcon,
} from "lucide-react";
import { ReactElement } from "react";

interface ActionButtonProps {
	Icon: any;
	children?: string;
}

function ActionButton({ Icon, children }: ActionButtonProps) {
	const bgStyles = "bg-black-500 bg-opacity-25 hover:bg-opacity-40";
	return (
		<div
			className={`${children !== undefined ? bgStyles : ""} flex items-center rounded-full cursor-pointer`}
		>
			<Icon
				className={`${
					children !== undefined ? "" : bgStyles
				} rounded-full text-black-500 fill-current size-9 px-2 transition-colors`}
			/>
			{children ? <p className="pr-3 text-black-500 font-bold">{children}</p> : <></>}
		</div>
	);
}

export default function PostInteractions() {
	return (
		<div className="flex gap-2">
			<ActionButton Icon={CommentIcon}>22</ActionButton>
			<ActionButton Icon={BookmarkIcon} />
			<ActionButton Icon={ShareIcon} />
			<ActionButton Icon={EllipsisIcon} />
		</div>
	);
}
