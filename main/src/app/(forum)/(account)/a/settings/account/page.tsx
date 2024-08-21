"use client";
import { useState, useEffect } from "react";
import AccountSideNav from "@/components/Forum/Account/sidenav";
import SettingsNav from "@/components/Forum/Account/Settings_Section/settingsnav";
import InputText from "@/components/Forum/Account/Settings_Section/input_text";
import { ChevronRight } from "lucide-react";

export default function StgsAccount() {
	const [hasChanges, setHasChanges] = useState(false);

	const initialUserInfo = {
		name: "Alejandro",
		pronoun: "She/Her",
		username: "alejandro",
		email: "alejandro@gmail.com",
		phone_tag: "34",
		phone: "654321098",
	};
	const [userInfo, setUserInfo] = useState(initialUserInfo);

	const handleInputChange = (field: string, newValue: string) => {
		setUserInfo(prevUserInfo => {
			const updatedUserInfo = {
				...prevUserInfo,
				[field]: newValue,
			};

			const isChanged = Object.keys(updatedUserInfo).some(
				key =>
					updatedUserInfo[key as keyof typeof updatedUserInfo] !==
					initialUserInfo[key as keyof typeof initialUserInfo]
			);

			setHasChanges(isChanged);
			return updatedUserInfo;
		});
	};
	return (
		<div className="container   flex  space-x-4 mt-16">
			<div className="max-w-[317px] w-full">
				<AccountSideNav />
			</div>
			<div className="max-w-[317px] w-full space-y-4">
				<div className="h-10 rounded-full bg-black-300 bg-opacity-25"></div>
				<SettingsNav />
			</div>
			<div className="max-w-[778px] w-full space-y-4">
				<div className="flex justify-between items-end">
					<h2 className="text-4xl font-semibold">
						Account Information
					</h2>
					{hasChanges && (
						<button className="bg-primary-400 font-medium hover:bg-primary-500 h-10 text-black-700 rounded-lg px-4">
							Update
						</button>
					)}
				</div>
				<div className="   bg-black-300 bg-opacity-25 space-y-4 rounded-lg p-4 h-fit ">
					<div className="grid grid-cols-2 gap-4 font-medium">
						<div>
							<div>Name</div>
							<InputText
								value={userInfo.name}
								placeholder="Enter name..."
								onChange={newValue =>
									handleInputChange("name", newValue)
								}
								background="bg-transparent"
							/>
						</div>
						<div>
							<div>Pronoun</div>
							<InputText
								value={userInfo.pronoun}
								placeholder="Enter pronoun..."
								onChange={newValue =>
									handleInputChange("pronoun", newValue)
								}
								background="bg-transparent"
							/>
						</div>
					</div>
					<div>
						<div>Username</div>
						<InputText
							value={userInfo.username}
							placeholder="Enter username..."
							onChange={newValue =>
								handleInputChange("username", newValue)
							}
							background="bg-transparent"
						/>
					</div>
					<div>
						<div>Email</div>
						<InputText
							value={userInfo.email}
							placeholder="Enter email..."
							onChange={newValue =>
								handleInputChange("email", newValue)
							}
							background="bg-transparent"
						/>
					</div>
				</div>
				<div className="flex items-end">
					<h2 className="text-4xl font-semibold">Change Password </h2>
				</div>
				<div className="flex items-center group  bg-black-300 bg-opacity-25 space-x-2 rounded-lg p-4 h-fit hover:bg-opacity-50 cursor-pointer ">
					<div className="w-full">
						<div>Change Password</div>

						<p className="text-black-500">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nam interdum vestibulum aliquet. Praesent in
							consequat est. Nam mollis non turpis consequat
							ornare.
						</p>
					</div>
					<ChevronRight className="text-black-500 group-hover:text-secondary h-6 w-6" />
				</div>
			</div>
		</div>
	);
}
