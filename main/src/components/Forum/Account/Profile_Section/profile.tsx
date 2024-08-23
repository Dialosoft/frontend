import Link from "next/link";
import { useEffect } from "react";
import { Settings, User, Edit } from "lucide-react";

import Role from "@/components/Forum/Header/User/role";
import { getUser_Avatar } from "@/utils/User/getUser";

interface ProfileProps {
	id: string;
	name: string;
	username: string;
	role: {
		mod: boolean;
		admin: boolean;
	};
	pronoun: string;
	registration_date: string;
	answers: number;

	likes: number;
	best_answers: number;
	description: string;
}
export default function Profile({ id, name, username, role, pronoun, registration_date, answers, likes, best_answers, description }: ProfileProps) {
	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser_Avatar(id);
			console.log(userData);
		};

		fetchUser();
	}, []);

	function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (file) {
			const validImageTypes = ["image/jpeg", "image/png"];

			if (validImageTypes.includes(file.type)) {
			}
		}
	}

	return (
		<div className="max-w-[778px]  w-full  bg-black-300 bg-opacity-25 space-y-4 rounded-lg p-4 relative min-h-[264px]">
			<div className="flex items-center space-x-4 ">
				<div className={`rounded-full flex-shrink-0 aspect-square border-2 border-primary-400 ${role.admin && "border-yellow"} ${role.mod && "border-green"}`}>
					<label className="inline-block rounded-full flex-shrink-0 aspect-square p-[2rem] group cursor-pointer">
						<User size={50} className="group-hover:hidden" />

						<div className="hidden group-hover:block">
							<Edit size={50} />
						</div>

						<input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleImageUpload} />
					</label>
					{/* <div className="flex-shrink-0 aspect-square w-28 lg:w-32 xl:w-36 bg-black-900"></div> */}
				</div>

				<div className="flex-col space-y-5">
					<div className="space-y-1">
						<div className="flex items-center space-x-2">
							<div className="text-3xl font-semibold truncate">{name}</div>
							<div className="max-sm:hidden">
								<Role mod={role.mod} admin={role.admin} />
							</div>
						</div>
						<div className="flex items-center space-x-2 text-black-500">
							<div>{username}</div>
							<div className="h-1.5 w-1.5 bg-black-500 rounded-full" />

							<div>{pronoun}</div>
						</div>
					</div>

					<div className="flex items-center space-x-4 max-lg:hidden">
						<div className="">
							<div className="text-black-500">Registration</div>
							<div className="font-medium">{registration_date}</div>
						</div>
						<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
						<div>
							<div className="text-black-500">Answers</div>
							<div className="font-medium">{answers}</div>
						</div>
						<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
						<div>
							<div className="text-black-500">Likes Recived </div>
							<div className="font-medium">{likes}</div>
						</div>
						<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
						<div>
							<div className="text-black-500">Best Answers</div>
							<div className="font-medium">{best_answers}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between space-x-4  lg:hidden">
				<div className="">
					<div className="text-black-500">Registration</div>
					<div className="font-medium">{registration_date}</div>
				</div>
				<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
				<div>
					<div className="text-black-500">Answers</div>
					<div className="font-medium">{answers}</div>
				</div>
				<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
				<div>
					<div className="text-black-500">
						Likes <span className="max-sm:hidden">Recived</span>
					</div>
					<div className="font-medium">{likes}</div>
				</div>
				<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
				<div>
					<div className="text-black-500">
						{" "}
						<span className="sm:hidden">Bests</span>
						<span className="max-sm:hidden">Best Answers</span>
					</div>
					<div className="font-medium">{best_answers}</div>
				</div>
			</div>
			<div>
				<div>Description</div>
				<div className="text-black-500">{description}</div>
			</div>
			<Link href={"/a/settings/account"}>
				<Settings className="absolute top-4 right-5 text-black-500 hover:text-secondary cursor-pointer" />
			</Link>
		</div>
	);
}
