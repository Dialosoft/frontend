import Rol from "../Header/User/rol";
import { Share2 } from "lucide-react";
import { Ellipsis } from "lucide-react";
import ProfileRol from "../Header/User/profile_rol";
import { Heart } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Bookmark } from "lucide-react";

const formatNumber = (num: number): string => {
	if (num < 1000) {
		return num.toString();
	}
	return (num / 1000).toFixed(1) + "k";
};

export default function Post() {
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
			<div className="mt-2 bg-black-300 bg-opacity-25 max-w-[1110px] p-4 space-y-4 rounded-lg">
				<div className="w-full flex justify-between">
					<div className="flex items-center space-x-2">
						<ProfileRol rol={User.rol} />
						<div>
							<div className="flex space-x-2">
								<div>{User.name}</div>
								<div className="max-sm:hidden">
									<Rol rol={User.rol} />
								</div>
							</div>
							<div className="text-sm text-black-500 -mt-1">{User.username}</div>
						</div>
					</div>
					<div className="flex space-x-2 text-black-500">
						<div className="text-sm max-sm:hidden">{PostContent.date}</div>
						<Share2 className="h-5 w-5 hover:text-secondary" />
						<Ellipsis className="h-5 w-5 hover:text-secondary " />
					</div>
				</div>
				<p className="font-normal">{PostContent.message}</p>
				<div className="flex justify-between items-center text-black-500">
					<div className="flex space-x-2">
						<div className="flex space-x-1 items-center">
							<MessageSquare className="h-5 w-5 hover:text-secondary" />
							<div>{formatNumber(PostContent.comments)} </div>
						</div>

						<div className="flex space-x-1 items-center">
							<Heart className="h-5 w-5 hover:text-red hover:fill-red" />
							<div>{formatNumber(PostContent.likes)}</div>
						</div>
					</div>
					<Bookmark className="h-5 w-5 hover:text-primary-400 hover:fill-primary-400" />
				</div>
			</div>
		</>
	);
}
