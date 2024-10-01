import dynamic from "next/dynamic";
import { Share2, Ellipsis, Heart, MessageSquare, Bookmark } from "lucide-react";
import "./post.css";
import { formatDate } from "@/utils/Date/formatDate";
const Rol = dynamic(() => import("../Header/User/rol"));
const ProfileRol = dynamic(() => import("../Header/User/profile_rol"));

interface PostProps{
	// name: string,
	username:string,
	// admin_role:boolean,
	// mod_role:boolean,
	content: string,
	date:string,
	isFavorite: boolean
}


const formatNumber = (num: number): string => {
	if (num < 1000) {
		return num.toString();
	}
	return (num / 1000).toFixed(1) + "k";
};



export default function Post({username, content, date, isFavorite}:PostProps) {
	const User = {
		name: "Flussen",
		username: "@flussen",
		rol: "Moderator",
	};
	const PostContent = {
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum vestibulum aliquet. Praesent in consequat est. Nam mollis non turpis consequat ornare. Nam lobortis, ligula quam feugiat ex, vel ornare est felis quiseros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
		comments: 423,
		likes: 3241,
		date: "12. Jun. 2000",
	};

	return (
		<>
			<div className=" bg-black-300 bg-opacity-25 p-4 space-y-4 rounded-3xl">
				<div className="w-full flex justify-between">
					<div className="flex items-center space-x-2">
						<ProfileRol rol={User.rol} />
						<div>
							<div className="flex space-x-2">
								<div className="text-xl">{username}</div>
								<div className="max-sm:hidden">
									<Rol rol={User.rol} />
								</div>
							</div>
							<div className=" text-black-500 -mt-1">@{username}</div>
						</div>
					</div>

					<div className="flex space-x-2 text-black-500">
						<div className=" max-sm:hidden">{formatDate(date)}</div>
						<Share2 className="h-5 w-5 hover:text-secondary" />
						<Ellipsis className="h-5 w-5 hover:text-secondary " />
					</div>
				</div>
				<div className="postContent" dangerouslySetInnerHTML={{ __html: content }} />
				<div className="flex justify-end space-x-2 items-center text-black-500">
					
						<div className="flex space-x-1 items-center">
							<MessageSquare className="h-5 w-5 hover:text-secondary" />
							<div>{formatNumber(PostContent.comments)} </div>
						</div>

						<div className="flex space-x-1 items-center">
							<Heart className="h-5 w-5 hover:text-red hover:fill-red" />
							<div>{formatNumber(PostContent.likes)}</div>
						</div>
					
					<Bookmark className="h-5 w-5 hover:text-primary-400 hover:fill-primary-400" />
				</div>
			</div>
		</>
	);
}
