import { Crown, Sword, UserRound } from "lucide-react";

interface RolProps {
	rol: string;
}

export default function Rol({ rol }: RolProps) {
	switch (rol) {
		case "Admin":
			return (
				<div className="flex items-center space-x-1 text-yellow border h-6 border-yellow bg-yellow bg-opacity-25 py-1 px-2 rounded-md">
					<Crown className="aspect-square w-4 h-4" />

					<span className="text-xs">{rol}</span>
				</div>
			);
		case "Moderator":
			return (
				<div className="flex items-center space-x-1 text-green border h-6 border-green bg-green bg-opacity-25 py-1 px-2 rounded-md">
					<Sword className="aspect-square w-4 h-4" />

					<span className="text-xs">{rol}</span>
				</div>
			);
		case "User":
			return (
				<div className="flex items-center space-x-1 text-primary-400 border h-6 border-primary-400 bg-primary-400 bg-opacity-25 py-1 px-2 rounded-md">
					<UserRound className="aspect-square w-4 h-4" />

					<span className="text-xs">{rol}</span>
				</div>
			);

		default:
			return null;
	}
}
