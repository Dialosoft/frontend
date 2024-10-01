import dynamic from "next/dynamic";
const Rol = dynamic(() => import("../Header/User/rol"));

interface UserProps {
	// name: string,
	username: string;
	// admin_role:boolean,
	// mod_role:boolean,
	content: string;
	date: string;
	isFavorite: boolean;
}

export default function Author({ username, content, date, isFavorite }: UserProps) {
	const User = {
		name: "Flussen",
		username: "@flussen",
		rol: "Moderator",
	};
	return (
		<div className="flex-col space-y-4 min-w-[399px]  max-w-[399px] max-lg:hidden">
			<div className="w-full flex-col space-y-2 ">
				<h2 className=" text-3xl font-semibold">Author</h2>
				<div className="bg-black-300 bg-opacity-25 p-4 space-y-4 rounded-3xl">
					<div className="flex space-x-2 items-center   rounded-2xl  font-medium">
						<div className="border border-black-500  rounded-full aspect-square h-16  " />
						<div>
							<div className="flex space-x-2">
								<div className="text-2xl">username</div>
								<div className="max-sm:hidden">
									<Rol rol={User.rol} />
								</div>
							</div>
							<div className=" text-black-500 -mt-1">@username</div>
						</div>
					</div>
					<div className="font-medium text-black-500">Lorem ipsum dolor sit amet, consectetur elit. Aenean vitae scelerisque tortor. Maecenas aliquet libero vitae nisl lobortis.</div>
					<button className="bg-black-300 bg-opacity-45 w-full h-12 rounded-2xl"> View Profile</button>
				</div>
			</div>
		</div>
	);
}
