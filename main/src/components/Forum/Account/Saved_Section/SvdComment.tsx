"use client";
import { Share2, Ellipsis, MessageSquare, Heart, Bookmark } from "lucide-react";
import { ArrowBigUp } from "lucide-react";
import { ArrowBigDown } from "lucide-react";
import { useState } from "react";
interface CommentsProps {
	user: string;
	username: string;
	rate: number;

	message: string;
	answers: number;
	likes: number;
	date: string;
}
const formatNumber = (num: number): string => {
	if (num < 1000) {
		return num.toString();
	}
	return (num / 1000).toFixed(1) + "k";
};
export default function SavedComment({
	user,
	username,
	rate,

	message,
	answers,
	likes,
	date,
}: CommentsProps) {
	const [saved, setSaved] = useState(true);
	const [liked, setLiked] = useState(false);

	return (
		<div className="mt-4 bg-black-300 bg-opacity-25 max-w-[1110px] p-4 space-y-4 rounded-lg">
			<div className="w-full flex justify-between">
				<div className="flex items-center space-x-2">
					<div className="aspect-square rounded-full  border border-primary-400 h-14 " />
					<div>
						<div className="flex space-x-2">{user}</div>
						<div className="text-sm text-black-500 -mt-1">{username}</div>
					</div>
					<div className="flex rounded-full bg-black-300 bg-opacity-25 p-1 space-x-1">
						<div className="rounded-full bg-black-300 h-6 w-6 flex justify-center items-center text-black-500 bg-opacity-25 hover:text-secondary hover:bg-opacity-75">
							<ArrowBigUp className="h-5 w-5" />
						</div>

						<div className={rate > 999 ? "text-yellow" : rate > 249 ? "text-red" : rate > 99 ? "text-green" : rate > 9 ? "text-primary-400" : ""}>{rate}</div>
						<div className="rounded-full bg-black-300 h-6 w-6 flex justify-center items-center text-black-500 bg-opacity-25 hover:text-secondary hover:bg-opacity-75">
							<ArrowBigDown className="h-5 w-5" />
						</div>
					</div>
				</div>
				<div className="flex space-x-2 text-black-500">
					<div className="text-sm">{date}</div>
					<Share2 className="h-5 w-5 hover:text-secondary" />
					<Ellipsis className="h-5 w-5 hover:text-secondary " />
				</div>
			</div>
			<p className="font-normal">{message}</p>
			<div className="flex justify-between items-center text-black-500">
				<div className="flex space-x-2">
					<div className="flex space-x-1 items-center">
						<MessageSquare className="h-5 w-5 hover:text-secondary" />
						<div>{formatNumber(answers)} </div>
					</div>

					<div className="flex space-x-1 items-center">
						<Heart onClick={() => setLiked(!liked)} className={`h-5 w-5 ${liked ? "text-red fill-red" : "text-black-500 hover:text-red "} `} />
						<div>{formatNumber(likes)}</div>
					</div>
				</div>
				<Bookmark onClick={() => setSaved(!saved)} className={`h-5 w-5 ${saved ? "text-primary-400 fill-primary-400" : "text-black-500 hover:text-primary-500 "} `} />
			</div>
		</div>
	);
}
