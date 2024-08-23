interface PostComment {
	title: string;
	answers: number;
	date: string;
	views: number;
}
const formatNumber = (num: number): string => {
	if (num < 1000) {
		return num.toString();
	}
	return (num / 1000).toFixed(1) + "k";
};
interface PostProps {
	messages: PostComment[];
}
export default function UserPosts({ messages }: PostProps) {
	return (
		<div className="bg-black-300 bg-opacity-25 max-w-[1110px] p-2 grid grid-cols-1 gap-2 rounded-lg">
			{messages.map(msg => (
				<div className="flex justify-between space-x-2 items-center hover:bg-black-300 py-2 px-4 rounded-md hover:bg-opacity-25">
					<div className="border border-primary-400  rounded-full aspect-square h-12  " />

					<div className="w-full flex-col">
						<div className="flex w-full items-center text-primary-400 space-x-1">
							<h3 className=" text-secondary font-medium">{msg.title}</h3>
						</div>
						<div className="flex space-x-2 text-sm text-black-500 font-medium">
							<div> {msg.date} ago </div>
						</div>
					</div>

					<div className="flex space-x-4 w-full justify-end items-center">
						<div className="flex space-x-4">
							<div className="flex-col">
								<div className="text-black-500 text-xs">Answers</div>
								<span>{msg.answers}</span>
							</div>
							<div className="flex-col">
								<div className="text-black-500 text-xs">Views</div>
								<span>{formatNumber(msg.views)}</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
