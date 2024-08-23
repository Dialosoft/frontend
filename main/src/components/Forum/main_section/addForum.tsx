"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
	onClose: () => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	title: string;
	onChange: (newValue: string) => void;
	onOptionChange: (newOption: string) => void;
	selectedOption: string;
}

export default function AddForum({ onClose, onSubmit, title, onChange, onOptionChange, selectedOption }: Props) {
	const [inputValue, setInputValue] = useState(title);
	const [showOptions, setShowOptions] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		onChange(newValue);
	};

	const handleOptionChange = (newOption: string) => {
		onOptionChange(newOption);
		setShowOptions(false);
	};

	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<form onSubmit={onSubmit} className="rounded-lg bg-black-700 space-y-4 p-4 z-50">
				<div className="space-y-2">
					<div className="font-medium">Forum Title</div>
					<input
						type="text"
						value={inputValue}
						placeholder="Write Forum title..."
						onChange={handleChange}
						className="border bg-black-900 border-black-300 rounded-md outline-none px-2 h-9 font-normal w-full appearance-none placeholder:text-black-500"
					/>
					<div>
						<div>Choose forum type</div>
						<div className="relative select-none">
							<div onClick={() => setShowOptions(!showOptions)} className="p-1 cursor-pointer">
								<div className="h-9 px-1 hover:bg-black-300 border border-black-300 border-opacity-50 bg-black-300 bg-opacity-25 flex w-40 justify-between items-center rounded-md">
									<span>{selectedOption || "Choose type"}</span>
									<ChevronDown className="h-4 w-4" />
								</div>
							</div>

							{showOptions && (
								<div className="absolute z-10 w-40 bg-black-700 border rounded-md border-black-300 border-opacity-50">
									<div onClick={() => handleOptionChange("documentation")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md cursor-pointer">
										Documentation
									</div>
									<div onClick={() => handleOptionChange("events")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md cursor-pointer">
										Events
									</div>
									<div onClick={() => handleOptionChange("help")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md cursor-pointer">
										Help
									</div>
									<div onClick={() => handleOptionChange("discussion")} className="h-9 px-1 hover:bg-black-300 flex items-center rounded-md cursor-pointer">
										Discussion
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="flex space-x-4">
					<button
						onClick={onClose}
						type="button"
						className="bg-black-300 justify-center w-full bg-opacity-25 border space-x-1 flex font-medium items-center border-red text-red hover:text-black-900 hover:bg-red h-9 px-2 rounded-lg"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-primary-400 justify-center w-full border space-x-1 flex font-medium items-center border-primary-400 border-opacity-25 text-black-900 hover:bg-primary-500 h-9 px-2 rounded-lg"
					>
						Create
					</button>
				</div>
			</form>
			<div onClick={onClose} className="bg-black-900 opacity-75 w-full h-full absolute"></div>
		</div>
	);
}
