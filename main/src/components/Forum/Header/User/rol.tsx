import { Crown, Sword, UserRound } from "lucide-react";

interface RolProps {
	rol: string;
}

export default function Rol({ rol }: RolProps) {
	switch (rol) {
		case "Admin":
			return (
				<div className="flex items-center space-x-1 text-yellow  h-7 font-medium  bg-yellow bg-opacity-25 py-2 px-2 rounded-full">
					<Crown className="aspect-square w-4 " />

					<span className="">{rol}</span>
				</div>
			);
		case "Moderator":
			return (
				<div className="flex items-center space-x-1 text-green  h-7  font-medium bg-green bg-opacity-25 py-1 px-2 rounded-full">
					<Sword className="aspect-square w-4 h-4" />

					<span className="">{rol}</span>
				</div>
			);
		case "User":
			return (
				<div className="flex items-center space-x-1 text-primary-400  h-7 font-medium bg-primary-400 bg-opacity-25 py-1 px-2 rounded-full">
					<UserRound className="aspect-square w-4 h-4" />

					<span className="">{rol}</span>
				</div>
			);

		default:
			return null;
	}
}
