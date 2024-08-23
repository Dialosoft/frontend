"use client";

import { useState } from "react";

interface Props {
	onClose: () => void;
	title: string;
	onChange: (newValue: string) => void;
}

export default function ManageCategory({ onClose, title, onChange }:Props) {
	const [inputValue, setInputValue] = useState(title);

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
						<div className=" font-medium">Category</div>
						<input
							type="text"
							value={title}
							onChange={handleChange}
							className="border bg-black-900 border-black-300 rounded-md outline-none px-2 h-9 font-normal w-full appearance-none placeholder:text-black-500"
						/>
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
