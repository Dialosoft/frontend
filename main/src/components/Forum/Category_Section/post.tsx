import { Pin } from "lucide-react";

interface CategoryProps {
	id: number;
	user: string;
	title: string;
	answers: number;
	views: number;
	date: string;
	fixed: boolean;
}

const formatNumber = (num: number): string => {
	if (num < 1000) {
		return num.toString();
	}
	return (num / 1000).toFixed(1) + "k";
};

export default function Post({ title, answers, views, user, date, fixed }: CategoryProps) {
	return (
		<>
			<div className="flex justify-between space-x-2 items-center hover:bg-black-300 py-2 px-2 sm:px-4 rounded-md hover:bg-opacity-25">
				<div className="border border-primary-400  rounded-full aspect-square h-12  " />

				<div className="w-full flex-col">
					<div className="flex w-full items-center text-primary-400 space-x-1">
						{fixed && <Pin className="h-4 w-4" />}
						<h3 className=" text-secondary font-medium">{title}</h3>
					</div>
					<div className="flex space-x-2 text-sm text-black-500 font-medium">
						<div>{user}</div> <div className="font-bold"> {date}</div>
					</div>
				</div>

				<div className="flex space-x-4 w-fit justify-end items-center max-[550px]:hidden">
					<div className="flex space-x-4">
						<div className="flex-col">
							<div className="text-black-500 text-xs">Answers</div>
							<span>{answers}</span>
						</div>
						<div className="flex-col">
							<div className="text-black-500 text-xs">Views</div>
							<span>{formatNumber(views)}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
