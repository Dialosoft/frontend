interface ArticleProps {
	title: string;
	user: string;
	time: string;
}

export default function Article({ title, user, time }: ArticleProps) {
	return (
		<>
			<div className="flex space-x-2 items-center hover:bg-black-300 p-2 rounded-md hover:bg-opacity-25">
				<div className="border border-primary-500  rounded-full aspect-square h-12  " />
				<div className=" w-full">
					<h3>{title}</h3>
					<div className="flex text-xs w-full justify-between text-black-500 ">
						<div>{user}</div>
						<div>{time}</div>
					</div>
				</div>
			</div>
		</>
	);
}
