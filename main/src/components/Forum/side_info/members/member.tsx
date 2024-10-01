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
			<div className="flex space-x-2 items-center hover:bg-black-300 p-2 rounded-2xl hover:bg-opacity-25">
				<div className="border border-black-500  rounded-full aspect-square h-12  " />
				<div className=" w-full">
					<h3 className="text-xl">{name}</h3>
					<div className="flex  w-full justify-between text-black-500 ">{username}</div>
				</div>
				<Rol rol={rol} />
			</div>
		</>
	);
}
