import { cookies } from "next/headers";

export default function Menu_Header() {
	const session = cookies().has("_rtkn");
	if (!session) return null;

	return (
		<></>
	);
}