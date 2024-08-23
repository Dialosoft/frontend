import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const Member = dynamic(() => import("./member"));

export default function Members() {
	const member = [
		{ name: "Alejandro", username: "@alejandro", rol: "Admin", photo: "W" },
		{ name: "Alejandro", username: "@alejandro", rol: "User", photo: "W" },
		{ name: "Alejandro", username: "@alejandro", rol: "Moderator", photo: "W" },
	];

	return (
		<div className="space-y-4">
			<h2 className=" text-3xl font-semibold">Members</h2>
			<div className="bg-black-300 bg-opacity-25  p-2 space-y-2 rounded-lg">
				{member.map(member => (
					<Member key={uuidv4()} name={member.name} username={member.username} rol={member.rol} photo={member.photo} />
				))}
			</div>
		</div>
	);
}
