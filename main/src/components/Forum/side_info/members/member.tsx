import dynamic from "next/dynamic";

const Rol = dynamic(() => import("@/components/Forum/Header/User/rol"));

interface MemberProps {
	name: string;
	username: string;
	rol: "Admin" | "Moderator" | "User";
	photo: string;
}

export default function Member({ name, username, rol }: MemberProps) {
	return (
		<>
			<div className="flex space-x-2 items-center hover:bg-black-300 p-2 rounded-sm hover:bg-opacity-25">
				<div className="border border-primary-500  rounded-full aspect-square h-12  " />
				<div className=" w-full">
					<h3>{name}</h3>
					<div className="flex text-xs w-full justify-between text-black-500 ">{username}</div>
				</div>
				<Rol rol={rol} />
			</div>
		</>
	);
}
