import { Crown } from "lucide-react";
import { Sword } from "lucide-react";
import { UserRound } from "lucide-react";

interface RolProps {
	rol: string;
}

export default function ProfileRol({ rol }: RolProps) {
	switch (rol) {
	case "Admin":
		return (
			<div className="relative flex justify-center ">
				<div className="aspect-square rounded-full  border border-yellow h-14 " />
				<div className="rounded-full bg-yellow flex items-center justify-center h-5 w-5 absolute -bottom-2  ">
					<Crown className="h-3 w-3 text-black-900" />
				</div>
			</div>
		);
	case "Moderator":
		return (
			<div className="relative flex justify-center ">
				<div className="aspect-square rounded-full  border border-green h-14 " />
				<div className="rounded-full bg-green flex items-center justify-center h-5 w-5 absolute -bottom-2  ">
					<Sword className="h-3 w-3 text-black-900" />
				</div>
			</div>
		);
	case "User":
		return (
			<div className="relative flex justify-center ">
				<div className="aspect-square rounded-full  border border-primary-400 h-14 " />
				<div className="rounded-full bg-primary-400 flex items-center justify-center h-5 w-5 absolute -bottom-2  ">
					<UserRound className="h-3 w-3 text-black-900" />
				</div>
			</div>
		);

	default:
		return null;
	}
}
