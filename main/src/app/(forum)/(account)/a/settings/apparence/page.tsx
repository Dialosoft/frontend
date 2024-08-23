import dynamic from "next/dynamic";

const SettingsNav = dynamic(() => import("@/components/Forum/Account/Settings_Section/settingsnav"), { ssr: false });
const AccountSideNav = dynamic(() => import("@/components/Forum/Account/sidenav"), { ssr: false });

export default function StgsApparence() {
	return (
		<div className="container   flex  space-x-4 mt-16">
			<div className="max-w-[317px] w-full">
				<AccountSideNav />
			</div>
			<div className="max-w-[317px] w-full space-y-4">
				<div className="h-10 rounded-full bg-black-300 bg-opacity-25"></div>
				<SettingsNav />
			</div>
		</div>
	);
}
