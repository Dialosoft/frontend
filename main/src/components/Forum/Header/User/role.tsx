import { Crown, Sword, UserRound } from "lucide-react";

interface RoleProps {
	admin: boolean,
	mod: boolean
}

export default function Role({ admin, mod }: RoleProps) {
	if (admin) {
		return (
			<div className="flex items-center space-x-1 text-yellow rounded-md border border-yellow bg-yellow bg-opacity-25 py-1 px-2">
				<Crown size={18} />
				<span className="select-none text-xs">Admin</span>
			</div>
		);
	} else if (mod) {
		return (
			<div className="flex items-center space-x-1 text-green rounded-md border border-green bg-green bg-opacity-25 py-1 px-2">
				<Sword size={18} />
				<span className="select-none text-xs">Mod</span>
			</div>
		);
	} else {
		return (
			<div className="flex items-center space-x-1 text-primary-400 rounded-md border border-primary-400 bg-primary-400 bg-opacity-25 py-1 px-2">
				<UserRound size={18} />
				<span className="select-none text-xs">User</span>
			</div>
		);
	}
}