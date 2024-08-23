import { formatDateDayMonthYear } from "@/utils/formatTime";
import { User, Share2, Ellipsis, CodeSquare, Heart, Bookmark } from "lucide-react";
// import ProfileRol from "../User/profile_rol";
// import Rol from "../User/rol";
import { ArrowBigUp } from "lucide-react";
import { ArrowBigDown } from "lucide-react";
import { Trophy } from "lucide-react";

 interface CommentsProps {
		username: string;
		content: string;
		date:string
 }
// const formatNumber = (num: number): string => {
// 	if (num < 1000) {
// 		return num.toString();
// 	}
// 	return (num / 1000).toFixed(1) + "k";
// };
export default function Comments({ username, content, date }:CommentsProps) {
	const rate = 0;

	return (
		<div className="mt-1 bg-black-300 bg-opacity-25 max-w-[1110px] p-4 space-y-4 rounded-lg">
			<div className="w-full flex justify-between">
				<div className="flex items-center space-x-2">
					<div className="aspect-square rounded-full  border border-primary-400 h-14 " />
					<div>
						<div className="flex space-x-2">{username}</div>
						{/* <div className="text-sm text-black-500 -mt-1">
							{username}
						</div> */}
					</div>
					<div className="flex rounded-full bg-black-300 bg-opacity-25 p-1 space-x-1">
						<div className="rounded-full bg-black-300 h-6 w-6 flex justify-center items-center text-black-500 bg-opacity-25 hover:text-secondary hover:bg-opacity-75">
							<ArrowBigUp className="h-5 w-5" />
						</div>

						<div className={rate>999?"text-yellow":rate>249?"text-red":rate>99?"text-green":rate>9?"text-primary-400":""}>{0}</div>
						<div className="rounded-full bg-black-300 h-6 w-6 flex justify-center items-center text-black-500 bg-opacity-25 hover:text-secondary hover:bg-opacity-75">
							<ArrowBigDown className="h-5 w-5" />
						</div>
					</div>
					{/* {best&&<div className="flex items-center space-x-1 text-yellow border h-6 border-yellow bg-yellow bg-opacity-25 py-1 px-2 rounded-md">
						<Trophy className="aspect-square w-4 h-4" />

						<span className="text-xs">Best</span>
					</div>} */}
				</div>
				<div className="flex space-x-2 text-black-500">
					<div className="text-sm">{formatDateDayMonthYear(date)}</div>
					<Share2 className="h-5 w-5 hover:text-secondary" />
					<Ellipsis className="h-5 w-5 hover:text-secondary " />
				</div>
			</div>
			<p className="font-normal">
				{content}
			</p>
			<div className="flex justify-between items-center text-black-500">
				<div className="flex space-x-2">
					{/* <div className="flex space-x-1 items-center">
						<CodeSquare className="h-5 w-5 hover:text-secondary" />
						<div>{formatNumber(answers)} </div>
					</div> */}

					{/* <div className="flex space-x-1 items-center">
						<Heart className="h-5 w-5 hover:text-red hover:fill-red" />
						<div>{formatNumber(likes)}</div>
					</div> */}
				</div>
				<Bookmark className="h-5 w-5 hover:text-secondary hover:fill-secondary" />
			</div>
		</div>
	);


}
