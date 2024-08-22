
import dynamic from "next/dynamic";
import { Bell } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Suspense, useState } from "react";

const Template = dynamic(() => import("@/components/Forum/Header/Notify/template"));

export default function Notify() {
	const [notifyTemplate, setNotifyTemplate] = useState([
		{ photo: "", name: "SirLikesALot", type: "liked your post... again", time: "1h", link: "" },
		{ photo: "", name: "CaptainObvious", type: "replied to your thread with more questions", time: "30m", link: "" },
		{ photo: "", name: "MissClickQueen", type: "accidentally reported your comment", time: "15m", link: "" },
		{ photo: "", name: "DrGrammar", type: "corrected your grammar in a reply", time: "45m", link: "" },
		{ photo: "", name: "MrEcho", type: "reposted your exact words in another thread", time: "2h", link: "" }
	]);

	const clearNotifications = () => {
		setNotifyTemplate([]);
	};

	return (
		<div className="absolute overflow-hidden w-96 top-full mt-[1rem] right-0 rounded-lg bg-black-700 border border-opacity-25 border-black-300 text-black-500">
			<div className="m-[1rem] flex flex-col items-center justify-start space-y-[1rem]">
				<div className="flex items-center justify-center space-x-[.5rem] text-secondary text-lg">
					<Bell size={20} />
					<span className="font-semibold select-none">Notifications</span>
				</div>

				<div className="w-full">
					{notifyTemplate.map((notify) => (
						<Suspense key={uuidv4()}>
							<Template name={notify.name} link={notify.link} type={notify.type} time={notify.time} />
						</Suspense>
					))}
					
					{!notifyTemplate.length && (
						<span className="flex items-center justify-center select-none py-[1rem]">No notifications</span>
					)}
				</div>

				<div className="w-full flex items-center justify-between text-sm">
					<span onClick={clearNotifications} className="select-none hover:text-red cursor-pointer">Delete</span>
					<span className="select-none hover:text-secondary cursor-pointer">See More</span>
				</div>
			</div>
		</div>
	);
}