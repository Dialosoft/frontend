import { Suspense } from "react";
import dynamic from "next/dynamic";

import { getUser_Simple } from "@/utils/User/getUser";

import { Section_sk } from "@/components/Forum/Header/skeletons";

const Search = dynamic(() => import("@/components/Forum/Header/Options/search"), { loading: () => <Section_sk /> });
const User = dynamic(() => import("@/components/Forum/Header/Options/user"), { ssr: false, loading: () => <Section_sk /> });
const Notify = dynamic(() => import("@/components/Forum/Header/Options/notify"), { ssr: false, loading: () => <Section_sk /> });
const Messages = dynamic(() => import("@/components/Forum/Header/Options/messages"), { loading: () => <Section_sk /> });

export default async function Menu_Header() {
	const user = await getUser_Simple();
	if (!user) {return null;}

	return (
		<div className="flex items-center justify-center space-x-[1rem]">
			<Suspense fallback={<Section_sk />}>
				<Search />
			</Suspense>

			<Suspense fallback={<Section_sk />}>
				<Messages />
			</Suspense>

			<Suspense fallback={<Section_sk />}>
				<Notify />
			</Suspense>

			<Suspense fallback={<Section_sk />}>
				<User username={user.username} id={user.id} role={{ type: user.role.role_type, admin: user.role.admin_role, mod: user.role.mod_role }} />
			</Suspense>
		</div>
	);
}