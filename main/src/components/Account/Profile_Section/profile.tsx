import { Settings } from "lucide-react";
import Link from "next/link";
import Rol from "@/components/User/rol";
export default function Profile() {
	const User = {
		name: "Alejandro",
		username: "@alejandro",
		role: "Admin",
		pronoun: "she/her",
		registration_date: "28 February 2020",
		answers: 3413,
		likes: 3232,
		best_answers: 323,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae scelerisque tortor. Maecenas aliquet libero vitae nisl lobortis.",
	};
	return (
		<div className="max-w-[778px]  w-full  bg-black-300 bg-opacity-25 space-y-4 rounded-lg p-4 relative">
			<div className="flex items-center space-x-4 ">
				<div className="border-2 border-yellow h-36 w-36 bg-black-900 rounded-full"></div>
				<div className="flex-col space-y-5">
					<div className="space-y-1">
						<div className="flex items-center space-x-2">
							<div className="text-3xl font-semibold">
								{User.name}
							</div>
							<Rol rol={User.role} />
						</div>
						<div className="flex items-center space-x-2 text-black-500">
							<div>{User.username}</div>
							<div className="h-1.5 w-1.5 bg-black-500 rounded-full" />

							<div>{User.pronoun}</div>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<div className="">
							<div className="text-black-500">Registration</div>
							<div className="font-medium">
								{User.registration_date}
							</div>
						</div>
						<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
						<div>
							<div className="text-black-500">Answers</div>
							<div className="font-medium">{User.answers}</div>
						</div>
						<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
						<div>
							<div className="text-black-500">Likes Recived</div>
							<div className="font-medium">{User.likes}</div>
						</div>
						<div className="h-4 w-0.5 bg-black-500 rounded-full bg-opacity-25" />
						<div>
							<div className="text-black-500">Best Answers</div>
							<div className="font-medium">
								{User.best_answers}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div>Description</div>
				<div className="text-black-500">{User.description}</div>
			</div>
			<Link href={"/a/settings/account"}>
				<Settings className="absolute top-4 right-5 text-black-500 hover:text-secondary cursor-pointer" />
			</Link>
		</div>
	);
}
