interface PostProps {
	title: string;
	user: string;
	time: string;
}

export default function LastPost({ title, user, time }: PostProps) {
	return (
		<>
			<div className="flex space-x-2 items-center max-md:hidden max-w-56  w-56  rounded-sm ">
				<div className="border border-primary-500  rounded-full aspect-square h-12  " />
				<div className=" w-full">
					<h3>{title}</h3>
					<div className="flex text-xs w-full space-x-2 text-black-500 ">
						<div>{user}</div>
						<div>{time} ago</div>
					</div>
				</div>
			</div>
		</>
	);
}
