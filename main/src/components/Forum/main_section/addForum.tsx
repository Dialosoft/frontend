"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
	onClose: () => void;
	title: string;
	onChange: (newValue: string) => void;
}

export default function ManageCategory({ onClose, title, onChange }: Props) {
	const [inputValue, setInputValue] = useState(title);
	const [showOptions, setShowOptions] = useState(false);
	const [option, setOption] = useState("chose type");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		onChange(newValue);
	};

	return (
		<>
			<div className="fixed inset-0  flex justify-center items-center ">
				<div className="rounded-lg bg-black-700   space-y-4 p-4 z-50">
					<div className="space-y-2">
						<div className=" font-medium">Forum Title</div>
						<input
							type="text"
							value={title}
							placeholder="Write Forum title..."
							onChange={handleChange}
							className="border bg-black-900 border-black-300 rounded-md outline-none px-2 h-9 font-normal w-full appearance-none placeholder:text-black-500"
						/>
						<div>
							<div>Chose forum type</div>
							<div className="relative select-none">
								<div onClick={() => setShowOptions(!showOptions)} className="p-1">
									<div className="h-9 px-1 hover:bg-black-300 border border-black-300 border-opacity-50 bg-black-300 bg-opacity-25 flex w-40  justify-between  items-center rounded-md  ">
										<span>{option}</span>
										<ChevronDown className="h-4 w-4 " />
									</div>
								</div>

								{showOptions && (
									<div className=" left-1 w-40 bg-black-700 border rounded-md border-black-300 border-opacity-50 absolute">
										<div onClick={() => setOption("documentation")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md  ">
											documentation
										</div>
										<div onClick={() => setOption("events")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md ">
											events
										</div>
										<div onClick={() => setOption("help")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md ">
											help
										</div>
										<div onClick={() => setOption("discussion")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md ">
											discussion
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="flex space-x-4 ">
						<button
							onClick={onClose}
							className="bg-black-300  justify-center w-full bg-opacity-25 border space-x-1 flex font-medium items-center border-red  text-red hover:text-black-900 hover:bg-red h-9 px-2 rounded-lg "
						>
							<div>Cancel</div>
						</button>
						<button className="bg-primary-400  justify-center w-full border space-x-1 flex font-medium items-center border-primary-400 border-opacity-25 text-black-900 hover:bg-primary-500 h-9 px-2 rounded-lg ">
							<div>Update</div>
						</button>
					</div>
				</div>
				<div onClick={onClose} className="bg-black-900 opacity-75 w-full h-full absolute "></div>
			</div>
		</>
	);
}
