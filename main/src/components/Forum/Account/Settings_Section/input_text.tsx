"use client";
import { useState } from "react";

interface InputProps {
	value: string;
	placeholder: string;
	onChange: (newValue: string) => void;
	background: string;
}

export default function InputText({ value, placeholder, onChange, background }: InputProps) {
	const [inputValue, setInputValue] = useState(value);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		onChange(newValue);
	};
	return (
		<>
			<input
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				className={`${background} border border-black-300 rounded-md outline-none px-2 h-9 font-normal w-full appearance-none placeholder:text-black-500`}
			/>
		</>
	);
}
