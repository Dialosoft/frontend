import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { getUser_Simple } from "@/utils/User/getUser";
import { Suspense } from "react";

const Search = dynamic(() => import("@/components/Forum/Header/Options/search"));

export default async function Menu_Header() {
	const session = cookies().has("_rtkn");
	if (!session) return null;
	
	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) return null;

	const user = await getUser_Simple({ accessToken: sessionUser.value });
	if (!user) return null;

	return (
		<div>
			<Suspense>
				<Search />
			</Suspense>
		</div>
	);
}