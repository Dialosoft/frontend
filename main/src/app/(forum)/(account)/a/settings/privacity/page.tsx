
import SettingsNav from "@/components/Account/Settings_Section/settingsnav";
import AccountSideNav from "@/components/Account/sidenav";

export default function StgsPrivacity() {
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