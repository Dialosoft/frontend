interface ArticleProps {
	title: string;
	user: string;
	time: string;
}

export default function Article({ title, user, time }: ArticleProps) {
	return (
		<>
			<div className="flex space-x-2 items-center h-20 hover:bg-black-300 p-2 rounded-2xl hover:bg-opacity-25 font-medium">
				<div className="border border-black-500  rounded-full aspect-square h-12  " />
				<div className=" w-full">
					<h3 className="text-xl">{title}</h3>
					<div className="flex  w-full justify-between text-black-500 ">
						<div>{user}</div>
						<div>{time}</div>
					</div>
				</div>
			</div>
		</>
	);
}
